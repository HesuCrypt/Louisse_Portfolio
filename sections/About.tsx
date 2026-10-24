import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Body } from '../ui/Text';
import { Button } from '../ui/Button';
import { DataRow } from '../ui/DataRow';
import { profile } from '../data/profile';
import { sectionMeta } from '../data/sections';
import { containerVariants, itemVariants } from '../motion/variants';
import { scrollToSection, pushRoute } from '../utils/routing';
import { ArrowUpRight } from 'lucide-react';

const credentials = [
  { label: 'Current Focus', value: 'Lead IT — Web & AI', caption: 'ISSY Cosmetics' },
  { label: 'Primary Stack', value: 'React · Next.js · TS', caption: 'Tailwind, Node, MySQL, Supabase' },
  { label: 'AI & Automation', value: 'n8n · Claude · ADK', caption: 'Custom agents & pipelines' },
  { label: 'Location', value: 'Manila, PH', caption: 'Remote / async worldwide' },
];

export const About: React.FC = () => {
  const { index: sectionIndex, label } = sectionMeta('about');

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
            description="The short version: I build the website, the systems behind it, and the automation that keeps it running."
          />

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Portrait */}
            <motion.div variants={itemVariants} className="lg:col-span-5">
              <div className="border border-line-mid">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-panel">
                  <img
                    src="/louisse-portrait.jpg"
                    alt="Louisse Dominique Bertillo — Web Developer & AI Implementation"
                    className="h-full w-full object-cover object-center grayscale contrast-[1.05]"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-line px-4 py-3">
                  <span className="font-mono text-2xs tracking-wider2 text-fg-muted uppercase">
                    Louisse Dominique Bertillo
                  </span>
                  <span className="font-mono text-2xs tracking-wider2 text-fg-faint uppercase">
                    Manila · Remote
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-line">
                {credentials.map((row, index) => (
                  <DataRow
                    key={row.label}
                    index={String(index + 1).padStart(2, '0')}
                    label={row.label}
                    value={row.value}
                    caption={row.caption}
                  />
                ))}
              </div>
            </motion.div>

            {/* Narrative */}
            <motion.div variants={itemVariants} className="flex flex-col lg:col-span-7 lg:border-l lg:border-line lg:pl-14">
              <div className="space-y-5">
                {profile.about.description.split('\n\n').map((paragraph) => (
                  <Body key={paragraph.slice(0, 24)} className="text-base md:text-[1.0625rem]">
                    {paragraph}
                  </Body>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
                <div className="bg-ink p-6">
                  <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">
                    How I Work
                  </span>
                  <p className="mt-3 text-[0.8125rem] leading-relaxed text-fg-muted">
                    Fixed scope, clear milestones, and a staging link you can review before anything
                    goes live. You always know what is being built and when it ships.
                  </p>
                </div>
                <div className="bg-ink p-6">
                  <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">
                    What I Optimize For
                  </span>
                  <p className="mt-3 text-[0.8125rem] leading-relaxed text-fg-muted">
                    Load speed, conversion, and the operational cost of maintaining the thing after
                    launch — not just how it looks on day one.
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                <Button onClick={() => scrollToSection('contact')} icon={<ArrowUpRight size={13} />}>
                  Start a Conversation
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => pushRoute('/services')}
                  icon={<ArrowUpRight size={13} />}
                >
                  Services &amp; Rates
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
