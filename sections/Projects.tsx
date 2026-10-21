import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { H2, H3, Body, Label } from '../ui/Text';
import { Card } from '../ui/Card';
import { Project, projects } from '../data/projects';
import { featured } from '../data/featured';
import { containerVariants, itemVariants } from '../motion/variants';
import { openAIChat } from '../ui/AIChatWidget';
import { ArrowUpRight, X, Sparkles, CheckCircle2, Github, ExternalLink, Bot, Layers, Activity } from 'lucide-react';

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
    setActiveModalProject(project);
  };

  const handleCloseModal = () => {
    setActiveModalProject(null);
  };

  const handleAskAIAboutProject = (project: Project) => {
    setActiveModalProject(null);
    const prompt = `Hi! Can you tell me more about Louisse's "${project.title}" project? Specifically, how was it architected using ${project.tech}, and what challenges were solved?`;
    openAIChat(prompt);
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative scroll-mt-20">
      {/* Anchor for backward compatibility with #featured links */}
      <span id="featured" className="absolute -top-24 pointer-events-none" />

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="space-y-16 md:space-y-20"
        >
          {/* Main Section Header */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Portfolio</p>
              <H2 className="mb-0">Selected Work</H2>
            </div>
            <span className="text-neutral-400 text-xs md:text-sm">Commercial platforms, client builds, and interactive systems</span>
          </motion.div>

          {/* Flagship Case Studies Grid */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Flagship Client Work &amp; Case Studies</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {featured.map((item, index) => (
                <div
                  key={index}
                  className="group relative p-6 md:p-8 border border-neutral-800 bg-neutral-900/20 hover:bg-neutral-900/40 transition-all duration-300 rounded-2xl flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300">
                        {item.status}
                      </span>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors p-1"
                        >
                          <span>Visit Platform</span>
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>

                    <div>
                      <H3 className="text-xl md:text-2xl mb-1">{item.company}</H3>
                      <p className="text-xs font-mono text-neutral-400 mb-3">{item.role}</p>
                      <Body className="text-neutral-300 text-sm md:text-base leading-relaxed">
                        {item.description}
                      </Body>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center gap-2 text-white font-medium text-xs md:text-sm">
                    <Activity size={15} className="text-neutral-400" />
                    <span>{item.stat}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Directory & Systems */}
          <motion.div variants={itemVariants} className="space-y-8 pt-6 border-t border-neutral-800/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg md:text-xl font-medium text-white">Technical Directory &amp; Experiments</h3>
                <p className="text-xs text-neutral-400 mt-0.5">Click any project to inspect technical architecture &amp; source code</p>
              </div>

              <div className="flex overflow-x-auto pb-1.5 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap gap-2 scrollbar-none">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setActiveFilter(option)}
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
            </div>

            <div key={activeFilter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.title} className="h-full">
                  <Card
                    onClick={() => handleOpenModal(project)}
                    className="h-full flex flex-col justify-between min-h-[260px] cursor-pointer group hover:border-neutral-600 transition-all duration-300 relative"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <H3 className="group-hover:text-white transition-colors text-lg md:text-xl">{project.title}</H3>
                          {project.featured && (
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                              Featured
                            </span>
                          )}
                        </div>
                        <ArrowUpRight
                          className="text-neutral-500 group-hover:text-white transition-colors flex-shrink-0"
                          size={16}
                        />
                      </div>
                      <Body className="text-xs md:text-sm text-neutral-300 line-clamp-3 leading-relaxed">
                        {project.description}
                      </Body>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                      <span className="font-mono text-neutral-400 truncate mr-2 text-[11px]">
                        {project.tech}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 border border-neutral-800 rounded-full text-neutral-300 uppercase bg-neutral-900/60 shrink-0">
                        {project.category}
                      </span>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </motion.div>
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
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl text-neutral-200 z-10 overflow-hidden"
            >
              {/* Sticky Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-neutral-800 p-5 sm:p-6 bg-neutral-950 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300">
                      {activeModalProject.category}
                    </span>
                    {activeModalProject.featured && (
                      <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
                        Featured Build
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium text-white tracking-tight">
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

              {/* Scrollable Modal Content */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
                {/* Overview */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Overview</span>
                  <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                    {activeModalProject.description}
                  </p>
                </div>

                {/* Highlights */}
                {activeModalProject.highlights && activeModalProject.highlights.length > 0 && (
                  <div className="space-y-3 pt-1">
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
              </div>

              {/* Sticky Action Footer */}
              <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950/95 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  {activeModalProject.live && (
                    <a
                      href={activeModalProject.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors"
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
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 text-xs transition-colors"
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