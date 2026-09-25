import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { H2, Body, Label } from '../ui/Text';
import { profile } from '../data/profile';
import { containerVariants, itemVariants } from '../motion/variants';
import { scrollToSection, pushRoute } from '../utils/routing';
import { MapPin, Briefcase, Sparkles, ArrowUpRight, Code2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 scroll-mt-20 relative overflow-hidden">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Label className="text-neutral-400">About Me</Label>
              <H2 className="mb-0">{profile.about.title}</H2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900/60 border border-neutral-800 px-3.5 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Select Client Projects</span>
            </div>
          </motion.div>

          {/* Main Grid: Portrait on Left, Narrative & Credentials on Right */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Portrait Card & Key Metrics */}
            <div className="lg:col-span-5 space-y-6">
              {/* Photo Frame */}
              <div className="relative group">
                {/* Subtle ambient blur behind the card */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-neutral-700/20 via-neutral-500/10 to-transparent rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition duration-700 pointer-events-none" />

                <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/40 shadow-2xl">
                  {/* Portrait Image */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-950">
                    <img
                      src="/louisse-portrait.jpg"
                      alt="Louisse Dominique Bertillo – Web Developer & AI Specialist"
                      className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/25 to-transparent opacity-85 pointer-events-none" />

                    {/* Integrated Photo Caption Pill */}
                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-medium text-white tracking-wide">Louisse Dominique Bertillo</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5 font-mono">
                          Lead IT &amp; AI Implementation @ ISSY
                        </p>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-mono">Manila, PH</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Metrics Underneath */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-neutral-900/30 border border-neutral-800 text-center">
                  <div className="text-xl font-bold text-white font-mono">+170%</div>
                  <div className="text-[11px] text-neutral-400 mt-1 leading-tight">E-Com Sales Lift</div>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-900/30 border border-neutral-800 text-center">
                  <div className="text-xl font-bold text-white font-mono">3.4k</div>
                  <div className="text-[11px] text-neutral-400 mt-1 leading-tight">Peak Game Players</div>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-900/30 border border-neutral-800 text-center">
                  <div className="text-xl font-bold text-white font-mono">5+ Yrs</div>
                  <div className="text-[11px] text-neutral-400 mt-1 leading-tight">Shipping Web Apps</div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio Narrative & Quick Credentials */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-5 text-neutral-300">
                {profile.about.description.split('\n\n').map((paragraph, index) => (
                  <Body key={index} className="text-base md:text-lg leading-relaxed text-neutral-300">
                    {paragraph}
                  </Body>
                ))}
              </div>

              {/* Credentials & Role Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-800/80">
                <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-800/70 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                    <Briefcase size={14} className="text-neutral-300" />
                    <span>Current Focus</span>
                  </div>
                  <div className="text-sm font-medium text-white">Lead IT - Web &amp; AI Implementation</div>
                  <div className="text-xs text-neutral-400">ISSY Cosmetics</div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-800/70 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                    <MapPin size={14} className="text-neutral-300" />
                    <span>Location &amp; Work Model</span>
                  </div>
                  <div className="text-sm font-medium text-white">Manila, Philippines</div>
                  <div className="text-xs text-neutral-400">Available Globally (Remote / Async)</div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-800/70 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                    <Code2 size={14} className="text-neutral-300" />
                    <span>Primary Stack</span>
                  </div>
                  <div className="text-sm font-medium text-white">React, Next.js, TypeScript</div>
                  <div className="text-xs text-neutral-400">Tailwind, Node, MySQL, Supabase</div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-800/70 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                    <Sparkles size={14} className="text-neutral-300" />
                    <span>AI &amp; Automation</span>
                  </div>
                  <div className="text-sm font-medium text-white">n8n, Claude AI &amp; OpenAI</div>
                  <div className="text-xs text-neutral-400">Custom Agents &amp; Customer Support</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  <span>Start a Conversation</span>
                  <ArrowUpRight size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => pushRoute('/services')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 text-neutral-200 border border-neutral-800 text-sm hover:border-neutral-700 hover:text-white transition-colors cursor-pointer"
                >
                  <span>View Services &amp; Pricing</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};