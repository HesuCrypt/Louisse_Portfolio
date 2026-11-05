'use client';

import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Download,
  Terminal,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Cpu,
  Globe,
  Layers,
  Zap,
} from 'lucide-react';
import { BuilderProvider, useBuilder } from '../components/builder/DOMSequenceRegistry';
import { BuildItem } from '../components/builder/BuildItem';
import { BuilderCursor } from '../components/builder/BuilderCursor';
import { CyberOrb } from '../ui/CyberOrb';
import { SystemStatusCard } from '../ui/SystemStatusCard';

interface ProjectEntry {
  key: 'issy' | 'fruitjam' | 'y2k';
  title: string;
  metric: string;
  role: string;
  summary: string;
  tags: string[];
  liveUrl: string;
}

const PROJECTS: ProjectEntry[] = [
  {
    key: 'issy',
    title: 'ISSY Cosmetics — Headless Storefront & AI Ops',
    metric: '+170% Sales Lift',
    role: 'IT Officer - Web Developer & AI Automation',
    summary:
      'Engineered sub-second Shopify Liquid storefront architecture paired with autonomous n8n + Claude AI customer routing and inventory telemetry.',
    tags: ['Shopify Liquid', 'Next.js', 'n8n & AI', 'Claude API', 'Tailwind CSS'],
    liveUrl: 'https://issycosmetics.com',
  },
  {
    key: 'fruitjam',
    title: 'Fruit Jam — High-Concurrency Real-Time Web App',
    metric: '3.4K+ Peak Users · 120K+ Req / 72h',
    role: 'Lead Full-Stack Engineer',
    summary:
      'Built a low-latency multiplayer web platform sustaining 3,400+ simultaneous players and 120,000+ requests in 72 hours with zero downtime.',
    tags: ['React 19', 'TypeScript', 'Supabase Realtime', 'Web Audio API', 'Edge Caching'],
    liveUrl: 'https://louissebaja.com/#projects',
  },
  {
    key: 'y2k',
    title: 'Y2K Retro OS — Interactive 3D & Agentic Portfolio Engine',
    metric: '100% Lighthouse · 60fps WebGL',
    role: 'Creative Technologist & Systems Architect',
    summary:
      'Custom DOM-tethered collaborator engine, interactive 3D particle neural core, and procedural Web Audio synthesizer with zero external sound assets.',
    tags: ['Next.js 15', 'Framer Motion', 'Three.js / Canvas', 'Web Audio Synth', 'Tailwind CSS'],
    liveUrl: 'https://louissebaja.com',
  },
];

const CAPABILITY_QUADRANTS = [
  {
    id: 'cap-col-1',
    order: 2,
    code: '01 // FRONTEND ENGINEERING',
    title: 'Frontend Engineering',
    metric: '99 / 100 Core Web Vitals',
    description:
      'Sub-second React & Next.js interfaces, custom WebGL/Canvas shaders, and deterministic motion systems engineered for conversion.',
    pills: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    icon: Globe,
  },
  {
    id: 'cap-col-2',
    order: 3,
    code: '02 // AI AUTOMATION & AGENT WORKFLOWS',
    title: 'AI Automation & Agent Workflows',
    metric: '24/7 Autonomous Execution',
    description:
      'Production n8n pipelines, multi-step LLM agents, RAG knowledge bases, and automated CRM/order triage that eliminate manual bottlenecks.',
    pills: ['n8n Orchestration', 'Claude / OpenAI', 'Supabase pgvector', 'Webhooks', 'AI Agents'],
    icon: Cpu,
  },
  {
    id: 'cap-col-3',
    order: 4,
    code: '03 // HEADLESS ARCHITECTURE & E-COMMERCE',
    title: 'Headless Architecture & E-Commerce',
    metric: '+170% Verified Revenue Lift',
    description:
      'High-converting Shopify Liquid & headless storefronts, custom checkout flows, and real-time inventory synchronization.',
    pills: ['Shopify Liquid', 'Storefront API', 'Stripe / PayMongo', 'Headless CMS', 'Analytics'],
    icon: Layers,
  },
  {
    id: 'cap-col-4',
    order: 5,
    code: '04 // PERFORMANCE & SUB-SECOND SYSTEMS',
    title: 'Performance Optimization & Sub-second Systems',
    metric: '120K+ Requests / 0 Downtime',
    description:
      'Edge-cached APIs, zero-CLS layout architecture, database indexing, and real-time telemetry built to survive viral traffic spikes.',
    pills: ['Edge Caching', 'Zero-CLS DOM', 'PostgreSQL', 'Security Hardening', 'Observability'],
    icon: Zap,
  },
] as const;

