'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FastForward, Volume2, VolumeX } from 'lucide-react';
import { useBuilder } from './DOMSequenceRegistry';
import type { FrameBox, ToolKind } from './builderTypes';

interface SingleCursorProps {
  cursor: {
    x: number;
    y: number;
    tool: string;
    isMouseDown: boolean;
  };
  isBuilding: boolean;
}

// Snappy spring physics for sub-frame latency tracking
const springConfig = { damping: 30, stiffness: 480, mass: 0.5 };

export function BuilderCursorLayer({ cursor, isBuilding }: SingleCursorProps) {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  useEffect(() => {
    rawX.set(cursor.x);
    rawY.set(cursor.y);
  }, [cursor.x, cursor.y, rawX, rawY]);

  // Clean unmount once assembly completes - NO IDLE PILL
  if (!isBuilding) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          willChange: 'transform',
        }}
        className="absolute top-0 left-0 -translate-x-1 -translate-y-1"
      >
        {/* MOBILE (< 768px): Glowing AI Spark Tracer */}
        <div className="block md:hidden">
          <div
            className={`w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_14px_#34d399] transition-transform duration-100 ${
              cursor.isMouseDown ? 'scale-75' : 'scale-100 animate-pulse'
            }`}
          />
        </div>

        {/* DESKTOP (>= 768px): Precision Arrow + Tool Badge */}
        <div className="hidden md:flex flex-col items-start select-none">
          <svg
            className={`w-5 h-5 text-emerald-400 drop-shadow-[0_2px_8px_rgba(16,185,129,0.5)] transition-transform duration-100 ${
              cursor.isMouseDown ? 'scale-85 -translate-y-0.5' : 'scale-100'
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3 3l7.5 18 3.5-7.5 7.5-3.5L3 3z" />
          </svg>

          {cursor.tool && (
            <span className="mt-1 px-2 py-0.5 rounded bg-emerald-500 text-black text-[10px] font-mono font-bold uppercase tracking-wider shadow-xl">
              {cursor.tool}
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}

const formatTool = (t: ToolKind | string): string => {
  if (!t || t === 'idle') return '';
  if (t === 'frame') return '[ ⬚ Frame Tool ]';
  if (t === 'type') return '[ I Type Tool ]';
  if (t === 'stamp') return '[ ✦ Stamp Tool ]';
  if (t === 'counter') return '[ ⟳ Counter Tool ]';
  if (t === 'path') return '[ ⤹ Path Tool ]';
  return t;
};

export const BuilderCursor: React.FC = () => {
  const { mode, cursor, isBuilding, isMuted, toggleMute, skipAll } = useBuilder();

  const [cursorState, setCursorState] = useState({
    x: cursor?.x ?? -100,
    y: cursor?.y ?? -100,
    tool: '',
    isMouseDown: false,
  });

  const [frameBox, setFrameBox] = useState<FrameBox | null>(null);

  useEffect(() => {
    if (!isBuilding || mode !== 'cursor') return;

    let rafId: number;

    const sync = () => {
      const sx = typeof window !== 'undefined' ? window.scrollX : 0;
      const sy = typeof window !== 'undefined' ? window.scrollY : 0;

      // Convert doc coordinates to viewport coordinates for fixed overlay
      const vx = cursor.x - sx;
      const vy = cursor.y - sy;

      setCursorState({
        x: vx,
        y: vy,
        tool: formatTool(cursor.tool),
        isMouseDown: cursor.down,
      });

      setFrameBox(cursor.frame);

      rafId = requestAnimationFrame(sync);
    };

    rafId = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(rafId);
  }, [cursor, isBuilding, mode]);

  // Clean unmount once assembly completes - NO IDLE PILL
  if (mode !== 'cursor' || !isBuilding) return null;

  const sx = typeof window !== 'undefined' ? window.scrollX : 0;
  const sy = typeof window !== 'undefined' ? window.scrollY : 0;

  return (
    <>
      {/* Visual Frame Marquee Layer */}
      {frameBox && (
        <div
          className="fixed pointer-events-none z-[9998]"
          style={{
            transform: `translate3d(${(frameBox.x - sx).toFixed(2)}px, ${(frameBox.y - sy).toFixed(2)}px, 0)`,
            width: `${Math.max(0, frameBox.w).toFixed(2)}px`,
            height: `${Math.max(0, frameBox.h).toFixed(2)}px`,
            border: `1.5px ${frameBox.phase === 'flash' ? 'solid' : 'dashed'} #10B981`,
            background: frameBox.phase === 'flash' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255,255,255,0.02)',
            boxShadow: frameBox.phase === 'flash' ? '0 0 28px rgba(16, 185, 129, 0.55)' : 'none',
          }}
        >
          <span className="hidden md:block absolute -top-6 left-0 rounded bg-black/90 px-1.5 py-0.5 font-mono text-[11px] whitespace-nowrap text-emerald-300">
            {Math.round(frameBox.w)} × {Math.round(frameBox.h)}
          </span>
        </div>
      )}

      {/* Single Cursor GPU Layer */}
      <BuilderCursorLayer cursor={cursorState} isBuilding={isBuilding} />

      {/* Floating Skip & Audio Controls */}
      <div
        className="pointer-events-auto fixed right-3 z-[9999] flex items-center gap-2 sm:right-4"
        style={{ top: 'calc(var(--topbar-h, 64px) + var(--strip-h, 0px) + 10px)' }}
      >
        <button
          type="button"
          onClick={toggleMute}
          aria-pressed={isMuted}
          className="hidden md:flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-black/80 px-3 py-1.5 font-mono text-[11px] tracking-wider text-white/80 uppercase backdrop-blur-md transition-colors hover:border-emerald-400 hover:text-emerald-300"
        >
          {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          <span>[ Audio: {isMuted ? 'OFF' : 'ON'} ]</span>
        </button>
        <button
          type="button"
          onClick={skipAll}
          className="flex cursor-pointer items-center gap-1.5 md:gap-2 rounded-full border border-white/15 bg-black/80 px-3 py-1 md:py-1.5 font-mono text-xs md:text-[11px] tracking-wider text-white/80 uppercase backdrop-blur-md transition-colors hover:border-emerald-400 hover:text-emerald-300"
          aria-label="Skip build"
        >
          <FastForward size={12} className="text-emerald-400" />
          <span className="md:hidden">Skip</span>
          <span className="hidden md:inline">[ Skip Build (ESC) ]</span>
        </button>
      </div>
    </>
  );
};

export default BuilderCursor;
