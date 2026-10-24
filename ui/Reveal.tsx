import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before this block animates in. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
}

/**
 * Scroll-triggered entrance for standalone blocks that sit outside a staggered
 * section group. Everything is expressed as opacity plus a short vertical
 * travel — the only motion vocabulary the monochrome system allows itself.
 */
export const Reveal: React.FC<RevealProps> = ({ children, className = '', delay = 0, y = 18 }) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};
