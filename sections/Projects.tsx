import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { H3 } from '../ui/Text';
import { featured } from '../data/featured';
import { sectionMeta } from '../data/sections';
import { containerVariants, itemVariants } from '../motion/variants';
import { openAIChat } from '../ui/AIChatWidget';
import { sound } from '../utils/sound';
import { ArrowUpRight, Bot, ChevronDown, Quote, Star } from 'lucide-react';

const endorsements = [
  {
    lead: 'Delivered fast and with great quality, especially with our tight timeline before Mother’s Day.',
    body: 'The design matched our brand perfectly, and every request was handled seamlessly within budget.',
    author: 'Maricel',
    title: 'Owner',
    company: 'La Fleur',
    location: 'Philippines',
    link: 'https://lafleur.ph',
    metric: '99.4% Checkout Uptime',
  },
  {
    lead: 'I really like how fast they work and how responsive the communication is.',
    body: 'Clear scheduling, an honest roadmap, and transparent weekly updates made remote collaboration effortless.',
    author: 'Jonathan',
    title: 'Owner',
    company: 'Meridian Auctions',
    location: 'Germany',
    link: 'https://meridianauctions.com',
    metric: '0ms Sync Drift / Hardened',
  },
] as const;

const clientQuotes: Record<string, (typeof endorsements)[number]> = {
  'La Fleur': endorsements[0],
  'Meridian Auctions': endorsements[1],
};

const projectVisualMeta: Record<
  string,
  {
    tags: string[];
    metricNumber: string;
    metricLabel: string;
    bars: number[];
  }
> = {
  'ISSY Cosmetics': {
    tags: ['Shopify Liquid', 'n8n AI', 'Claude API', 'Conversion'],
    metricNumber: '+170%',
    metricLabel: 'Online Sales Lift',
    bars: [28, 42, 55, 68, 84, 100],
  },
  'Fruit Jam': {
    tags: ['React', 'Real-Time', 'High-Concurrency', 'Web Audio'],
    metricNumber: '3,400',
    metricLabel: 'Peak Players / 72h',
    bars: [45, 78, 95, 100, 88, 92],
  },
  'La Fleur': {
    tags: ['E-Commerce', 'Brand UI', 'Mobile Checkout', 'SEO'],
    metricNumber: '99.4%',
    metricLabel: 'Checkout Uptime',
    bars: [60, 72, 80, 88, 95, 100],
  },
  'Meridian Auctions': {
    tags: ['Full-Stack', 'Live Bidding', 'Security Audit', 'Germany'],
    metricNumber: '0ms',
    metricLabel: 'Sync Drift / Hardened',
    bars: [70, 75, 85, 90, 96, 100],
  },
};

