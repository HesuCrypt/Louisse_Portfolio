import {
  SECTION_ORDER,
  type BuildElement,
  type BuilderSection,
  type CursorModel,
} from './builderTypes';
import type { BuilderAudioApi } from '../../lib/builderAudio';

/**
 * Framework-free autonomous build choreography.
 *
 * Everything here is driven by the REAL DOM:
 * - Robust resolveElementRef polling to eliminate silent skips.
 * - Smooth scroll coordination with mobile offset compensation for bottom URL bars.
 * - Dynamic sub-pixel tracking in document space.
 * - Native mobile micro-vibrations / haptic feedback.
 */

export interface CancelToken {
  cancelled: boolean;
}

export interface EngineHooks {
  getElements(): BuildElement[];
  isDone(id: string): boolean;
  markDone(id: string): void;
  cursor: CursorModel;
  audio: BuilderAudioApi;
  onSection(section: BuilderSection): void;
  /** Multiplies every duration down. 1 = authored pace. */
  speed?: number;
}

type Point = { x: number; y: number };

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const raf = (cb: () => void) =>
  typeof requestAnimationFrame === 'function'
    ? requestAnimationFrame(cb)
    : (setTimeout(cb, 16) as unknown as number);

const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

/** Viewport coords -> document coords. */
const toDoc = (vx: number, vy: number): Point => ({
  x: vx + (typeof window !== 'undefined' ? window.scrollX || 0 : 0),
  y: vy + (typeof window !== 'undefined' ? window.scrollY || 0 : 0),
});

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function compareElements(a: BuildElement, b: BuildElement): number {
  const sa = SECTION_ORDER.indexOf(a.sectionId);
  const sb = SECTION_ORDER.indexOf(b.sectionId);
  if (sa !== sb) return sa - sb;
  if (a.order !== b.order) return a.order - b.order;
  return a.id.localeCompare(b.id);
}

/** Micro-vibration haptic feedback for supported mobile devices */
function triggerHaptic(durationMs: number) {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(durationMs);
    } catch {
      // Haptics disabled or unavailable
    }
  }
}

/**
 * Robustly resolve an element's DOM node with a retry/poll window up to `maxWaitMs`.
 * Eliminates silent skips caused by hydration or re-rendering latencies.
 */
async function resolveElementRef(
  token: CancelToken,
  el: BuildElement,
  maxWaitMs = 500
): Promise<HTMLElement | null> {
  const start = now();
  while (!token.cancelled && now() - start < maxWaitMs) {
    const node = el.ref.current;
    if (node && node.isConnected) {
      return node;
    }
    await sleep(25);
  }
  const finalNode = el.ref.current;
  return finalNode && finalNode.isConnected ? finalNode : null;
}

/**
 * Ensures `node` is comfortably centered in the viewport.
 * On mobile devices (< 768px), accounts for bottom browser chrome/URL bars
 * by centering elements in the upper-middle viewport (offset: window.innerHeight * 0.35).
 */
async function ensureInViewport(token: CancelToken, node: HTMLElement, speed = 1): Promise<void> {
  if (typeof window === 'undefined') return;
  const rect = node.getBoundingClientRect();
  const vh = window.innerHeight || 800;
  const isMobile = window.innerWidth < 768;

  // On mobile, keep elements within 10% - 75% to stay clear of virtual address/nav bars
  const minTop = vh * 0.10;
  const maxBottom = isMobile ? vh * 0.75 : vh * 0.88;

  if (rect.top >= minTop && rect.bottom <= maxBottom) {
    return;
  }

  // Calculate target scroll offset (mobile uses 0.35 offset to center in upper-middle viewport)
  const mobileOffset = vh * 0.35;
  const desktopOffset = vh * 0.38;
  const offset = isMobile ? mobileOffset : desktopOffset;

  const targetScrollY = Math.max(0, window.scrollY + rect.top - offset);
  const startY = window.scrollY;
  const delta = Math.abs(targetScrollY - startY);
  if (delta < 20) return;

  const duration = clamp(delta * 0.45, 250, 750) / speed;

  await new Promise<void>((resolve) => {
    const started = now();
    const scrollStep = () => {
      if (token.cancelled) return resolve();
      const p = clamp((now() - started) / duration, 0, 1);
      const e = easeInOut(p);
      const current = startY + (targetScrollY - startY) * e;
      window.scrollTo(0, current);

      if (p < 1) {
        raf(scrollStep);
      } else {
        window.scrollTo(0, targetScrollY);
        resolve();
      }
    };
    raf(scrollStep);
  });

  // Short settle pause to ensure layout and bounding boxes stabilize
  await sleep(40 / speed);
}

