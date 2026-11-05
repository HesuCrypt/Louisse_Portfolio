import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { profile } from '../data/profile';
import { sectionMeta } from '../data/sections';
import { containerVariants, itemVariants } from '../motion/variants';
import { scrollToSection, pushRoute } from '../utils/routing';
import { sound } from '../utils/sound';
import { ArrowUpRight, Cpu, Globe, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { BuildItem } from '../components/builder/BuildItem';

const pipelineNodes = [
  {
    id: 'trigger',
    step: '01',
    title: 'Storefront / Webhook',
    sub: 'Shopify · Next.js · Forms',
    detail: 'Captures live orders, customer inquiries, and real-time user events in milliseconds.',
  },
  {
    id: 'router',
    step: '02',
    title: 'n8n Orchestrator',
    sub: 'Multi-step Workflow',
    detail: 'Routes payloads, validates schemas, and syncs across databases without manual intervention.',
  },
  {
    id: 'agent',
    step: '03',
    title: 'AI Agent Core',
    sub: 'Claude · Gemini · Antigravity',
    detail: 'Classifies intent, drafts contextual responses, and extracts structured business intelligence.',
  },
  {
    id: 'output',
    step: '04',
    title: 'Automated Action',
    sub: 'CRM · Slack · Analytics',
    detail: 'Updates inventory, dispatches instant replies, and logs real-time revenue telemetry.',
  },
];

export const About: React.FC = () => {
  const { index: sectionIndex, label } = sectionMeta('about');
  const [activeNode, setActiveNode] = useState<number>(2);
  const [simulating, setSimulating] = useState(false);

  const runPipelineSimulation = () => {
    if (simulating) return;
    sound.playPop();
    setSimulating(true);
    setActiveNode(0);

    [1, 2, 3].forEach((stepIdx, i) => {
      setTimeout(() => {
        sound.playClick();
        setActiveNode(stepIdx);
        if (stepIdx === 3) {
          setTimeout(() => setSimulating(false), 600);
        }
      }, (i + 1) * 420);
    });
  };

  return (
    <section id="about" className="scroll-mt-[var(--topbar-h)] py-16 md:py-24">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          <SectionHeader
            index={sectionIndex}
            label={label}
            title={profile.about.title}
            meta="Manila · Remote Worldwide"
            description={profile.about.description}
            build={{ id: 'about-title', section: 'about', order: 1 }}
          />

          {/* Cyber-Minimalist Bento Grid */}
          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* Bento 1: Portrait & Quick Identity HUD (4 cols) */}
            <div className="lg:col-span-4">
              <BuildItem
                id="about-card-portrait"
                section="about"
                order={2}
                type="frame"
                className="flex h-full flex-col justify-between rounded-xl border border-line-mid bg-panel p-4"
              >
                <div>
                  <div className="relative aspect-[4/4.3] w-full overflow-hidden rounded-lg border border-line bg-ink">
                    <img
                      src="/louisse-portrait.jpg"
                      alt="Louisse Dominique Bertillo: Web Developer & AI Implementation"
                      className="h-full w-full object-cover object-center grayscale contrast-[1.08] transition-transform duration-500 hover:scale-[1.02]"
                      loading="lazy"
                    />
                    {/* HUD Corner Overlay */}
                    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3 font-mono text-xs tracking-wider2 text-fg/80 uppercase">
                      <div className="flex justify-between">
                        <span className="rounded bg-ink/80 px-2 py-0.5 backdrop-blur-sm">
                          ID // L.BERTILLO
                        </span>
                        <span className="rounded bg-ink/80 px-2 py-0.5 text-emerald-400 backdrop-blur-sm">
                          ● ACTIVE
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="rounded bg-ink/80 px-2 py-0.5 backdrop-blur-sm">
                          IT OFFICER · AI &amp; WEB
                        </span>
                        <span className="rounded bg-ink/80 px-2 py-0.5 backdrop-blur-sm">
                          PH · UTC+8
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
                  <div>
                    <BuildItem
                      as="p"
                      id="about-portrait-name"
                      section="about"
                      order={3}
                      type="typewriter"
                      content="Louisse Dominique Bertillo"
                      className="font-sans text-sm font-medium text-fg"
                    />
                    <p className="font-mono text-2xs text-fg-dim">Full-Stack Web &amp; AI Engineer</p>
                  </div>
                  <div className="flex gap-2">
                    <BuildItem
                      as="span"
                      id="about-hire-cta"
                      section="about"
                      order={4}
                      type="stamp"
                      className="inline-flex"
                    >
                      <Button
                        onClick={() => scrollToSection('contact')}
                        className="px-3 py-2 text-2xs"
                        icon={<ArrowUpRight size={12} />}
                      >
                        Hire
                      </Button>
                    </BuildItem>
                  </div>
                </div>
              </BuildItem>
            </div>

            {/* Right 8 Columns: Interactive AI Pipeline + 2 Visual Pillar Cards */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-8">
              {/* Bento 2: Interactive Autonomous AI Workflow Visualizer */}
              <BuildItem
                id="about-card-pipeline"
                section="about"
                order={5}
                type="frame"
                className="flex flex-col justify-between rounded-xl border border-line-mid bg-panel p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                    <span className="font-mono text-2xs tracking-label text-fg uppercase">
                      Interactive AI Automation Architecture
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={runPipelineSimulation}
                    disabled={simulating}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line-strong bg-ink px-3 py-1 font-mono text-2xs tracking-wider2 text-fg uppercase transition-colors hover:border-paper hover:bg-paper hover:text-ink disabled:opacity-50"
                  >
                    <Zap size={11} className={simulating ? 'text-emerald-400' : ''} />
                    <span>{simulating ? 'Simulating Flow…' : 'Simulate Pipeline'}</span>
                  </button>
                </div>

                {/* Interactive 4-Node Pipeline */}
                <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-4">
                  {pipelineNodes.map((node, index) => {
                    const isSelected = activeNode === index;
                    return (
                      <BuildItem
                        key={node.id}
                        id={`about-pipe-node-${index}`}
                        section="about"
                        order={6 + index}
                        type="stamp"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setActiveNode(index);
                          }}
                          className={`group relative w-full cursor-pointer rounded-lg border p-3.5 text-left transition-all duration-200 ${
                            isSelected
                              ? 'border-paper bg-ink shadow-lg'
                              : 'border-line bg-ink/50 hover:border-line-strong hover:bg-ink'
                          }`}
                        >
                          <div className="flex items-center justify-between font-mono text-xs uppercase">
                            <span className={isSelected ? 'text-emerald-400 font-bold' : 'text-fg-faint'}>
                              {node.step}
                            </span>
                            <span
                              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                                isSelected ? 'bg-emerald-400' : 'bg-line-strong'
                              }`}
                            />
                          </div>
                          <p className="mt-2 font-sans text-sm font-semibold text-fg">{node.title}</p>
                          <p className="mt-0.5 font-mono text-xs text-fg-dim">{node.sub}</p>
                        </button>
                      </BuildItem>
                    );
                  })}
                </div>

                {/* Live Node Readout Bar */}
                <div className="mt-4 flex flex-col justify-between gap-3 rounded-lg border border-line bg-ink px-4 py-3 sm:flex-row sm:items-center">
                  <div className="flex items-start gap-2.5">
                    <Sparkles size={14} className="mt-0.5 shrink-0 text-fg-dim" />
                    <p className="text-sm leading-relaxed text-fg-muted">
                      <strong className="font-mono text-xs uppercase text-fg mr-2">
                        [{pipelineNodes[activeNode].title}]:
                      </strong>
                      {pipelineNodes[activeNode].detail}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-xs tracking-wider2 text-emerald-400 uppercase font-semibold">
                    Latency &lt; 120ms
                  </span>
                </div>
              </BuildItem>

              {/* Bottom 2 Bento Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Bento 3: Performance & Conversion */}
                <BuildItem
                  id="about-card-ecommerce"
                  section="about"
                  order={10}
                  type="frame"
                  className="flex flex-col justify-between rounded-xl border border-line-mid bg-panel p-5"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">
                        01 // Web &amp; E-Commerce
                      </span>
                      <Globe size={15} className="text-fg-dim" />
                    </div>
                    <h3 className="mt-3 font-sans text-base font-medium text-fg">
                      Sub-second storefronts built to convert.
                    </h3>
                    <div className="mt-4 space-y-2.5">
                      <div>
                        <div className="flex justify-between font-mono text-2xs">
                          <span className="text-fg-dim">Core Web Vitals</span>
                          <span className="text-emerald-400">99 / 100</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-ink">
                          <div className="h-full w-[99%] bg-paper" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between font-mono text-2xs">
                          <span className="text-fg-dim">ISSY Sales Lift</span>
                          <span className="text-fg">+170% Verified</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-ink">
                          <div className="h-full w-[92%] bg-emerald-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-3.5">
                    {['Next.js', 'React 19', 'Shopify Liquid', 'Tailwind'].map((t) => (
                      <span
                        key={t}
                        className="rounded border border-line bg-ink px-2.5 py-1 font-mono text-xs text-fg-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </BuildItem>

                {/* Bento 4: Fixed-Scope Execution */}
                <BuildItem
                  id="about-card-execution"
                  section="about"
                  order={11}
                  type="frame"
                  className="flex flex-col justify-between rounded-xl border border-line-mid bg-panel p-5"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">
                        02 // Execution Model
                      </span>
                      <ShieldCheck size={15} className="text-fg-dim" />
                    </div>
                    <h3 className="mt-3 font-sans text-base font-medium text-fg">
                      Fixed scope. Zero hidden fees.
                    </h3>
                    <ul className="mt-4 space-y-2 font-mono text-2xs text-fg-muted">
                      <li className="flex items-center justify-between border-b border-line pb-1.5">
                        <span className="text-fg-dim">Turnaround</span>
                        <span className="text-fg">2 – 18 Days</span>
                      </li>
                      <li className="flex items-center justify-between border-b border-line pb-1.5">
                        <span className="text-fg-dim">Payment Split</span>
                        <span className="text-fg">50% Upfront / 50% Launch</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-fg-dim">Post-Launch Warranty</span>
                        <span className="text-emerald-400">30 Days Included</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-line pt-3.5">
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-fg-dim uppercase">
                      <Cpu size={12} />
                      <span>Direct Engineer</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => pushRoute('/services')}
                      className="inline-flex cursor-pointer items-center gap-1 font-mono text-2xs text-fg uppercase underline decoration-line-strong underline-offset-4 hover:text-paper"
                    >
                      <span>View Packages</span>
                      <ArrowUpRight size={12} />
                    </button>
                  </div>
                </BuildItem>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
