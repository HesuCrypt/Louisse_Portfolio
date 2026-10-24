import React from 'react';

interface DataRowProps {
  /** Leading ordinal, e.g. "01". */
  index?: string;
  label: string;
  /** Right-hand readout. Rendered white and tabular. */
  value?: React.ReactNode;
  /** Optional trailing caption below the value. */
  caption?: string;
  className?: string;
}

/**
 * Dotted-leader specification row. Replaces decorative panels with structured
 * information — the same pattern works for metrics, rates and tech stacks.
 */
export const DataRow: React.FC<DataRowProps> = ({ index, label, value, caption, className = '' }) => (
  <div
    className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line py-3 last:border-b-0 md:flex-nowrap md:gap-5 ${className}`}
  >
    {index ? <span className="tnum font-mono text-2xs text-fg-faint">{index}</span> : null}
    <span className="min-w-0 font-mono text-[11px] tracking-wider2 text-fg-dim uppercase">{label}</span>
    <span className="row-leader hidden md:block" aria-hidden="true" />
    <span className="ml-auto text-right md:ml-0">
      <span className="tnum block font-mono text-[11px] font-medium text-fg md:text-xs">{value}</span>
      {caption ? (
        <span className="mt-0.5 block font-mono text-2xs text-fg-faint">{caption}</span>
      ) : null}
    </span>
  </div>
);
