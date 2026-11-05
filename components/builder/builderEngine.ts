import {
  SECTION_ORDER,
  type BuildElement,
  type BuilderSection,
  type CursorModel,
} from './builderTypes';
import type { BuilderAudioApi } from '../../lib/builderAudio';

/**
 * Single High-Speed DOM-Tethered Autonomous Builder Engine.
 *
 * Runs a single agile, continuous builder pointer serially through all sections
 * (Nav -> Hero -> Stats -> About/Profile -> Experience -> Work/Projects -> Capabilities -> Referral -> Contact).
 *
 * Performance Hardened:
 * - Pre-calculates DOM bounding boxes once per gesture, eliminating layout thrashing.
 * - Hardware accelerated CSS transforms (translate3d) with will-change.
 * - Single-measurement trajectory with snappy flight times (160ms - 220ms).
 * - Direct Web Audio synchronization.
 */

export interface CancelToken {
  cancelled: boolean;
}

export interface EngineHooks {
  getElements(): BuildElement[];
  isDone(id: string): boolean;
  markDone(id: string): void;
  cursor: CursorModel;
  /** Backwards compatibility aliases */
  cursorAlpha?: CursorModel;
  cursorBeta?: CursorModel;
  audio: BuilderAudioApi;
  onSection(section: BuilderSection): void;
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
 * Stabilization delay capped at 250ms max.
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

  // Max 220ms scroll + 30ms sleep = 250ms max stabilization
  const duration = clamp(delta * 0.35, 160, 220) / speed;

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

  await sleep(30 / speed);
}

/* ------------------------------------------------------------------------ */
/* Primitives & Snappy Tweening                                             */
/* ------------------------------------------------------------------------ */

/**
 * High-speed transit: 160ms – 220ms
 */
function moveDuration(distance: number, speed: number): number {
  return clamp(160 + distance * 0.08, 160, 220) / speed;
}

