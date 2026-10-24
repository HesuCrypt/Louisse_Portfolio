import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'link';
  href?: string;
  download?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * Square, monospaced action. Interaction is expressed purely by inverting
 * black and white — no scale, shadow or glow, which keeps the grid crisp.
 */
const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-none font-mono text-[11px] uppercase tracking-wider2 transition-colors duration-200 whitespace-nowrap shrink-0';

const variantStyles = {
  primary: 'border border-paper bg-paper px-5 py-3 text-ink hover:bg-ink hover:text-paper',
  secondary:
    'border border-line-mid bg-transparent px-5 py-3 text-fg hover:border-paper hover:bg-paper hover:text-ink',
  link: 'border-0 px-0 py-0 text-fg-dim hover:text-fg underline-offset-4 hover:underline',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  href,
  download,
  children,
  className = '',
  icon,
  ...props
}) => {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {icon ? <span className="opacity-80">{icon}</span> : null}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <a
        href={href}
        download={download}
        className={classes}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
};
