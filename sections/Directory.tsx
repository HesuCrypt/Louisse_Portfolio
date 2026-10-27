import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { H3, Body } from '../ui/Text';
import { Button } from '../ui/Button';
import { Project, projects } from '../data/projects';
import { sectionMeta } from '../data/sections';
import { containerVariants, itemVariants, transitions } from '../motion/variants';
import { openAIChat } from '../ui/AIChatWidget';
import { ArrowUpRight, X, Github, ExternalLink, Bot } from 'lucide-react';

const filterOptions: Array<'All' | Project['category']> = [
  'All',
  'Game',
  'Web App',
  'Business Site',
  'System',
];

export const Directory: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | Project['category']>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const { index: sectionIndex, label } = sectionMeta('directory');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (!activeModalProject) return;

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveModalProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalProject]);

  const handleAskAIAboutProject = (project: Project) => {
    setActiveModalProject(null);
    const prompt = `Hi! Can you tell me more about Louisse's "${project.title}" project? Specifically, how was it architected using ${project.tech}, and what challenges were solved?`;
    openAIChat(prompt);
  };

  return (
    <section id="directory" className="scroll-mt-[var(--topbar-h)] py-16 md:py-24">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          <SectionHeader
            index={sectionIndex}
            label={label}
            title="Systems, experiments and open builds"
            meta={`${filteredProjects.length} / ${projects.length} entries`}
            description="Technical architecture, live deployments, and source repositories across select software builds."
          />

          <div className="mt-8 flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setActiveFilter(option)}
                aria-pressed={activeFilter === option}
                className={`border px-3.5 py-2 font-mono text-2xs tracking-wider2 uppercase transition-colors duration-200 ${
                  activeFilter === option
                    ? 'border-paper bg-paper text-ink'
                    : 'border-line-mid text-fg-dim hover:border-line-strong hover:text-fg'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
              <motion.button
                key={project.title}
                type="button"
                variants={itemVariants}
                onClick={() => setActiveModalProject(project)}
                className="sweep group relative flex h-full flex-col justify-between gap-8 bg-ink p-6 text-left transition-colors duration-200 hover:bg-panel"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="tnum font-mono text-2xs text-fg-faint">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                      {project.category}
                    </span>
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-3">
                    <H3 className="group-hover:text-fg">{project.title}</H3>
                    <ArrowUpRight
                      size={15}
                      className="mt-0.5 shrink-0 text-fg-faint transition-colors group-hover:text-fg"
                    />
                  </div>

                  <Body className="mt-3 line-clamp-3 text-[0.8125rem] leading-relaxed">
                    {project.description}
                  </Body>
                </div>

                <div className="border-t border-line pt-4">
                  <p className="font-mono text-2xs leading-relaxed text-fg-dim">{project.tech}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveModalProject(null)}
              className="fixed inset-0 bg-ink/90"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeModalProject.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={transitions.ease}
              className="relative z-10 flex max-h-[88vh] w-full max-w-2xl flex-col border border-line-strong bg-panel"
            >
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-line p-5 md:p-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="border border-line-mid px-2 py-0.5 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                      {activeModalProject.category}
                    </span>
                    {activeModalProject.featured ? (
                      <span className="border border-paper bg-paper px-2 py-0.5 font-mono text-2xs tracking-wider2 text-ink uppercase">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-4 font-sans text-lg leading-tight font-medium tracking-[-0.02em] text-fg md:text-xl">
                    {activeModalProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalProject(null)}
                  className="-m-1 shrink-0 p-1 text-fg-dim transition-colors hover:text-fg"
                  aria-label="Close project detail"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 space-y-7 overflow-y-auto p-5 md:p-6">
                <div>
                  <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">Overview</span>
                  <p className="mt-2 text-[0.9375rem] leading-[1.7] text-fg-muted">
                    {activeModalProject.description}
                  </p>
                </div>

                {activeModalProject.highlights?.length ? (
                  <div>
                    <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">
                      Key Deliverables
                    </span>
                    <ul className="mt-3 border-t border-line">
                      {activeModalProject.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-baseline gap-3 border-b border-line py-2.5 last:border-b-0"
                        >
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-paper" aria-hidden="true" />
                          <span className="text-[0.8125rem] leading-relaxed text-fg-muted">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {activeModalProject.architecture ? (
                  <div className="border border-line-mid p-4">
                    <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">
                      System Architecture
                    </span>
                    <p className="mt-2 font-mono text-xs leading-relaxed text-fg-muted">
                      {activeModalProject.architecture}
                    </p>
                  </div>
                ) : null}

                <div>
                  <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">
                    Technologies Used
                  </span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeModalProject.tech.split(',').map((tech) => (
                      <span
                        key={tech}
                        className="border border-line-mid px-2.5 py-1 font-mono text-2xs text-fg-muted"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-3 border-t border-line p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.live ? (
                    <Button href={activeModalProject.live} icon={<ExternalLink size={13} />}>
                      Live
                    </Button>
                  ) : null}
                  {activeModalProject.github ? (
                    <Button
                      variant="secondary"
                      href={activeModalProject.github}
                      icon={<Github size={13} />}
                    >
                      Source
                    </Button>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={() => handleAskAIAboutProject(activeModalProject)}
                  className="inline-flex items-center gap-2 font-mono text-2xs tracking-wider2 text-fg-dim uppercase transition-colors hover:text-fg"
                >
                  <Bot size={13} />
                  <span>Ask AI about this</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