const TIMELINE_MILESTONES = [
  {
    nodeId: 'exp-node-1',
    descId: 'exp-desc-1',
    nodeOrder: 2,
    descOrder: 3,
    period: '2025 — PRESENT · FULL-TIME',
    title: 'IT officer - Web developer & AI automation - ISSY Cosmetics',
    summary:
      'IT officer - Web developer & AI automation - ISSY Cosmetics · Drove +170% online sales lift via sub-second storefront engineering & autonomous n8n AI workflows.',
  },
  {
    nodeId: 'exp-node-2',
    descId: 'exp-desc-2',
    nodeOrder: 4,
    descOrder: 5,
    period: '2026 · PROJECT-BASED',
    title: 'Freelance Web Developer · La Fleur Philippines',
    summary:
      'Freelance Web Developer · La Fleur — Delivered custom florist e-commerce storefront ahead of Mother’s Day rush with 99.4% checkout uptime.',
  },
  {
    nodeId: 'exp-node-3',
    descId: 'exp-desc-3',
    nodeOrder: 6,
    descOrder: 7,
    period: '2025 — 2026 · INTERNATIONAL CONTRACT',
    title: 'Full-Stack Web Developer · Meridian Auctions (Germany)',
    summary:
      'Full-Stack Web Developer · Meridian Auctions — Engineered real-time live bidding architecture with 0ms sync drift and hardened security.',
  },
] as const;

function FooterReplayControls() {
  const { replayBuild, hasSkipped, isFinished } = useBuilder();
  if (!hasSkipped && !isFinished) return null;
  return (
    <button
      type="button"
      onClick={replayBuild}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/20 px-4 py-1.5 font-mono text-xs tracking-wider text-emerald-300 uppercase transition-colors hover:border-emerald-400 hover:bg-emerald-950/40"
    >
      <RotateCcw size={12} />
      <span>[ ↻ Replay Assembly ]</span>
    </button>
  );
}

