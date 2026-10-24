import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  /** Adds pointer affordance and a hairline lift on hover. */
  interactive?: boolean;
}

/**
 * A hairline panel. No default padding — callers own their spacing so the
 * grid rhythm stays measurable instead of guessed.
 */
export const Card: React.FC<CardProps> = ({ children, className = '', onClick, interactive = false }) => (
  <div
    onClick={onClick}
    className={`relative rounded-none border border-line-mid bg-panel transition-colors duration-200 ${
      interactive ? 'cursor-pointer hover:border-line-strong hover:bg-panel-2' : ''
    } ${className}`}
  >
    {children}
  </div>
);
