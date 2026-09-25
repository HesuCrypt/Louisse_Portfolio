import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { H2, H3, Body } from '../ui/Text';
import { Card } from '../ui/Card';
import { Project, projects } from '../data/projects';
import { containerVariants, itemVariants } from '../motion/variants';
import { sound } from '../utils/sound';
import { openAIChat } from '../ui/AIChatWidget';
import { ArrowUpRight, X, Sparkles, CheckCircle2, Github, ExternalLink, Bot, Layers } from 'lucide-react';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Game' | 'Web App' | 'Business Site' | 'System'>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

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

  // Lock scroll when modal is open
  useEffect(() => {
    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          sound.playClick();
          setActiveModalProject(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeModalProject]);

  const handleOpenModal = (project: Project) => {
    sound.playPop();
    setActiveModalProject(project);
  };

  const handleCloseModal = () => {
    sound.playClick();
    setActiveModalProject(null);
  };

  const handleAskAIAboutProject = (project: Project) => {
    sound.playPop();
    setActiveModalProject(null);
    const prompt = `Hi! Can you tell me more about Louisse's "${project.title}" project? Specifically, how was it architected using ${project.tech}, and what challenges were solved?`;
    openAIChat(prompt);
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative scroll-mt-20">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          <motion.div variants={itemVariants} className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">Portfolio Directory</p>
              <H2 className="mb-0">Selected Projects</H2>
            </div>
            <div className="flex overflow-x-auto pb-1.5 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap gap-2 scrollbar-none">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveFilter(option);
                  }}
                  className={`px-3.5 py-1.5 rounded-full border text-xs font-mono transition-colors cursor-pointer shrink-0 ${
                    activeFilter === option
                      ? 'border-white text-black bg-white font-medium'
                      : 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 bg-neutral-900/30'
                  }`}
                  aria-pressed={activeFilter === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>

          <div key={activeFilter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <motion.div key={project.title} variants={itemVariants} className="h-full">
                <Card
                  onClick={() => handleOpenModal(project)}
                  className="h-full flex flex-col justify-between min-h-[300px] cursor-pointer group hover:border-neutral-600 transition-all duration-300 relative"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-2">
                        <H3 className="group-hover:text-white transition-colors">{project.title}</H3>
                        {project.featured && (
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                            Featured
                          </span>
                        )}
                      </div>
                      <ArrowUpRight
                        className="text-neutral-600 group-hover:text-white transition-colors flex-shrink-0"
                        size={18}
                      />
                    </div>
                    <Body className="text-sm text-neutral-400 line-clamp-3 leading-relaxed">
                      {project.description}
                    </Body>
                  </div>

                  <div className="mt-8 pt-6 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                    <span className="font-mono text-neutral-500 truncate mr-3 text-[11px]">
                      {project.tech}
                    </span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] font-mono px-2 py-0.5 border border-neutral-800 rounded-full text-neutral-400 uppercase bg-neutral-900/40">
                        {project.category}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-300 group-hover:text-white group-hover:underline flex items-center gap-1 transition-colors">
                        Details
                        <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>

      {/* Case Study & Technical Architecture Quick-View Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-6 md:p-8 shadow-2xl text-neutral-200 z-10 space-y-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-neutral-800 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
                      {activeModalProject.category}
                    </span>
                    {activeModalProject.featured && (
                      <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
                        Featured Build
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight">
                    {activeModalProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
                  aria-label="Close project modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Overview */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Overview</span>
                <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                  {activeModalProject.description}
                </p>
              </div>

              {/* Highlights */}
              {activeModalProject.highlights && activeModalProject.highlights.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Key Deliverables &amp; Technical Highlights
                  </span>
                  <div className="space-y-2">
                    {activeModalProject.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-300">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architecture & Engineering */}
              {activeModalProject.architecture && (
                <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <Layers size={14} className="text-neutral-300" />
                    <span>System Architecture</span>
                  </div>
                  <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-mono">
                    {activeModalProject.architecture}
                  </p>
                </div>
              )}

              {/* Tech Stack */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Technologies Used
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tech.split(',').map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300"
                    >
                      {t.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  {activeModalProject.live && (
                    <a
                      href={activeModalProject.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors"
                    >
                      <span>Visit Live Platform</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {activeModalProject.github && (
                    <a
                      href={activeModalProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 text-xs transition-colors"
                    >
                      <Github size={14} />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleAskAIAboutProject(activeModalProject)}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer py-1"
                >
                  <Bot size={14} className="text-emerald-400" />
                  <span>Ask AI about this project</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};