export default function PortfolioPage() {
  const [clockText, setClockText] = useState('PHILIPPINES • 17:47:45 PHT');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Manila',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setClockText(`PHILIPPINES • ${formatted} PHT`);
      } catch {
        setClockText('PHILIPPINES • 17:47:45 PHT');
      }
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      return;
    }
    setSubmitted(true);
  };

  return (
    <BuilderProvider enabled={true}>
      <div className="min-h-screen bg-[#07080a] text-zinc-100 selection:bg-emerald-400 selection:text-black">
        <BuilderCursor />

        {/* ================================================================ */}
        {/* A. NAVIGATION & TOP STATUS BAR                                   */}
        {/* ================================================================ */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07080a]/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
            <BuildItem id="nav-brand" section="nav" order={1} type="stamp" className="inline-flex">
              <a href="#top" className="inline-flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-md border border-white/20 bg-white/5 font-mono text-xs font-bold text-white">
                  LB
                </span>
                <span className="font-sans text-sm font-semibold tracking-tight text-white">
                  Louisse Bertillo
                </span>
                <span className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] tracking-widest text-emerald-400 uppercase">
                  WEB // AI
                </span>
              </a>
            </BuildItem>

            <BuildItem
              id="nav-links"
              section="nav"
              order={3}
              type="frame"
              className="hidden items-center gap-6 rounded-full border border-white/10 bg-white/[0.02] px-5 py-2 lg:flex"
            >
              {(['Overview', 'Profile', 'Experience', 'Work', 'Capabilities', 'Contact'] as const).map(
                (label) => (
                  <a
                    key={label}
                    href={`#${label.toLowerCase()}`}
                    className="font-sans text-xs text-zinc-400 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                )
              )}
            </BuildItem>

            <BuildItem id="nav-cta" section="nav" order={5} type="stamp" className="inline-flex">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 font-sans text-xs font-medium text-white transition-colors hover:border-emerald-400 hover:bg-emerald-400 hover:text-black"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={13} />
              </a>
            </BuildItem>
          </div>

          <div className="border-t border-white/10 bg-[#090b0e]">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-2.5 font-mono text-[11px] tracking-widest text-zinc-400 uppercase">
              <BuildItem
                id="nav-status"
                section="nav"
                order={2}
                type="stamp"
                origin="left center"
                className="inline-flex items-center gap-2.5"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10B981]" />
                <span>AVAILABLE FOR PROJECTS • WEB &amp; AI IMPLEMENTATION SPECIALIST</span>
              </BuildItem>

              <BuildItem
                as="span"
                id="nav-clock"
                section="nav"
                order={4}
                type="typewriter"
                textContent={clockText}
                className="font-mono text-[11px] text-zinc-400"
              />
            </div>
          </div>
        </header>

        {/* ================================================================ */}
        {/* B. HERO SECTION                                                  */}
        {/* ================================================================ */}
        <section id="overview" className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="font-sans text-4xl font-bold tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.25rem] lg:leading-[1.05]">
                <BuildItem
                  as="span"
                  id="hero-h1-l1"
                  section="hero"
                  order={1}
                  type="typewriter"
                  textContent="Websites that convert."
                  className="block"
                />
                <BuildItem
                  as="span"
                  id="hero-h1-l2"
                  section="hero"
                  order={2}
                  type="typewriter"
                  textContent="AI systems that scale."
                  textAccent={{ from: 21, className: 'text-emerald-400' }}
                  className="block"
                />
              </h1>

              <BuildItem
                as="p"
                id="hero-description"
                section="hero"
                order={3}
                type="frame"
                className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
              >
                Full-stack web engineer &amp; AI specialist crafting sub-second storefronts,
                interactive web apps, and autonomous workflows that turn traffic into revenue.
              </BuildItem>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <BuildItem
                  as="span"
                  id="hero-btn-work"
                  section="hero"
                  order={4}
                  type="stamp"
                  className="inline-flex"
                >
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 font-sans text-xs font-semibold text-black transition-transform hover:scale-[1.02]"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>View My Work</span>
                    <ArrowUpRight size={14} />
                  </a>
                </BuildItem>

                <BuildItem
                  as="span"
                  id="hero-btn-talk"
                  section="hero"
                  order={5}
                  type="stamp"
                  className="inline-flex"
                >
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-4 py-3 font-sans text-xs font-medium text-white transition-colors hover:text-emerald-400"
                  >
                    <span>Let&apos;s Talk</span>
                    <ArrowRight size={14} />
                  </a>
                </BuildItem>

                <BuildItem
                  as="span"
                  id="hero-btn-resume"
                  section="hero"
                  order={6}
                  type="stamp"
                  className="inline-flex"
                >
                  <a
                    href="/resume.pdf"
                    download="Louisse_Dominique_Bertillo_Resume.pdf"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 font-mono text-[11px] tracking-widest text-zinc-300 uppercase transition-colors hover:border-white/40 hover:text-white"
                  >
                    <Download size={12} />
                    <span>RESUME</span>
                  </a>
                </BuildItem>
              </div>

              <BuildItem
                id="hero-stack-pills"
                section="hero"
                order={7}
                type="stamp"
                className="mt-8 flex flex-wrap items-center gap-2"
              >
                {(['React / Next.js', 'Tailwind CSS', 'Shopify', 'Supabase', 'n8n & AI'] as const).map(
                  (pill) => (
                    <span
                      key={pill}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-zinc-300"
                    >
                      {pill}
                    </span>
                  )
                )}
              </BuildItem>
            </div>

            <div className="flex flex-col items-center gap-6 lg:col-span-5">
              <BuildItem
                id="hero-neural-canvas"
                section="hero"
                order={8}
                type="frame"
                accent="cyan"
                className="w-full"
              >
                <CyberOrb className="w-full" />
              </BuildItem>

              <BuildItem
                id="hero-terminal-status"
                section="hero"
                order={9}
                type="stamp"
                className="w-full max-w-[360px]"
              >
                <SystemStatusCard className="w-full" />
              </BuildItem>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* C. STATS & IMPACT RIBBON                                         */}
        {/* ================================================================ */}
        <section id="stats" className="mx-auto max-w-7xl px-6 pb-16">
          <BuildItem
            id="stats-container"
            section="stats"
            order={1}
            type="frame"
            className="rounded-2xl border border-white/10 bg-[#0c0d11]"
          >
            <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <BuildItem
                id="stat-conversion"
                section="stats"
                order={2}
                type="counter"
                targetValue="+170%"
                className="p-7 md:p-8"
              >
                {({ formattedValue }) => (
                  <div>
                    <p className="font-mono text-xs tracking-widest text-emerald-400 uppercase">
                      Conversion Surge
                    </p>
                    <p className="mt-3 font-mono text-4xl font-bold text-white md:text-5xl">
                      {formattedValue ?? '+170%'}
                    </p>
                    <p className="mt-2 font-mono text-xs text-zinc-400">
                      Online sales lift · ISSY Cosmetics
                    </p>
                  </div>
                )}
              </BuildItem>

              <BuildItem
                id="stat-performance"
                section="stats"
                order={3}
                type="counter"
                targetValue="100%"
                className="p-7 md:p-8"
              >
                {({ formattedValue }) => (
                  <div>
                    <p className="font-mono text-xs tracking-widest text-emerald-400 uppercase">
                      System Reliability
                    </p>
                    <p className="mt-3 font-mono text-4xl font-bold text-white md:text-5xl">
                      {formattedValue ?? '100%'}
                    </p>
                    <p className="mt-2 font-mono text-xs text-zinc-400">
                      Core Web Vitals &amp; Uptime SLA
                    </p>
                  </div>
                )}
              </BuildItem>

              <BuildItem
                id="stat-reach"
                section="stats"
                order={4}
                type="counter"
                targetValue="3.4K+"
                className="p-7 md:p-8"
              >
                {({ formattedValue }) => (
                  <div>
                    <p className="font-mono text-xs tracking-widest text-emerald-400 uppercase">
                      Peak Concurrency
                    </p>
                    <p className="mt-3 font-mono text-4xl font-bold text-white md:text-5xl">
                      {formattedValue ?? '3.4K+'}
                    </p>
                    <p className="mt-2 font-mono text-xs text-zinc-400">
                      Simultaneous active users · Fruit Jam
                    </p>
                  </div>
                )}
              </BuildItem>
            </div>
          </BuildItem>
        </section>

        {/* ================================================================ */}
        {/* F. EXPERIENCE & TIMELINE (Placed before Work per portfolio flow) */}
        {/* ================================================================ */}
        <section id="experience" className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="mb-10">
            <span className="font-mono text-xs tracking-widest text-emerald-400 uppercase">
              02 // EXPERIENCE &amp; LEADERSHIP
            </span>
            <h2 className="mt-2 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Production Track Record
            </h2>
          </div>

          <div className="relative space-y-6 pl-9">
            <BuildItem
              id="exp-timeline-path"
              section="experience"
              order={1}
              type="connector"
              className="pointer-events-none absolute top-4 bottom-4 left-3 w-px"
            >
              <div className="h-full w-px border-l border-dashed border-emerald-400/50" />
            </BuildItem>

            {TIMELINE_MILESTONES.map((milestone) => (
              <div
                key={milestone.nodeId}
                className="relative rounded-2xl border border-white/10 bg-[#0c0d11] p-6 md:p-7"
              >
                <BuildItem
                  as="span"
                  id={milestone.nodeId}
                  section="experience"
                  order={milestone.nodeOrder}
                  type="stamp"
                  className="absolute top-7 -left-[30px] block"
                >
                  <span className="block h-3.5 w-3.5 rounded-full border-2 border-emerald-400 bg-[#07080a] shadow-[0_0_12px_#10B981]" />
                </BuildItem>

                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-zinc-400">
                  <span className="text-emerald-400">{milestone.title}</span>
                  <span>{milestone.period}</span>
                </div>

                <BuildItem
                  as="p"
                  id={milestone.descId}
                  section="experience"
                  order={milestone.descOrder}
                  type="typewriter"
                  textContent={milestone.summary}
                  className="mt-3 font-sans text-sm leading-relaxed text-zinc-200 sm:text-base"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/* D. SELECTED WORK / PROJECTS SECTION (ISSY, Fruit Jam, Y2K OS)    */}
        {/* ================================================================ */}
        <section id="work" className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="mb-10">
            <span className="font-mono text-xs tracking-widest text-emerald-400 uppercase">
              03 // SELECTED WORK
            </span>
            <h2 className="mt-2 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Commercial Platforms &amp; Verified Outcomes
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PROJECTS.map((project, idx) => {
              const baseOrder = idx * 4 + 1;
              return (
                <BuildItem
                  key={project.key}
                  id={`project-card-${project.key}`}
                  section="work"
                  order={baseOrder}
                  type="frame"
                  accent={idx === 0 ? 'emerald' : 'cyan'}
                  className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c0d11] p-6 transition-colors hover:border-white/25"
                >
                  <div>
                    <BuildItem
                      id={`project-media-${project.key}`}
                      section="work"
                      order={baseOrder + 1}
                      type="stamp"
                      className="mb-5 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-zinc-900 to-cyan-500/10 p-5"
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400">
                        <span>{project.role}</span>
                        <span className="rounded-full border border-emerald-400/40 bg-emerald-950/30 px-2.5 py-0.5 text-emerald-300">
                          {project.metric}
                        </span>
                      </div>
                      <div className="mt-6 flex h-16 items-end gap-1.5">
                        {[35, 52, 68, 84, 92, 100].map((bar, barIdx) => (
                          <span
                            key={barIdx}
                            style={{ height: `${bar}%` }}
                            className={`flex-1 rounded-sm ${
                              barIdx === 5 ? 'bg-emerald-400' : 'bg-white/15'
                            }`}
                          />
                        ))}
                      </div>
                    </BuildItem>

                    <h3 className="font-sans text-xl font-bold text-white">
                      <BuildItem
                        as="span"
                        id={`project-title-${project.key}`}
                        section="work"
                        order={baseOrder + 2}
                        type="typewriter"
                        textContent={`${project.title} (${project.metric})`}
                        className="block"
                      />
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.summary}</p>
                  </div>

                  <BuildItem
                    id={`project-tags-${project.key}`}
                    section="work"
                    order={baseOrder + 3}
                    type="stamp"
                    className="mt-6 border-t border-white/10 pt-4"
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 uppercase hover:underline"
                      >
                        <span>Inspect Live System</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </BuildItem>
                </BuildItem>
              );
            })}
          </div>
        </section>

        {/* ================================================================ */}
        {/* E. CAPABILITIES & ARCHITECTURE MATRIX                            */}
        {/* ================================================================ */}
        <section id="capabilities" className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="mb-10">
            <span className="font-mono text-xs tracking-widest text-emerald-400 uppercase">
              04 // CAPABILITIES &amp; ARCHITECTURE MATRIX
            </span>
            <h2 className="mt-2 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Full-Stack &amp; AI Implementation Systems
            </h2>
          </div>

          <BuildItem
            id="cap-grid-frame"
            section="capabilities"
            order={1}
            type="frame"
            className="grid grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-[#0a0b0f] p-6 md:grid-cols-2 md:p-8"
          >
            {CAPABILITY_QUADRANTS.map((quad) => {
              const IconComponent = quad.icon;
              return (
                <BuildItem
                  key={quad.id}
                  id={quad.id}
                  section="capabilities"
                  order={quad.order}
                  type="stamp"
                  className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0e1016] p-6"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
                      <span>{quad.code}</span>
                      <IconComponent size={16} className="text-emerald-400" />
                    </div>
                    <h3 className="mt-4 font-sans text-xl font-bold text-white">{quad.title}</h3>
                    <p className="mt-1 font-mono text-xs text-emerald-400">{quad.metric}</p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{quad.description}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                    {quad.pills.map((pill) => (
                      <span
                        key={pill}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </BuildItem>
              );
            })}
          </BuildItem>
        </section>

        {/* ================================================================ */}
        {/* G. CONTACT SECTION & TERMINAL FORM                               */}
        {/* ================================================================ */}
        <section id="contact" className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
          <div className="mb-8 text-center">
            <span className="font-mono text-xs tracking-widest text-emerald-400 uppercase">
              05 // DIRECT DISPATCH
            </span>
            <h2 className="mt-2 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Initiate a Project Session
            </h2>
          </div>

          <BuildItem
            id="contact-terminal-frame"
            section="contact"
            order={1}
            type="frame"
            className="rounded-2xl border border-white/15 bg-[#0c0d11] p-6 shadow-2xl md:p-8"
          >
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="h-3 w-3 rounded-full bg-cyan-400" />
                <span className="ml-2 font-mono text-xs text-zinc-400">
                  louisse@portfolio: ~/contact-dispatch
                </span>
              </div>
              <Terminal size={15} className="text-emerald-400" />
            </div>

            <div className="mb-6 rounded-xl border border-white/10 bg-black/50 p-4 font-mono text-xs text-emerald-400">
              <BuildItem
                as="span"
                id="contact-terminal-cli"
                section="contact"
                order={2}
                type="typewriter"
                textContent="> initiate_session --role='Client' --status='Ready'"
                className="block"
              />
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <BuildItem
                  id="contact-input-name"
                  section="contact"
                  order={3}
                  type="stamp"
                  className="block"
                >
                  <label className="block font-mono text-xs tracking-wider text-zinc-400 uppercase">
                    Your Name / Organization
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm((s) => ({ ...s, name: e.target.value }))}
                      placeholder="Alex Vance · Acme Studio"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#07080a] px-4 py-3 font-sans text-sm text-white placeholder-zinc-600 focus:border-emerald-400 focus:outline-none"
                    />
                  </label>
                </BuildItem>

                <BuildItem
                  id="contact-input-email"
                  section="contact"
                  order={4}
                  type="stamp"
                  className="block"
                >
                  <label className="block font-mono text-xs tracking-wider text-zinc-400 uppercase">
                    Email Address
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm((s) => ({ ...s, email: e.target.value }))}
                      placeholder="alex@studio.com"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#07080a] px-4 py-3 font-sans text-sm text-white placeholder-zinc-600 focus:border-emerald-400 focus:outline-none"
                    />
                  </label>
                </BuildItem>
              </div>

              <BuildItem
                id="contact-input-msg"
                section="contact"
                order={5}
                type="stamp"
                className="block"
              >
                <label className="block font-mono text-xs tracking-wider text-zinc-400 uppercase">
                  Project Brief &amp; Timeline
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm((s) => ({ ...s, message: e.target.value }))}
                    placeholder="Describe your storefront, web app, or AI automation goals..."
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#07080a] px-4 py-3 font-sans text-sm text-white placeholder-zinc-600 focus:border-emerald-400 focus:outline-none"
                  />
                </label>
              </BuildItem>

              <div className="flex items-center justify-between pt-2">
                <span className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400">
                  <Sparkles size={13} className="text-emerald-400" />
                  <span>Direct response within 24 hours</span>
                </span>

                <BuildItem
                  as="span"
                  id="contact-submit-btn"
                  section="contact"
                  order={6}
                  type="stamp"
                  className="inline-flex"
                >
                  <button
                    type="submit"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 font-sans text-xs font-semibold text-black transition-transform hover:scale-[1.02]"
                  >
                    <span>Send Message</span>
                    <ArrowUpRight size={14} />
                  </button>
                </BuildItem>
              </div>

              {submitted && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-950/30 p-3 font-mono text-xs text-emerald-300">
                  <CheckCircle2 size={14} />
                  <span>Session transmission received. Louisse will respond shortly.</span>
                </div>
              )}
            </form>
          </BuildItem>
        </section>

        {/* ================================================================ */}
        {/* FOOTER & REPLAY ASSEMBLY TRIGGER                                 */}
        {/* ================================================================ */}
        <footer className="border-t border-white/10 bg-[#050608] py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
            <p className="font-mono text-xs text-zinc-500">
              &copy; {new Date().getFullYear()} Louisse Dominique Bertillo · Manila, PH
            </p>
            <FooterReplayControls />
          </div>
        </footer>
      </div>
    </BuilderProvider>
  );
}
