import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { sectionMeta } from '../data/sections';
import { containerVariants, itemVariants } from '../motion/variants';

const endorsements = [
  {
    lead: 'Delivered fast and with great quality, especially with our tight timeline before Mother’s Day.',
    body: 'Louisse worked tirelessly to meet the deadline. The design matched our brand perfectly, and every request was handled seamlessly, including bonus improvements within budget. Clear communication, technical honesty, and finding ways to save us money made the whole process smooth.',
    author: 'Maricel',
    title: 'Owner',
    company: 'La Fleur',
  },
  {
    lead: 'I really like how fast they work and how responsive the communication is.',
    body: 'Even with the distance, keeping in touch was never an issue. Louisse provided clear scheduling, an honest roadmap, and transparent weekly updates. Communication and efficiency are why I prefer working with Louisse.',
    author: 'Jonathan',
    title: 'Owner',
    company: 'Meridian Auctions',
  },
] as const;

export const Endorsements: React.FC = () => {
  const { index: sectionIndex, label } = sectionMeta('testimonials');

  return (
    <section id="testimonials" className="scroll-mt-[var(--topbar-h)] py-16 md:py-24">
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
            title="What clients say"
            meta="Verified clients"
          />

          <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-2">
            {endorsements.map((item, index) => (
              <motion.figure
                key={`${item.author}-${item.company}`}
                variants={itemVariants}
                className="flex h-full flex-col justify-between bg-ink p-6 md:p-8"
              >
                <div>
                  <span className="tnum font-mono text-2xs text-fg-faint">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <blockquote className="mt-6">
                    <p className="font-sans text-lg leading-[1.35] font-medium tracking-[-0.02em] text-fg md:text-xl">
                      “{item.lead}”
                    </p>
                    <p className="mt-5 max-w-[62ch] text-[0.8125rem] leading-relaxed text-fg-muted">
                      {item.body}
                    </p>
                  </blockquote>
                </div>

                <figcaption className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
                  <span>
                    <span className="block font-sans text-[13px] font-medium text-fg">{item.author}</span>
                    <span className="mt-0.5 block font-mono text-2xs text-fg-dim">
                      {item.title}, {item.company}
                    </span>
                  </span>
                  <span className="border border-line-mid px-2 py-0.5 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                    Verified
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
