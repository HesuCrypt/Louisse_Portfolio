import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Globe, Sparkles } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { sound } from '../utils/sound';

interface ScreenProject {
  id: string;
  title: string;
  tagline: string;
  category: string;
  metric: string;
  url: string;
  displayUrl: string;
  tech: string[];
  gradient: string;
  summary: string;
}

const screenProjects: ScreenProject[] = [
  {
    id: 'issy',
    title: 'ISSY Cosmetics',
    tagline: 'High-Conversion Headless & Liquid E-Commerce Storefront',
    category: 'E-Commerce / AI Automation',
    metric: '+170% Sales Lift',
    url: 'https://issycosmetics.com/',
    displayUrl: 'issycosmetics.com',
    tech: ['Shopify Liquid', 'React 19', 'Next.js', 'n8n Automation'],
    gradient: 'from-emerald-950/40 via-[#0d1217] to-[#07090d]',
    summary:
      'Engineered sub-second storefront load times, automated back-office inventory sync with n8n, and delivered a verified 170% increase in online sales during peak beauty campaigns.',
  },
  {
    id: 'fruitjam',
    title: 'Fruit Jam',
    tagline: 'Viral Interactive Campaign Web Game',
    category: 'Creative Tech / Game',
    metric: '3,400 Peak Users',
    url: 'https://issyfruitjam.com/',
    displayUrl: 'issyfruitjam.com',
    tech: ['HTML5 Canvas', 'Web Audio API', 'TypeScript', 'Cloudflare'],
    gradient: 'from-amber-950/30 via-[#141210] to-[#08080a]',
    summary:
      'Engineered an immersive viral web game scaling seamlessly to 3,400 concurrent players and 120,000+ real-time requests across 72 hours with zero downtime.',
  },
  {
    id: 'meridian',
    title: 'Meridian Auctions',
    tagline: 'Real-Time Bidding & Transaction Engine',
    category: 'Full-Stack Web App',
    metric: '3-Month Sprint',
    url: 'https://www.meridianauctions.com/',
    displayUrl: 'meridianauctions.com',
    tech: ['React', 'Node.js', 'WebSocket', 'PostgreSQL'],
    gradient: 'from-blue-950/30 via-[#0d1017] to-[#07080c]',
    summary:
      'Delivered full-stack German auction platform featuring real-time bidding synchronization, payment gateway integration, and high-concurrency catalog indexing.',
  },
  {
    id: 'lafleur',
    title: 'La Fleur',
    tagline: 'Custom Florist E-Commerce Experience',
    category: 'Storefront',
    metric: 'Zero Budget Overrun',
    url: 'https://lafleurph.com/',
    displayUrl: 'lafleurph.com',
    tech: ['Shopify', 'Tailwind CSS', 'Liquid', 'SEO'],
    gradient: 'from-purple-950/20 via-[#100e16] to-[#07070a]',
    summary:
      'Architected custom florist storefront ahead of the Mother’s Day rush, streamlining the mobile checkout funnel and boosting checkout completion rates.',
  },
];

export const WorkScreens: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('issy');
  const project = screenProjects.find((p) => p.id === activeTab) || screenProjects[0];

  return (
    <section id="workscreens" className="relative scroll-mt-[var(--topbar-h)] py-20 md:py-24">
      <Container>
        <SectionHeader
          index="03"
          title="Visual Systems"
          description="A visual look into shipped production storefronts, high-concurrency campaigns, and custom web applications."
        />

        {/* Tab Selector Strip */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {screenProjects.map((p) => {
            const isActive = p.id === activeTab;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveTab(p.id);
                }}
                className={`group inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs transition-all duration-200 ${
                  isActive
                    ? 'border-white bg-white text-black shadow-lg'
                    : 'border-white/10 bg-[#0c0d11] text-fg-muted hover:border-white/20 hover:text-white'
                }`}
              >
                <span>{p.title}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-2xs ${
                    isActive
                      ? 'bg-black/10 text-black font-semibold'
                      : 'bg-white/5 text-emerald-400'
                  }`}
                >
                  {p.metric}
                </span>
              </button>
            );
          })}
        </div>

        {/* Browser Mockup Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#0c0d11] shadow-2xl"
          >
            {/* Browser Window Chrome */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[#08090b] px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
              </div>

              {/* URL Address Bar */}
              <div className="flex min-w-[240px] items-center justify-center gap-2 rounded-full border border-white/10 bg-[#12141a] px-4 py-1.5 font-mono text-xs text-fg-muted">
                <Globe size={12} className="text-emerald-400" />
                <span>https://{project.displayUrl}</span>
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group/link inline-flex items-center gap-1.5 font-mono text-xs text-fg-muted hover:text-white"
              >
                <span>Visit Live</span>
                <ExternalLink size={12} className="transition-transform group-hover/link:translate-x-0.5" />
              </a>
            </div>

            {/* Showcase Visual Canvas */}
            <div className={`relative bg-gradient-to-br ${project.gradient} p-8 md:p-12 lg:p-16`}>
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3 py-1 font-mono text-xs text-emerald-400">
                  <Sparkles size={11} />
                  <span>{project.category}</span>
                </span>

                <h3 className="mt-4 font-sans text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                  {project.title}
                </h3>

                <p className="mt-2 font-mono text-xs text-emerald-400">
                  {project.tagline}
                </p>

                <p className="mt-6 text-sm leading-relaxed text-fg-muted md:text-base">
                  {project.summary}
                </p>

                {/* Tech Pills */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-fg-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-10">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-sans text-xs font-semibold text-black transition-all hover:bg-neutral-200"
                  >
                    <span>Launch Live Platform</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
};

