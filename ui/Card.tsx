import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <motion.div 
      className={`group relative p-6 md:p-8 border border-neutral-900 bg-surface/30 hover:bg-neutral-900 hover:border-neutral-600 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05)] transition-all duration-500 rounded-sm ${className}`}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      {children}
    </motion.div>
  );
};