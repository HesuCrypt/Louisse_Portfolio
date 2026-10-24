import React from 'react';

interface MarqueeProps {
  items: string[];
  /** Seconds for one full loop. Longer lists want a higher value. */
  speed?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Infinite monochrome ticker. Decorative by design: every string it repeats is
 * also published as real content elsewhere on the page, so the whole strip is
 * hidden from assistive tech rather than read out twice.
 *
 * The track renders its list twice and travels exactly -50%, which puts the
 * loop seam permanently outside the viewport.
 */
export const Marquee: React.FC<MarqueeProps> = ({
  items,
  speed = 46,
  reverse = false,
  className = '',
}) => {
  const pass = (passId: string) => (
    <ul className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <li key={`${passId}-${item}-${index}`} className="flex shrink-0 items-center">
          <span className="px-6 font-mono text-[11px] tracking-wider2 whitespace-nowrap text-fg-dim uppercase">
            {item}
          </span>
          <span className="h-1 w-1 shrink-0 bg-fg-faint" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      aria-hidden="true"
      className={`marquee mask-fade-x relative flex overflow-hidden border-y border-line bg-ink ${className}`}
    >
      <div
        className="marquee-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {pass('head')}
        {pass('tail')}
      </div>
    </div>
  );
};
