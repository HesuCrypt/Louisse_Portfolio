import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Bot, MessageSquare } from 'lucide-react';
import { featured } from '../data/featured';
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
import { Body, H3 } from '../ui/Text';

/** Micro-label used to title the sub-blocks that sit between the big tables. */
const blockLabel = 'font-mono text-2xs tracking-label text-fg-dim uppercase';

export const Services: React.FC = () => {
  const { formatEstimatedPrice, formatPhpPrice, showEstimate } = useLocalizedCurrency();
  const completedWork = featured.filter(
    (item) => item.company === 'La Fleur' || item.company === 'Meridian Auctions'
  );
  const standardPackages = servicePackages.filter((pkg) => !pkg.isFlagship);
  const flagship = servicePackages.find((pkg) => pkg.isFlagship);

  /** Shared price readout: PHP always, local estimate only when one is available. */
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
    <section id="services" className="scroll-mt-[var(--topbar-h)] py-16 md:py-24">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          <SectionHeader
            index="10"
            label="Packages"
            title={'Website & Web App Development Services'}
            meta="Fixed scope · PHP"
            description="Five transparent, fixed-scope packages built for conversion, performance, and modern aesthetics. Tell me your vision, or ask the built-in AI assistant for an instant scope breakdown."
          />

          {/* Interactive scope guide — hairline panel, no glow, no colour */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col gap-6 border border-line-mid bg-panel p-5 md:flex-row md:items-center md:justify-between md:p-8"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center border border-line-strong text-fg">
                <Bot size={18} aria-hidden="true" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className={blockLabel}>Interactive Scope Guide</span>
                  <span className="h-1.5 w-1.5 bg-paper" aria-hidden="true" />
                </div>
                <h3 className="mt-2 font-sans text-lg font-medium tracking-[-0.02em] text-fg md:text-xl">
                  Not sure which package fits your project?
                </h3>
                <p className="mt-1.5 max-w-[62ch] text-[0.8125rem] leading-relaxed text-fg-muted">
                  Ask the assistant for an instant scope breakdown, help pricing add-ons, or a recommendation
                  based on your timeline and budget.
                </p>
              </div>
            </div>
            <Button
              onClick={() =>
                openAIChat('Can you help me choose the right website or web app package for my business?')
              }
              className="w-full shrink-0 justify-center md:w-auto"
              icon={<MessageSquare size={14} />}
            >
              Ask the Assistant
            </Button>
          </motion.div>

          {completedWork.length ? (
            <motion.div variants={itemVariants} className="mt-16">
              <div className="flex items-baseline justify-between gap-4 border-t border-line pt-6">
                <span className={blockLabel}>Recent Launches</span>
                <span className="tnum font-mono text-2xs text-fg-faint">
                  {String(completedWork.length).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-4 max-w-[68ch] text-[0.9375rem] leading-[1.75] text-fg-muted">
                Two sites I’ve already shipped, so you can judge the build quality and finish before you commit.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
                {completedWork.map((item) => (
                  <div key={item.company} className="flex flex-col justify-between bg-ink p-6 md:p-8">
                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <H3 className="text-xl">{item.company}</H3>
                        <span className="shrink-0 border border-line-mid px-2 py-0.5 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                          {item.status}
                        </span>
                      </div>
                      <Body className="mt-4 text-[0.9375rem]">{item.description}</Body>
                    </div>
                    <div className="mt-8 border-t border-line pt-5">
                      <Button
                        href={item.link}
                        variant="secondary"
                        className="w-full justify-center"
                        icon={<ArrowUpRight size={13} />}
                      >
                        Visit Platform
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : null}

          {/* Standard package ledger — shared hairlines via the gap-px grid idiom */}
          <div className="mt-16">
            <div className="flex items-baseline justify-between gap-4 border-t border-line pt-6">
              <span className={blockLabel}>Standard Packages</span>
              <span className="tnum font-mono text-2xs text-fg-faint">
                {String(standardPackages.length).padStart(2, '0')} tiers
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
              {standardPackages.map((card, index) => {
                const estimate = estimateRange(card);
                const displayPhpPrice = priceRange(card);

                return (
                  <motion.article
                    key={card.id}
                    variants={itemVariants}
                    className={`flex flex-col p-5 sm:p-6 ${
                      card.popular ? 'bg-panel-2' : 'bg-ink'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="tnum font-mono text-2xs text-fg-faint">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {card.popular ? (
                        <span className="border border-paper bg-paper px-2 py-0.5 font-mono text-2xs tracking-wider2 text-ink uppercase">
                          Most Popular
                        </span>
                      ) : null}
                    </div>

                    <H3 className="mt-5 text-lg">{card.title}</H3>

                    <p className="tnum mt-3 font-mono text-xl font-medium tracking-[-0.02em] text-fg">
                      {displayPhpPrice}
                    </p>
                    {showEstimate && estimate ? (
                      <>
                        <p className="mt-1 font-mono text-2xs text-fg-dim">≈ {estimate}</p>
                        <p className="mt-0.5 font-mono text-2xs text-fg-faint">
                          Local price estimated at current exchange rates
                        </p>
                      </>
                    ) : null}

                    <p className="mt-3 font-mono text-2xs leading-relaxed text-fg-dim">{card.scopeLine}</p>

                    <div className="mt-4 space-y-2 border-t border-line pt-4">
                      <p className="text-[0.8125rem] leading-relaxed text-fg-muted">{card.summary[0]}</p>
                      <p className="text-[0.8125rem] leading-relaxed text-fg-dim">{card.summary[1]}</p>
                    </div>

                    <div className="mt-6 space-y-5 border-t border-line pt-5">
                      <div>
                        <p className={blockLabel}>{card.pagesTitle}</p>
                        <ul className="mt-3 space-y-2">
                          {card.pages.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-paper" aria-hidden="true" />
                              <span className="text-[0.8125rem] leading-relaxed text-fg-muted">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className={blockLabel}>{card.extrasTitle}</p>
                        <ul className="mt-3 space-y-2">
                          {card.extras.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-paper" aria-hidden="true" />
                              <span className="text-[0.8125rem] leading-relaxed text-fg-muted">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-line pt-5">
                      <p className={blockLabel}>Best for</p>
                      <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg-muted">{card.bestFor}</p>
                    </div>

                    <div className="mt-6 flex flex-col gap-2.5 pt-1">
                      <Button
                        href="#contact"
                        variant={card.popular ? 'primary' : 'secondary'}
                        className="w-full justify-center"
                      >
                        Get Started
                      </Button>
                      <button
                        type="button"
                        onClick={() =>
                          openAIChat(
                            `Can you explain what's included in the ${card.title} and help me decide if it fits my goals?`
                          )
                        }
                        className="inline-flex cursor-pointer items-center justify-center gap-2 py-1 font-mono text-2xs tracking-wider2 text-fg-dim uppercase transition-colors hover:text-fg"
                      >
                        <Bot size={12} aria-hidden="true" />
                        <span>Ask AI about this package</span>
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* Flagship tier spotlight */}
          {flagship
            ? (() => {
                const card = flagship;
                const estimate = estimateRange(card);
                const displayPhpPrice = priceRange(card);

                return (
                  <motion.div variants={itemVariants} className="mt-16">
                    <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-6">
                      <span className={blockLabel}>Flagship Tier</span>
                      <span className="border border-paper bg-paper px-2 py-0.5 font-mono text-2xs tracking-wider2 text-ink uppercase">
                        Creative Tech
                      </span>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-12">
                      <div className="flex flex-col justify-between bg-ink p-5 sm:p-6 md:p-8 lg:col-span-5">
                        <div>
                          <H3 className="text-xl md:text-2xl">{card.title}</H3>
                          <div className="mt-3 flex flex-wrap items-baseline gap-3">
                            <span className="tnum font-mono text-2xl font-medium tracking-[-0.03em] text-fg md:text-3xl">
                              {displayPhpPrice}
                            </span>
                            <span className="font-mono text-2xs text-fg-dim">{card.scopeLine}</span>
                          </div>
                          {showEstimate && estimate ? (
                            <p className="mt-1 font-mono text-2xs text-fg-dim">
                              ≈ {estimate} (local exchange estimate)
                            </p>
                          ) : null}
                          <p className="mt-4 text-[0.9375rem] leading-[1.7] text-fg-muted">{card.summary[0]}</p>
                          <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg-dim">{card.summary[1]}</p>
                        </div>

                        <div className="mt-6 border border-line-mid bg-panel p-4">
                          <p className={blockLabel}>Best for</p>
                          <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg-muted">{card.bestFor}</p>
                        </div>

                        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                          <Button href="#contact" className="justify-center">
                            Inquire Flagship Scope
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() =>
                              openAIChat(
                                `Can you explain the architecture and capabilities of the Bespoke Web App / Creative Tech Flagship package?`
                              )
                            }
                            icon={<Bot size={13} />}
                            className="justify-center"
                          >
                            Talk to AI
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:col-span-7">
                        <div className="bg-ink p-5 sm:p-6">
                          <p className={`${blockLabel} border-b border-line pb-3`}>{card.pagesTitle}</p>
                          <ul className="mt-4 space-y-3">
                            {card.pages.map((item, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-paper" aria-hidden="true" />
                                <span className="text-[0.8125rem] leading-relaxed text-fg-muted">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-ink p-5 sm:p-6">
                          <p className={`${blockLabel} border-b border-line pb-3`}>{card.extrasTitle}</p>
                          <ul className="mt-4 space-y-3">
                            {card.extras.map((item, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-paper" aria-hidden="true" />
                                <span className="text-[0.8125rem] leading-relaxed text-fg-muted">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()
            : null}

          {/* Comparison matrix */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-end md:justify-between md:gap-10">
              <div className="min-w-0">
                <span className={blockLabel}>Comparison Matrix</span>
                <p className="mt-3 max-w-[76ch] text-[0.8125rem] leading-relaxed text-fg-muted">
                  See exactly what changes between tiers. ₱10k → ₱30k adds structure and verified lead forms. ₱45k
                  adds Services, Gallery, Maps, and speed work. ₱60k adds Blog, FAQ, and Testimonials hubs. The
                  ₱100k–₱120k Flagship unlocks the interactive Desktop OS, Web Audio API, Gemini AI, and Headless CMS.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  openAIChat('Can you compare your website packages and recommend the best one for my budget?')
                }
                className="inline-flex shrink-0 cursor-pointer items-center gap-2 self-start border border-line-mid px-3 py-2 font-mono text-2xs tracking-wider2 text-fg-dim uppercase transition-colors hover:border-line-strong hover:text-fg md:self-auto"
              >
                <Bot size={12} aria-hidden="true" />
                <span>Compare tiers with AI</span>
              </button>
            </div>

            <div className="mt-6 border border-line-mid">
              <div className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-2xs tracking-wider2 text-fg-dim uppercase md:hidden">
                <span>Feature comparison</span>
                <span>← Scroll for tiers →</span>
              </div>
              <div className="no-scrollbar overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <thead>
                    <tr className="border-b border-line-mid">
                      <th className="sticky left-0 z-10 bg-ink px-4 py-3 font-mono text-2xs tracking-wider2 text-fg-dim uppercase md:px-6">
                        Feature
                      </th>
                      {['₱10k', '₱30k', '₱45k', '₱60k'].map((tier) => (
                        <th
                          key={tier}
                          className="whitespace-nowrap px-3 py-3 font-mono text-2xs tracking-wider2 text-fg-dim uppercase"
                        >
                          {tier}
                        </th>
                      ))}
                      <th className="whitespace-nowrap px-3 py-3 pr-4 font-mono text-2xs tracking-wider2 text-fg uppercase md:pr-6">
                        ₱100k–₱120k
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.feature} className="border-b border-line last:border-b-0">
                        <td className="sticky left-0 z-10 bg-ink px-4 py-3 text-[0.8125rem] text-fg md:px-6">
                          {row.feature}
                        </td>
                        <td className="px-3 py-3 text-[0.8125rem] text-fg-muted">{row.portfolio}</td>
                        <td className="px-3 py-3 text-[0.8125rem] text-fg-muted">{row.starter}</td>
                        <td className="px-3 py-3 text-[0.8125rem] text-fg-muted">{row.business}</td>
                        <td className="px-3 py-3 text-[0.8125rem] text-fg-muted">{row.professional}</td>
                        <td className="px-3 py-3 pr-4 text-[0.8125rem] text-fg md:pr-6">{row.flagship}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Add-ons & maintenance menu */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <div className="min-w-0">
                <span className={blockLabel}>Add-Ons</span>
                <h3 className="mt-3 font-sans text-lg font-medium tracking-[-0.02em] text-fg md:text-xl">
                  Modular Add-Ons &amp; Maintenance Menu
                </h3>
                <p className="mt-2 max-w-[68ch] text-[0.8125rem] leading-relaxed text-fg-muted">
                  Extend any package with specialized integrations, or keep on-demand engineering support on retainer.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => openAIChat('Can you help me calculate custom add-ons for my website?')}
                  className="inline-flex cursor-pointer items-center gap-2 border border-line-mid px-3 py-2 font-mono text-2xs tracking-wider2 text-fg-dim uppercase transition-colors hover:border-line-strong hover:text-fg"
                >
                  <Bot size={12} aria-hidden="true" />
                  <span>Price add-ons with AI</span>
                </button>
                <span className="border border-line-mid px-3 py-2 font-mono text-2xs tracking-wider2 text-fg-muted uppercase">
                  À la carte
                </span>
              </div>
            </div>

            <div className="mt-6 border border-line-mid">
              <div className="no-scrollbar overflow-x-auto">
                <table className="w-full min-w-[720px] text-left">
                  <thead>
                    <tr className="border-b border-line-mid">
                      <th className="px-4 py-3 font-mono text-2xs tracking-wider2 text-fg-dim uppercase md:px-6">
                        Add-On Service
                      </th>
                      <th className="whitespace-nowrap px-3 py-3 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                        Investment (PHP)
                      </th>
                      <th className="whitespace-nowrap px-3 py-3 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                        Timeline Impact
                      </th>
                      <th className="px-4 py-3 font-mono text-2xs tracking-wider2 text-fg-dim uppercase md:px-6">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {addOnItems.map((item) => (
                      <tr key={item.name} className="border-b border-line last:border-b-0">
                        <td className="whitespace-nowrap px-4 py-3.5 text-[0.8125rem] text-fg md:px-6">
                          {item.name}
                        </td>
                        <td className="tnum whitespace-nowrap px-3 py-3.5 font-mono text-xs text-fg">
                          {item.investmentPhp}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3.5">
                          <span className="border border-line-mid px-2 py-0.5 font-mono text-2xs text-fg-muted">
                            {item.timeline}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-[0.8125rem] leading-relaxed text-fg-muted md:px-6">
                          {item.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          <QuoteCalculator />

          {/* Commercial terms + working guarantees */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="flex items-baseline justify-between gap-4 border-t border-line pt-6">
              <span className={blockLabel}>Commercial Terms &amp; Engagement Policy</span>
              <span className="tnum font-mono text-2xs text-fg-faint">
                {String(engagementTerms.length).padStart(2, '0')} clauses
              </span>
            </div>
            <p className="mt-4 max-w-[68ch] text-[0.8125rem] leading-relaxed text-fg-muted">
              The same terms on every project, so both sides know exactly what to expect.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <div className="border-t border-line">
                  {engagementTerms.map((item) => (
                    <div
                      key={item.label}
                      className="grid grid-cols-1 gap-2 border-b border-line py-4 last:border-b-0 md:grid-cols-12 md:gap-6"
                    >
                      <span className="font-mono text-[11px] tracking-wider2 text-fg-dim uppercase md:col-span-4">
                        {item.label}
                      </span>
                      <p className="text-[0.8125rem] leading-relaxed text-fg-muted md:col-span-8">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 lg:border-l lg:border-line lg:pl-14">
                <span className={blockLabel}>Working Guarantees</span>
                <ul className="mt-4 border-t border-line">
                  {trustItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 border-b border-line py-2.5 last:border-b-0"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-paper" aria-hidden="true" />
                      <span className="text-[0.8125rem] text-fg-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
