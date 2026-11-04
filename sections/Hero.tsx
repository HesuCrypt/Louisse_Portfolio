import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { CountUp } from '../ui/CountUp';
import { LocalTime } from '../ui/LocalTime';
import { CyberOrb } from '../ui/CyberOrb';
import { SystemStatusCard } from '../ui/SystemStatusCard';
import { profile } from '../data/profile';
import { containerVariants, itemVariants } from '../motion/variants';
import { scrollToSection } from '../utils/routing';
import { sound } from '../utils/sound';
import { ArrowUpRight, ArrowRight, Download } from 'lucide-react';

const heroStackPills = [
  'React / Next.js',
  'Tailwind CSS',
  'Shopify',
  'Supabase',
  'n8n & AI',
];

const quickMetrics = [
  {
    value: <CountUp to={170} prefix="+" suffix="%" />,
    label: 'Sales Lift',
    sub: 'ISSY Cosmetics',
  },
  {
    value: <CountUp to={3400} />,
    label: 'Peak Users',
    sub: 'Fruit Jam Launch',
  },
  {
    value: <CountUp to={120} suffix="K+" />,
    label: 'Requests / 72h',
    sub: 'Zero Downtime',
  },
];

export const Hero: React.FC = () => {
  return (
    <section id="top" className="relative overflow-hidden scroll-mt-[var(--topbar-h)]">
      {/* Subtle engineered measurement grid */}
      <div
        aria-hidden="true"
        className="bg-grid grid-drift mask-fade-b pointer-events-none absolute inset-0 opacity-40"
      />

      <Container className="relative">
        {/* Top Cyber HUD Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-line/80 py-3.5 font-mono text-2xs tracking-wider2 text-fg-dim uppercase"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 text-fg-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Available for projects</span>
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-line-strong sm:inline" />

            <span className="hidden text-fg-dim sm:inline">
              Web &amp; AI Implementation Specialist
            </span>
          </div>

          <div className="text-fg-dim">
            Philippines &middot; <LocalTime showZone={false} /> PHT
          </div>
        </motion.div>

        {/* Hero Main Content Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 items-center gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-8 lg:py-20 xl:py-24"
        >
          {/* Left Column (7 cols): Headline, Subtext, CTAs, Stack & Metrics */}
          <div className="lg:col-span-7 xl:col-span-7">
            <motion.h1
              variants={itemVariants}
              className="font-sans text-[clamp(2.5rem,5.2vw,4.4rem)] leading-[1.06] font-bold tracking-[-0.035em] text-fg"
            >
              Websites that convert.
              <br />
              <span className="text-fg">AI systems that scale</span>
              <span className="text-emerald-400">.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-[50ch] text-[1rem] leading-[1.68] text-fg-muted md:text-[1.08rem]"
            >
              {profile.hero.subtext}
            </motion.p>

            {/* Primary Action Row */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  scrollToSection('projects');
                }}
                className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-paper px-6 py-3 font-sans text-xs font-semibold tracking-[-0.01em] text-ink transition-all duration-200 hover:bg-fg/90 active:scale-[0.98]"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>View My Work</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  scrollToSection('contact');
                }}
                className="group inline-flex cursor-pointer items-center gap-2 px-3 py-2.5 font-sans text-xs font-medium text-fg transition-colors hover:text-fg-muted"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              <a
                href="/resume.pdf"
                download="Louisse_Dominique_Bertillo_Resume.pdf"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-mid bg-panel/60 px-3.5 py-2 font-mono text-2xs tracking-wider2 text-fg-dim uppercase transition-colors hover:border-line-strong hover:text-fg"
              >
                <Download size={11} />
                <span>Resume</span>
              </a>
            </motion.div>

            {/* Stack Badges Strip */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-2"
            >
              <span className="mr-1.5 font-mono text-xs tracking-wider uppercase text-fg-dim">
                Stack:
              </span>
              {heroStackPills.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line-mid bg-panel/70 px-3.5 py-1.5 font-mono text-xs text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Scannable Proof Metrics Strip */}
            <motion.div
              variants={itemVariants}
              className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8"
            >
              {quickMetrics.map((m) => (
                <div key={m.label}>
                  <p className="tnum font-mono text-2xl font-bold tracking-[-0.02em] text-fg sm:text-3xl">
                    {m.value}
                  </p>
                  <p className="mt-1 font-sans text-sm font-medium text-fg">{m.label}</p>
                  <p className="mt-0.5 font-mono text-xs text-fg-muted">{m.sub}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column (5 cols): Focused 3D Neural Core & Live Telemetry HUD */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-6 lg:col-span-5 xl:col-span-5"
          >
            <CyberOrb className="w-full" />
            <SystemStatusCard className="w-full max-w-[340px]" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};