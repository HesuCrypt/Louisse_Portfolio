'use client';

import React, { useEffect, useRef } from 'react';
import { FastForward, Volume2, VolumeX } from 'lucide-react';
import { useBuilder } from './DOMSequenceRegistry';
import type { ToolKind } from './builderTypes';

const TOOL_LABEL: Record<ToolKind, string> = {
  idle: 'Louisse // Builder',
  frame: '[ ⬚ Frame Tool ]',
  type: '[ I Type Tool ]',
  stamp: '[ ✦ Stamp Tool ]',
  counter: '[ ⟳ Counter Tool ]',
  path: '[ ⤹ Path Tool ]',
};

const ACCENT = {
  emerald: { line: '#10B981', fill: 'rgba(16, 185, 129, 0.12)', glow: 'rgba(16, 185, 129, 0.55)' },
  cyan: { line: '#06B6D4', fill: 'rgba(6, 182, 212, 0.14)', glow: 'rgba(6, 182, 212, 0.6)' },
} as const;

/**
 * The single autonomous collaborator pointer.
 *
 * Painted imperatively from the engine's mutable cursor model inside one rAF
 * loop, so a 60fps cursor never triggers a React render. Coordinates are kept
 * in DOCUMENT space and converted with the live scroll offset every frame,
 * which keeps the pointer glued to its target while the visitor scrolls.
 */
export const BuilderCursor: React.FC = () => {
  const { mode, cursor, isBuilding, isFinished, isMuted, toggleMute, skipAll } = useBuilder();

  const groupRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const frameSizeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (mode !== 'cursor') return undefined;

    let frameId = 0;
    let opacity = 0;
    let lastTool: ToolKind | null = null;

    const paint = () => {
      const sx = window.scrollX;
      const sy = window.scrollY;

      const group = groupRef.current;
      if (group) {
        const hidden = !cursor.visible || isFinished;
        const target = hidden ? 0 : performance.now() < cursor.userActiveUntil ? 0.4 : 1;
        opacity += (target - opacity) * 0.22;
        group.style.opacity = opacity.toFixed(3);
        group.style.transform = `translate3d(${(cursor.x - sx).toFixed(2)}px, ${(cursor.y - sy).toFixed(2)}px, 0)`;
      }

      if (arrowRef.current) {
        arrowRef.current.style.transform = cursor.down ? 'scale(0.85)' : 'scale(1)';
      }

      if (caretRef.current) {
        caretRef.current.style.display = cursor.caret ? 'block' : 'none';
        caretRef.current.style.height = `${Math.max(14, cursor.caretH)}px`;
      }

      if (badgeRef.current && lastTool !== cursor.tool) {
        lastTool = cursor.tool;
        badgeRef.current.textContent = TOOL_LABEL[cursor.tool];
      }

      const frame = frameRef.current;
      if (frame) {
        const box = cursor.frame;
        if (!box) {
          frame.style.display = 'none';
        } else {
          const colors = ACCENT[box.accent];
          const flash = box.phase === 'flash';
          frame.style.display = 'block';
          frame.style.transform = `translate3d(${(box.x - sx).toFixed(2)}px, ${(box.y - sy).toFixed(2)}px, 0)`;
          frame.style.width = `${Math.max(0, box.w).toFixed(2)}px`;
          frame.style.height = `${Math.max(0, box.h).toFixed(2)}px`;
          frame.style.border = `1.5px ${flash ? 'solid' : 'dashed'} ${colors.line}`;
          frame.style.background = flash ? colors.fill : 'rgba(255,255,255,0.02)';
          frame.style.boxShadow = flash ? `0 0 28px ${colors.glow}` : 'none';
          if (frameSizeRef.current) {
            frameSizeRef.current.textContent = `${Math.round(box.w)} × ${Math.round(box.h)}`;
          }
        }
      }

      frameId = requestAnimationFrame(paint);
    };

    frameId = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(frameId);
  }, [mode, cursor, isFinished]);

  if (mode !== 'cursor') return null;

  return (
    <>
      {/* Simulated layer: never intercepts the visitor's real mouse. */}
      <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
        <div
          ref={frameRef}
          className="absolute top-0 left-0 hidden"
          style={{ willChange: 'transform, width, height' }}
        >
          <span
            ref={frameSizeRef}
            className="absolute -top-6 left-0 rounded bg-black/90 px-1.5 py-0.5 font-mono text-[11px] whitespace-nowrap text-emerald-300"
          />
        </div>

        <div
          ref={groupRef}
          className="absolute top-0 left-0"
          style={{ opacity: 0, willChange: 'transform, opacity' }}
        >
          {/* Typewriter caret sits exactly at the leading edge of typed text. */}
          <span
            ref={caretRef}
            className="absolute top-0 left-[-1px] hidden w-[2px] animate-pulse rounded-full bg-emerald-300"
            style={{ boxShadow: '0 0 10px #10B981' }}
          />

          {/* High-precision Figma-style arrow; the tip is the (0,0) anchor. */}
          <div
            ref={arrowRef}
            className="origin-top-left transition-transform duration-75"
            style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.7))' }}
          >
            <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
              <path
                d="M1.5 1.2 L1.5 19.4 L6.2 15.1 L9.4 22.6 L12.6 21.2 L9.5 13.9 L15.8 13.7 Z"
                fill="#10B981"
                stroke="#022c22"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div
            ref={badgeRef}
            className="absolute top-5 left-4 rounded-md border border-emerald-400/50 bg-[#05100c]/95 px-2 py-1 font-mono text-[11px] leading-none whitespace-nowrap text-emerald-300 shadow-xl"
          >
            {TOOL_LABEL.idle}
          </div>
        </div>
      </div>

      {/* Skip + mute controls (pointer-events-auto). */}
      {isBuilding && (
        <div
          className="pointer-events-auto fixed right-4 z-[9999] flex items-center gap-2"
          style={{ top: 'calc(var(--topbar-h, 64px) + var(--strip-h, 0px) + 12px)' }}
        >
          <button
            type="button"
            onClick={toggleMute}
            aria-pressed={isMuted}
            className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-black/80 px-3 py-1.5 font-mono text-[11px] tracking-wider text-white/80 uppercase backdrop-blur-md transition-colors hover:border-emerald-400 hover:text-emerald-300"
          >
            {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
            <span>[ Audio: {isMuted ? 'OFF' : 'ON'} ]</span>
          </button>
          <button
            type="button"
            onClick={skipAll}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-black/80 px-3 py-1.5 font-mono text-[11px] tracking-wider text-white/80 uppercase backdrop-blur-md transition-colors hover:border-emerald-400 hover:text-emerald-300"
          >
            <FastForward size={12} className="text-emerald-400" />
            <span>[ Skip Build (ESC) ]</span>
          </button>
        </div>
      )}

      {/* Docking Gesture: permanent miniature badge once everything is assembled. */}
      {isFinished && (
        <div
          className="pointer-events-none fixed right-4 z-[9999] flex items-center gap-2 rounded-full border border-emerald-400/40 bg-black/85 px-3 py-1.5 font-mono text-[11px] tracking-wider text-emerald-300 uppercase backdrop-blur-md"
          style={{ bottom: '4.5rem' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>[ Louisse // Builder: IDLE • ALL SYSTEMS OPERATIONAL ]</span>
        </div>
      )}
    </>
  );
};
