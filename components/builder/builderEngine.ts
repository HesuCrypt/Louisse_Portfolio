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
 * Performance Hardened:
 * - Pre-calculates DOM bounding boxes once per gesture, eliminating layout thrashing.
 * - Hardware accelerated CSS transforms (translate3d) with will-change.
 * - Hard guards on audio state and direct hardware synchronization.
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
  cursor?: CursorModel;
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

function resolveChannel(el: BuildElement): 'alpha' | 'beta' {
  if (el.channel === 'alpha' || el.channel === 'beta') return el.channel;
  if (el.type === 'frame' || el.type === 'typewriter' || el.type === 'connector') {
    return 'alpha';
  }
  return 'beta';
}

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
/* Primitives & Smooth Non-Thrashing Tweening                              */
/* ------------------------------------------------------------------------ */

function moveDuration(distance: number, speed: number): number {
  return clamp(120 + distance * 0.32, 120, 560) / speed;
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
  speed: number,
  minMs = 0
): Promise<void> {
  const distance = dist({ x: cursor.x, y: cursor.y }, targetPoint);
  const ms = Math.max(moveDuration(distance, speed), minMs);
  if (typeof window !== 'undefined' && distance > window.innerHeight * 0.5) {
    audio.playWhoosh(ms);
  }
  await glideTo(token, cursor, targetPoint, ms);
}

/* ------------------------------------------------------------------------ */
/* Zero-Jank Gestures: Measure DOM once per gesture                         */
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
  const r = node.getBoundingClientRect();
  const center = toDoc(r.left + r.width / 2, r.top + r.height / 2);

  cursor.tool = 'stamp';
  await travelTo(token, cursor, audio, center, speed);
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
  const r = node.getBoundingClientRect();
  const center = toDoc(r.left + r.width / 2, r.top + r.height / 2);

  cursor.tool = 'stamp';
  await travelTo(token, cursor, audio, center, speed);
  if (token.cancelled) return;

  cursor.down = true;
  await sleep(65 / speed);
  triggerHaptic(20);
  audio.playStampPop();
  try {
    node.click();
  } catch {
    // Ignore click error
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
  await sleep(45 / speed);

  const diagonal = Math.hypot(width, height);
  const dragMs = clamp(240 + diagonal * 0.28, 300, 620) / speed;
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
  const r = node.getBoundingClientRect();
  const c = el.getCaret?.();
  const caretPos = c ? toDoc(c.x, c.y) : toDoc(r.left, r.top);
  cursor.caretH = c ? c.h : Math.min(r.height, 18);

  cursor.tool = 'type';
  await travelTo(token, cursor, audio, caretPos, speed);
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

    // Read caret incrementally only during typing
    const currentC = el.getCaret?.();
    if (currentC) {
      const pt = toDoc(currentC.x, currentC.y);
      cursor.x = pt.x;
      cursor.y = pt.y;
    }
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
  const r = node.getBoundingClientRect();
  const center = toDoc(r.left + r.width / 2, r.top + r.height / 2);

  cursor.tool = 'counter';
  await travelTo(token, cursor, audio, center, speed);
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
  await run(token, clamp(length * 0.9, 350, 1100) / speed, (p) => {
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

    const firstNode = await resolveElementRef(token, sectionElements[0], 500 / speed);
    if (firstNode && !token.cancelled) {
      await ensureInViewport(token, firstNode, speed);
    }

    const queueAlpha: BuildElement[] = [];
    const queueBeta: BuildElement[] = [];

    for (const el of sectionElements) {
      const ch = resolveChannel(el);
      if (ch === 'alpha') queueAlpha.push(el);
      else queueBeta.push(el);
    }

    const runWorker = async (
      workerCursor: CursorModel,
      queue: BuildElement[],
      partnerQueue: BuildElement[]
    ) => {
      while (!token.cancelled) {
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

    await Promise.all([
      runWorker(cursorAlpha, queueAlpha, queueBeta),
      runWorker(cursorBeta, queueBeta, queueAlpha),
    ]);
  }

  if (token.cancelled) return false;

  cursorAlpha.visible = false;
  cursorBeta.visible = false;
  cursorAlpha.tool = 'idle';
  cursorBeta.tool = 'idle';

  return !token.cancelled;
}
