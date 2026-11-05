import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { containerVariants, itemVariants } from '../motion/variants';
import { scrollToSection } from '../utils/routing';
import { sound } from '../utils/sound';
import { Check, Copy, ArrowUpRight, Handshake, Calculator } from 'lucide-react';
import { BuildItem } from '../components/builder/BuildItem';

interface ReferralTier {
  id: string;
  label: string;
  projectValue: number;
  rate: number;
  payout: string;
  scope: string;
}

const REFERRAL_TIERS: ReferralTier[] = [
  {
    id: 'starter',
    label: 'Starter Build',
    projectValue: 30000,
    rate: 15,
    payout: '₱4,500',
    scope: '5-page conversion website or landing page',
  },
  {
    id: 'business',
    label: 'Business System',
    projectValue: 45000,
    rate: 15,
    payout: '₱6,750',
    scope: 'Full website + booking / inquiry automation',
  },
  {
    id: 'authority',
    label: 'Authority + AI',
    projectValue: 60000,
    rate: 20,
    payout: '₱12,000',
    scope: 'Custom web platform + AI chatbot & CRM pipeline',
  },
  {
    id: 'enterprise',
    label: 'Custom App / E-Com',
    projectValue: 100000,
    rate: 20,
    payout: '₱20,000+',
    scope: 'Bespoke Shopify Plus or full-stack SaaS build',
  },
];

