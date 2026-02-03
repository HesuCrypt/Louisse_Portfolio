export const transitions = {
  spring: {
    type: "spring",
    stiffness: 80,
    damping: 25
  },
  ease: {
    duration: 1.2,
    ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for a "luxurious" settle
  }
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 // Increased distance for a more dramatic rise
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
    transition: { duration: 0.8, ease: "easeOut" }
  }
};