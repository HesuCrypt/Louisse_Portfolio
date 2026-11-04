import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  MessageSquare,
  Calculator,
  Check,
} from 'lucide-react';
import {
  addOnItems,
  comparisonRows,
  engagementTerms,
  servicePackages,
  trustItems,
} from '../data/services';
import { useLocalizedCurrency } from '../hooks/useLocalizedCurrency';
import { containerVariants, itemVariants } from '../motion/variants';
import { openAIChat } from '../ui/AIChatWidget';
import { Button } from '../ui/Button';
import { QuoteCalculator } from './QuoteCalculator';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { H3 } from '../ui/Text';
import { sound } from '../utils/sound';

type ServicesTab = 'packages' | 'calculator' | 'compare' | 'terms';

const SERVICE_TABS: Array<{
  id: ServicesTab;
  label: string;
  sub: string;
}> = [
  { id: 'packages', label: '01 · Packages', sub: '5 Fixed Tiers' },
  { id: 'calculator', label: '02 · Quote Builder', sub: 'Live Estimator' },
  { id: 'compare', label: '03 · Compare & Add-Ons', sub: 'Matrix & Extras' },
  { id: 'terms', label: '04 · Terms & Warranty', sub: '50/50 & Guarantees' },
];

export const Services: React.FC = () => {
  const { formatEstimatedPrice, formatPhpPrice, showEstimate } = useLocalizedCurrency();
  const [activeTab, setActiveTab] = useState<ServicesTab>('packages');
  const [selectedPackId, setSelectedPackId] = useState<string | null>(null);
  const [openTermIdx, setOpenTermIdx] = useState<number | null>(null);

  const togglePackDetail = (id: string) => {
    sound.playClick();
    setSelectedPackId((prev) => (prev === id ? null : id));
  };

  const priceRange = (card: (typeof servicePackages)[number]) =>
    card.maxPricePhp
      ? `${formatPhpPrice(card.basePricePhp)} – ${formatPhpPrice(card.maxPricePhp)}`
      : formatPhpPrice(card.basePricePhp);

  const estimateRange = (card: (typeof servicePackages)[number]) => {
    const min = formatEstimatedPrice(card.basePricePhp);
    const max = card.maxPricePhp ? formatEstimatedPrice(card.maxPricePhp) : null;
    return max ? `${min} – ${max}` : min;
  };

  return (
    <section id="services" className="scroll-mt-[var(--topbar-h)] py-14 md:py-20">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          <SectionHeader
            index="09"
            label="Services & Rates"
            title="Fixed-Scope Packages & Interactive Estimator"
            meta="Transparent PHP Pricing"
            description="Select a tab below or click any package card to inspect its deliverables, add-ons, and timeline."
          />

          {/* Clean Hairline Top Navigation Tabs */}
          <motion.div
            variants={itemVariants}
            className="mt-8 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4"
          >
            {SERVICE_TABS.map(({ id, label, sub }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(id);
                  }}
                  className={`cursor-pointer p-4 text-left transition-colors ${
                    isActive
                      ? 'bg-paper text-ink'
                      : 'bg-ink text-fg hover:bg-panel'
                  }`}
                >
                  <span
                    className={`block font-mono text-xs font-semibold tracking-wider uppercase ${
                      isActive ? 'text-ink' : 'text-fg'
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`mt-0.5 block font-mono text-[10px] ${
                      isActive ? 'text-ink/70' : 'text-fg-dim'
                    }`}
                  >
                    {sub}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Tab Content Area */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {/* TAB 1: MINIMAL CLICK-TO-EXPAND PACKAGES */}
              {activeTab === 'packages' && (
                <motion.div
                  key="tab-packages"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {servicePackages.map((card, index) => {
                      const isExpanded = selectedPackId === card.id;
                      const estimate = estimateRange(card);
                      const displayPhpPrice = priceRange(card);

                      return (
                        <div
                          key={card.id}
                          className={`flex flex-col justify-between rounded-2xl border p-7 transition-all duration-300 ${
                            card.popular
                              ? 'border-emerald-500/40 bg-[#12141a] shadow-xl hover:border-emerald-400/60'
                              : 'border-white/10 bg-[#0d0e12] hover:-translate-y-1 hover:border-white/20'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="tnum font-mono text-xs text-fg-dim">
                                TIER 0{index + 1}
                              </span>
                              {card.popular ? (
                                <span className="rounded-full bg-paper px-2.5 py-0.5 font-mono text-xs font-semibold tracking-wider2 text-ink uppercase">
                                  Most Popular
                                </span>
                              ) : card.isFlagship ? (
                                <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-xs tracking-wider2 text-fg uppercase">
                                  Flagship OS / AI
                                </span>
                              ) : (
                                <span className="font-mono text-xs text-fg-dim uppercase">
                                  Fixed Scope
                                </span>
                              )}
                            </div>

                            <H3 className="mt-4 text-xl font-bold tracking-tight text-white">{card.title}</H3>

                            <div className="mt-2 flex items-baseline gap-2">
                              <span className="tnum font-mono text-2xl font-bold tracking-[-0.02em] text-fg sm:text-3xl">
                                {displayPhpPrice}
                              </span>
                              {showEstimate && estimate && (
                                <span className="font-mono text-xs text-fg-dim">
                                  (&approx; {estimate})
                                </span>
                              )}
                            </div>

                            <p className="mt-2 font-mono text-xs text-emerald-400">
                              {card.scopeLine}
                            </p>

                            <p className="mt-3 text-xs leading-relaxed text-fg-muted">
                              {card.summary[0]}
                            </p>

                            {/* Click-to-Inspect Deliverables Button */}
                            <button
                              type="button"
                              onClick={() => togglePackDetail(card.id)}
                              aria-expanded={isExpanded}
                              className="mt-4 flex w-full cursor-pointer items-center justify-between rounded-xl border border-line bg-panel px-3.5 py-2.5 font-mono text-xs tracking-wider2 text-fg-dim uppercase transition-colors hover:border-line-strong hover:text-fg"
                            >
                              <span>
                                {isExpanded
                                  ? 'Hide Package Details'
                                  : `View ${card.pages.length + card.extras.length} Inclusions`}
                              </span>
                              <ChevronDown
                                size={13}
                                className={`transition-transform duration-200 ${
                                  isExpanded ? 'rotate-180 text-emerald-400' : ''
                                }`}
                              />
                            </button>

                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-4 space-y-4 rounded-xl border border-line bg-panel p-4">
                                    <div>
                                      <p className="font-mono text-xs tracking-wider2 text-fg uppercase">
                                        {card.pagesTitle}
                                      </p>
                                      <ul className="mt-2 space-y-1.5">
                                        {card.pages.map((item, i) => (
                                          <li key={i} className="flex items-start gap-2 text-xs text-fg-muted">
                                            <Check size={12} className="mt-0.5 shrink-0 text-emerald-400" />
                                            <span>{item}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="border-t border-line pt-3">
                                      <p className="font-mono text-xs tracking-wider2 text-fg-dim uppercase">
                                        {card.extrasTitle}
                                      </p>
                                      <ul className="mt-2 space-y-1.5">
                                        {card.extras.map((item, i) => (
                                          <li key={i} className="flex items-start gap-2 text-xs text-fg-muted">
                                            <Check size={12} className="mt-0.5 shrink-0 text-fg-dim" />
                                            <span>{item}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="border-t border-line pt-3">
                                      <p className="font-mono text-xs tracking-wider2 text-fg-faint uppercase">
                                        Ideal For
                                      </p>
                                      <p className="mt-1 text-xs text-fg-muted">{card.bestFor}</p>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <div className="mt-6 flex items-center gap-2 border-t border-line pt-4">
                            <Button
                              href="#contact"
                              variant={card.popular ? 'primary' : 'secondary'}
                              className="flex-1 justify-center rounded-xl py-2.5"
                            >
                              Select Package
                            </Button>
                            <button
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                openAIChat(
                                  `Can you explain what's included in the ${card.title} and help me decide if it fits my goals?`
                                );
                              }}
                              title="Ask AI Consultant about this tier"
                              className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-line-mid bg-ink px-3 py-2.5 font-mono text-xs text-fg-dim uppercase transition-colors hover:border-paper hover:text-fg"
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

                        <H3 className="mt-4 text-xl font-bold tracking-tight text-white">Custom Scope &amp; AI Retainer</H3>

                        <div className="mt-2 flex items-baseline gap-2">
                          <span className="tnum font-mono text-2xl font-bold tracking-[-0.02em] text-fg sm:text-3xl">
                            Bespoke Quote
                          </span>
                        </div>

                        <p className="mt-2 font-mono text-xs text-emerald-400">
                          Flexible Sprints &middot; Dedicated Capacity
                        </p>

                        <p className="mt-3 text-xs leading-relaxed text-fg-muted">
                          Tailored architecture, n8n automated pipelines, custom LLM fine-tuning, and dedicated monthly development capacity.
                        </p>

                        <div className="mt-4 space-y-2.5 rounded-xl border border-line bg-panel p-4">
                          <p className="font-mono text-xs tracking-wider uppercase text-fg">
                            Included Capabilities:
                          </p>
                          <ul className="space-y-2 text-xs text-fg-muted">
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
                        <Button
                          href="#contact"
                          variant="secondary"
                          className="flex-1 justify-center rounded-xl py-2.5"
                        >
                          Inquire Custom
                        </Button>
                        <button
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            openAIChat(
                              'Can you help me design a custom scope or dedicated retainer for my project?'
                            );
                          }}
                          title="Ask AI Consultant about custom retainer"
                          className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-line-mid bg-ink px-3 py-2.5 font-mono text-xs text-fg-dim uppercase transition-colors hover:border-paper hover:text-fg"
                        >
                          <Bot size={13} />
                          <span>Ask AI</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Compact Bottom Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border border-line bg-panel p-5">
                    <div>
                      <p className="font-sans text-sm font-medium text-fg">
                        Want to customize extra pages or add AI automation?
                      </p>
                      <p className="font-mono text-2xs text-fg-dim">
                        Use the interactive Quote Builder or ask the AI assistant.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setActiveTab('calculator');
                        }}
                        className="inline-flex cursor-pointer items-center gap-2 bg-paper px-4 py-2.5 font-mono text-2xs font-semibold tracking-wider2 text-ink uppercase transition-colors hover:bg-fg/90"
                      >
                        <Calculator size={12} />
                        <span>Open Quote Builder</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          openAIChat(
                            'Can you help me choose the right website or web app package for my business?'
                          );
                        }}
                        className="inline-flex cursor-pointer items-center gap-1.5 border border-line-mid bg-ink px-4 py-2.5 font-mono text-2xs tracking-wider2 text-fg-muted uppercase transition-colors hover:border-paper hover:text-fg"
                      >
                        <MessageSquare size={12} />
                        <span>Ask AI Guide</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: INTERACTIVE QUOTE BUILDER */}
              {activeTab === 'calculator' && (
                <motion.div
                  key="tab-calculator"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <QuoteCalculator />
                </motion.div>
              )}

              {/* TAB 3: SIDE-BY-SIDE COMPARISON & MODULAR ADD-ONS */}
              {activeTab === 'compare' && (
                <motion.div
                  key="tab-compare"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-10"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
                      <span className="font-mono text-xs tracking-wider2 text-fg uppercase">
                        Modular Add-Ons (À La Carte)
                      </span>
                      <span className="font-mono text-2xs text-fg-dim">
                        Attach to any base package
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                      {addOnItems.map((item) => (
                        <div
                          key={item.name}
                          className="flex flex-col justify-between bg-ink p-5"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-sans text-sm font-medium text-fg">
                                {item.name}
                              </h4>
                              <span className="shrink-0 border border-line px-2 py-0.5 font-mono text-[10px] text-fg-dim">
                                {item.timeline}
                              </span>
                            </div>
                            <p className="tnum mt-2 font-mono text-base font-semibold text-fg">
                              {item.investmentPhp}
                            </p>
                            <p className="mt-2 text-xs leading-relaxed text-fg-muted">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-line-mid bg-ink">
                    <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                      <span className="font-mono text-xs tracking-wider2 text-fg uppercase">
                        Tier-by-Tier Feature Matrix
                      </span>
                      <span className="font-mono text-2xs text-fg-dim md:hidden">
                        &larr; Swipe &rarr;
                      </span>
                    </div>
                    <div className="no-scrollbar overflow-x-auto">
                      <table className="w-full min-w-[720px] text-left">
                        <thead>
                          <tr className="border-b border-line-mid bg-panel">
                            <th className="sticky left-0 z-10 bg-panel px-4 py-3 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                              Feature
                            </th>
                            {['₱10k', '₱30k', '₱45k', '₱60k', '₱100k–₱120k'].map((tier) => (
                              <th
                                key={tier}
                                className="whitespace-nowrap px-3 py-3 font-mono text-2xs tracking-wider2 text-fg uppercase"
                              >
                                {tier}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonRows.map((row) => (
                            <tr key={row.feature} className="border-b border-line last:border-b-0">
                              <td className="sticky left-0 z-10 bg-ink px-4 py-3 text-xs font-medium text-fg">
                                {row.feature}
                              </td>
                              <td className="px-3 py-3 text-xs text-fg-muted">{row.portfolio}</td>
                              <td className="px-3 py-3 text-xs text-fg-muted">{row.starter}</td>
                              <td className="px-3 py-3 text-xs text-fg-muted">{row.business}</td>
                              <td className="px-3 py-3 text-xs text-fg-muted">{row.professional}</td>
                              <td className="px-3 py-3 text-xs font-medium text-fg">
                                {row.flagship}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: ACCORDION ENGAGEMENT TERMS & GUARANTEES */}
              {activeTab === 'terms' && (
                <motion.div
                  key="tab-terms"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-12"
                >
                  <div className="divide-y divide-line bg-ink lg:col-span-7">
                    {engagementTerms.map((item, idx) => {
                      const isOpen = openTermIdx === idx;
                      return (
                        <div key={item.label} className="bg-ink">
                          <button
                            type="button"
                            onClick={() => {
                              sound.playClick();
                              setOpenTermIdx(isOpen ? null : idx);
                            }}
                            className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left hover:bg-panel"
                          >
                            <span className="font-mono text-xs font-medium tracking-wider text-fg uppercase">
                              0{idx + 1} &middot; {item.label}
                            </span>
                            <ChevronDown
                              size={14}
                              className={`text-fg-dim transition-transform duration-200 ${
                                isOpen ? 'rotate-180 text-emerald-400' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="border-t border-line bg-panel px-5 py-4 text-xs leading-relaxed text-fg-muted">
                              {item.value}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-col justify-between bg-ink p-6 lg:col-span-5">
                    <div>
                      <span className="font-mono text-xs font-semibold tracking-wider2 text-fg uppercase">
                        Working Guarantees
                      </span>
                      <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
                        {trustItems.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-xs text-fg-muted">
                            <Check size={13} className="mt-0.5 shrink-0 text-emerald-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 border-t border-line pt-4">
                      <Button
                        href="#contact"
                        className="w-full justify-center"
                        icon={<ArrowUpRight size={13} />}
                      >
                        Start a Project
                      </Button>
                    </div>
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
