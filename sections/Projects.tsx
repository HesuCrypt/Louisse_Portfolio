import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { H2, H3, Body } from '../ui/Text';
import { Card } from '../ui/Card';
import { projects } from '../data/projects';
import { containerVariants, itemVariants } from '../motion/variants';
import { ArrowUpRight } from 'lucide-react';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Game' | 'Web App' | 'Business Site' | 'System'>('All');
  const filterOptions: Array<'All' | 'Game' | 'Web App' | 'Business Site' | 'System'> = [
    'All',
    'Game',
    'Web App',
    'Business Site',
    'System',
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="py-24 md:py-32">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.div variants={itemVariants} className="mb-12 md:mb-16">
            <H2>Projects</H2>
            <div className="flex flex-wrap gap-2 mt-6">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setActiveFilter(option)}
                  className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${
                    activeFilter === option
                      ? 'border-white text-black bg-white'
                      : 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'
                  }`}
                  aria-pressed={activeFilter === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div key={index} variants={itemVariants} className="h-full">
                <Card className="h-full flex flex-col justify-between min-h-[280px]">
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <H3>{project.title}</H3>
                      {project.live && (
                        <ArrowUpRight className="text-neutral-600 group-hover:text-white transition-colors" size={20} />
                      )}
                    </div>
                    <Body className="text-base text-neutral-400 line-clamp-3">
                      {project.description}
                    </Body>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-neutral-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider truncate mr-4">
                      {project.tech}
                    </span>
                    <span className="text-[10px] px-2 py-1 border border-neutral-800 rounded-full text-neutral-500 uppercase tracking-wider">
                      {project.category}
                    </span>
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inset-0 absolute z-10"
                        aria-label={`View ${project.title}`}
                      />
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};