import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Body } from '../ui/Text';
import { Button } from '../ui/Button';
import { DataRow } from '../ui/DataRow';
import { skills } from '../data/skills';
import { sectionMeta } from '../data/sections';
import { servicePackages, trustItems } from '../data/services';
import { useLocalizedCurrency } from '../hooks/useLocalizedCurrency';
import { pushRoute } from '../utils/routing';
import { containerVariants, itemVariants } from '../motion/variants';
import { ArrowUpRight } from 'lucide-react';

export const Capabilities: React.FC = () => {
  const { formatPhpPrice, formatEstimatedPrice } = useLocalizedCurrency();
  const { index: sectionIndex, label } = sectionMeta('capabilities');

  return (
    <section id="capabilities" className="scroll-mt-[var(--topbar-h)] py-16 md:py-24">
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
            title="What I build, and what it costs"
            meta="Fixed scope · PHP"
            description="A stack I actually build with, not a keyword list. The rates below are fixed-scope packages — the full breakdown, comparison matrix, and add-ons live on the services page."
          />

          {/* Stack directory — each category enters on its own beat */}
          <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <motion.div key={group.category} variants={itemVariants} className="bg-ink p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-sans text-[13px] font-medium tracking-[-0.01em] text-fg">
                    {group.category}
                  </h3>
                  <span className="tnum font-mono text-2xs text-fg-faint">
                    {String(group.items.length).padStart(2, '0')}
                  </span>
                </div>
                <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                  {group.items.map((item) => (
                    <li key={item} className="font-mono text-xs leading-relaxed text-fg-dim">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Rates */}
          <motion.div
            variants={itemVariants}
            className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14"
          >
            <div className="lg:col-span-7">
              <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">
                Engagement Rates
              </span>
              <div className="mt-4 border-t border-line">
                {servicePackages.map((pack, index) => {
                  const estimate = formatEstimatedPrice(pack.maxPricePhp ?? pack.basePricePhp);
                  return (
                    <DataRow
                      key={pack.id}
                      index={String(index + 1).padStart(2, '0')}
                      label={pack.title}
                      value={
                        pack.maxPricePhp
                          ? `${formatPhpPrice(pack.basePricePhp)} – ${formatPhpPrice(pack.maxPricePhp)}`
                          : formatPhpPrice(pack.basePricePhp)
                      }
                      caption={estimate ? `${pack.scopeLine} · ≈ ${estimate}` : pack.scopeLine}
                    />
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-line lg:pl-14">
              <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">
                Working Terms
              </span>
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

              <Body className="mt-6 text-[0.8125rem]">
                Every engagement starts with a scoping call. Deposits are 50% upfront, 50% on
                staging sign-off — no retainer required unless you want ongoing care.
              </Body>

              <div className="mt-6 flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  onClick={() => pushRoute('/services')}
                  icon={<ArrowUpRight size={13} />}
                >
                  Full Comparison
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
