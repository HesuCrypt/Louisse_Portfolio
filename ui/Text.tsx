import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

/** Page-level display heading. Tight tracking, balanced wrap. */
export const H1: React.FC<TextProps> = ({ children, className = '' }) => (
  <h1
    className={`font-sans text-[clamp(2.05rem,6.4vw,4rem)] leading-[1.05] font-medium tracking-[-0.035em] text-fg [text-wrap:balance] ${className}`}
  >
    {children}
  </h1>
);

/** Section heading. */
export const H2: React.FC<TextProps> = ({ children, className = '' }) => (
  <h2
    className={`font-sans text-[clamp(1.7rem,3.8vw,2.9rem)] leading-[1.06] font-medium tracking-[-0.035em] text-fg [text-wrap:balance] ${className}`}
  >
    {children}
  </h2>
);

/** Card / entry heading. */
export const H3: React.FC<TextProps> = ({ children, className = '' }) => (
  <h3
    className={`font-sans text-base leading-[1.3] font-medium tracking-[-0.015em] text-fg md:text-lg ${className}`}
  >
    {children}
  </h3>
);

/** Running body copy. */
export const Body: React.FC<TextProps> = ({ children, className = '' }) => (
  <p className={`max-w-[68ch] text-[0.9375rem] leading-[1.75] text-fg-muted md:text-base ${className}`}>
    {children}
  </p>
);

/** Micro uppercase label — the workhorse for meta text. */
export const Label: React.FC<TextProps> = ({ children, className = '' }) => (
  <span className={`font-mono text-2xs tracking-label text-fg-dim uppercase ${className}`}>{children}</span>
);

/** Generic monospace value: tech stacks, periods, codes. */
export const Mono: React.FC<TextProps> = ({ children, className = '' }) => (
  <span className={`font-mono text-xs text-fg-dim ${className}`}>{children}</span>
);

/** Numeric readout — always tabular so figures align in columns. */
export const Stat: React.FC<TextProps> = ({ children, className = '' }) => (
  <span className={`tnum font-mono font-medium text-fg ${className}`}>{children}</span>
);
