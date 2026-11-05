'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useBuilder } from './DOMSequenceRegistry';
import type { BuildElement, BuilderSection, BuildType, CaretPoint } from './builderTypes';

type Phase = 'hidden' | 'building' | 'done';

export interface BuildRenderState {
  /** 0..1. Counters read this to roll their number. */
  progress: number;
  done: boolean;
  formattedValue?: string;
}

export interface BuildItemProps {
  id: string;
  section: BuilderSection;
  order: number;
  type: BuildType;
  /** Typewriter text (alias: textContent). */
  content?: string;
  /** Typewriter text as specified in the Builder manifest. */
  textContent?: string;
  /** Target value for counter elements (e.g. "+170%", "100%", "3.4K+", or 170). */
  targetValue?: number | string;
  /** Typewriter: style every character from `from` onward (e.g. a coloured full stop). */
  textAccent?: { from: number; className: string };
  /** Counter: how many blips to fire while rolling. */
  ticks?: number;
  /** Frame: flash colour on release. */
  accent?: 'emerald' | 'cyan';
  /** Frame: how its content appears once the drag is released. */
  reveal?: 'fade' | 'iris';
  /** CSS transform-origin for the stamp pop. */
  origin?: string;
  as?: 'div' | 'span' | 'p' | 'li' | 'article' | 'figure' | 'section';
  className?: string;
  children?: React.ReactNode | ((state: BuildRenderState) => React.ReactNode);
}

const HIDDEN_STAMP = { opacity: 0, scale: 0.2 };
const HIDDEN_FADE = { opacity: 0, scale: 0.985 };
const HIDDEN_IRIS = { opacity: 0, clipPath: 'circle(0% at 50% 50%)' };

/**
 * Parses a targetValue like "+170%", "3.4K+", "100%", or 170 and formats a
 * rolling counter value for progress `p` in [0, 1].
 */
export function formatCounterTarget(targetValue: number | string | undefined, progress: number): string | undefined {
  if (targetValue === undefined) return undefined;
  if (typeof targetValue === 'number') {
    const decimals = Number.isInteger(targetValue) ? 0 : 1;
    return (targetValue * progress).toFixed(decimals);
  }
  const match = String(targetValue).match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return String(targetValue);
  const [, prefix, numStr, suffix] = match;
  const numeric = parseFloat(numStr);
  const decimalPart = numStr.split('.')[1];
  const decimals = decimalPart ? decimalPart.length : 0;
  const current = (numeric * progress).toFixed(decimals);
  return `${prefix}${current}${suffix}`;
}

/**
 * Wraps any existing node so the autonomous cursor has to build it.
 *
 * The wrapper ALWAYS keeps its layout box (opacity/scale only, never
 * display:none), so `getBoundingClientRect()` is accurate before the element
 * exists visually and the page never shifts when it appears.
 */