function glideTo(
  token: CancelToken,
  cursor: CursorModel,
  targetPoint: Point,
  ms: number
): Promise<void> {
  return new Promise((resolve) => {
    const fromX = cursor.x;
    const fromY = cursor.y;
    const startedAt = now();

    const step = () => {
      if (token.cancelled) return resolve();
      const p = clamp((now() - startedAt) / ms, 0, 1);
      const e = easeInOut(p);
      cursor.x = fromX + (targetPoint.x - fromX) * e;
      cursor.y = fromY + (targetPoint.y - fromY) * e;
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

function dist(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

async function travelTo(
  token: CancelToken,
  cursor: CursorModel,
  audio: BuilderAudioApi,
  targetPoint: Point,
  speed: number
): Promise<void> {
  const distance = dist({ x: cursor.x, y: cursor.y }, targetPoint);
  const ms = moveDuration(distance, speed);
  if (typeof window !== 'undefined' && distance > window.innerHeight * 0.5) {
    audio.playWhoosh(ms);
  }
  await glideTo(token, cursor, targetPoint, ms);
}

/* ------------------------------------------------------------------------ */
/* Single-Measurement Gestures                                              */
/* ------------------------------------------------------------------------ */

function reveal(el: BuildElement) {
  el.onStart?.();
}

function finish(el: BuildElement, h: EngineHooks) {
  el.onProgress?.(1);
  el.onComplete?.();
  h.markDone(el.id);
}

/**
 * Stamp Gesture: 80ms – 120ms total duration
 */
async function stampGesture(
  token: CancelToken,
  cursor: CursorModel,
  audio: BuilderAudioApi,
  speed: number,
  el: BuildElement,
  node: HTMLElement
) {
  const r = node.getBoundingClientRect();
  const center = toDoc(r.left + r.width / 2, r.top + r.height / 2);

  cursor.tool = 'stamp';
  await travelTo(token, cursor, audio, center, speed);
  if (token.cancelled) return;

  cursor.down = true;
  await sleep(35 / speed);
  triggerHaptic(20);
  audio.playStampPop();
  reveal(el);
  cursor.down = false;
  await sleep(65 / speed);
}

/**
 * Click Gesture: 80ms – 120ms total duration
 */
async function clickGesture(
  token: CancelToken,
  cursor: CursorModel,
  audio: BuilderAudioApi,
  speed: number,
  el: BuildElement,
  node: HTMLElement
) {
  const r = node.getBoundingClientRect();
  const center = toDoc(r.left + r.width / 2, r.top + r.height / 2);

  cursor.tool = 'stamp';
  await travelTo(token, cursor, audio, center, speed);
  if (token.cancelled) return;

  cursor.down = true;
  await sleep(40 / speed);
  triggerHaptic(20);
  audio.playStampPop();
  try {
    node.click();
  } catch {
    // Ignore click errors
  }
  reveal(el);
  cursor.down = false;
  await sleep(50 / speed);
}

/**
 * Frame Drag Gesture: 200ms – 240ms drag duration
 */
async function frameGesture(
  token: CancelToken,
  cursor: CursorModel,
  audio: BuilderAudioApi,
  speed: number,
  el: BuildElement,
  node: HTMLElement
) {
  const accent = el.accent ?? 'emerald';
  const r = node.getBoundingClientRect();
  const tl = toDoc(r.left, r.top);
  const br = toDoc(r.right, r.bottom);
  const width = r.width;
  const height = r.height;

  cursor.tool = 'frame';
  await travelTo(token, cursor, audio, tl, speed);
  if (token.cancelled) return;

  cursor.down = true;
  cursor.frame = { x: tl.x, y: tl.y, w: 0, h: 0, phase: 'drag', accent };
  await sleep(25 / speed);

  const diagonal = Math.hypot(width, height);
  const dragMs = clamp(200 + diagonal * 0.05, 200, 240) / speed;
  await run(token, dragMs, (p) => {
    const e = easeInOut(p);
    cursor.x = tl.x + (br.x - tl.x) * e;
    cursor.y = tl.y + (br.y - tl.y) * e;
    cursor.frame = {
      x: tl.x,
      y: tl.y,
      w: (br.x - tl.x) * e,
      h: (br.y - tl.y) * e,
      phase: 'drag',
      accent,
    };
  });
  if (token.cancelled) return;

  cursor.down = false;
  cursor.frame = {
    x: tl.x,
    y: tl.y,
    w: width,
    h: height,
    phase: 'flash',
    accent,
  };
  triggerHaptic(15);
  audio.playFrameSnap();
  reveal(el);
  await sleep(75 / speed);
  cursor.frame = null;
}

/**
 * Typewriter Gesture: 15ms – 25ms per character cadence
 */
async function typewriterGesture(
  token: CancelToken,
  cursor: CursorModel,
  audio: BuilderAudioApi,
  speed: number,
  el: BuildElement,
  node: HTMLElement
) {
  const text = el.content ?? el.textContent ?? node.textContent ?? '';
  const r = node.getBoundingClientRect();
  const c = el.getCaret?.();
  const caretPos = c ? toDoc(c.x, c.y) : toDoc(r.left, r.top);
  cursor.caretH = c ? c.h : Math.min(r.height, 18);

  cursor.tool = 'type';
  await travelTo(token, cursor, audio, caretPos, speed);
  if (token.cancelled) return;

  cursor.down = true;
  await sleep(30 / speed);
  cursor.down = false;
  cursor.caret = true;
  reveal(el);

  // 18ms per character (clamped between 140ms and 480ms)
  const msPerChar = 18 / speed;
  const total = clamp(text.length * msPerChar, 140, 480);
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

    const currentC = el.getCaret?.();
    if (currentC) {
      const pt = toDoc(currentC.x, currentC.y);
      cursor.x = pt.x;
      cursor.y = pt.y;
    }
  });

  cursor.caret = false;
  await sleep(40 / speed);
}

/**
 * Counter Gesture
 */
async function counterGesture(
  token: CancelToken,
  cursor: CursorModel,
  audio: BuilderAudioApi,
  speed: number,
  el: BuildElement,
  node: HTMLElement
) {
  const r = node.getBoundingClientRect();
  const center = toDoc(r.left + r.width / 2, r.top + r.height / 2);

  cursor.tool = 'counter';
  await travelTo(token, cursor, audio, center, speed);
  if (token.cancelled) return;

  cursor.down = true;
  await sleep(35 / speed);
  cursor.down = false;
  triggerHaptic(20);
  audio.playStampPop();
  reveal(el);

  const ticks = Math.max(1, el.ticks ?? 16);
  let lastTick = 0;
  await run(token, 280 / speed, (p) => {
    const eased = easeOut(p);
    el.onProgress?.(eased);
    const tick = Math.floor(eased * ticks);
    if (tick !== lastTick) {
      lastTick = tick;
      audio.playCounterBlip();
      triggerHaptic(5);
    }
  });
  await sleep(40 / speed);
}

/**
 * Connector Gesture
 */
async function connectorGesture(
  token: CancelToken,
  cursor: CursorModel,
  audio: BuilderAudioApi,
  speed: number,
  el: BuildElement,
  node: HTMLElement
) {
  const r = node.getBoundingClientRect();
  const horizontal = r.width >= r.height;
  const a = horizontal ? toDoc(r.left, r.top + r.height / 2) : toDoc(r.left + r.width / 2, r.top);
  const b = horizontal ? toDoc(r.right, r.top + r.height / 2) : toDoc(r.left + r.width / 2, r.bottom);
  const length = horizontal ? r.width : r.height;

  cursor.tool = 'path';
  await travelTo(token, cursor, audio, a, speed);
  if (token.cancelled) return;

  cursor.down = true;
  reveal(el);

  let lastBlip = 0;
  await run(token, clamp(length * 0.4, 180, 420) / speed, (p) => {
    const e = easeInOut(p);
    cursor.x = a.x + (b.x - a.x) * e;
    cursor.y = a.y + (b.y - a.y) * e;
    el.onProgress?.(e);
    if (now() - lastBlip > 60) {
      lastBlip = now();
      audio.playCounterBlip();
      triggerHaptic(5);
    }
  });

  cursor.down = false;
  triggerHaptic(15);
  audio.playFrameSnap();
  await sleep(40 / speed);
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
/* Single Unified High-Speed Orchestrator                                   */
/* ------------------------------------------------------------------------ */

export async function runBuild(token: CancelToken, h: EngineHooks): Promise<boolean> {
  const cursor = h.cursor || h.cursorAlpha;
  if (!cursor) return false;
  const speed = h.speed ?? 1;

  if (cursor.x === 0 && cursor.y === 0) {
    const startX = typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500;
    const start = toDoc(startX, 24);
    cursor.x = start.x;
    cursor.y = start.y;
  }

  cursor.visible = true;
  cursor.tool = 'idle';

  await sleep(120 / speed);

  let currentSection: BuilderSection | null = null;

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

    // Scroll to the first node of this section
    const firstNode = await resolveElementRef(token, sectionElements[0], 500 / speed);
    if (firstNode && !token.cancelled) {
      await ensureInViewport(token, firstNode, speed);
    }

    // Sequentially build every element in the section
    for (const el of sectionElements) {
      if (token.cancelled) break;
      if (h.isDone(el.id)) continue;

      const node = await resolveElementRef(token, el, 500 / speed);
      if (token.cancelled) break;

      if (!node || !node.isConnected) {
        finish(el, h);
        continue;
      }

      await ensureInViewport(token, node, speed);
      if (token.cancelled) break;

      await executeGesture(token, cursor, h.audio, speed, el, node);
      if (token.cancelled) break;
      finish(el, h);
    }
  }

  if (token.cancelled) return false;

  cursor.visible = false;
  cursor.tool = 'idle';
  cursor.frame = null;
  cursor.caret = false;
  cursor.down = false;

  return !token.cancelled;
}
