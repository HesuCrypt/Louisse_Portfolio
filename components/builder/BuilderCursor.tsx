'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FastForward, Volume2, VolumeX, X } from 'lucide-react';
import { useBuilder } from './DOMSequenceRegistry';
import type { CursorModel, ToolKind } from './builderTypes';

const TOOL_LABEL_ALPHA: Record<ToolKind, string> = {
  idle: 'Louisse // Dev',
  frame: '[ ⬚ Frame Tool ]',
  type: '[ I Type Tool ]',
  stamp: '[ ✦ Stamp Tool ]',
  counter: '[ ⟳ Counter Tool ]',
  path: '[ ⤹ Path Tool ]',
};

const TOOL_LABEL_BETA: Record<ToolKind, string> = {
  idle: 'Neural // Engine',
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
 * Renders a single cursor/spark unit (Alpha = Emerald, Beta = Cyan)
 */
interface CursorWorkerProps {
  cursor: CursorModel;
  labelMap: Record<ToolKind, string>;
  theme: 'emerald' | 'cyan';
  isMobile: boolean;
}

const CursorWorker: React.FC<CursorWorkerProps> = ({
  cursor,
  labelMap,
  theme,
  isMobile,
}) => {
  const groupRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const pingRingRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const frameSizeRef = useRef<HTMLSpanElement>(null);

  const primaryColor = theme === 'emerald' ? '#10B981' : '#06B6D4';
  const shadowColor = theme === 'emerald' ? '#10B981' : '#06B6D4';

  useEffect(() => {
    let frameId = 0;
    let opacity = 0;
    let lastTool: ToolKind | null = null;
    let wasDown = false;

    const paint = () => {
      const sx = window.scrollX;
      const sy = window.scrollY;

      const group = groupRef.current;
      if (group) {
        const target = cursor.visible ? 1 : 0;
        opacity += (target - opacity) * 0.22;
        group.style.opacity = opacity.toFixed(3);
        group.style.transform = `translate3d(${(cursor.x - sx).toFixed(2)}px, ${(cursor.y - sy).toFixed(2)}px, 0)`;
      }

      if (arrowRef.current) {
        arrowRef.current.style.transform = cursor.down ? 'scale(0.85)' : 'scale(1)';
      }

      if (sparkRef.current) {
        sparkRef.current.style.transform = cursor.down ? 'scale(1.35)' : 'scale(1)';
      }

      if (pingRingRef.current) {
        if (cursor.down && !wasDown) {
          pingRingRef.current.style.transition = 'none';
          pingRingRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
          pingRingRef.current.style.opacity = '0.85';
          requestAnimationFrame(() => {
            if (pingRingRef.current) {
              pingRingRef.current.style.transition = 'transform 180ms ease-out, opacity 180ms ease-out';
              pingRingRef.current.style.transform = 'translate(-50%, -50%) scale(2.4)';
              pingRingRef.current.style.opacity = '0';
            }
          });
        }
      }
      wasDown = cursor.down;

      if (caretRef.current) {
        caretRef.current.style.display = cursor.caret ? 'block' : 'none';
        caretRef.current.style.height = `${Math.max(14, cursor.caretH)}px`;
      }

      if (badgeRef.current && lastTool !== cursor.tool) {
        lastTool = cursor.tool;
        badgeRef.current.textContent = labelMap[cursor.tool];
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
          frame.style.boxShadow = flash
            ? `0 0 28px ${colors.glow}`
            : isMobile
              ? `0 0 12px ${colors.glow}`
              : 'none';

          if (frameSizeRef.current) {
            frameSizeRef.current.style.display = isMobile ? 'none' : 'block';
            frameSizeRef.current.textContent = `${Math.round(box.w)} × ${Math.round(box.h)}`;
          }
        }
      }

      frameId = requestAnimationFrame(paint);
    };

    frameId = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(frameId);
  }, [cursor, isMobile, labelMap]);

  return (
    <>
      <div
        ref={frameRef}
        className="absolute top-0 left-0 hidden"
        style={{ willChange: 'transform, width, height' }}
      >
        <span
          ref={frameSizeRef}
          className={`absolute -top-6 left-0 rounded bg-black/90 px-1.5 py-0.5 font-mono text-[11px] whitespace-nowrap ${
            theme === 'emerald' ? 'text-emerald-300' : 'text-cyan-300'
          }`}
        />
      </div>

      <div
        ref={groupRef}
        className="absolute top-0 left-0"
        style={{ opacity: 0, willChange: 'transform, opacity' }}
      >
        <span
          ref={caretRef}
          className={`absolute top-0 left-[-1px] hidden w-[2px] animate-pulse rounded-full ${
            theme === 'emerald' ? 'bg-emerald-300' : 'bg-cyan-300'
          }`}
          style={{ boxShadow: `0 0 10px ${primaryColor}` }}
        />

        {isMobile ? (
          <div className="relative -left-[5px] -top-[5px] h-[10px] w-[10px]">
            <span
              ref={pingRingRef}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[18px] w-[18px] rounded-full opacity-0"
              style={{ borderColor: primaryColor, borderWidth: 1 }}
            />
            <div
              ref={sparkRef}
              className="relative h-full w-full rounded-full transition-transform duration-75"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 0 15px ${shadowColor}`,
              }}
            >
              <span
                className="absolute inset-0 animate-ping rounded-full opacity-70"
                style={{ backgroundColor: primaryColor }}
              />
              <span className="absolute inset-[2px] rounded-full bg-white opacity-90" />
            </div>
          </div>
        ) : (
          <>
            <div
              ref={arrowRef}
              className="origin-top-left transition-transform duration-75"
              style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.7))' }}
            >
              <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
                <path
                  d="M1.5 1.2 L1.5 19.4 L6.2 15.1 L9.4 22.6 L12.6 21.2 L9.5 13.9 L15.8 13.7 Z"
                  fill={primaryColor}
                  stroke={theme === 'emerald' ? '#022c22' : '#083344'}
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div
              ref={badgeRef}
              className={`absolute top-5 left-4 rounded-md border bg-[#05100c]/95 px-2 py-1 font-mono text-[11px] leading-none whitespace-nowrap shadow-xl ${
                theme === 'emerald'
                  ? 'border-emerald-400/50 text-emerald-300'
                  : 'border-cyan-400/50 text-cyan-300'
              }`}
            >
              {labelMap.idle}
            </div>
          </>
        )}
      </div>
    </>
  );
};

/**
 * Dual-Cursor Autonomous Builder Engine Component:
 * - Worker Alpha: Cursor A / Spark A (Emerald - "Louisse // Dev")
 * - Worker Beta: Cursor B / Spark B (Cyan - "Neural // Engine")
 * - Fades smoothly to opacity-0 upon completion with zero permanent idle pill.
 */
export const BuilderCursor: React.FC = () => {
  const { mode, cursorAlpha, cursorBeta, isBuilding, isMuted, toggleMute, skipAll } =
    useBuilder();

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  if (mode !== 'cursor') return null;

  return (
    <>
      {/* Simultaneous Dual-Worker Simulation Layer */}
      <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
        <CursorWorker
          cursor={cursorAlpha}
          labelMap={TOOL_LABEL_ALPHA}
          theme="emerald"
          isMobile={isMobile}
        />
        <CursorWorker
          cursor={cursorBeta}
          labelMap={TOOL_LABEL_BETA}
          theme="cyan"
          isMobile={isMobile}
        />
      </div>

      {/* Floating Controls UI */}
      {isBuilding && (
        <div
          className="pointer-events-auto fixed right-3 z-[9999] flex items-center gap-2 sm:right-4"
          style={{ top: 'calc(var(--topbar-h, 64px) + var(--strip-h, 0px) + 10px)' }}
        >
          {isMobile ? (
            <button
              type="button"
              onClick={skipAll}
              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900/80 px-3 py-1 font-mono text-xs tracking-wider text-zinc-200 uppercase shadow-lg backdrop-blur"
              aria-label="Skip animation"
            >
              <span>Skip</span>
              <X size={12} className="text-emerald-400" />
            </button>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
    </>
  );
};
