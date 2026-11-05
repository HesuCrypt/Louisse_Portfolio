import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useBuilder } from './DOMSequenceRegistry';

/** Footer control that lets a returning visitor watch the assembly again. */
export const ReplayAssemblyButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { canReplay, replay } = useBuilder();
  if (!canReplay) return null;

  return (
    <button
      type="button"
      onClick={replay}
      className={`inline-flex cursor-pointer items-center gap-1.5 font-mono text-2xs tracking-wider2 text-fg-dim uppercase transition-colors hover:text-fg ${className}`}
    >
      <RotateCcw size={11} aria-hidden="true" />
      <span>Replay Assembly</span>
    </button>
  );
};

