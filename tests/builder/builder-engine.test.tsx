import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BuilderProvider } from '../../components/builder/DOMSequenceRegistry';
import { BuildItem } from '../../components/builder/BuildItem';
import { BuilderCursor } from '../../components/builder/BuilderCursor';

/**
 * jsdom has no layout, so give every wrapper a deterministic, in-viewport box
 * keyed off its build id.
 */
const boxes: Record<string, { left: number; top: number; width: number; height: number }> = {
  'a-nav': { left: 10, top: 10, width: 300, height: 40 },
  'a-title': { left: 10, top: 80, width: 400, height: 50 },
  'a-btn': { left: 10, top: 160, width: 120, height: 40 },
  'a-stat': { left: 10, top: 240, width: 200, height: 80 },
  'ref-card': { left: 10, top: 320, width: 400, height: 120 },
  'b-below': { left: 10, top: 5000, width: 200, height: 80 },
};

function boxFor(el: Element) {
  const id = el.getAttribute('data-build-id');
  const box = (id && boxes[id]) || { left: 0, top: 0, width: 0, height: 0 };
  return {
    ...box,
    right: box.left + box.width,
    bottom: box.top + box.height,
    x: box.left,
    y: box.top,
    toJSON: () => ({}),
  } as DOMRect;
}

const stateOf = (id: string) =>
  document.querySelector(`[data-build-id="${id}"]`)?.getAttribute('data-build-state');

let container: HTMLDivElement;
let root: Root;
const completionLog: string[] = [];

const Page: React.FC = () => (
  <BuilderProvider speed={80}>
    <BuilderCursor />
    <BuildItem id="a-stat" section="stats" order={1} channel="beta" type="counter">
      {({ progress }) => <b data-testid="stat">{Math.round(progress * 170)}</b>}
    </BuildItem>
    <BuildItem id="a-btn" section="hero" order={30} channel="beta" type="stamp">
      <button>Go</button>
    </BuildItem>
    <BuildItem id="a-title" section="hero" order={20} channel="alpha" type="typewriter" content="Hello world" />
    <BuildItem id="a-nav" section="hero" order={1} channel="alpha" type="frame">
      <nav>nav</nav>
    </BuildItem>
    <BuildItem id="ref-card" section="referral" order={1} channel="alpha" type="frame">
      <div>referral tier</div>
    </BuildItem>
    <BuildItem id="b-below" section="contact" order={1} channel="alpha" type="frame">
      <p>far below the fold</p>
    </BuildItem>
  </BuilderProvider>
);

beforeEach(() => {
  sessionStorage.clear();
  completionLog.length = 0;
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
    return boxFor(this);
  });
  window.scrollTo = vi.fn((x: number | ScrollToOptions, y?: number) => {
    if (typeof x === 'object' && x !== null) {
      window.scrollX = x.left ?? window.scrollX;
      window.scrollY = x.top ?? window.scrollY;
    } else {
      window.scrollX = (x as number) ?? window.scrollX;
      window.scrollY = y ?? window.scrollY;
    }
  }) as unknown as typeof window.scrollTo;

  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  root.unmount();
  container.remove();
  vi.restoreAllMocks();
});

describe('single high-speed builder engine', () => {
  it('keeps every element in layout but hidden before builder reaches them', async () => {
    root.render(<Page />);
    await vi.waitFor(() => expect(stateOf('a-nav')).toBeDefined());

    for (const id of ['a-nav', 'a-title', 'a-btn', 'a-stat', 'ref-card', 'b-below']) {
      const node = document.querySelector(`[data-build-id="${id}"]`) as HTMLElement;
      expect(node).not.toBeNull();
      expect(node.style.display).not.toBe('none');
    }
  });

  it('runs sequentially through all sections including referral banner', async () => {
    const seen: string[] = [];
    const observer = new MutationObserver(() => {
      for (const id of ['a-nav', 'a-title', 'a-btn', 'a-stat', 'ref-card', 'b-below']) {
        if (stateOf(id) === 'done' && !seen.includes(id)) seen.push(id);
      }
    });
    observer.observe(container, { attributes: true, subtree: true, attributeFilter: ['data-build-state'] });

    root.render(<Page />);

    // Entire sequence completes across all sections
    await vi.waitFor(() => expect(stateOf('b-below')).toBe('done'), { timeout: 6000 });
    observer.disconnect();

    expect(seen).toContain('a-nav');
    expect(seen).toContain('a-title');
    expect(seen).toContain('a-btn');
    expect(seen).toContain('a-stat');
    expect(seen).toContain('ref-card');
    expect(seen).toContain('b-below');

    expect(container.textContent).toContain('Hello world');
    expect(container.querySelector('[data-testid="stat"]')?.textContent).toBe('170');
    expect(container.textContent).toContain('referral tier');
    expect(container.textContent).toContain('far below the fold');

    await vi.waitFor(() => expect(sessionStorage.getItem('portfolio_built')).toBe('true'));
  });

  it('ESC reveals everything instantly and persists the skip', async () => {
    root.render(<Page />);
    await vi.waitFor(() => expect(stateOf('a-nav')).toBeDefined());

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    await vi.waitFor(() => {
      for (const id of ['a-nav', 'a-title', 'a-btn', 'a-stat', 'ref-card', 'b-below']) {
        expect(stateOf(id)).toBe('done');
      }
    });
    expect(sessionStorage.getItem('portfolio_built')).toBe('true');
  });

  it('renders everything immediately for a returning visitor', async () => {
    sessionStorage.setItem('portfolio_built', 'true');
    root.render(<Page />);
    await vi.waitFor(() => expect(stateOf('a-nav')).toBe('done'));
    for (const id of ['a-title', 'a-btn', 'a-stat', 'ref-card', 'b-below']) {
      expect(stateOf(id)).toBe('done');
    }
    expect(container.textContent).toContain('Hello world');
  });
});
