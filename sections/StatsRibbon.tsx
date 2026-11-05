import React from 'react';
import { Container } from '../ui/Container';
import { BuildItem } from '../components/builder/BuildItem';

interface Stat {
  id: string;
  label: string;
  caption: string;
  format: (progress: number) => string;
}

/** Slots roll from zero to figures taken from the delivery records. */
const stats: Stat[] = [
  {
    id: 'stats-conversion',
    label: 'Conversion Surge',
    caption: 'Online sales lift · ISSY Cosmetics',
    format: (p) => `+${Math.round(p * 170)}%`,
  },
  {
    id: 'stats-players',
    label: 'Peak Concurrency',
    caption: 'Players at once · Fruit Jam launch',
    format: (p) => `${(p * 3.4).toFixed(1)}K+`,
  },
  {
    id: 'stats-traffic',
    label: 'Campaign Traffic',
    caption: 'Requests in 72h · zero downtime',
    format: (p) => `${Math.round(p * 120)}K+`,
  },
];

export const StatsRibbon: React.FC = () => {
  return (
    <section aria-label="Impact metrics" className="relative pb-6 md:pb-10">
      <Container>
        <BuildItem
          id="stats-ribbon"
          section="stats"
          order={1}
          type="frame"
          className="rounded-2xl border border-white/10 bg-[#0c0d11]"
        >
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((stat, index) => (
              <BuildItem
                key={stat.id}
                id={stat.id}
                section="stats"
                order={2 + index}
                type="counter"
                ticks={24}
                className="px-7 py-7 md:px-8 md:py-8"
              >
                {({ progress }) => (
                  <>
                    <p className="font-mono text-xs tracking-wider2 text-emerald-400 uppercase">
                      {stat.label}
                    </p>
                    <p className="tnum mt-3 font-mono text-4xl font-bold tracking-[-0.03em] text-fg md:text-5xl">
                      {stat.format(progress)}
                    </p>
                    <p className="mt-2 font-mono text-xs text-fg-muted">{stat.caption}</p>
                  </>
                )}
              </BuildItem>
            ))}
          </div>
        </BuildItem>
      </Container>
    </section>
  );
};

