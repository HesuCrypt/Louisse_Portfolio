import React from 'react';
import { motion } from 'framer-motion';
import { About } from '../sections/About';
import { Experience } from '../sections/Experience';
import { GeneralContact } from '../sections/GeneralContact';
import { Hero } from '../sections/Hero';
import { Projects } from '../sections/Projects';
import { Skills } from '../sections/Skills';
import { Divider } from '../ui/Divider';
import { Container } from '../ui/Container';
import { H2 } from '../ui/Text';
import { containerVariants, itemVariants } from '../motion/variants';

const testimonials = [
  {
    lead: "Delivered fast and with great quality, especially with our tight timeline before Mother’s Day.",
    body: "Louisse worked tirelessly to meet the deadline. The design matched our brand perfectly, and every request was handled seamlessly—including bonus improvements within budget. Clear communication, technical honesty, and finding ways to save us money made the whole process smooth.",
    author: 'Maricel',
    title: 'Owner',
    company: 'La Fleur',
  },
  {
    lead: "I really like how fast they work and how responsive the communication is.",
    body: "Even with the distance, keeping in touch was never an issue. Louisse provided clear scheduling, an honest roadmap, and transparent weekly updates. Communication and efficiency are why I prefer working with Louisse.",
    author: 'Jonathan',
    title: 'Owner',
    company: 'Meridian Auctions',
  },
] as const;

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-neutral-900/10">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          <motion.div variants={itemVariants} className="mb-12 flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Client Endorsements</p>
              <H2 className="mb-0">Testimonials</H2>
            </div>
            <span className="text-neutral-400 text-xs md:text-sm">Feedback from founders and teams I’ve worked with</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
            {testimonials.map((item) => (
              <motion.div
                key={`${item.author}-${item.company}`}
                variants={itemVariants}
                className="relative p-6 md:p-8 border border-neutral-800 bg-neutral-900/20 hover:bg-neutral-900/40 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                  <p className="text-white font-medium text-base md:text-lg leading-snug">
                    “{item.lead}”
                  </p>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
                <div className="mt-8 pt-5 border-t border-neutral-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold text-sm">{item.author}</div>
                    <div className="text-neutral-400 text-xs mt-0.5">{item.title}, {item.company}</div>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-400">
                    Verified Client
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Projects />
      <Divider />
      <Experience />
      <Divider />
      <Skills />
      <Divider />
      <Testimonials />
      <Divider />
      <GeneralContact />
    </>
  );
};
