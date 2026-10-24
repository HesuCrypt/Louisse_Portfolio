import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { H3, Body } from '../ui/Text';
import { featured } from '../data/featured';
import { sectionMeta } from '../data/sections';
import { containerVariants, itemVariants } from '../motion/variants';
import { ArrowUpRight } from 'lucide-react';

export const Projects: React.FC = () => {
  const { index: sectionIndex, label } = sectionMeta('projects');

  return (
    <section id="projects" className="relative scroll-mt-[var(--topbar-h)] py-16 md:py-24">
      {/* Keeps historical #featured deep links working */}
      <span id="featured" className="pointer-events-none absolute -top-24" aria-hidden="true" />

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
            title="Commercial platforms and client builds"
            meta="Case Studies"
            description="A short list of engagements where the outcome is measurable — revenue, concurrency, or platform stability."
          />

          <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-2">
            {featured.map((item, index) => (
              <motion.article
                key={item.company}
                variants={itemVariants}
                className="sweep group relative flex flex-col justify-between bg-ink p-6 transition-colors duration-200 hover:bg-panel md:p-8"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="tnum font-mono text-2xs text-fg-faint">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="border border-line-mid px-2 py-0.5 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-6">
                    <H3 className="text-xl md:text-2xl">{item.company}</H3>
                    <p className="mt-2 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                      {item.role}
                    </p>
                  </div>

                  <Body className="mt-4 text-[0.9375rem]">{item.description}</Body>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
                  <span className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 bg-paper" aria-hidden="true" />
                    <span className="font-mono text-2xs tracking-wider2 text-fg uppercase">{item.stat}</span>
                  </span>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-2xs tracking-wider2 text-fg-dim uppercase transition-colors hover:text-fg"
                  >
                    <span>Visit</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
