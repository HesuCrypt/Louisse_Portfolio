export const transitions = {
  spring: {
    type: 'spring',
    stiffness: 80,
    damping: 25,
  },
  modalSpring: {
    type: 'spring',
    stiffness: 320,
    damping: 26,
  },
  ease: {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1],
  },
} as const;

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.ease,
  },
};

export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Draws a hairline from left to right — used for section rules. */
export const ruleVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.18, ease: 'easeInOut' },
  },
};

/** Shared timing for the experience accordion's height and opacity. */
export const accordionTransition = {
  duration: 0.44,
  ease: [0.16, 1, 0.3, 1],
} as const;

/** Words rising into place, one after another. */
export const wordVariants = {
  hidden: { opacity: 0, y: '0.45em' },
  visible: {
    opacity: 1,
    y: '0em',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};
