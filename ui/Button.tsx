import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'link';
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  href, 
  children, 
  className = "",
  icon,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2 focus:ring-offset-black";
  
  const variants = {
    primary: "bg-white text-black hover:bg-neutral-200 border border-transparent",
    secondary: "bg-transparent text-white border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900",
    link: "px-0 py-0 text-neutral-400 hover:text-white underline-offset-4 hover:underline rounded-none"
  };

  const content = (
    <>
      {children}
      {icon && <span className="text-current opacity-70">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a 
        href={href}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        whileHover={{ scale: variant === 'link' ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {content}
    </motion.button>
  );
};