export const Projects: React.FC = () => {
  const { index: sectionIndex, label } = sectionMeta('projects');
  const [viewMode, setViewMode] = useState<'all' | 'platforms' | 'endorsements'>('all');
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  // Sync hash links for deep links like #testimonials
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#testimonials') {
        setViewMode('endorsements');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const toggleExpand = (company: string) => {
    sound.playClick();
    setExpandedCompany((prev) => (prev === company ? null : company));
  };

  return (
    <section id="projects" className="relative scroll-mt-[var(--topbar-h)] py-16 md:py-24">
      {/* Historical deep link anchors */}
      <span id="featured" className="pointer-events-none absolute -top-24" aria-hidden="true" />
      <span id="testimonials" className="pointer-events-none absolute -top-24" aria-hidden="true" />

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          {/* Header & View Mode Switcher */}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              index={sectionIndex}
              label={label}
              title="Commercial platforms & client results"
              meta="4 Platforms · 2 Verified Reviews"
              description="Production systems engineered for measurable revenue, peak concurrency, and verified client satisfaction."
            />

            {/* View Mode Segmented Filter */}
            <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-line-mid bg-panel/80 p-1 font-mono text-2xs uppercase">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setViewMode('all');
                }}
                className={`cursor-pointer rounded-full px-3 py-1.5 transition-all ${
                  viewMode === 'all'
                    ? 'bg-paper font-semibold text-ink shadow-sm'
                    : 'text-fg-dim hover:text-fg'
                }`}
              >
                01 · All Proof
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setViewMode('platforms');
                }}
                className={`cursor-pointer rounded-full px-3 py-1.5 transition-all ${
                  viewMode === 'platforms'
                    ? 'bg-paper font-semibold text-ink shadow-sm'
                    : 'text-fg-dim hover:text-fg'
                }`}
              >
                02 · Platforms ({featured.length})
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setViewMode('endorsements');
                }}
                className={`cursor-pointer rounded-full px-3 py-1.5 transition-all ${
                  viewMode === 'endorsements'
                    ? 'bg-paper font-semibold text-ink shadow-sm'
                    : 'text-fg-dim hover:text-fg'
                }`}
              >
                03 · Endorsements ({endorsements.length})
              </button>
            </div>
          </div>

          {/* 1. Commercial Platforms Grid */}
          {(viewMode === 'all' || viewMode === 'platforms') && (
            <div className="mt-10">
              {viewMode === 'all' && (
                <div className="mb-4 flex items-center justify-between border-b border-line pb-2.5 font-mono text-2xs tracking-wider2 text-fg-faint uppercase">
                  <span>Part 01 / Production Platforms</span>
                  <span>Click to inspect stack &amp; telemetry</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {featured.map((item, index) => {
                  const isExpanded = expandedCompany === item.company;
                  const meta = projectVisualMeta[item.company] || {
                    tags: ['Web Platform', 'Production'],
                    metricNumber: item.stat,
                    metricLabel: 'Verified Outcome',
                    bars: [50, 65, 80, 90, 95, 100],
                  };
                  const quote = clientQuotes[item.company];

                  return (
                    <motion.article
                      key={item.company}
                      variants={itemVariants}
                      className={`group flex flex-col justify-between rounded-2xl border p-7 transition-all duration-300 md:p-8 ${
                        isExpanded
                          ? 'border-white/30 bg-[#12141a]'
                          : 'border-white/10 bg-[#0c0d11] hover:-translate-y-1 hover:border-white/20'
                      }`}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        aria-expanded={isExpanded}
                        onClick={() => toggleExpand(item.company)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleExpand(item.company);
                          }
                        }}
                        className="cursor-pointer select-none"
                      >
                        {/* Top Row: Index + Role + Status */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2.5">
                            <span className="tnum font-mono text-2xs text-fg-faint">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-line-strong" />
                            <span className="font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                              {item.role}
                            </span>
                          </div>

                          <span className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider2 text-emerald-400 uppercase">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            {item.status}
                          </span>
                        </div>

                        {/* Middle Row: Company Title + Big Outcome Metric & Telemetry Bars */}
                        <div className="mt-5 flex items-end justify-between gap-4 border-y border-line py-5">
                          <div>
                            <H3 className="text-xl md:text-2xl">{item.company}</H3>
                            <p className="mt-1 font-mono text-xs text-fg-dim">
                              {meta.metricLabel}:{' '}
                              <span className="tnum font-semibold text-fg">{meta.metricNumber}</span>
                            </p>
                          </div>

                          {/* Signal Bars (Emerald peak indicator) */}
                          <div className="flex h-9 items-end gap-1.5" aria-hidden="true">
                            {meta.bars.map((heightPct, barIdx) => (
                              <div
                                key={barIdx}
                                style={{ height: `${heightPct}%` }}
                                className={`w-1.5 transition-colors duration-200 group-hover:bg-paper ${
                                  barIdx === meta.bars.length - 1
                                    ? 'bg-emerald-400'
                                    : 'bg-line-strong'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Compact Footer Row */}
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-1.5">
                            {meta.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="border border-line px-2 py-0.5 font-mono text-xs text-fg-dim"
                              >
                                {tag}
                              </span>
                            ))}
                            {quote && (
                              <span className="inline-flex items-center gap-1 border border-emerald-500/40 bg-emerald-950/20 px-2 py-0.5 font-mono text-xs text-emerald-400">
                                <Quote size={10} />
                                <span>Endorsed</span>
                              </span>
                            )}
                          </div>

                          <span className="inline-flex shrink-0 items-center gap-1 font-mono text-xs tracking-wider2 text-fg-muted uppercase group-hover:text-fg">
                            <span>{isExpanded ? 'Close' : 'Details'}</span>
                            <ChevronDown
                              size={12}
                              className={`transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-emerald-400' : ''
                              }`}
                            />
                          </span>
                        </div>
                      </div>

                      {/* Click-to-Reveal Details Drawer */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-5 border-t border-line pt-4">
                              <p className="text-[0.875rem] leading-relaxed text-fg-muted">
                                {item.description}
                              </p>

                              {/* Embedded Client Endorsement Callout */}
                              {quote && (
                                <div className="mt-4 rounded-lg border border-line-mid bg-panel p-4">
                                  <div className="flex items-center justify-between gap-2 border-b border-line pb-2 font-mono text-2xs text-emerald-400 uppercase">
                                    <span className="flex items-center gap-1.5">
                                      <Quote size={12} />
                                      <span>Verified Client Endorsement</span>
                                    </span>
                                    <span>{quote.author}, {quote.title}</span>
                                  </div>
                                  <p className="mt-2 text-[0.85rem] font-medium italic text-fg">
                                    &ldquo;{quote.lead}&rdquo;
                                  </p>
                                  <p className="mt-1 text-2xs leading-relaxed text-fg-dim">
                                    {quote.body}
                                  </p>
                                </div>
                              )}

                              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    sound.playClick();
                                    openAIChat(
                                      `Can you tell me how Louisse engineered the ${item.company} project and achieved "${item.stat}"?`
                                    );
                                  }}
                                  className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-2xs tracking-wider2 text-fg-dim uppercase transition-colors hover:text-fg"
                                >
                                  <Bot size={13} />
                                  <span>Ask AI Case Study</span>
                                </button>

                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => sound.playClick()}
                                  className="inline-flex items-center gap-1.5 bg-paper px-3.5 py-1.5 font-mono text-2xs font-semibold tracking-wider2 text-ink uppercase transition-colors hover:bg-fg/90"
                                >
                                  <span>Visit Platform</span>
                                  <ArrowUpRight size={12} />
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Client Endorsements Subsection */}
          {(viewMode === 'all' || viewMode === 'endorsements') && (
            <div className={`${viewMode === 'all' ? 'mt-14' : 'mt-10'}`}>
              {viewMode === 'all' && (
                <div className="mb-4 flex items-center justify-between border-b border-line pb-2.5 font-mono text-2xs tracking-wider2 text-fg-faint uppercase">
                  <span>Part 02 / Client Endorsements</span>
                  <span>Direct client testimonials &amp; verified reviews</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {endorsements.map((item, index) => (
                  <motion.figure
                    key={`${item.author}-${item.company}`}
                    variants={itemVariants}
                    className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-[#0c0d11] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 md:p-8"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="tnum font-mono text-2xs text-fg-faint">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-line-strong" />
                          <span className="font-mono text-2xs text-emerald-400 uppercase tracking-wider2">
                            {item.metric}
                          </span>
                        </div>
                        <Quote size={16} className="text-fg-faint" />
                      </div>

                      <blockquote className="mt-5">
                        <p className="font-sans text-lg leading-[1.38] font-medium tracking-[-0.02em] text-fg md:text-xl">
                          &ldquo;{item.lead}&rdquo;
                        </p>
                        <p className="mt-3 text-[0.875rem] leading-relaxed text-fg-muted">
                          {item.body}
                        </p>
                      </blockquote>
                    </div>

                    <figcaption className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
                      <div>
                        <span className="block font-sans text-sm font-semibold text-fg">
                          {item.author}
                        </span>
                        <span className="mt-0.5 block font-mono text-2xs text-fg-dim">
                          {item.title}, {item.company} &middot; {item.location}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.playClick()}
                          className="inline-flex items-center gap-1 font-mono text-2xs text-fg-dim uppercase transition-colors hover:text-fg"
                        >
                          <span>Visit</span>
                          <ArrowUpRight size={11} />
                        </a>

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-line-mid bg-ink px-2.5 py-0.5 font-mono text-xs tracking-wider2 text-emerald-400 uppercase">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Verified
                        </span>
                      </div>
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
};