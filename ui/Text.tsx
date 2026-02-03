import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export const H1: React.FC<TextProps> = ({ children, className = "" }) => (
  <h1 className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] text-white ${className}`}>
    {children}
  </h1>
);

export const H2: React.FC<TextProps> = ({ children, className = "" }) => (
  <h2 className={`text-2xl md:text-3xl font-light tracking-tight text-white mb-8 ${className}`}>
    {children}
  </h2>
);

export const H3: React.FC<TextProps> = ({ children, className = "" }) => (
  <h3 className={`text-lg md:text-xl font-medium text-white mb-1 ${className}`}>
    {children}
  </h3>
);

export const Body: React.FC<TextProps> = ({ children, className = "" }) => (
  <p className={`text-neutral-400 leading-relaxed font-light text-base md:text-lg max-w-prose ${className}`}>
    {children}
  </p>
);

export const Label: React.FC<TextProps> = ({ children, className = "" }) => (
  <span className={`text-xs uppercase tracking-widest text-neutral-500 font-medium ${className}`}>
    {children}
  </span>
);