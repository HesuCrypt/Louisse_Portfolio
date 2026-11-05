import React, { useEffect, useState } from 'react';
import { sound } from '../utils/sound';

export const EraToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [era, setEra] = useState<'2026' | '1984'>('2026');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-era') as '2026' | '1984' | null;
    if (saved === '1984' || saved === '2026') {
      setEra(saved);
      document.documentElement.setAttribute('data-era', saved);
    }
  }, []);

  const toggleEra = () => {
    sound.playClick();
    const nextEra = era === '2026' ? '1984' : '2026';
    setEra(nextEra);
    localStorage.setItem('portfolio-era', nextEra);
    document.documentElement.setAttribute('data-era', nextEra);
  };

  return (
    <button
      type="button"
      onClick={toggleEra}
      aria-label={`Switch era mode. Currently ${era}`}
      title={`Toggle 1984 Macintosh / 2026 Modern Mode (Current: ${era})`}
      className={`group relative inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line-mid bg-panel/80 px-2.5 py-1 font-mono text-2xs tracking-wider uppercase text-fg-muted transition-all duration-200 hover:border-white hover:text-white ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full transition-colors ${
          era === '1984' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
        }`}
      />
      <span>ERA: {era}</span>
    </button>
  );
};