export const ReferralBanner: React.FC = () => {
  const [selectedTierId, setSelectedTierId] = useState<string>('authority');
  const [copied, setCopied] = useState(false);

  const activeTier =
    REFERRAL_TIERS.find((t) => t.id === selectedTierId) || REFERRAL_TIERS[2];

  const handleCopyReferral = async () => {
    sound.playClick();
    try {
      await navigator.clipboard.writeText('https://louissebaja.com/#contact');
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Ignore clipboard fallback
    }
  };

  return (
    <section id="referral" className="scroll-mt-[var(--topbar-h)] py-12 md:py-16">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          {/* Main Referral Section Container Frame */}
          <BuildItem
            id="ref-container"
            section="referral"
            order={1}
            channel="alpha"
            type="frame"
            className="relative overflow-hidden rounded-2xl border border-line-strong bg-panel p-6 sm:p-8 md:p-10"
          >
            {/* Subtle Grid Backdrop */}
            <div
              aria-hidden="true"
              className="bg-grid-sm pointer-events-none absolute inset-0 opacity-30"
            />

            <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              {/* Left Column: Partner Pitch & 3-Step Flow (Handled concurrently by Track Alpha) */}
              <div className="lg:col-span-6">
                <BuildItem
                  id="ref-badge"
                  section="referral"
                  order={2}
                  channel="alpha"
                  type="stamp"
                  origin="left center"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-2xs tracking-wider2 text-emerald-300 uppercase"
                >
                  <Handshake size={12} />
                  <span>Partner &amp; Agency Referral Program</span>
                </BuildItem>

                <h2 className="mt-4 max-w-[22ch] font-sans text-2xl leading-[1.12] font-semibold tracking-[-0.03em] text-fg sm:text-3xl md:text-4xl">
                  <BuildItem
                    as="span"
                    id="ref-heading"
                    section="referral"
                    order={3}
                    channel="alpha"
                    type="typewriter"
                    content="Refer a project. Share the revenue."
                    className="block"
                  />
                </h2>

                <BuildItem
                  as="p"
                  id="ref-description"
                  section="referral"
                  order={4}
                  channel="alpha"
                  type="frame"
                  className="mt-3 max-w-[46ch] font-sans text-sm leading-relaxed text-fg-muted"
                >
                  Know a founder, brand, or agency needing a high-converting website or AI automation? Introduce us and earn up to{' '}
                  <span className="font-medium text-fg">20% commission</span> on every closed build.
                </BuildItem>

                {/* 3-Step Mini Pipeline */}
                <div className="mt-6 grid grid-cols-3 gap-2.5">
                  {[
                    { step: '01', title: 'Intro Client', sub: 'Share link or email' },
                    { step: '02', title: 'We Scope & Ship', sub: 'Zero work for you' },
                    { step: '03', title: 'Instant Payout', sub: '15%–20% commission' },
                  ].map((item, idx) => (
                    <BuildItem
                      key={item.step}
                      id={`ref-step-${idx}`}
                      section="referral"
                      order={5 + idx}
                      channel="alpha"
                      type="stamp"
                      className="rounded-xl border border-line bg-ink/60 p-3"
                    >
                      <span className="font-mono text-[10px] text-emerald-400">
                        STEP {item.step}
                      </span>
                      <p className="mt-1 font-sans text-xs font-medium text-fg">
                        {item.title}
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] text-fg-faint">
                        {item.sub}
                      </p>
                    </BuildItem>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <BuildItem
                    as="span"
                    id="ref-btn-intro"
                    section="referral"
                    order={8}
                    channel="alpha"
                    type="stamp"
                    className="inline-flex"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        scrollToSection('contact');
                      }}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-paper px-4 py-2.5 font-mono text-2xs font-semibold tracking-wider2 text-ink uppercase transition-transform hover:scale-[1.02]"
                    >
                      <span>Introduce a Client</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </BuildItem>

                  <BuildItem
                    as="span"
                    id="ref-btn-copy"
                    section="referral"
                    order={9}
                    channel="alpha"
                    type="stamp"
                    className="inline-flex"
                  >
                    <button
                      type="button"
                      onClick={handleCopyReferral}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line-mid bg-ink px-4 py-2.5 font-mono text-2xs tracking-wider2 text-fg-muted uppercase transition-colors hover:border-paper hover:text-fg"
                    >
                      {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copied ? 'Link Copied' : 'Copy Partner Link'}</span>
                    </button>
                  </BuildItem>
                </div>
              </div>

              {/* Right Column: Interactive Commission Payout Calculator (Handled concurrently by Track Beta) */}
              <div className="lg:col-span-6">
                <BuildItem
                  id="ref-estimator-box"
                  section="referral"
                  order={2}
                  channel="beta"
                  type="frame"
                  accent="cyan"
                  className="rounded-xl border border-line-mid bg-ink/90 p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <span className="flex items-center gap-2 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                      <Calculator size={13} className="text-cyan-400" />
                      <span>Interactive Commission Estimator</span>
                    </span>
                    <span className="font-mono text-[10px] text-fg-faint uppercase">
                      Select Tier
                    </span>
                  </div>

                  {/* Interactive Tier Selector Pills */}
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {REFERRAL_TIERS.map((tier, tIdx) => {
                      const isSelected = tier.id === activeTier.id;
                      return (
                        <BuildItem
                          key={tier.id}
                          id={`ref-tier-tab-${tier.id}`}
                          section="referral"
                          order={3 + tIdx}
                          channel="beta"
                          type="click"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              sound.playClick();
                              setSelectedTierId(tier.id);
                            }}
                            className={`w-full cursor-pointer rounded-lg border px-3 py-2.5 text-left transition-all duration-150 ${
                              isSelected
                                ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                                : 'border-line bg-panel/60 text-fg-muted hover:border-line-strong hover:text-fg'
                            }`}
                          >
                            <span className="block font-mono text-[10px] uppercase opacity-75">
                              ₱{(tier.projectValue / 1000).toFixed(0)}K Tier
                            </span>
                            <span className="mt-0.5 block truncate font-sans text-xs font-semibold">
                              {tier.label}
                            </span>
                          </button>
                        </BuildItem>
                      );
                    })}
                  </div>

                  {/* Calculated Payout Output Card */}
                  <BuildItem
                    id="ref-payout-card"
                    section="referral"
                    order={7}
                    channel="beta"
                    type="frame"
                    className="mt-4 rounded-xl border border-line bg-panel p-4 sm:p-5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-4">
                      <div>
                        <span className="font-mono text-[10px] tracking-wider2 text-fg-faint uppercase">
                          Estimated Partner Payout ({activeTier.rate}% Share)
                        </span>
                        <BuildItem
                          id="ref-payout-amount"
                          section="referral"
                          order={8}
                          channel="beta"
                          type="typewriter"
                          content={activeTier.payout}
                          className="tnum mt-1 font-sans text-3xl font-bold tracking-[-0.03em] text-cyan-400 sm:text-4xl"
                        />
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-[10px] tracking-wider2 text-fg-faint uppercase">
                          Project Scope
                        </span>
                        <p className="tnum mt-1 font-mono text-sm font-semibold text-fg">
                          ₱{activeTier.projectValue.toLocaleString()} PHP
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 border-t border-line pt-3 font-mono text-xs text-fg-dim">
                      Includes: <span className="text-fg-muted">{activeTier.scope}</span>
                    </p>
                  </BuildItem>
                </BuildItem>
              </div>
            </div>
          </BuildItem>
        </motion.div>
      </Container>
    </section>
  );
};
