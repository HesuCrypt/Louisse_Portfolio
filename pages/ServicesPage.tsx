import React from 'react';
import { motion } from 'framer-motion';
import { ProjectContact } from '../sections/ProjectContact';
import { Services } from '../sections/Services';
import { Divider } from '../ui/Divider';
import { Container } from '../ui/Container';
import { Body, H1 } from '../ui/Text';
import { SectionHeader } from '../ui/SectionHeader';
import { containerVariants, itemVariants } from '../motion/variants';

const testimonials = [
  {
    quote:
      "Everything was delivered fast and with great quality, especially with the tight timeline before the Mother’s Day season. Louisse worked tirelessly to meet the deadline. The design and theme matched our brand, and every request was handled well. We also appreciated the extra improvements and bonus features, like adding a map, even with our limited budget. Louisse is a great web development partner with clear communication, thoroughly explaining what we needed to know, including the cost of maintaining the website. That honesty, knowledge, and ability to find ways for us to save money made the whole process smooth. I highly recommend the service we received.",
    author: 'Maricel',
    title: 'Owner',
    company: 'La Fleur',
  },
  {
    quote:
      'I really like how fast they work and how responsive the communication is. Even with the distance, keeping in touch was never an issue. Louisse provided clear scheduling, proper time management, and an honest roadmap for the work. I also appreciate how Louisse manages the team and keeps everything efficient. Communication is the main reason I prefer working with Louisse, because the process is simple and transparent, with weekly updates that clearly explain what was done.',
    author: 'Jonathan',
    title: 'Owner',
    company: 'Meridian Auctions',
  },
] as const;

/** Short spec strip under the hero — the page's own "index". */
const heroFacts = [
  { label: 'Packages', value: '05 tiers' },
  { label: 'Pricing', value: 'Fixed scope · PHP' },
  { label: 'Payment', value: '50% deposit · 50% delivery' },
  { label: 'Coverage', value: 'Manila · Worldwide' },
] as const;

const Testimonials: React.FC = () => (
  <section className="py-16 md:py-24">
    <Container>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
      >
        <SectionHeader
          index="11"
          label="Testimonials"
          title="Proof of delivery, clarity, and communication"
          meta="Client feedback"
        />

        <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-2">
          {testimonials.map((item) => (
            <motion.figure
              key={`${item.author}-${item.company}`}
              variants={itemVariants}
              className="flex h-full flex-col justify-between bg-ink p-6 md:p-8"
            >
              <blockquote className="text-[0.9375rem] leading-[1.75] text-fg-muted">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-8 border-t border-line pt-5">
                <span className="block font-sans text-sm text-fg">{item.author}</span>
                <span className="mt-1 block font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                  {item.title}, {item.company}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </Container>
  </section>
);

export const ServicesPage: React.FC = () => (
  <>
    <section className="py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-2xs tracking-label text-fg-dim uppercase">
            <span className="tnum text-fg-muted">09</span>
            <span className="px-2 text-line-strong">/</span>
            <span>Services &amp; Rates</span>
          </p>

          <H1 className="mt-6 max-w-[48rem]">
            Website &amp; web app packages built for launch, conversion, and creative impact.
          </H1>

          <Body className="mt-6 max-w-[62ch] text-base md:text-[1.0625rem]">
            Choose a fixed-scope package, compare inclusions and add-ons, and reach out when you want
            a version tailored to your brand.
          </Body>

          <dl className="mt-12 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
            {heroFacts.map((fact) => (
              <div key={fact.label} className="bg-ink p-5">
                <dt className="font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-2 font-mono text-xs text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>
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
