import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { wordVariants } from '../motion/variants';

interface WordRevealProps {
  text: string;
  /** Seconds before the first word moves. */
  delay?: number;
  /** Gap between word entrances, in seconds. */
  stagger?: number;
}

/**
 * Lifts a headline in word by word. Deliberately avoids a clipping mask: words
 * fade and rise in place, so the line breaks stay identical to the static text
 * and nothing can be cropped at large type sizes.
 */
export const WordReveal: React.FC<WordRevealProps> = ({ text, delay = 0.06, stagger = 0.055 }) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{text}</>;
  }

  return (
    <motion.span
      className="inline"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {text.split(' ').map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          {index > 0 ? ' ' : null}
          <motion.span className="inline-block" variants={wordVariants}>
            {word}
          </motion.span>
        </React.Fragment>
      ))}
    </motion.span>
  );
};
