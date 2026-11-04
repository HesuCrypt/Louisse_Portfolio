import React, { useEffect, useState } from 'react';

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Manila',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export const SystemStatusCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [time, setTime] = useState(() => timeFormatter.format(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setTime(timeFormatter.format(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-[#0c0d11]/95 p-5 shadow-2xl backdrop-blur-md font-mono text-xs transition-all duration-300 hover:border-white/20 ${className}`}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="tracking-wider text-fg-muted uppercase">SYSTEM_STATUS</span>
        </div>
        <span className="text-fg-dim">&gt;_</span>
      </div>

      {/* Manila Live Time Clock */}
      <div className="border-b border-white/5 py-4">
        <div className="flex items-baseline gap-2">
          <span className="tnum font-mono text-3xl font-bold tracking-tight text-white">
            {time}
          </span>
          <span className="text-fg-dim">PHT &middot; UTC+8</span>
        </div>
        <p className="mt-1 text-xs text-fg-dim">Same time zone / Remote</p>
      </div>

      {/* Telemetry Key-Value Status Rows */}
      <div className="space-y-2 border-b border-white/5 py-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-fg-dim">&gt; status</span>
          <span className="font-medium text-emerald-400">available</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-fg-dim">&gt; reply</span>
          <span className="text-fg">&lt; 24h</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-fg-dim">&gt; build</span>
          <span className="text-fg">react &middot; shopify</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-fg-dim">&gt; agents</span>
          <span className="text-fg">n8n &middot; antigravity</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-fg-dim">&gt; chatbot</span>
          <span className="text-fg">gemini &middot; online</span>
        </div>
      </div>

      {/* Card Micro Footer */}
      <div className="pt-3">
        <p className="text-xs leading-relaxed text-fg-dim">
          Designed, built and shipped by one person.
        </p>
      </div>
    </div>
  );
};

