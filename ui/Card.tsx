import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => {
  return (
    <motion.div 
      onClick={onClick}
      className={`group relative p-6 md:p-8 border border-neutral-800 bg-neutral-900/30 hover:bg-neutral-900/50 hover:border-neutral-600 hover:shadow-[0_16px_36px_-12px_rgba(255,255,255,0.06)] rounded-2xl transition-colors duration-300 ${className}`}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      {children}
    </motion.div>
  );
};