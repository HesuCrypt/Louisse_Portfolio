import {
  SECTION_ORDER,
  type BuildElement,
  type BuilderSection,
  type CursorModel,
} from './builderTypes';
import type { BuilderAudioApi } from '../../lib/builderAudio';

/**
 * Framework-free dual-cursor autonomous build choreography.
 *
 * Runs two simultaneous collaborative workers:
 * - Worker Alpha (Cursor A / Spark A - Emerald): Handles frames, headings, containers, copy.
 * - Worker Beta (Cursor B / Spark B - Cyan): Handles badges, numbers, buttons, clicks, pills.
 *
 * Halves the total watch duration while keeping the tactile mechanical aesthetic.
 */

export interface CancelToken {
  cancelled: boolean;
}

export interface EngineHooks {
  getElements(): BuildElement[];
  isDone(id: string): boolean;
  markDone(id: string): void;
  cursorAlpha: CursorModel;
  cursorBeta: CursorModel;
  /** Backwards compatible alias */
  cursor?: CursorModel;
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
 * Assigns an element to Track Alpha or Beta if channel is 'auto'.
 * Alpha: containers, frames, typewriter text, timeline connectors.
 * Beta: stamps, counters, button clicks, tags, badges.
 */
function resolveChannel(el: BuildElement): 'alpha' | 'beta' {
  if (el.channel === 'alpha' || el.channel === 'beta') return el.channel;
  if (el.type === 'frame' || el.type === 'typewriter' || el.type === 'connector') {
    return 'alpha';
  }
  return 'beta';
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
 */
async function ensureInViewport(token: CancelToken, node: HTMLElement, speed = 1): Promise<void> {
  if (typeof window === 'undefined') return;
  const rect = node.getBoundingClientRect();
  const vh = window.innerHeight || 800;
  const isMobile = window.innerWidth < 768;

  const minTop = vh * 0.10;
  const maxBottom = isMobile ? vh * 0.75 : vh * 0.88;

  if (rect.top >= minTop && rect.bottom <= maxBottom) {
    return;
  }

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

async function travel(
  token: CancelToken,
  cursor: CursorModel,
  audio: BuilderAudioApi,
  target: () => Point,
  speed: number,
  minMs = 0
): Promise<void> {
  const distance = dist({ x: cursor.x, y: cursor.y }, target());
  const ms = Math.max(moveDuration(distance, speed), minMs);
  if (typeof window !== 'undefined' && distance > window.innerHeight * 0.5) {
    audio.playWhoosh(ms);
  }
  await glide(token, cursor, target, ms);
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

async function stampGesture(
  token: CancelToken,
  cursor: CursorModel,
  audio: BuilderAudioApi,
  speed: number,
  el: BuildElement,
  node: HTMLElement
) {
  cursor.tool = 'stamp';
  await travel(token, cursor, audio, centerOf(node), speed);
  if (token.cancelled) return;

  cursor.down = true;
  await sleep(55 / speed);
  triggerHaptic(25);
  audio.playStampPop();
  reveal(el);
  cursor.down = false;
  await sleep(95 / speed);
}

async function clickGesture(
  token: CancelToken,
  cursor: CursorModel,
  audio: BuilderAudioApi,
  speed: number,
  el: BuildElement,
  node: HTMLElement
) {
  cursor.tool = 'stamp';
  await travel(token, cursor, audio, centerOf(node), speed);
  if (token.cancelled) return;

  cursor.down = true;
  await sleep(65 / speed);
  triggerHaptic(20);
  audio.playStampPop();
  // Trigger DOM click event if node is clickable
  try {
    node.click();
  } catch {
    // Ignore click dispatch errors
  }
  reveal(el);
  cursor.down = false;
  await sleep(80 / speed);
}

async function frameGesture(
  token: CancelToken,
  cursor: CursorModel,
  audio: BuilderAudioApi,
  speed: number,
  el: BuildElement,
  node: HTMLElement
) {
  const accent = el.accent ?? 'emerald';
  const corners = () => {
    const r = node.getBoundingClientRect();
    return { tl: toDoc(r.left, r.top), br: toDoc(r.right, r.bottom), w: r.width, h: r.height };
  };

  cursor.tool = 'frame';
  await travel(token, cursor, audio, () => corners().tl, speed);
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
  triggerHaptic(15);
  audio.playFrameSnap();
  reveal(el);
  await sleep(130 / speed);
  cursor.frame = null;
}

async function typewriterGesture(
  token: CancelToken,
  cursor: CursorModel,
  audio: BuilderAudioApi,
  speed: number,
  el: BuildElement,
  node: HTMLElement
) {
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
  await travel(token, cursor, audio, caretPoint, speed);
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
        audio.playKeyClick();
        triggerHaptic(5);
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

async function counterGesture(
  token: CancelToken,
  cursor: CursorModel,
  audio: BuilderAudioApi,
  speed: number,
  el: BuildElement,
  node: HTMLElement
) {
  cursor.tool = 'counter';
  await travel(token, cursor, audio, centerOf(node), speed);
  if (token.cancelled) return;

  cursor.down = true;
  await sleep(55 / speed);
  cursor.down = false;
  triggerHaptic(20);
  audio.playStampPop();
  reveal(el);

  const ticks = Math.max(1, el.ticks ?? 24);
  let lastTick = 0;
  await run(token, 950 / speed, (p) => {
    const eased = easeOut(p);
    el.onProgress?.(eased);
    const tick = Math.floor(eased * ticks);
    if (tick !== lastTick) {
      lastTick = tick;
      audio.playCounterBlip();
      triggerHaptic(5);
    }
  });
  await sleep(80 / speed);
}

async function connectorGesture(
  token: CancelToken,
  cursor: CursorModel,
  audio: BuilderAudioApi,
  speed: number,
  el: BuildElement,
  node: HTMLElement
) {
  const ends = () => {
    const r = node.getBoundingClientRect();
    const horizontal = r.width >= r.height;
    return horizontal
      ? { a: toDoc(r.left, r.top + r.height / 2), b: toDoc(r.right, r.top + r.height / 2), length: r.width }
      : { a: toDoc(r.left + r.width / 2, r.top), b: toDoc(r.left + r.width / 2, r.bottom), length: r.height };
  };

  cursor.tool = 'path';
  await travel(token, cursor, audio, () => ends().a, speed);
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
      audio.playCounterBlip();
      triggerHaptic(5);
    }
  });

  cursor.down = false;
  triggerHaptic(15);
  audio.playFrameSnap();
  await sleep(60 / speed);
}

async function executeGesture(
  token: CancelToken,
  cursor: CursorModel,
  audio: BuilderAudioApi,
  speed: number,
  el: BuildElement,
  node: HTMLElement
) {
  switch (el.type) {
    case 'stamp':
      return stampGesture(token, cursor, audio, speed, el, node);
    case 'click':
      return clickGesture(token, cursor, audio, speed, el, node);
    case 'frame':
      return frameGesture(token, cursor, audio, speed, el, node);
    case 'typewriter':
      return typewriterGesture(token, cursor, audio, speed, el, node);
    case 'counter':
      return counterGesture(token, cursor, audio, speed, el, node);
    case 'connector':
      return connectorGesture(token, cursor, audio, speed, el, node);
  }
}

/* ------------------------------------------------------------------------ */
/* Dual-Worker Orchestrator                                                  */
/* ------------------------------------------------------------------------ */

export async function runBuild(token: CancelToken, h: EngineHooks): Promise<boolean> {
  const { cursorAlpha, cursorBeta } = h;
  const speed = h.speed ?? 1;

  // Initialize both workers in document space
  if (cursorAlpha.x === 0 && cursorAlpha.y === 0) {
    const startX = typeof window !== 'undefined' ? window.innerWidth * 0.35 : 350;
    const start = toDoc(startX, 24);
    cursorAlpha.x = start.x;
    cursorAlpha.y = start.y;
  }
  if (cursorBeta.x === 0 && cursorBeta.y === 0) {
    const startX = typeof window !== 'undefined' ? window.innerWidth * 0.65 : 650;
    const start = toDoc(startX, 24);
    cursorBeta.x = start.x;
    cursorBeta.y = start.y;
  }

  cursorAlpha.visible = true;
  cursorAlpha.tool = 'idle';
  cursorBeta.visible = true;
  cursorBeta.tool = 'idle';

  await sleep(350 / speed);

  let currentSection: BuilderSection | null = null;
  const claimed = new Set<string>();

  // Process elements section by section with parallel dual-channel execution
  for (const section of SECTION_ORDER) {
    if (token.cancelled) break;

    const sectionElements = h
      .getElements()
      .filter((e) => e.sectionId === section && !h.isDone(e.id))
      .sort(compareElements);

    if (sectionElements.length === 0) continue;

    if (currentSection !== section) {
      currentSection = section;
      h.onSection(currentSection);
    }

    // Scroll to the first element of this section
    const firstNode = await resolveElementRef(token, sectionElements[0], 500 / speed);
    if (firstNode && !token.cancelled) {
      await ensureInViewport(token, firstNode, speed);
    }

    // Partition elements into Track Alpha and Track Beta
    const queueAlpha: BuildElement[] = [];
    const queueBeta: BuildElement[] = [];

    for (const el of sectionElements) {
      const ch = resolveChannel(el);
      if (ch === 'alpha') queueAlpha.push(el);
      else queueBeta.push(el);
    }

    // Worker Loop for a single channel
    const runWorker = async (
      workerCursor: CursorModel,
      queue: BuildElement[],
      partnerQueue: BuildElement[]
    ) => {
      while (!token.cancelled) {
        // Find next unclaimed element in this queue, or steal from partner if done
        let target = queue.find((e) => !claimed.has(e.id) && !h.isDone(e.id));
        if (!target) {
          target = partnerQueue.find((e) => !claimed.has(e.id) && !h.isDone(e.id));
        }
        if (!target) break;

        claimed.add(target.id);

        const node = await resolveElementRef(token, target, 500 / speed);
        if (token.cancelled) break;

        if (!node || !node.isConnected) {
          finish(target, h);
          continue;
        }

        await executeGesture(token, workerCursor, h.audio, speed, target, node);
        if (token.cancelled) break;
        finish(target, h);
      }
    };

    // Run Worker Alpha and Worker Beta concurrently for this section
    await Promise.all([
      runWorker(cursorAlpha, queueAlpha, queueBeta),
      runWorker(cursorBeta, queueBeta, queueAlpha),
    ]);
  }

  if (token.cancelled) return false;

  // Fade out both cursors/sparks cleanly without any permanent idle pill
  cursorAlpha.visible = false;
  cursorBeta.visible = false;
  cursorAlpha.tool = 'idle';
  cursorBeta.tool = 'idle';

  return !token.cancelled;
}
