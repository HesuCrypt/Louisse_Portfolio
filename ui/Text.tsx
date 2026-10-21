import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export const H1: React.FC<TextProps> = ({ children, className = "" }) => (
  <h1 className={`text-4xl md:text-6xl lg:text-7xl font-normal md:font-light tracking-tight leading-[1.12] text-white ${className}`}>
    {children}
  </h1>
);

export const H2: React.FC<TextProps> = ({ children, className = "" }) => (
  <h2 className={`text-2xl md:text-3xl font-medium md:font-normal tracking-tight text-white mb-8 ${className}`}>
    {children}
  </h2>
);

export const H3: React.FC<TextProps> = ({ children, className = "" }) => (
  <h3 className={`text-lg md:text-xl font-medium text-white mb-1.5 ${className}`}>
    {children}
  </h3>
);

export const Body: React.FC<TextProps> = ({ children, className = "" }) => (
  <p className={`text-neutral-300 md:text-neutral-300/90 leading-relaxed font-normal text-base md:text-lg max-w-prose ${className}`}>
    {children}
  </p>
);

export const Label: React.FC<TextProps> = ({ children, className = "" }) => (
  <span className={`text-xs uppercase tracking-widest text-neutral-400 font-medium ${className}`}>
    {children}
  </span>
);