/* ------------------------------------------------------------------------ */
/* Primitives                                                                */
/* ------------------------------------------------------------------------ */

function moveDuration(distance: number, speed: number): number {
  return clamp(120 + distance * 0.32, 120, 560) / speed;
}

function glide(
  token: CancelToken,
  cursor: CursorModel,
  target: () => Point,
  ms: number
): Promise<void> {
  return new Promise((resolve) => {
    const from = { x: cursor.x, y: cursor.y };
    const startedAt = now();

    const step = () => {
      if (token.cancelled) return resolve();
      const p = clamp((now() - startedAt) / ms, 0, 1);
      const e = easeInOut(p);
      const to = target();
      cursor.x = from.x + (to.x - from.x) * e;
      cursor.y = from.y + (to.y - from.y) * e;
      if (p < 1) raf(step);
      else resolve();
    };
    raf(step);
  });
}

/** Runs `tick(progress)` every frame for `ms`, resolving when it reaches 1. */
function run(
  token: CancelToken,
  ms: number,
  tick: (progress: number) => void
): Promise<void> {
  return new Promise((resolve) => {
    const startedAt = now();
    const step = () => {
      if (token.cancelled) return resolve();
      const p = clamp((now() - startedAt) / ms, 0, 1);
      tick(p);
      if (p < 1) raf(step);
      else resolve();
    };
    raf(step);
  });
}

function centerOf(node: HTMLElement): () => Point {
  return () => {
    const r = node.getBoundingClientRect();
    return toDoc(r.left + r.width / 2, r.top + r.height / 2);
  };
}

