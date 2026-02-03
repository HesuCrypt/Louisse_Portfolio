import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { H2, Body } from '../ui/Text';
import { socials } from '../data/socials';
import { containerVariants, itemVariants } from '../motion/variants';
import { ArrowUpRight } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 md:py-40">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="max-w-4xl"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <H2>Let's work together</H2>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-12">
            <Body className="text-xl md:text-2xl text-neutral-300 max-w-2xl">
              I'm always interested in new projects and collaborations. 
              Whether you have a question or just want to say hi, feel free to reach out.
            </Body>
          </motion.div>

          <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-3">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target={social.url.startsWith('mailto') ? undefined : '_blank'}
                rel={social.url.startsWith('mailto') ? undefined : 'noreferrer'}
                className="group flex items-center justify-between p-6 border border-neutral-900 bg-surface/30 hover:bg-neutral-900 transition-colors rounded-sm"
              >
                <div className="flex items-center gap-4">
                  <social.icon className="text-neutral-400 group-hover:text-white transition-colors" size={24} />
                  <div>
                    <span className="block text-white font-medium">{social.name}</span>
                    <span className="text-xs text-neutral-500 uppercase tracking-wider">{social.label}</span>
                  </div>
                </div>
                <ArrowUpRight className="text-neutral-700 group-hover:text-white transition-colors" size={20} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};