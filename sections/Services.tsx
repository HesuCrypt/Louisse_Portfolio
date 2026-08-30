import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { featured } from '../data/featured';
import { comparisonRows, engagementTerms, servicePackages, trustItems } from '../data/services';
import { useLocalizedCurrency } from '../hooks/useLocalizedCurrency';
import { containerVariants, itemVariants } from '../motion/variants';
import { Button } from '../ui/Button';
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
          <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-16">
            <H2 className="mb-4">Website Development Services</H2>
            <Body className="text-neutral-400 !max-w-none">
              Four fixed packages so scope is clear. You pay for page depth, integrations (forms, maps), and the amount of
              layout + content systems (blog, FAQ, testimonials). Everything below is what typically ships in each tier. Tell
              me your niche and we align copy and sections.
            </Body>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {servicePackages.map((card) => {
              const estimatedPrice = formatEstimatedPrice(card.basePricePhp);

              return (
                <motion.div key={card.id} variants={itemVariants} className="relative">
                  <motion.article
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className={`h-full flex flex-col rounded-2xl border bg-neutral-900/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-neutral-600 hover:shadow-xl hover:shadow-black/20 ${
                      card.popular
                        ? 'border-white/30 shadow-lg shadow-white/5 lg:scale-[1.05] z-10'
                        : 'border-neutral-800'
                    }`}
                  >
                    {card.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-neutral-900 border border-white">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                      <p className="text-2xl font-bold text-white">{formatPhpPrice(card.basePricePhp)}</p>
                      {showEstimate && estimatedPrice && (
                        <>
                          <p className="mt-2 text-sm text-neutral-400">Approx. {estimatedPrice}</p>
                          <p className="mt-1 text-[11px] text-neutral-500">
                            Estimated local price based on current exchange rates
                          </p>
                        </>
                      )}
                      <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{card.scopeLine}</p>
                      <div className="mt-3 space-y-2 text-xs text-neutral-500 leading-relaxed border-t border-neutral-800/80 pt-3">
                        <p>{card.summary[0]}</p>
                        <p>{card.summary[1]}</p>
                      </div>
                    </div>

                    <div className="space-y-4 flex-1">
                      <div>
                        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                          {card.pagesTitle}
                        </p>
                        <ul className="space-y-1.5">
                          {card.pages.map((item, i) => (
                            <li key={i} className="text-sm text-neutral-300 flex items-center gap-2">
                              <Check className="w-4 h-4 text-neutral-400 shrink-0" />
                              {item}
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
                            <li key={i} className="text-sm text-neutral-300 flex items-center gap-2">
                              <Check className="w-4 h-4 text-neutral-400 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2">
                        <p className="text-xs text-neutral-500 mb-1">Best for:</p>
                        <p className="text-sm text-neutral-400">{card.bestFor}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-neutral-800">
                      <Button
                        href="#contact"
                        variant={card.popular ? 'primary' : 'secondary'}
                        className="w-full justify-center"
                      >
                        Get Started
                      </Button>
                    </div>
                  </motion.article>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            variants={itemVariants}
            className="mb-16 rounded-2xl border border-neutral-800 bg-neutral-950/40 overflow-hidden"
          >
            <div className="px-4 py-4 md:px-6 border-b border-neutral-800">
              <p className="text-sm font-medium text-white">Compare packages</p>
              <p className="text-xs text-neutral-500 mt-1">
                Use this table to see what changes between tiers. The big jump from ₱5k → ₱30k is mostly{' '}
                <span className="text-neutral-400">structure + a real contact form</span>; ₱40k adds{' '}
                <span className="text-neutral-400">more pages, Maps, gallery, and speed work</span>; ₱45k adds{' '}
                <span className="text-neutral-400">blog + FAQ + testimonials</span> as full site sections.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-500 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 md:px-6 font-medium">Feature</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">₱5k</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">₱30k</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">₱40k</th>
                    <th className="px-3 py-3 pr-4 md:pr-6 font-medium whitespace-nowrap">₱45k</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-300">
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-b border-neutral-800/80 last:border-0">
                      <td className="px-4 py-3 md:px-6 text-neutral-400">{row.feature}</td>
                      <td className="px-3 py-3 text-neutral-300">{row.portfolio}</td>
                      <td className="px-3 py-3 text-neutral-300">{row.starter}</td>
                      <td className="px-3 py-3 text-neutral-300">{row.business}</td>
                      <td className="px-3 py-3 pr-4 md:pr-6 text-neutral-300">{row.professional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mb-16 rounded-2xl border border-neutral-800 bg-neutral-950/30 p-6 md:p-8"
          >
            <p className="text-sm font-medium text-white mb-5">Engagement Terms</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {engagementTerms.map((item) => (
                <div key={item.label} className="rounded-xl border border-neutral-800 p-4">
                  <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">{item.label}</p>
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
