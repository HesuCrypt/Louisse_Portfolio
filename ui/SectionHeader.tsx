import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionHeaderProps {
  /** Zero-padded ordinal, e.g. "02". */
  index: string;
  /** Short uppercase label shown beside the ordinal. */
  label: string;
  title: string;
  /** Right-aligned supporting line on desktop. */
  meta?: string;
  description?: string;
  className?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The one header pattern used by every section. Centralising it is what fixes
 * the previous layout's worst habit: each section inventing its own eyebrow,
 * heading size and alignment.
 *
 * Entrances are declared per element rather than inherited from a parent
 * variant context, so the header animates correctly wherever it is mounted —
 * including the services page, which has no staggered wrapper of its own.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  label,
  title,
  meta,
  description,
  className = '',
}) => {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : ({ opacity: 0, y: 14 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-8%' },
    transition: { duration: 0.6, delay, ease },
  });

  return (
    <header className={className}>
      {/* Rule draws itself in — the single strongest "engineering drawing" cue */}
      <motion.span
        aria-hidden="true"
        className="block h-px origin-left bg-line"
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.9, ease }}
      />

      <div className="pt-6 md:pt-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="min-w-0">
            <motion.p
              {...rise(0.06)}
              className="font-mono text-2xs tracking-label text-fg-dim uppercase"
            >
              <span className="tnum text-fg-muted">{index}</span>
              <span className="px-2 text-line-strong">/</span>
              <span>{label}</span>
            </motion.p>
            <motion.h2
              {...rise(0.12)}
              className="mt-3 font-sans text-[clamp(1.7rem,3.8vw,2.9rem)] leading-[1.06] font-medium tracking-[-0.035em] text-fg [text-wrap:balance]"
            >
              {title}
            </motion.h2>
          </div>
          {meta ? (
            <motion.p
              {...rise(0.18)}
              className="shrink-0 font-mono text-2xs tracking-wider2 text-fg-dim uppercase md:pb-2 md:text-right"
            >
              {meta}
            </motion.p>
          ) : null}
        </div>
        {description ? (
          <motion.p
            {...rise(0.24)}
            className="mt-4 max-w-[62ch] text-[0.9375rem] leading-[1.7] text-fg-muted"
          >
            {description}
          </motion.p>
        ) : null}
      </div>
    </header>
  );
};
