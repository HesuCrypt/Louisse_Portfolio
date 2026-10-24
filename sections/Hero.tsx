import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { H1, Body } from '../ui/Text';
import { Button } from '../ui/Button';
import { DataRow } from '../ui/DataRow';
import { CountUp } from '../ui/CountUp';
import { LocalTime } from '../ui/LocalTime';
import { WordReveal } from '../ui/WordReveal';
import { profile } from '../data/profile';
import { containerVariants, itemVariants } from '../motion/variants';
import { scrollToSection } from '../utils/routing';
import { ArrowUpRight } from 'lucide-react';

/**
 * Proof points taken straight from the experience data. Every figure here is
 * traceable to a delivery record — nothing is an estimate or a rounded-up
 * claim, which is why the years-of-experience badge that used to live here was
 * removed.
 */
const performanceLog = [
  {
    index: '01',
    label: 'Sales Lift',
    value: <CountUp to={170} prefix="+" suffix="%" />,
    caption: 'ISSY Cosmetics',
  },
  { index: '02', label: 'Peak Concurrency', value: <CountUp to={3400} />, caption: 'Fruit Jam campaign' },
  {
    index: '03',
    label: 'Campaign Traffic',
    value: <CountUp to={120} suffix="K+" />,
    caption: 'Requests in 72 hours',
  },
  { index: '04', label: 'Based In', value: 'MANILA', caption: 'Working remotely worldwide' },
];

const clients = [
  { name: 'ISSY', detail: 'Storefront & AI' },
  { name: 'Meridian Auctions', detail: 'Full-stack, Germany' },
  { name: 'La Fleur', detail: 'Florist storefront' },
];

export const Hero: React.FC = () => {
  return (
    <section id="top" className="relative overflow-hidden scroll-mt-[var(--topbar-h)]">
      {/* Engineered measurement grid: slowly drifting, faded out toward the fold */}
      <div
        aria-hidden="true"
        className="bg-grid grid-drift mask-fade-b pointer-events-none absolute inset-0 opacity-70"
      />

      <Container className="relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-y-12 py-[clamp(2.75rem,8vh,5.5rem)] xl:grid-cols-[1.12fr_0.88fr] xl:gap-y-0"
        >
          {/* Identity column */}
          <div className="xl:pr-14">
            <motion.p
              variants={itemVariants}
              className="font-mono text-2xs tracking-label text-fg-dim uppercase"
            >
              <span className="tnum text-fg-muted">01</span>
              <span className="px-2 text-line-strong">/</span>
              <span>Identity</span>
            </motion.p>

            {/* Role label sitting directly above the headline — one glance, no sentence */}
            <motion.p
              variants={itemVariants}
              className="mt-6 font-mono text-[11px] tracking-wider2 text-fg uppercase"
            >
              {profile.title}
            </motion.p>

            <div className="mt-4">
              <H1>
                <WordReveal text={profile.hero.headline} />
              </H1>
            </div>

            <motion.div variants={itemVariants} className="mt-6">
              <Body className="max-w-[52ch] text-base md:text-lg">{profile.hero.subtext}</Body>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Button
                onClick={() => scrollToSection('experience')}
                icon={<ArrowUpRight size={13} />}
                className="justify-center sm:justify-start"
              >
                See the Work
              </Button>
              <Button
                variant="secondary"
                onClick={() => scrollToSection('contact')}
                className="justify-center sm:justify-start"
              >
                Contact
              </Button>
              <Button
                variant="secondary"
                href="/resume.pdf"
                download="Louisse_Dominique_Bertillo_Resume.pdf"
                className="justify-center sm:justify-start"
              >
                Download Resume
              </Button>
            </motion.div>

            {/* Status strip — live clock, availability, scroll cue */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5 font-mono text-2xs tracking-wider2 text-fg-faint uppercase"
            >
              <span className="flex items-center gap-2.5">
                <span className="relative flex h-1.5 w-1.5">
                  <motion.span
                    className="absolute inset-0 bg-paper"
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </span>
                <span className="text-fg-muted">Available for select projects</span>
              </span>

              <span className="text-fg-dim">
                Manila · <LocalTime />
              </span>

              <span className="hidden items-center gap-3 sm:flex">
                <span>Scroll</span>
                <motion.span
                  aria-hidden="true"
                  className="block h-px w-10 origin-left bg-line-strong"
                  animate={{ scaleX: [0.15, 1, 0.15] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </span>
            </motion.div>
          </div>

          {/* Performance log column */}
          <motion.div variants={itemVariants} className="xl:border-l xl:border-line xl:pl-14">
            <div className="flex items-baseline justify-between gap-6">
              <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">
                Performance Log
              </span>
              <span className="font-mono text-2xs tracking-wider2 text-fg-faint uppercase">
                Verified
              </span>
            </div>

            <div className="mt-5 border-t border-line">
              {performanceLog.map((row) => (
                <DataRow
                  key={row.label}
                  index={row.index}
                  label={row.label}
                  value={row.value}
                  caption={row.caption}
                />
              ))}
            </div>

            <div className="mt-8 border-t border-line pt-5">
              <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">
                Selected Clients
              </span>
              <ul className="mt-4 grid grid-cols-1 gap-px bg-line sm:grid-cols-3">
                {clients.map((client) => (
                  <li
                    key={client.name}
                    className="bg-ink py-4 pr-4 sm:px-0 sm:first:pr-4 sm:[&:not(:first-child)]:pl-4"
                  >
                    <span className="block font-sans text-[13px] leading-tight font-medium tracking-[-0.01em] text-fg">
                      {client.name}
                    </span>
                    <span className="mt-1 block font-mono text-2xs text-fg-dim">{client.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