export const BuildItem: React.FC<BuildItemProps> = ({
  id,
  section,
  order,
  type,
  content,
  textContent,
  targetValue,
  textAccent,
  ticks,
  accent,
  reveal = 'fade',
  origin = 'center',
  as = 'div',
  className,
  children,
}) => {
  const { mode, epoch, register, unregister, isCompleted } = useBuilder();

  const resolvedText = textContent ?? content;
  const rootRef = useRef<HTMLElement | null>(null);
  const typedRef = useRef<HTMLSpanElement | null>(null);
  const contentRef = useRef(resolvedText);
  contentRef.current = resolvedText;

  const [phase, setPhase] = useState<Phase>(() =>
    mode === 'instant' || isCompleted(id) ? 'done' : 'hidden'
  );
  const [progress, setProgress] = useState(() => (phase === 'done' ? 1 : 0));

  // Replay (or leaving and re-entering the home route) rewinds every item.
  const seenEpoch = useRef(epoch);
  useEffect(() => {
    if (seenEpoch.current === epoch) return;
    seenEpoch.current = epoch;
    setPhase(mode === 'instant' ? 'done' : 'hidden');
    setProgress(mode === 'instant' ? 1 : 0);
  }, [epoch, mode]);

  const getCaret = useCallback((): CaretPoint | null => {
    const root = rootRef.current;
    if (!root) return null;
    const rects = typedRef.current?.getClientRects();
    if (rects && rects.length > 0) {
      const last = rects[rects.length - 1];
      return { x: last.right, y: last.top, h: last.height };
    }
    const box = root.getBoundingClientRect();
    const fontSize = parseFloat(getComputedStyle(root).fontSize) || 16;
    return { x: box.left, y: box.top, h: Math.min(box.height, fontSize * 1.2) };
  }, []);

  useEffect(() => {
    const element: BuildElement = {
      id,
      sectionId: section,
      order,
      type,
      ref: rootRef,
      get content() {
        return contentRef.current;
      },
      get textContent() {
        return contentRef.current;
      },
      ticks,
      accent,
      getCaret,
      onStart: () => setPhase((current) => (current === 'done' ? current : 'building')),
      onProgress: (value) => setProgress(value),
      onComplete: () => {
        setProgress(1);
        setPhase('done');
      },
    };
    register(element);
    return () => unregister(id);
  }, [id, section, order, type, ticks, accent, getCaret, register, unregister]);

  const done = mode === 'instant' || phase === 'done';
  const started = done || phase === 'building';
  const p = done ? 1 : progress;
  const formattedCounter = formatCounterTarget(targetValue, p);

  const MotionTag = useMemo(
    () => motion[as] as unknown as React.ElementType,
    [as]
  );

  const body =
    typeof children === 'function'
      ? children({ progress: p, done, formattedValue: formattedCounter })
      : type === 'counter' && targetValue !== undefined && children === undefined
        ? formattedCounter
        : children;

  /* ---------------- mobile / touch: staggered fade on scroll ---------------- */
  if (mode === 'lite') {
    const text = type === 'typewriter' ? renderRuns(resolvedText ?? '', 0, textAccent) : null;
    const liteCounter = formatCounterTarget(targetValue, 1);
    return (
      <MotionTag
        ref={rootRef}
        className={className}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-6%' }}
        transition={{ duration: 0.45, delay: (order % 8) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        {type === 'typewriter'
          ? text ?? children
          : typeof children === 'function'
            ? children({ progress: 1, done: true, formattedValue: liteCounter })
            : children ?? liteCounter}
      </MotionTag>
    );
  }

  /* ----------------------------- typewriter -------------------------------- */
  if (type === 'typewriter') {
    const text = resolvedText ?? (typeof children === 'string' ? children : '');
    const count = done ? text.length : Math.round(p * text.length);
    return (
      <MotionTag
        ref={rootRef}
        className={className}
        data-build-id={id}
        data-build-state={done ? 'done' : phase}
      >
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          <span ref={typedRef}>{renderRuns(text.slice(0, count), 0, textAccent)}</span>
          <span className="invisible">{renderRuns(text.slice(count), count, textAccent)}</span>
        </span>
      </MotionTag>
    );
  }

  /* ---------------------------- connector ---------------------------------- */
  if (type === 'connector') {
    const box = rootRef.current?.getBoundingClientRect();
    const horizontal = box ? box.width >= box.height : false;
    const remaining = `${(1 - p) * 100}%`;
    return (
      <MotionTag
        ref={rootRef}
        className={className}
        data-build-id={id}
        data-build-state={done ? 'done' : phase}
        style={{
          opacity: started ? 1 : 0,
          pointerEvents: started ? undefined : 'none',
          clipPath: done ? 'none' : horizontal ? `inset(0 ${remaining} 0 0)` : `inset(0 0 ${remaining} 0)`,
        }}
      >
        {body}
      </MotionTag>
    );
  }

  /* --------------------- stamp / frame / counter (animated) ------------------ */
  let hidden: Record<string, unknown> = HIDDEN_FADE;
  let shown: Record<string, unknown> = { opacity: 1, scale: 1 };
  let transition: Record<string, unknown> = { duration: 0.28, ease: [0.16, 1, 0.3, 1] };

  if (type === 'stamp') {
    hidden = HIDDEN_STAMP;
    // Elastic [0.2 -> 1.05 -> 1] pop right under the pointer.
    shown = { opacity: 1, scale: mode === 'instant' ? 1 : [0.2, 1.05, 1] };
    transition = { duration: 0.34, times: [0, 0.6, 1], ease: 'easeOut' };
  } else if (type === 'counter') {
    hidden = { opacity: 0 };
    shown = { opacity: 1 };
    transition = { duration: 0.2 };
  } else if (reveal === 'iris') {
    hidden = HIDDEN_IRIS;
    shown = { opacity: 1, clipPath: 'circle(150% at 50% 50%)' };
    transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] };
  }

  return (
    <MotionTag
      ref={rootRef}
      className={className}
      data-build-id={id}
      data-build-state={done ? 'done' : phase}
      initial={false}
      animate={started ? shown : hidden}
      transition={transition}
      style={{
        transformOrigin: origin,
        pointerEvents: started ? undefined : 'none',
      }}
    >
      {body}
    </MotionTag>
  );
};

/** Splits `text` (which starts at global index `offset`) around the accent boundary. */
function renderRuns(
  text: string,
  offset: number,
  accent?: { from: number; className: string }
): React.ReactNode {
  if (!accent || text.length === 0) return text;
  const split = Math.max(0, Math.min(text.length, accent.from - offset));
  const plain = text.slice(0, split);
  const accented = text.slice(split);
  return (
    <>
      {plain}
      {accented ? <span className={accent.className}>{accented}</span> : null}
    </>
  );
}
