import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Bot, Check, MessageSquare, Sparkles } from 'lucide-react';
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
import { Body, H2 } from '../ui/Text';

export const Services: React.FC = () => {
  const { formatEstimatedPrice, formatPhpPrice, showEstimate } = useLocalizedCurrency();
  const completedWork = featured.filter(
    (item) => item.company === 'La Fleur' || item.company === 'Meridian Auctions'
  );

  return (
    <section id="services" className="py-24 md:py-32 scroll-mt-20">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-12">
            <H2 className="mb-4">Website & Web App Development Services</H2>
            <Body className="text-neutral-400 !max-w-none">
              Five transparent, fixed-scope packages engineered for high conversion, robust performance, and modern
              aesthetics. Tell me your vision or consult our built-in AI assistant for an instant scope
              breakdown.
            </Body>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mb-14 relative overflow-hidden rounded-2xl border border-neutral-700/60 bg-gradient-to-r from-neutral-900/90 via-neutral-900/50 to-neutral-950 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-xl border border-white/20 bg-white/10 p-3 text-white shrink-0 mt-0.5 shadow-inner">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    Interactive Scope Guide
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white">Not sure which package fits your project?</h3>
                <p className="text-xs md:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                  Talk to our AI assistant to get an instant scope breakdown, calculate custom add-ons, or find the
                  ideal tier for your timeline and budget.
                </p>
              </div>
            </div>
            <Button
              onClick={() => openAIChat('Can you help me choose the right website or web app package for my business?')}
              variant="primary"
              className="whitespace-nowrap shrink-0 justify-center w-full md:w-auto"
              icon={<MessageSquare size={16} />}
            >
              Talk to AI to Know More
            </Button>
          </motion.div>

          {completedWork.length ? (
            <motion.div variants={itemVariants} className="mb-16">
              <div className="mx-auto max-w-3xl text-center mb-10">
                <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-500 mb-3">Recent Launches</p>
                <p className="text-neutral-300 text-base md:text-lg">
                  A quick look at websites I’ve already delivered, so you can see the build quality and finish.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {completedWork.map((item) => (
                  <motion.div
                    key={item.company}
                    variants={itemVariants}
                    className="rounded-2xl border border-neutral-800 bg-neutral-900/20 p-6 md:p-8 flex flex-col h-full"
                  >
                    <div className="flex-1">
                      <p className="text-white text-lg font-medium">{item.company}</p>
                      <p className="text-neutral-500 text-xs uppercase tracking-[0.24em] mt-2">{item.status}</p>
                      <p className="text-neutral-400 text-sm md:text-base mt-4 leading-relaxed">{item.description}</p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-neutral-800/50">
                      <Button
                        href={item.link}
                        variant="secondary"
                        className="w-full justify-center"
                        icon={<ArrowUpRight size={16} />}
                      >
                        Visit Platform
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : null}

          {/* Standard Website Packages (4 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10 items-stretch">
            {servicePackages
              .filter((pkg) => !pkg.isFlagship)
              .map((card) => {
                const estimatedMin = formatEstimatedPrice(card.basePricePhp);
                const estimatedMax = card.maxPricePhp ? formatEstimatedPrice(card.maxPricePhp) : null;
                const estimatedPrice = estimatedMax ? `${estimatedMin} – ${estimatedMax}` : estimatedMin;

                const displayPhpPrice = card.maxPricePhp
                  ? `${formatPhpPrice(card.basePricePhp)} – ${formatPhpPrice(card.maxPricePhp)}`
                  : formatPhpPrice(card.basePricePhp);

                return (
                  <motion.div key={card.id} variants={itemVariants} className="relative flex flex-col">
                    <motion.article
                      whileHover={{ scale: 1.015 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className={`h-full flex flex-col rounded-2xl border bg-neutral-900/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-neutral-500 hover:shadow-xl hover:shadow-black/20 ${
                        card.popular
                          ? 'border-white/40 shadow-xl shadow-white/5 xl:scale-[1.02] z-10 ring-1 ring-white/20 bg-neutral-900/70'
                          : 'border-neutral-800'
                      }`}
                    >
                      {card.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-neutral-900 border border-white shadow-md">
                            Most Popular
                          </span>
                        </div>
                      )}

                      <div className="mb-5">
                        <h3 className="text-base font-semibold text-white mb-2 leading-snug">{card.title}</h3>
                        <p className="text-2xl font-bold text-white tracking-tight">{displayPhpPrice}</p>
                        {showEstimate && estimatedPrice && (
                          <>
                            <p className="mt-1.5 text-xs text-neutral-400">Approx. {estimatedPrice}</p>
                            <p className="mt-0.5 text-[10px] text-neutral-500">
                              Estimated local price based on current exchange rates
                            </p>
                          </>
                        )}
                        <p className="text-xs text-neutral-400 mt-2 font-mono">{card.scopeLine}</p>
                        <div className="mt-3 space-y-1.5 text-xs text-neutral-400 leading-relaxed border-t border-neutral-800/80 pt-3">
                          <p>{card.summary[0]}</p>
                          <p className="text-neutral-500">{card.summary[1]}</p>
                        </div>
                      </div>

                      <div className="space-y-4 flex-1">
                        <div>
                          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                            {card.pagesTitle}
                          </p>
                          <ul className="space-y-1.5">
                            {card.pages.map((item, i) => (
                              <li key={i} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed">
                                <Check className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                            {card.extrasTitle}
                          </p>
                          <ul className="space-y-1.5">
                            {card.extras.map((item, i) => (
                              <li key={i} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed">
                                <Check className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2 border-t border-neutral-800/40">
                          <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">Best for:</p>
                          <p className="text-xs text-neutral-400 leading-relaxed">{card.bestFor}</p>
                        </div>
                      </div>

                      <div className="mt-6 pt-5 border-t border-neutral-800 space-y-2">
                        <Button
                          href="#contact"
                          variant={card.popular ? 'primary' : 'secondary'}
                          className="w-full justify-center text-xs md:text-sm"
                        >
                          Get Started
                        </Button>
                        <button
                          type="button"
                          onClick={() =>
                            openAIChat(`Can you explain what's included in the ${card.title} and help me decide if it fits my goals?`)
                          }
                          className="w-full text-center text-[11px] text-neutral-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 pt-1 cursor-pointer"
                        >
                          <Bot className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Talk to AI to know more</span>
                        </button>
                      </div>
                    </motion.article>
                  </motion.div>
                );
              })}
          </div>

          {/* Flagship Tier Spotlight Card */}
          {(() => {
            const card = servicePackages.find((pkg) => pkg.isFlagship);
            if (!card) return null;

            const estimatedMin = formatEstimatedPrice(card.basePricePhp);
            const estimatedMax = card.maxPricePhp ? formatEstimatedPrice(card.maxPricePhp) : null;
            const estimatedPrice = estimatedMax ? `${estimatedMin} – ${estimatedMax}` : estimatedMin;
            const displayPhpPrice = card.maxPricePhp
              ? `${formatPhpPrice(card.basePricePhp)} – ${formatPhpPrice(card.maxPricePhp)}`
              : formatPhpPrice(card.basePricePhp);

            return (
              <motion.div variants={itemVariants} className="mb-16">
                <div className="relative rounded-2xl border border-neutral-700/80 bg-gradient-to-br from-neutral-900/90 via-neutral-900/50 to-neutral-950 p-6 md:p-8 lg:p-10 shadow-2xl backdrop-blur-md overflow-hidden">
                  {/* Ambient accent background glow */}
                  <div className="pointer-events-none absolute -right-24 -top-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                  <div className="pointer-events-none absolute -left-24 -bottom-24 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Overview, Price, CTAs */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                      <div>
                        <div className="inline-flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white border border-white/20 shadow-md">
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            Flagship Tier · Creative Tech
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
                          {card.title}
                        </h3>
                        <div className="mt-3 flex flex-wrap items-baseline gap-3">
                          <p className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                            {displayPhpPrice}
                          </p>
                          <span className="text-xs text-neutral-400 font-mono">
                            {card.scopeLine}
                          </span>
                        </div>
                        {showEstimate && estimatedPrice && (
                          <p className="mt-1 text-xs text-neutral-400">
                            Approx. {estimatedPrice} (local exchange rate estimate)
                          </p>
                        )}
                        <p className="text-sm text-neutral-300 mt-4 leading-relaxed">
                          {card.summary[0]}
                        </p>
                        <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                          {card.summary[1]}
                        </p>
                      </div>

                      <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
                        <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                          Best for:
                        </p>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {card.bestFor}
                        </p>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <Button
                          href="#contact"
                          variant="primary"
                          className="justify-center text-sm px-6 py-3 font-semibold"
                        >
                          Inquire Flagship Scope
                        </Button>
                        <Button
                          onClick={() =>
                            openAIChat(`Can you explain the architecture and capabilities of the Bespoke Web App / Creative Tech Flagship package?`)
                          }
                          variant="secondary"
                          icon={<Bot className="w-4 h-4 text-neutral-400" />}
                          className="justify-center text-xs sm:text-sm"
                        >
                          Talk to AI
                        </Button>
                      </div>
                    </div>

                    {/* Right Column: Inclusions Grid */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-neutral-950/50 border border-neutral-800/80 rounded-xl p-6">
                      {/* Architecture */}
                      <div>
                        <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4 pb-2 border-b border-neutral-800 flex items-center justify-between">
                          <span>{card.pagesTitle}</span>
                        </p>
                        <ul className="space-y-3">
                          {card.pages.map((item, i) => (
                            <li key={i} className="text-xs text-neutral-300 flex items-start gap-2.5 leading-relaxed">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Deliverables */}
                      <div>
                        <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4 pb-2 border-b border-neutral-800 flex items-center justify-between">
                          <span>{card.extrasTitle}</span>
                        </p>
                        <ul className="space-y-3">
                          {card.extras.map((item, i) => (
                            <li key={i} className="text-xs text-neutral-300 flex items-start gap-2.5 leading-relaxed">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}

          <motion.div
            variants={itemVariants}
            className="mb-16 rounded-2xl border border-neutral-800 bg-neutral-950/40 overflow-hidden"
          >
            <div className="px-4 py-4 md:px-6 border-b border-neutral-800 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-white">Compare packages</p>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Use this table to see what changes between tiers. The jump from ₱10k → ₱30k adds{' '}
                  <span className="text-neutral-400">structure + verified lead forms</span>; ₱45k adds{' '}
                  <span className="text-neutral-400">Services, Gallery, Maps, and speed work</span>; ₱60k adds{' '}
                  <span className="text-neutral-400">Blog + FAQ + Testimonials</span> hubs; and the ₱100k–₱120k Flagship unlocks{' '}
                  <span className="text-neutral-400">interactive Desktop OS, Web Audio API, Gemini AI, and Headless CMS</span>.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openAIChat('Can you compare your website packages and recommend the best one for my budget?')}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg whitespace-nowrap self-start md:self-auto cursor-pointer transition-colors"
              >
                <Bot className="w-3.5 h-3.5 text-neutral-400" />
                <span>Talk to AI to compare</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-500 text-xs uppercase tracking-wider bg-neutral-900/30">
                    <th className="px-4 py-3 md:px-6 font-medium">Feature</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">₱10k</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">₱30k</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">₱45k</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">₱60k</th>
                    <th className="px-3 py-3 pr-4 md:pr-6 font-medium whitespace-nowrap text-white">₱100k–₱120k</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-300">
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-b border-neutral-800/80 last:border-0 hover:bg-neutral-900/20 transition-colors">
                      <td className="px-4 py-3 md:px-6 text-neutral-400 font-medium">{row.feature}</td>
                      <td className="px-3 py-3 text-neutral-300">{row.portfolio}</td>
                      <td className="px-3 py-3 text-neutral-300">{row.starter}</td>
                      <td className="px-3 py-3 text-neutral-300 font-medium">{row.business}</td>
                      <td className="px-3 py-3 text-neutral-300">{row.professional}</td>
                      <td className="px-3 py-3 pr-4 md:pr-6 text-neutral-200 font-medium">{row.flagship}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mb-16 rounded-2xl border border-neutral-800 bg-neutral-950/40 overflow-hidden"
          >
            <div className="px-4 py-5 md:px-6 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-sm md:text-base font-medium text-white">Modular Add-Ons & Maintenance Menu</p>
                <p className="text-xs text-neutral-400 mt-1">
                  Tailor your package with specialized integrations or retain on-demand engineering support.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openAIChat('Can you help me calculate custom add-ons for my website?')}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors"
                >
                  <Bot className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Talk to AI for add-ons</span>
                </button>
                <span className="inline-flex items-center text-xs text-neutral-400 font-mono bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg">
                  À la carte
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-500 text-xs uppercase tracking-wider bg-neutral-900/30">
                    <th className="px-4 py-3 md:px-6 font-medium">Add-On Service</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">Investment (PHP)</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">Timeline Impact</th>
                    <th className="px-4 py-3 pr-4 md:pr-6 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {addOnItems.map((item) => (
                    <tr key={item.name} className="hover:bg-neutral-900/20 transition-colors">
                      <td className="px-4 py-3.5 md:px-6 text-white font-medium whitespace-nowrap">{item.name}</td>
                      <td className="px-3 py-3.5 text-neutral-200 font-semibold whitespace-nowrap">{item.investmentPhp}</td>
                      <td className="px-3 py-3.5 whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 rounded text-xs bg-neutral-900 border border-neutral-800 text-neutral-300">
                          {item.timeline}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 pr-4 md:pr-6 text-neutral-400 text-xs md:text-sm leading-relaxed">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <QuoteCalculator />

          <motion.div
            variants={itemVariants}
            className="mb-16 rounded-2xl border border-neutral-800 bg-neutral-950/30 p-6 md:p-8"
          >
            <p className="text-sm font-medium text-white mb-2">Commercial Terms & Engagement Policy</p>
            <p className="text-xs text-neutral-400 mb-6">
              Standard policies applied across all client projects for mutual clarity and accountability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {engagementTerms.map((item) => (
                <div key={item.label} className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-5 flex flex-col">
                  <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">{item.label}</p>
                  <p className="text-sm text-neutral-300 leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10 py-6 border-t border-neutral-800"
          >
            {trustItems.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-sm text-neutral-400">
                <Check className="w-4 h-4 text-neutral-400 shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
