import React from 'react';
import { motion } from 'framer-motion';
import { ProjectContact } from '../sections/ProjectContact';
import { Services } from '../sections/Services';
import { Divider } from '../ui/Divider';
import { Container } from '../ui/Container';
import { Body, H1, H2 } from '../ui/Text';
import { containerVariants, itemVariants } from '../motion/variants';

const testimonials = [
  {
    quote:
      "Everything was delivered fast and with great quality, especially with the tight timeline before the Mother’s Day season. Louisse did his best to meet the deadline. The design and theme matched our brand, and every request was handled well. We also appreciated the extra improvements and bonus features, like adding a map, even with our limited budget. Louisse is a great web development partner with clear communication. He explained what we needed to know, including the cost of maintaining the website. His honesty, knowledge, and ability to find ways for us to save money made the whole process smooth. I highly recommend the service we received.",
    author: 'Maricel',
    title: 'Owner',
    company: 'La Fleur',
  },
  {
    quote:
      'I really like how fast they work and how responsive the communication is. Even with the distance, keeping in touch was never an issue. Louisse provided clear scheduling, proper time management, and an honest roadmap for the work. I also appreciate how he manages his small team and keeps everything efficient. Communication is the main reason I prefer working with Louisse, because the process is simple and transparent, with weekly updates that clearly explain what was done.',
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
            <H2 className="mb-0">Testimonials</H2>
            <span className="text-neutral-500 text-sm">Proof of delivery, clarity, and communication</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
            {testimonials.map((item) => (
              <motion.div
                key={`${item.author}-${item.company}`}
                variants={itemVariants}
                className="relative p-6 md:p-10 border border-neutral-800 bg-neutral-900/20 hover:bg-neutral-900/40 transition-all duration-500 rounded-sm overflow-hidden flex flex-col h-full"
              >
                <div className="flex-1">
                  <Body className="text-neutral-200 max-w-none text-base md:text-lg">
                    “{item.quote}”
                  </Body>
                </div>
                <div className="mt-8 pt-6 border-t border-neutral-800/50">
                  <div className="text-white font-medium">{item.author}</div>
                  <div className="text-neutral-500 text-sm">{item.title}, {item.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export const ServicesPage: React.FC = () => {
  return (
    <>
      <section className="pt-32 pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm uppercase tracking-[0.24em] text-neutral-500 mb-4">Services</p>
            <H1 className="max-w-3xl mb-4">Website packages built for launch, conversion, and long-term growth.</H1>
            <Body className="text-neutral-400 !max-w-2xl">
              Choose a fixed-scope package, compare inclusions, and reach out when you want a version tailored to your niche.
            </Body>
          </motion.div>
        </Container>
      </section>
      <Services />
      <Divider />
      <Testimonials />
      <Divider />
      <ProjectContact />
    </>
  );
};
