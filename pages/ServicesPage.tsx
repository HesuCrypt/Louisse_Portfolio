import React from 'react';
import { motion } from 'framer-motion';
import { ProjectContact } from '../sections/ProjectContact';
import { Services } from '../sections/Services';
import { Divider } from '../ui/Divider';
import { Container } from '../ui/Container';
import { Body, H1 } from '../ui/Text';

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
      <ProjectContact />
    </>
  );
};
