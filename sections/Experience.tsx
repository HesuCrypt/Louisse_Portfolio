import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { experience, Job, RoleMilestone } from '../data/experience';
import { sectionMeta } from '../data/sections';
import { accordionTransition, containerVariants, itemVariants } from '../motion/variants';
import { sound } from '../utils/sound';

const Marker: React.FC<{ filled: boolean }> = ({ filled }) => (
  <span
    aria-hidden="true"
    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
      filled ? 'bg-emerald-400' : 'border border-line-strong'
    }`}
  />
);

const RoleBlock: React.FC<{ role: RoleMilestone; isCurrent: boolean }> = ({ role, isCurrent }) => (
  <div className="rounded-lg border border-line bg-ink p-4">
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
      <div className="flex flex-wrap items-center gap-2.5">
        <Marker filled={isCurrent} />
        <h4 className="font-sans text-sm font-semibold tracking-[-0.01em] text-fg">
          {role.role}
        </h4>
        {role.tag ? (
          <span
            className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-wider2 uppercase ${
              isCurrent
                ? 'border border-emerald-500/30 bg-emerald-500/15 text-emerald-400'
                : 'border border-line-mid text-fg-dim'
            }`}
          >
            {role.tag}
          </span>
        ) : null}
      </div>
      <span className="tnum font-mono text-2xs text-fg-faint">{role.period}</span>
    </div>

    {role.highlight ? (
      <p className="mt-2.5 text-xs leading-relaxed text-fg-muted">{role.highlight}</p>
    ) : (
      <p className="mt-2.5 text-xs leading-relaxed text-fg-muted">{role.focus}</p>
    )}

    {role.connectedWorks?.length ? (
      <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-3">
        {role.connectedWorks.map((work) => (
          <a
            key={work.title}
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/work inline-flex items-center gap-1.5 rounded-full border border-line-mid bg-panel px-3 py-1 font-mono text-2xs text-fg-muted transition-colors hover:border-paper hover:text-fg"
          >
            <span>{work.title}</span>
            <ArrowUpRight size={11} className="text-fg-faint group-hover/work:text-fg" />
          </a>
        ))}
      </div>
    ) : null}
  </div>
);

const JobDetail: React.FC<{ job: Job }> = ({ job }) => {
  const isMultiRole = Array.isArray(job.roles) && job.roles.length > 0;

  if (isMultiRole) {
    return (
      <div className="grid grid-cols-1 gap-3 pt-2 md:grid-cols-3">
        {job.roles!.map((role, roleIndex) => (
          <RoleBlock key={`${role.role}-${roleIndex}`} role={role} isCurrent={roleIndex === 0} />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-line bg-ink p-4">
      <p className="text-xs leading-relaxed text-fg-muted">{job.focus}</p>
      {job.website && (
        <a
          href={job.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 font-mono text-2xs text-fg uppercase underline decoration-line-strong underline-offset-4 hover:text-paper"
        >
          <span>Visit Live Platform</span>
          <ArrowUpRight size={11} />
        </a>
      )}
    </div>
  );
};

export const Experience: React.FC = () => {
  const { index, label } = sectionMeta('experience');
  const reduceMotion = useReducedMotion();
  // Start all collapsed so the user clicks only the engagement they want to read
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="scroll-mt-[var(--topbar-h)] py-16 md:py-24">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          <SectionHeader
            index={index}
            label={label}
            title="Track Record & Leadership"
            meta="Click to expand role"
            description="Select any engagement below to view role progression, deliverables, and live work."
          />

          <motion.div variants={itemVariants} className="mt-10 space-y-4">
            {experience.map((job, position) => {
              const isMultiRole = Array.isArray(job.roles) && job.roles.length > 0;
              const isOpen = openIndex === position;
              const panelId = `experience-panel-${position}`;

              const heading =
                job.company === 'ISSY Cosmetics'
                  ? 'IT officer - Web developer & AI automation - ISSY Cosmetics'
                  : isMultiRole
                    ? job.company
                    : `${job.role} · ${job.company}`;

              return (
                <div
                  key={`${job.company}-${position}`}
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? 'border-white/30 bg-[#111216]'
                      : 'border-white/10 bg-[#0c0d11] hover:border-white/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setOpenIndex(isOpen ? null : position);
                    }}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="tnum font-mono text-xs text-fg-dim">
                          {String(position + 1).padStart(2, '0')}
                        </span>
                        <span className="font-sans text-base sm:text-lg font-semibold tracking-tight text-white">
                          {heading}
                        </span>
                        {job.type ? (
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-xs text-fg-muted uppercase">
                            {job.type}
                          </span>
                        ) : null}
                      </div>

                      {job.highlight && (
                        <p className="font-mono text-xs leading-relaxed text-emerald-400">
                          &bull; {job.highlight}
                        </p>
                      )}
                    </div>

                    <span className="flex shrink-0 items-center gap-4">
                      <span className="tnum hidden font-mono text-xs text-fg-dim sm:inline">
                        {job.period}
                      </span>
                      <motion.span
                        aria-hidden="true"
                        className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/5 text-fg-dim transition-colors group-hover:border-white group-hover:text-white"
                        animate={reduceMotion ? undefined : { rotate: isOpen ? 45 : 0 }}
                        transition={accordionTransition}
                      >
                        <Plus size={14} />
                      </motion.span>
                    </span>
                  </button>

                  {reduceMotion ? (
                    isOpen ? (
                      <div id={panelId} className="px-6 pb-6 pt-2">
                        <JobDetail job={job} />
                      </div>
                    ) : null
                  ) : (
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={panelId}
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={accordionTransition}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2">
                            <JobDetail job={job} />
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
