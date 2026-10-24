import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Content column. The fixed index rail offset is applied once at the app root,
 * so this stays a plain centred measure.
 */
export const Container: React.FC<ContainerProps> = ({ children, className = '', id }) => (
  <div id={id} className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 ${className}`}>
    {children}
  </div>
);
