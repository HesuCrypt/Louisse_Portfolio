import type { RefObject } from 'react';

export type BuildType = 'frame' | 'typewriter' | 'stamp' | 'counter' | 'connector' | 'click';

export type BuilderChannel = 'alpha' | 'beta' | 'auto';

export type BuilderSection =
  | 'nav'
  | 'hero'
  | 'stats'
  | 'about'
  | 'profile'
  | 'experience'
  | 'work'
  | 'projects'
  | 'capabilities'
  | 'referral'
  | 'contact'
  | 'completed';

/**
 * cursor  - desktop & mobile: dual autonomous workers / AI spark tracers build the page.
 * instant - returning visitor, skipped, reduced-motion, or non-home route.
 */
export type BuilderMode = 'cursor' | 'instant';

export type ToolKind = 'idle' | 'frame' | 'type' | 'stamp' | 'counter' | 'path';

/** Order the engine walks sections. Matches the on-page order of the home route:
 * Nav -> Hero -> Stats -> Profile (About) -> Experience -> Work / Projects -> Capabilities -> Referral -> Contact
 */
export const SECTION_ORDER: BuilderSection[] = [
  'nav',
  'hero',
  'stats',
  'about',
  'profile',
  'experience',
  'work',
  'projects',
  'capabilities',
  'referral',
  'contact',
];

export const BUILT_STORAGE_KEY = 'portfolio_built';

/** Caret position in VIEWPORT coordinates. */
export interface CaretPoint {
  x: number;
  y: number;
  h: number;
}

export interface BuildElement {
  id: string;
  sectionId: BuilderSection;
  order: number;
  type: BuildType;
  channel?: BuilderChannel;
  ref: RefObject<HTMLElement | null>;
  /** Text for typewriter items. Read lazily so live values (a clock) stay current. */
  readonly content?: string;
  readonly textContent?: string;
  /** Counter blips to fire while the number rolls. */
  ticks?: number;
  /** Frame flash colour. */
  accent?: 'emerald' | 'cyan';
  getCaret?: () => CaretPoint | null;
  onStart?: () => void;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

/** Selection marquee in DOCUMENT coordinates. */
export interface FrameBox {
  x: number;
  y: number;
  w: number;
  h: number;
  phase: 'drag' | 'flash';
  accent: 'emerald' | 'cyan';
}

/**
 * Mutable cursor model. Deliberately NOT React state: the engine writes it
 * every animation frame and BuilderCursor paints it imperatively, so building
 * the page never re-renders the page.
 */
export interface CursorModel {
  /** Document coordinates, so the cursor stays glued to its element on scroll. */
  x: number;
  y: number;
  down: boolean;
  tool: ToolKind;
  caret: boolean;
  caretH: number;
  frame: FrameBox | null;
  visible: boolean;
  /** performance.now() until which the visitor's real mouse is considered active. */
  userActiveUntil: number;
}

export function createCursorModel(): CursorModel {
  return {
    x: 0,
    y: 0,
    down: false,
    tool: 'idle',
    caret: false,
    caretH: 0,
    frame: null,
    visible: false,
    userActiveUntil: 0,
  };
}
