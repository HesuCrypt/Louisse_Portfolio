export const transitions = {
  spring: {
    type: "spring",
    stiffness: 80,
    damping: 25
  },
  modalSpring: {
    type: "spring",
    stiffness: 320,
    damping: 26
  },
  ease: {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for a luxurious, responsive settle
  }
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04
    }
  }
};

export const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 18
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.ease
  }
};

export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

export const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -8,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};