import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HelloMarqueeProps {
  className?: string;
}

export const HelloMarquee: React.FC<HelloMarqueeProps> = ({ className = '' }) => {
  const phrases = [
    'SAY HELLO',
    'START A PROJECT',
    'LET’S WORK TOGETHER',
    'AI AUTOMATION',
    'WEB ENGINEERING',
    'GET IN TOUCH',
  ];

  const renderGroup = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex shrink-0 items-center gap-8 pr-8">
      {phrases.map((phrase, idx) => (
        <a
          key={`${keyPrefix}-${idx}`}
          href="#contact"
          className="group/item inline-flex shrink-0 items-center gap-4 text-2xl font-bold tracking-tight text-white/30 transition-colors duration-200 hover:text-white sm:text-3xl md:text-4xl lg:text-5xl"
        >
          <span className="font-sans uppercase">{phrase}</span>
          <span className="grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/5 text-emerald-400 transition-transform duration-200 group-hover/item:scale-110 group-hover/item:border-emerald-400">
            <ArrowUpRight size={14} />
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        </a>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className={`marquee relative flex w-full overflow-hidden border-b border-line/60 py-6 select-none ${className}`}
    >
      <div
        className="marquee-track flex shrink-0 items-center"
        style={{ animationDuration: '32s' }}
      >
        {renderGroup('group-1')}
        {renderGroup('group-2')}
      </div>
    </div>
  );
};

