import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { skills } from '../data/skills';
import { sectionMeta } from '../data/sections';
import { servicePackages } from '../data/services';
import { useLocalizedCurrency } from '../hooks/useLocalizedCurrency';
import { pushRoute, scrollToSection } from '../utils/routing';
import { openAIChat } from '../ui/AIChatWidget';
import { sound } from '../utils/sound';
import { containerVariants } from '../motion/variants';
import { ArrowUpRight, Bot, Check, ChevronDown } from 'lucide-react';

export const Capabilities: React.FC = () => {
  const { formatPhpPrice, formatEstimatedPrice } = useLocalizedCurrency();
  const { index: sectionIndex, label } = sectionMeta('capabilities');

  const [activeView, setActiveView] = useState<'packages' | 'stack'>('packages');
  const [expandedTierId, setExpandedTierId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(skills[0]?.category || 'Frontend');

  const activeSkillGroup =
    skills.find((group) => group.category === activeCategory) || skills[0];

  return (
    <section id="capabilities" className="scroll-mt-[var(--topbar-h)] py-16 md:py-24">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeader
              index={sectionIndex}
              label={label}
              title="Fixed-Scope Packages & Tech Stack"
              meta="Transparent PHP Pricing"
              description="Switch between fixed-scope website packages and my engineering stack."
            />

            {/* Clean Rounded-Pill View Switcher */}
            <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-line-mid bg-panel/80 p-1 font-mono text-2xs uppercase">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveView('packages');
                }}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 transition-all ${
                  activeView === 'packages'
                    ? 'bg-paper font-semibold text-ink shadow-sm'
                    : 'text-fg-dim hover:text-fg'
                }`}
              >
                01 &middot; Packages (5)
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveView('stack');
                }}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 transition-all ${
                  activeView === 'stack'
                    ? 'bg-paper font-semibold text-ink shadow-sm'
                    : 'text-fg-dim hover:text-fg'
                }`}
              >
                02 &middot; Tech Stack
              </button>
            </div>
          </div>

          <div className="mt-10">
            <AnimatePresence mode="wait">
              {activeView === 'packages' ? (
                <motion.div
                  key="view-packages"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Symmetrical 6-Card Modern Floating Grid (Kota Studio aesthetic) */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {servicePackages.map((pack, idx) => {
                      const isExpanded = expandedTierId === pack.id;
                      const estimate = formatEstimatedPrice(pack.maxPricePhp ?? pack.basePricePhp);
                      const priceDisplay = pack.maxPricePhp
                        ? `${formatPhpPrice(pack.basePricePhp)}–${formatPhpPrice(pack.maxPricePhp)}`
                        : formatPhpPrice(pack.basePricePhp);

                      return (
                        <div
                          key={pack.id}
                          className={`flex flex-col justify-between rounded-2xl border p-7 transition-all duration-300 ${
                            pack.popular
                              ? 'border-emerald-500/40 bg-[#12141a] shadow-xl hover:border-emerald-400/60'
                              : 'border-white/10 bg-[#0d0e12] hover:-translate-y-1 hover:border-white/20'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="tnum font-mono text-xs text-fg-dim">
                                TIER 0{idx + 1}
                              </span>
                              {pack.popular ? (
                                <span className="rounded-full bg-paper px-2.5 py-0.5 font-mono text-xs font-semibold tracking-wider2 text-ink uppercase">
                                  Most Popular
                                </span>
                              ) : pack.isFlagship ? (
                                <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-xs tracking-wider2 text-fg uppercase">
                                  Flagship OS / AI
                                </span>
                              ) : (
                                <span className="font-mono text-xs text-fg-dim uppercase">
                                  Fixed Scope
                                </span>
                              )}
                            </div>

                            <h4 className="mt-4 font-sans text-xl font-bold tracking-tight text-white">
                              {pack.title.replace(' Package', '')}
                            </h4>

                            <p className="tnum mt-2 font-mono text-2xl font-bold tracking-[-0.02em] text-fg sm:text-3xl">
                              {priceDisplay}
                            </p>
                            {estimate && (
                              <p className="font-mono text-xs text-fg-dim">&approx; {estimate}</p>
                            )}

                            <p className="mt-2 font-mono text-xs text-emerald-400">
                              {pack.scopeLine}
                            </p>

                            {/* Click-to-View Deliverables Button */}
                            <button
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setExpandedTierId(isExpanded ? null : pack.id);
                              }}
                              aria-expanded={isExpanded}
                              className="mt-4 flex w-full cursor-pointer items-center justify-between rounded-xl border border-line bg-panel px-3.5 py-2.5 font-mono text-xs tracking-wider2 text-fg-dim uppercase transition-colors hover:border-line-strong hover:text-fg"
                            >
                              <span>
                                {isExpanded
                                  ? 'Hide Inclusions'
                                  : `View ${pack.pages.length + pack.extras.length} Inclusions`}
                              </span>
                              <ChevronDown
                                size={12}
                                className={`transition-transform duration-200 ${
                                  isExpanded ? 'rotate-180 text-emerald-400' : ''
                                }`}
                              />
                            </button>

                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="mt-4 space-y-2 overflow-hidden rounded-xl border border-line bg-panel p-4"
                                >
                                  {pack.pages.map((p, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-fg-muted">
                                      <Check size={12} className="mt-0.5 shrink-0 text-emerald-400" />
                                      <span>{p.split(' (')[0]}</span>
                                    </li>
                                  ))}
                                  {pack.extras.slice(0, 3).map((e, i) => (
                                    <li key={`ex-${i}`} className="flex items-start gap-2 text-xs text-fg-muted">
                                      <Check size={12} className="mt-0.5 shrink-0 text-fg-dim" />
                                      <span>{e.split(' (')[0]}</span>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </div>

                          <div className="mt-6 flex items-center gap-2 border-t border-line pt-4">
                            <button
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                scrollToSection('contact');
                              }}
                              className={`flex-1 cursor-pointer rounded-xl py-2.5 font-mono text-xs font-semibold tracking-wider2 uppercase transition-colors ${
                                pack.popular
                                  ? 'bg-paper text-ink hover:bg-fg/90'
                                  : 'border border-line-mid bg-ink text-fg hover:border-paper'
                              }`}
                            >
                              Select Tier
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                openAIChat(
                                  `Tell me about the ${pack.title} (${priceDisplay}) and if it fits my project.`
                                );
                              }}
                              className="inline-flex cursor-pointer items-center justify-center gap-1 rounded-xl border border-line-mid px-3 py-2.5 font-mono text-xs text-fg-dim uppercase hover:border-paper hover:text-fg"
                            >
                              <Bot size={13} />
                              <span>Ask AI</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {/* Symmetrical 6th Card: Custom Enterprise & AI Retainer */}
                    <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d0e12] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="tnum font-mono text-xs text-fg-dim">
                            TIER 06
                          </span>
                          <span className="rounded-full border border-emerald-500/40 bg-emerald-950/20 px-2.5 py-0.5 font-mono text-xs text-emerald-400 uppercase">
                            Enterprise / Bespoke
                          </span>
                        </div>

                        <h4 className="mt-4 font-sans text-xl font-bold tracking-tight text-white">
                          Custom Scope &amp; AI Retainer
                        </h4>

                        <p className="tnum mt-2 font-mono text-2xl font-bold tracking-[-0.02em] text-fg sm:text-3xl">
                          Bespoke Quote
                        </p>

                        <p className="mt-2 font-mono text-xs text-emerald-400">
                          Flexible Sprints &middot; Dedicated Capacity
                        </p>

                        <p className="mt-3 text-xs leading-relaxed text-fg-muted">
                          Tailored architecture, n8n automated pipelines, custom LLM fine-tuning, and dedicated monthly development capacity.
                        </p>

                        <div className="mt-4 space-y-2 rounded-xl border border-line bg-panel p-4">
                          <p className="font-mono text-xs tracking-wider uppercase text-fg">
                            Included Capabilities:
                          </p>
                          <ul className="space-y-1.5 text-xs text-fg-muted">
                            <li className="flex items-start gap-2">
                              <Check size={12} className="mt-0.5 shrink-0 text-emerald-400" />
                              <span>Custom AI Model &amp; n8n Orchestration</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check size={12} className="mt-0.5 shrink-0 text-emerald-400" />
                              <span>Dedicated Engineering Sprint Capacity</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check size={12} className="mt-0.5 shrink-0 text-emerald-400" />
                              <span>Direct Async &amp; Technical Advisory</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center gap-2 border-t border-line pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            scrollToSection('contact');
                          }}
                          className="flex-1 cursor-pointer rounded-xl border border-line-mid bg-ink py-2.5 font-mono text-xs font-semibold tracking-wider2 text-fg uppercase hover:border-paper"
                        >
                          Inquire Custom
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            openAIChat(
                              'Can you help me design a custom scope or dedicated retainer for my project?'
                            );
                          }}
                          className="inline-flex cursor-pointer items-center justify-center gap-1 rounded-xl border border-line-mid px-3 py-2.5 font-mono text-xs text-fg-dim uppercase hover:border-paper hover:text-fg"
                        >
                          <Bot size={13} />
                          <span>Ask AI</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border border-line bg-panel p-4">
                    <p className="text-xs text-fg-muted">
                      Need custom add-ons (AI Chatbot, Headless CMS, n8n Automation) or an interactive quote builder?
                    </p>
                    <Button
                      variant="secondary"
                      onClick={() => pushRoute('/services')}
                      icon={<ArrowUpRight size={13} />}
                    >
                      Interactive Quote Calculator
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="view-stack"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-12"
                >
                  {/* Left: Category Selector */}
                  <div className="flex flex-col divide-y divide-line bg-ink lg:col-span-4">
                    {skills.map((group, idx) => {
                      const isSelected = group.category === activeCategory;
                      return (
                        <button
                          key={group.category}
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setActiveCategory(group.category);
                          }}
                          className={`flex cursor-pointer items-center justify-between px-5 py-4 text-left transition-colors ${
                            isSelected
                              ? 'bg-paper font-semibold text-ink'
                              : 'bg-ink text-fg-muted hover:bg-panel hover:text-fg'
                          }`}
                        >
                          <span className="font-sans text-xs sm:text-sm">
                            0{idx + 1} &middot; {group.category}
                          </span>
                          <span
                            className={`font-mono text-2xs ${
                              isSelected ? 'text-ink/70' : 'text-fg-faint'
                            }`}
                          >
                            {String(group.items.length).padStart(2, '0')}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right: Spotlighted Category Tools */}
                  <div className="flex flex-col justify-between bg-ink p-6 lg:col-span-8 md:p-8">
                    <div>
                      <div className="flex items-center justify-between border-b border-line pb-4">
                        <h3 className="font-sans text-lg font-medium text-fg">
                          {activeSkillGroup.category}
                        </h3>
                        <span className="font-mono text-2xs text-fg-dim uppercase">
                          {activeSkillGroup.items.length} Tools
                        </span>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {activeSkillGroup.items.map((item) => (
                          <span
                            key={item}
                            className="border border-line-mid bg-panel px-3.5 py-2 font-mono text-xs text-fg transition-colors hover:border-paper"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="mt-8 border-t border-line pt-4 font-mono text-[11px] text-fg-faint">
                      Select any category on the left to inspect tools.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