function dist(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** Glides to a target, adding a whoosh when the transit is long. */
async function travel(
  token: CancelToken,
  h: EngineHooks,
  target: () => Point,
  minMs = 0
): Promise<void> {
  const speed = h.speed ?? 1;
  const distance = dist({ x: h.cursor.x, y: h.cursor.y }, target());
  const ms = Math.max(moveDuration(distance, speed), minMs);
  if (typeof window !== 'undefined' && distance > window.innerHeight * 0.5) {
    h.audio.playWhoosh(ms);
  }
  await glide(token, h.cursor, target, ms);
}

/* ------------------------------------------------------------------------ */
/* Gestures                                                                  */
/* ------------------------------------------------------------------------ */

function reveal(el: BuildElement) {
  el.onStart?.();
}

function finish(el: BuildElement, h: EngineHooks) {
  el.onProgress?.(1);
  el.onComplete?.();
  h.markDone(el.id);
}

async function stampGesture(token: CancelToken, h: EngineHooks, el: BuildElement, node: HTMLElement) {
  const speed = h.speed ?? 1;
  h.cursor.tool = 'stamp';
  await travel(token, h, centerOf(node));
  if (token.cancelled) return;

  h.cursor.down = true;
  await sleep(55 / speed);
  triggerHaptic(25); // Stamp micro-vibration
  h.audio.playStampPop();
  reveal(el);
  h.cursor.down = false;
  await sleep(95 / speed);
}

async function frameGesture(token: CancelToken, h: EngineHooks, el: BuildElement, node: HTMLElement) {
  const speed = h.speed ?? 1;
  const { cursor } = h;
  const accent = el.accent ?? 'emerald';
  const corners = () => {
    const r = node.getBoundingClientRect();
    return { tl: toDoc(r.left, r.top), br: toDoc(r.right, r.bottom), w: r.width, h: r.height };
  };

  cursor.tool = 'frame';
  await travel(token, h, () => corners().tl);
  if (token.cancelled) return;

  const start = corners();
  cursor.down = true;
  cursor.frame = { x: start.tl.x, y: start.tl.y, w: 0, h: 0, phase: 'drag', accent };
  await sleep(45 / speed);

  const diagonal = Math.hypot(start.w, start.h);
  const dragMs = clamp(240 + diagonal * 0.28, 300, 620) / speed;
  await run(token, dragMs, (p) => {
    const c = corners();
    const e = easeInOut(p);
    cursor.x = c.tl.x + (c.br.x - c.tl.x) * e;
    cursor.y = c.tl.y + (c.br.y - c.tl.y) * e;
    cursor.frame = {
      x: c.tl.x,
      y: c.tl.y,
      w: (c.br.x - c.tl.x) * e,
      h: (c.br.y - c.tl.y) * e,
      phase: 'drag',
      accent,
    };
  });
  if (token.cancelled) return;

  // Release at the exact corner: flash, snap, and the content appears.
  const end = corners();
  cursor.down = false;
  cursor.frame = {
    x: end.tl.x,
    y: end.tl.y,
    w: end.br.x - end.tl.x,
    h: end.br.y - end.tl.y,
    phase: 'flash',
    accent,
  };
  triggerHaptic(15); // Frame snap micro-vibration
  h.audio.playFrameSnap();
  reveal(el);
  await sleep(130 / speed);
  cursor.frame = null;
}

async function typewriterGesture(
  token: CancelToken,
  h: EngineHooks,
  el: BuildElement,
  node: HTMLElement
) {
  const speed = h.speed ?? 1;
  const { cursor } = h;
  const text = el.content ?? el.textContent ?? node.textContent ?? '';

  const caretPoint = (): Point => {
    const c = el.getCaret?.();
    if (c) {
      cursor.caretH = c.h;
      return toDoc(c.x, c.y);
    }
    const r = node.getBoundingClientRect();
    return toDoc(r.left, r.top);
  };

  cursor.tool = 'type';
  await travel(token, h, caretPoint);
  if (token.cancelled) return;

  cursor.down = true;
  await sleep(50 / speed);
  cursor.down = false;
  cursor.caret = true;
  reveal(el);

  const total = clamp(text.length * 22, 240, 1000) / speed;
  let typed = 0;
  await run(token, total, (p) => {
    const chars = Math.round(p * text.length);
    el.onProgress?.(p);
    for (let i = typed; i < chars; i += 1) {
      if (text[i] !== ' ') {
        h.audio.playKeyClick();
        triggerHaptic(5); // Ultra-light typing tick
      }
    }
    typed = chars;
    const pt = caretPoint();
    cursor.x = pt.x;
    cursor.y = pt.y;
  });

  cursor.caret = false;
  await sleep(60 / speed);
}

async function counterGesture(token: CancelToken, h: EngineHooks, el: BuildElement, node: HTMLElement) {
  const speed = h.speed ?? 1;
  const { cursor } = h;

  cursor.tool = 'counter';
  await travel(token, h, centerOf(node));
  if (token.cancelled) return;

  cursor.down = true;
  await sleep(55 / speed);
  cursor.down = false;
  triggerHaptic(20);
  h.audio.playStampPop();
  reveal(el); // label appears on the click, number still at 0

  const ticks = Math.max(1, el.ticks ?? 24);
  let lastTick = 0;
  await run(token, 950 / speed, (p) => {
    const eased = easeOut(p);
    el.onProgress?.(eased);
    const tick = Math.floor(eased * ticks);
    if (tick !== lastTick) {
      lastTick = tick;
      h.audio.playCounterBlip();
      triggerHaptic(5);
    }
  });
  await sleep(80 / speed);
}

async function connectorGesture(
  token: CancelToken,
  h: EngineHooks,
  el: BuildElement,
  node: HTMLElement
) {
  const speed = h.speed ?? 1;
  const { cursor } = h;

  const ends = () => {
    const r = node.getBoundingClientRect();
    const horizontal = r.width >= r.height;
    return horizontal
      ? { a: toDoc(r.left, r.top + r.height / 2), b: toDoc(r.right, r.top + r.height / 2), length: r.width }
      : { a: toDoc(r.left + r.width / 2, r.top), b: toDoc(r.left + r.width / 2, r.bottom), length: r.height };
  };

  cursor.tool = 'path';
  await travel(token, h, () => ends().a);
  if (token.cancelled) return;

  cursor.down = true;
  reveal(el);

  let lastBlip = 0;
  await run(token, clamp(ends().length * 0.9, 350, 1100) / speed, (p) => {
    const { a, b } = ends();
    const e = easeInOut(p);
    cursor.x = a.x + (b.x - a.x) * e;
    cursor.y = a.y + (b.y - a.y) * e;
    el.onProgress?.(e);
    if (now() - lastBlip > 70) {
      lastBlip = now();
      h.audio.playCounterBlip();
      triggerHaptic(5);
    }
  });

  cursor.down = false;
  triggerHaptic(15);
  h.audio.playFrameSnap();
  await sleep(60 / speed);
}

async function build(token: CancelToken, h: EngineHooks, el: BuildElement, node: HTMLElement) {
  switch (el.type) {
    case 'stamp':
      return stampGesture(token, h, el, node);
    case 'frame':
      return frameGesture(token, h, el, node);
    case 'typewriter':
      return typewriterGesture(token, h, el, node);
    case 'counter':
      return counterGesture(token, h, el, node);
    case 'connector':
      return connectorGesture(token, h, el, node);
  }
}

/* ------------------------------------------------------------------------ */
/* Orchestrator                                                              */
/* ------------------------------------------------------------------------ */

/**
 * Walks every registered element in (section, order) sequence.
 *
 * Continuous autonomous tour:
 * - Robust resolveElementRef polling to eliminate silent skips.
 * - Automatically scrolls the window with mobile chrome compensation to center elements.
 * - Triggers haptic feedback ticks on supported touch devices.
 * - Resolves true when the whole queue was built, false if it was cancelled.
 */
export async function runBuild(token: CancelToken, h: EngineHooks): Promise<boolean> {
  const { cursor } = h;
  const speed = h.speed ?? 1;

  if (cursor.x === 0 && cursor.y === 0) {
    const startX = typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500;
    const start = toDoc(startX, 24);
    cursor.x = start.x;
    cursor.y = start.y;
  }
  cursor.visible = true;
  cursor.tool = 'idle';

  await sleep(350 / speed);

  let currentSection: BuilderSection | null = null;

  while (!token.cancelled) {
    const next = h
      .getElements()
      .filter((e) => !h.isDone(e.id))
      .sort(compareElements)[0];
    if (!next) break;

    // Robust polling for the DOM node to eliminate hydration race conditions
    const node = await resolveElementRef(token, next, 500 / speed);
    if (token.cancelled) break;

    if (!node || !node.isConnected) {
      finish(next, h);
      continue;
    }

    if (next.sectionId !== currentSection) {
      currentSection = next.sectionId;
      h.onSection(currentSection);
    }

    // Auto-scroll the viewport if the element is out of comfortable view
    await ensureInViewport(token, node, speed);
    if (token.cancelled) break;

    await build(token, h, next, node);
    if (token.cancelled) break;
    finish(next, h);
  }

  if (token.cancelled) return false;

  // Hand-off: glide to bottom-right and dock.
  cursor.tool = 'idle';
  const dockX = typeof window !== 'undefined' ? window.innerWidth - 160 : 800;
  const dockY = typeof window !== 'undefined' ? window.innerHeight - 96 : 600;
  await glide(
    token,
    cursor,
    () => toDoc(dockX, dockY),
    700 / speed
  );
  return !token.cancelled;
}
