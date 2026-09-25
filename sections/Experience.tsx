import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { H2, H3 } from '../ui/Text';
import { Button } from '../ui/Button';
import { experience, Job, RoleMilestone } from '../data/experience';
import { containerVariants, itemVariants } from '../motion/variants';
import { ExternalLink, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 md:py-32 scroll-mt-20">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          <motion.div variants={itemVariants} className="mb-16">
            <H2>Experience</H2>
          </motion.div>

          <div className="space-y-16">
            {experience.map((job: Job, index: number) => {
              const isMultiRole = Array.isArray(job.roles) && job.roles.length > 0;

              return (
                <motion.div
                  key={`${job.company}-${index}`}
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-4 gap-y-6 md:gap-8 group border-b border-neutral-900/80 pb-16 last:border-0"
                >
                  {/* Left Column: Period & Meta */}
                  <div className="md:col-span-1">
                    <span className="text-neutral-400 text-sm font-mono font-medium block">
                      {job.period}
                    </span>
                    <div className="text-neutral-500 text-xs mt-1.5">{job.location}</div>

                    {isMultiRole && (
                      <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>3 Connected Roles</span>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Experience Details */}
                  <div className="md:col-span-3 space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
                      <div>
                        {isMultiRole ? (
                          <>
                            <H3 className="text-2xl md:text-3xl font-medium mb-1">{job.company}</H3>
                            <span className="text-neutral-500 text-xs uppercase tracking-widest font-mono">
                              Continuous Technical Leadership &amp; Engineering Progression
                            </span>
                          </>
                        ) : (
                          <>
                            <H3 className="mb-0">{job.role}</H3>
                            <span className="text-neutral-400 text-sm">{job.company}</span>
                          </>
                        )}
                      </div>

                      {job.website && (
                        <Button
                          href={job.website}
                          variant="link"
                          className="text-xs text-neutral-400 hover:text-white shrink-0"
                          icon={<ExternalLink size={12} />}
                        >
                          Visit Company
                        </Button>
                      )}
                    </div>

                    {/* Multi-Role Connected Timeline (e.g. ISSY Cosmetics) */}
                    {isMultiRole ? (
                      <div className="space-y-6">
                        {/* Overall Company Summary Callout */}
                        {job.connectedSummary && (
                          <div className="p-4 rounded-lg bg-neutral-900/30 border border-neutral-800/80 space-y-2">
                            {job.highlight && (
                              <div className="flex items-center gap-2 text-xs font-medium text-white">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                <span>{job.highlight}</span>
                              </div>
                            )}
                            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
                              {job.connectedSummary}
                            </p>
                          </div>
                        )}

                        {/* Connected Vertical Timeline */}
                        <div className="relative pl-6 sm:pl-8 border-l border-neutral-800/80 space-y-10 my-4 ml-2 sm:ml-3">
                          {job.roles!.map((roleItem: RoleMilestone, roleIndex: number) => {
                            const isCurrent = roleIndex === 0;

                            return (
                              <div key={`${roleItem.role}-${roleIndex}`} className="relative space-y-3">
                                {/* Connector Dot */}
                                <span
                                  className={`absolute -left-[29px] sm:-left-[37px] top-1.5 h-3 w-3 rounded-full ring-4 ring-background transition-all ${
                                    isCurrent
                                      ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                                      : 'bg-neutral-600'
                                  }`}
                                  aria-hidden="true"
                                />

                                {/* Role Header & Badges */}
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex flex-wrap items-center gap-2.5">
                                    <h4 className="text-base md:text-lg font-medium text-white">
                                      {roleItem.role}
                                    </h4>
                                    {roleItem.tag && (
                                      <span
                                        className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full ${
                                          isCurrent
                                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                                            : 'bg-neutral-800 text-neutral-400 border border-neutral-700/60'
                                        }`}
                                      >
                                        {roleItem.tag}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-neutral-400 text-xs font-mono">
                                    {roleItem.period}
                                  </span>
                                </div>

                                {/* Highlight */}
                                {roleItem.highlight && (
                                  <div className="inline-flex items-center gap-1.5 text-xs text-neutral-200 bg-neutral-900/80 border border-neutral-800 px-2.5 py-1 rounded">
                                    <span className="text-neutral-400 font-mono text-[10px] uppercase">Highlight:</span>
                                    <span>{roleItem.highlight}</span>
                                  </div>
                                )}

                                {/* Focus Description */}
                                <p className="text-sm text-neutral-400 leading-relaxed pt-1">
                                  {roleItem.focus}
                                </p>

                                {/* Roadmap / Milestones */}
                                {roleItem.roadmap && roleItem.roadmap.length > 0 && (
                                  <div className="pt-2">
                                    <span className="text-neutral-500 block mb-2 uppercase text-[10px] font-mono tracking-wider">
                                      Key Initiatives &amp; Impact
                                    </span>
                                    <ul className="space-y-1.5">
                                      {roleItem.roadmap.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                                          <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Connected ISSY Projects & Work */}
                                {roleItem.connectedWorks && roleItem.connectedWorks.length > 0 && (
                                  <div className="pt-3">
                                    <span className="text-neutral-500 block mb-2 uppercase text-[10px] font-mono tracking-wider">
                                      Connected Campaign Launches &amp; Platforms
                                    </span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                      {roleItem.connectedWorks.map((work, wIdx) => (
                                        <div
                                          key={wIdx}
                                          className="p-3 rounded-md border border-neutral-800/80 bg-neutral-900/40 hover:bg-neutral-900/70 hover:border-neutral-700 transition-all flex flex-col justify-between space-y-1.5"
                                        >
                                          <div className="flex items-center justify-between gap-2">
                                            <span className="text-white text-xs font-medium">{work.title}</span>
                                            {work.link && (
                                              <a
                                                href={work.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-neutral-400 hover:text-white transition-colors"
                                                title={`Open ${work.title}`}
                                              >
                                                <ArrowUpRight className="w-3.5 h-3.5" />
                                              </a>
                                            )}
                                          </div>
                                          <p className="text-[11px] text-neutral-400 leading-normal">
                                            {work.description}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* Single-Role Job Layout (e.g. La Fleur, Meridian Auctions, Prime Philippines) */
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-neutral-400 pt-1">
                          <div>
                            <span className="text-neutral-600 block mb-1 uppercase text-[10px] tracking-wider">
                              Focus
                            </span>
                            {job.focus}
                          </div>
                          {job.highlight && (
                            <div>
                              <span className="text-neutral-600 block mb-1 uppercase text-[10px] tracking-wider">
                                Highlight
                              </span>
                              <span className="text-white">{job.highlight}</span>
                            </div>
                          )}
                        </div>

                        {job.roadmap && job.roadmap.length > 0 && (
                          <div className="pt-2">
                            <span className="text-neutral-600 block mb-2 uppercase text-[10px] tracking-wider">
                              Deliverables
                            </span>
                            <ul className="space-y-2">
                              {job.roadmap.map((item, itemIndex) => (
                                <li key={itemIndex} className="relative pl-6 text-xs text-neutral-300">
                                  <span
                                    className="absolute left-0 top-[0.4rem] h-1.5 w-1.5 rounded-full bg-neutral-500"
                                    aria-hidden="true"
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
