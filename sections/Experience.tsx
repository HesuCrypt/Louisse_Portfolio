import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { H2, H3, Body, Label } from '../ui/Text';
import { Button } from '../ui/Button';
import { experience } from '../data/experience';
import { containerVariants, itemVariants } from '../motion/variants';
import { ExternalLink } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 md:py-32 scroll-mt-20">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.div variants={itemVariants} className="mb-16">
            <H2>Experience</H2>
          </motion.div>

          <div className="space-y-12">
            {experience.map((job, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-4 gap-y-4 md:gap-8 group border-b border-neutral-900/50 pb-12 last:border-0"
              >
                <div className="md:col-span-1">
                  <span className="text-neutral-500 text-sm font-mono">{job.period}</span>
                </div>
                
                <div className="md:col-span-3 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                    <div>
                      <H3 className="mb-0">{job.role}</H3>
                      <span className="text-neutral-400">{job.company}</span>
                    </div>
                    <Button 
                      href={job.website} 
                      variant="link" 
                      className="text-xs text-neutral-500 hover:text-white"
                      icon={<ExternalLink size={12} />}
                    >
                      Visit
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-neutral-400 pt-2">
                    <div>
                      <span className="text-neutral-600 block mb-1 uppercase text-[10px] tracking-wider">Focus</span>
                      {job.focus}
                    </div>
                    {job.highlight && (
                      <div>
                        <span className="text-neutral-600 block mb-1 uppercase text-[10px] tracking-wider">Highlight</span>
                        <span className="text-white">{job.highlight}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};