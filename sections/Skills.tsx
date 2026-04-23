import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { H2 } from '../ui/Text';
import { skills } from '../data/skills';
import { containerVariants, itemVariants } from '../motion/variants';

export const Skills: React.FC = () => {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.div variants={itemVariants} className="mb-16">
            <H2>Technical Expertise</H2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-6 xl:gap-8">
            {skills.map((skillGroup) => (
              <motion.div key={skillGroup.category} variants={itemVariants} className="space-y-4 min-w-0">
                <h4 className="text-white font-medium border-b border-neutral-800 pb-2 mb-4 text-sm">
                  {skillGroup.category}
                </h4>
                <ul className="space-y-3">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} className="text-neutral-400 text-sm hover:text-white transition-colors duration-200 cursor-default break-words">
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};