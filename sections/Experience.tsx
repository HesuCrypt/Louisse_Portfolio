import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { experience, Job, RoleMilestone } from '../data/experience';
import { sectionMeta } from '../data/sections';
import { accordionTransition, containerVariants, itemVariants } from '../motion/variants';

/** Small square marker used instead of the previous coloured timeline dots. */
const Marker: React.FC<{ filled: boolean }> = ({ filled }) => (
  <span
    aria-hidden="true"
    className={`mt-1.5 h-2 w-2 shrink-0 ${filled ? 'bg-paper' : 'border border-line-strong'}`}
  />
);

const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="flex items-baseline gap-3">
        <span className="mt-1.5 h-1 w-2.5 shrink-0 bg-line-strong" aria-hidden="true" />
        <span className="text-[0.8125rem] leading-relaxed text-fg-muted">{item}</span>
      </li>
    ))}
  </ul>
);

/**
 * One connected role inside a multi-role engagement. Roadmaps are dropped here:
 * across three near-identical entries they read as future plans rather than a
 * delivery record, and the section is stronger without them.
 */
const RoleBlock: React.FC<{ role: RoleMilestone; isCurrent: boolean }> = ({ role, isCurrent }) => (
  <div>
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
      <div className="flex flex-wrap items-center gap-3">
        <Marker filled={isCurrent} />
        <h4 className="font-sans text-[0.9375rem] font-medium tracking-[-0.01em] text-fg">
          {role.role}
        </h4>
        {role.tag ? (
          <span
            className={`px-2 py-0.5 font-mono text-2xs tracking-wider2 uppercase ${
              isCurrent ? 'bg-paper text-ink' : 'border border-line-mid text-fg-dim'
            }`}
          >
            {role.tag}
          </span>
        ) : null}
      </div>
      <span className="tnum font-mono text-2xs text-fg-faint">{role.period}</span>
    </div>

    {role.highlight ? (
      <p className="mt-3 max-w-[68ch] text-[0.8125rem] leading-relaxed text-fg">{role.highlight}</p>
    ) : null}

    <p className="mt-3 max-w-[68ch] text-[0.8125rem] leading-relaxed text-fg-muted">{role.focus}</p>

    {role.connectedWorks?.length ? (
      <div className="mt-5 border-t border-line">
        <span className="sr-only">Selected work from this role</span>
        {role.connectedWorks.map((work) => (
          <a
            key={work.title}
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            className="sweep group/work relative flex items-baseline justify-between gap-4 border-b border-line py-3 last:border-b-0"
          >
            <span className="min-w-0">
              <span className="flex items-center gap-2 font-sans text-[0.8125rem] font-medium text-fg">
                {work.title}
                <ArrowUpRight size={12} className="text-fg-faint transition-colors group-hover/work:text-fg" />
              </span>
              <span className="mt-1 block text-2xs leading-relaxed text-fg-dim">
                {work.description}
              </span>
            </span>
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
      <>
        {job.connectedSummary ? (
          <p className="mb-7 max-w-[68ch] text-[0.8125rem] leading-relaxed text-fg-muted">
            {job.connectedSummary}
          </p>
        ) : null}
        <div className="space-y-8 border-l border-line pl-5 sm:pl-7">
          {job.roles!.map((role, roleIndex) => (
            <RoleBlock key={`${role.role}-${roleIndex}`} role={role} isCurrent={roleIndex === 0} />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
        {job.focus ? (
          <div className="bg-ink p-5">
            <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">Focus</span>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg-muted">{job.focus}</p>
          </div>
        ) : null}
        {job.highlight ? (
          <div className="bg-ink p-5">
            <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">
              Key Achievement
            </span>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg">{job.highlight}</p>
          </div>
        ) : null}
      </div>

      {job.roadmap?.length ? (
        <div>
          <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">
            Scope &amp; Approach
          </span>
          <div className="mt-3">
            <BulletList items={job.roadmap} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export const Experience: React.FC = () => {
  const { index, label } = sectionMeta('experience');
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            title="Roles, clients and delivery record"
            meta={`${experience.length} engagements`}
            description="Every engagement below states its outcome up front. Open a row for the full scope."
          />

          <motion.div variants={itemVariants} className="mt-10 border-t border-line">
            {experience.map((job, position) => {
              const isMultiRole = Array.isArray(job.roles) && job.roles.length > 0;
              const isOpen = openIndex === position;
              const panelId = `experience-panel-${position}`;

              const heading = isMultiRole ? job.company : job.role;
              const context = isMultiRole
                ? `${job.roles!.length} roles · ${job.period} · ${job.location}`
                : `${job.company} · ${job.period} · ${job.location}`;

              return (
                <div key={`${job.company}-${position}`} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : position)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className={`group flex w-full items-start justify-between gap-5 py-6 text-left transition-colors duration-200 ${
                      isOpen ? '' : 'hover:bg-panel'
                    }`}
                  >
                    <div className="flex min-w-0 items-start gap-3 md:gap-5">
                      <span className="tnum mt-1.5 font-mono text-2xs text-fg-faint">
                        {String(position + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                          <span className="font-sans text-lg font-medium tracking-[-0.02em] text-fg md:text-xl">
                            {heading}
                          </span>
                          {job.type ? (
                            <span className="border border-line-mid px-2 py-0.5 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                              {job.type}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                          {context}
                        </p>
                        {job.highlight ? (
                          <p className="mt-3 max-w-[62ch] text-[0.8125rem] leading-relaxed text-fg-muted">
                            {job.highlight}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <span className="mt-1 flex shrink-0 items-center gap-3">
                      <span className="hidden font-mono text-2xs tracking-wider2 text-fg-dim uppercase transition-colors group-hover:text-fg sm:block">
                        {isOpen ? 'Close' : 'Detail'}
                      </span>
                      <motion.span
                        aria-hidden="true"
                        className="grid h-6 w-6 place-items-center border border-line-mid text-fg-dim transition-colors group-hover:border-line-strong group-hover:text-fg"
                        animate={reduceMotion ? undefined : { rotate: isOpen ? 45 : 0 }}
                        transition={accordionTransition}
                      >
                        <Plus size={13} />
                      </motion.span>
                    </span>
                  </button>

                  {reduceMotion ? (
                    isOpen ? (
                      <div id={panelId} className="pb-8">
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
                          <div className="pb-8">
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
