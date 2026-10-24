import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  /** Seconds. */
  duration?: number;
  decimals?: number;
  className?: string;
}

/**
 * Counts a figure up once its container reaches the viewport. Numbers that
 * animate read as measured rather than decorative, which is the whole point of
 * the performance log.
 */
export const CountUp: React.FC<CountUpProps> = ({
  to,
  prefix = '',
  suffix = '',
  duration = 1.15,
  decimals = 0,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      return;
    }

    let frame = 0;
    const startedAt = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startedAt) / (duration * 1000), 1);
      // Exponential ease-out: quick off the mark, settles gently on the figure.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(to * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {prefix}
      {value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
};
