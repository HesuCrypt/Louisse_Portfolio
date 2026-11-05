import React from 'react';
import { Container } from '../ui/Container';
import { LocalTime } from '../ui/LocalTime';
import { CyberOrb } from '../ui/CyberOrb';
import { SystemStatusCard } from '../ui/SystemStatusCard';
import { profile } from '../data/profile';
import { scrollToSection } from '../utils/routing';
import { sound } from '../utils/sound';
import { ArrowUpRight, ArrowRight, Download } from 'lucide-react';
import { BuildItem } from '../components/builder/BuildItem';

const heroStackPills = ['React / Next.js', 'Tailwind CSS', 'Shopify', 'Supabase', 'n8n & AI'];

const HEADING_1 = 'Websites that convert.';
const HEADING_2 = 'AI systems that scale.';

/**
 * Every node below is real DOM that keeps its layout box from first paint.
 * <BuildItem> only controls WHEN it becomes visible: the autonomous cursor
 * measures each wrapper with getBoundingClientRect() and performs that item's
 * gesture (frame / type / stamp) before revealing it. Orders are the sequence.
 */
export const Hero: React.FC = () => {
  return (
    <section id="top" className="relative overflow-hidden scroll-mt-[var(--topbar-h)]">
      {/* Subtle engineered measurement grid */}
      <div
        aria-hidden="true"
        className="bg-grid grid-drift mask-fade-b pointer-events-none absolute inset-0 opacity-40"
      />

      <Container className="relative">
        {/* Status bar: dot + tag stamped left, live clock stamped right */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line/80 py-3.5 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
          <BuildItem
            id="hero-status-tag"
            section="hero"
            order={30}
            type="stamp"
            origin="left center"
            className="flex flex-wrap items-center gap-3"
          >
            <span className="flex items-center gap-2 text-fg-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Available for projects</span>
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-line-strong sm:inline" />

            <span className="hidden text-fg-dim sm:inline">Web &amp; AI Implementation Specialist</span>
          </BuildItem>

          <BuildItem
            id="hero-status-clock"
            section="hero"
            order={31}
            type="stamp"
            origin="right center"
            className="text-fg-dim"
          >
            Philippines &middot; <LocalTime showZone={false} /> PHT
          </BuildItem>
        </div>

        {/* Hero Main Content Row */}
        <div className="grid grid-cols-1 items-center gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-8 lg:py-20 xl:py-24">
          {/* Left Column: Headline, Subtext, CTAs, Stack */}
          <div className="lg:col-span-7 xl:col-span-7">
            <h1 className="font-sans text-[clamp(2.5rem,5.2vw,4.4rem)] leading-[1.06] font-bold tracking-[-0.035em] text-fg">
              <BuildItem
                as="span"
                id="hero-heading-1"
                section="hero"
                order={40}
                type="typewriter"
                content={HEADING_1}
                className="block"
              />
              <BuildItem
                as="span"
                id="hero-heading-2"
                section="hero"
                order={41}
                type="typewriter"
                content={HEADING_2}
                textAccent={{ from: HEADING_2.length - 1, className: 'text-emerald-400' }}
                className="block"
              />
            </h1>

            <BuildItem
              as="p"
              id="hero-subtext"
              section="hero"
              order={42}
              type="frame"
              className="mt-6 max-w-[50ch] text-[1rem] leading-[1.68] text-fg-muted md:text-[1.08rem]"
            >
              {profile.hero.subtext}
            </BuildItem>

            {/* Primary Action Row: each control is stamped in turn */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BuildItem
                as="span"
                id="hero-cta-work"
                section="hero"
                order={50}
                type="stamp"
                className="inline-flex"
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
              </BuildItem>

              <BuildItem
                as="span"
                id="hero-cta-talk"
                section="hero"
                order={51}
                type="stamp"
                className="inline-flex"
              >
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
              </BuildItem>

              <BuildItem
                as="span"
                id="hero-cta-resume"
                section="hero"
                order={52}
                type="stamp"
                className="inline-flex"
              >
                <a
                  href="/resume.pdf"
                  download="Louisse_Dominique_Bertillo_Resume.pdf"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line-mid bg-panel/60 px-3.5 py-2 font-mono text-2xs tracking-wider2 text-fg-dim uppercase transition-colors hover:border-line-strong hover:text-fg"
                >
                  <Download size={11} />
                  <span>Resume</span>
                </a>
              </BuildItem>
            </div>

            {/* Stack row: label, then each badge stamped left to right */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <BuildItem
                as="span"
                id="hero-stack-label"
                section="hero"
                order={60}
                type="stamp"
                className="mr-1.5 inline-flex font-mono text-xs tracking-wider text-fg-dim uppercase"
              >
                Stack:
              </BuildItem>
              {heroStackPills.map((tech, index) => (
                <BuildItem
                  as="span"
                  key={tech}
                  id={`hero-stack-${index}`}
                  section="hero"
                  order={61 + index}
                  type="stamp"
                  className="inline-flex"
                >
                  <span className="rounded-full border border-line-mid bg-panel/70 px-3.5 py-1.5 font-mono text-xs text-fg-muted transition-colors hover:border-line-strong hover:text-fg">
                    {tech}
                  </span>
                </BuildItem>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Neural Core canvas, then the system status terminal */}
          <div className="flex flex-col items-center justify-center gap-6 lg:col-span-5 xl:col-span-5">
            <BuildItem
              id="hero-neural-core"
              section="hero"
              order={70}
              type="frame"
              accent="cyan"
              className="w-full"
            >
              <CyberOrb className="w-full" />
            </BuildItem>

            <BuildItem
              id="hero-terminal"
              section="hero"
              order={80}
              type="frame"
              className="w-full max-w-[340px]"
            >
              <SystemStatusCard className="w-full" />
            </BuildItem>
          </div>
        </div>
      </Container>
    </section>
  );
};
