import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { H2, Body } from '../ui/Text';
import { profile } from '../data/profile';
import { containerVariants, itemVariants } from '../motion/variants';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 scroll-mt-20">
      <Container>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.div variants={itemVariants}>
            <H2>{profile.about.title}</H2>
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8 lg:col-span-9">
               <div className="space-y-6">
                {profile.about.description.split('\n\n').map((paragraph, index) => (
                  <Body key={index} className="text-lg md:text-xl leading-relaxed">
                    {paragraph}
                  </Body>
                ))}
              </div>
            </div>
            
            {/* Optional Sidebar info if needed, keeping it clean for now per brief */}
            <div className="md:col-span-4 lg:col-span-3 text-sm text-neutral-500 space-y-4 pt-2 md:pt-0 border-l border-neutral-900 md:pl-8 md:border-none">
              <div>
                <span className="block text-white mb-1">Location</span>
                Remote / Worldwide
              </div>
              <div>
                <span className="block text-white mb-1">Status</span>
                Available for work
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};