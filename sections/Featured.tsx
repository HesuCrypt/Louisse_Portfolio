import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { H2, H3, Body, Label } from '../ui/Text';
import { Button } from '../ui/Button';
import { featured } from '../data/featured';
import { containerVariants, itemVariants } from '../motion/variants';
import { ArrowUpRight, Activity } from 'lucide-react';

export const Featured: React.FC = () => {
  return (
    <section id="featured" className="py-24 md:py-32 bg-neutral-900/10 scroll-mt-20">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.div variants={itemVariants} className="mb-12 flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
            <H2 className="mb-0">Current Platforms</H2>
            <span className="text-neutral-500 text-sm">Active Development & Maintenance</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {featured.map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="group relative p-6 md:p-10 border border-neutral-800 bg-neutral-900/20 hover:bg-neutral-900/40 transition-all duration-500 rounded-sm overflow-hidden flex flex-col"
              >
                {/* Live Indicator - Flow on Mobile, Absolute on Desktop */}
                <div className="flex md:absolute md:top-8 md:right-8 items-center gap-2.5 mb-6 md:mb-0">
                  <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] md:text-xs font-mono text-green-500 tracking-wider uppercase font-medium">
                    {item.status}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-between space-y-8">
                  <div>
                    <H3 className="text-2xl md:text-3xl mb-2">{item.company}</H3>
                    <Label className="text-neutral-500 mb-6 block">{item.role}</Label>
                    <Body className="text-neutral-400 max-w-md text-sm md:text-base">
                      {item.description}
                    </Body>
                  </div>

                  <div className="pt-8 border-t border-neutral-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                     <div className="flex items-center gap-2 text-white font-medium text-sm md:text-base">
                        <Activity size={16} className="text-neutral-500" />
                        {item.stat}
                     </div>
                     <Button 
                      href={item.link} 
                      variant="secondary"
                      className="w-full sm:w-auto justify-center text-sm"
                      icon={<ArrowUpRight size={16} />}
                     >
                      Visit Platform
                     </Button>
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