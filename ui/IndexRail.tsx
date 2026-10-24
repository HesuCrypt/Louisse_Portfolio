import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { sections } from '../data/sections';
import { scrollToSection } from '../utils/routing';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Tracks which section currently sits at the vertical centre of the viewport.
 * A thin centre band (rootMargin -45%/-45%) means the active item changes at
 * the moment a new section takes over the screen, rather than when any sliver
 * of it appears.
 */
function useActiveSection(): string {
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.5, 1] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return active;
}

/**
 * Desktop-only pinned index rail. Only rendered from 1280px up, where there is
 * genuine spare width for it.
 */
export const DesktopIndexRail: React.FC = () => {
  const active = useActiveSection();
  const reduceMotion = useReducedMotion();

  return (
    <nav
      aria-label="Section index"
      className="fixed inset-y-0 left-0 z-40 hidden w-[var(--rail-w)] flex-col items-center justify-center gap-0.5 border-r border-line bg-ink xl:flex"
    >
      {sections.map((section, position) => {
        const isActive = active === section.id;
        return (
          <motion.button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            aria-label={`Jump to ${section.label}`}
            aria-current={isActive ? 'true' : undefined}
            initial={reduceMotion ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.12 + position * 0.035, ease }}
            className={`group flex w-full flex-col items-center gap-2 py-2.5 font-mono text-2xs tracking-wider2 transition-colors duration-200 ${
              isActive ? 'text-fg' : 'text-fg-faint hover:text-fg-muted'
            }`}
          >
            <span className="tnum">{section.index}</span>
            <span
              className={`block h-px transition-all duration-300 ${
                isActive ? 'w-5 bg-paper' : 'w-2.5 bg-line-strong group-hover:w-4'
              }`}
            />
          </motion.button>
        );
      })}
    </nav>
  );
};

/**
 * Mobile / tablet replacement for the rail: the same numbered index, reduced to
 * a horizontally scrollable strip so it stays legible instead of shrinking.
 */
export const MobileIndexStrip: React.FC = () => {
  const active = useActiveSection();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease }}
      className="border-t border-line bg-ink/95 xl:hidden"
    >
      <div className="no-scrollbar flex overflow-x-auto">
        {sections.map((section, position) => {
          const isActive = active === section.id;
          return (
            <motion.button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              aria-label={`Jump to ${section.label}`}
              aria-current={isActive ? 'true' : undefined}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 + position * 0.03, ease }}
              className={`tnum flex shrink-0 items-center gap-2 border-r border-line px-3.5 py-2 font-mono text-2xs tracking-wider2 transition-colors duration-200 ${
                isActive ? 'bg-paper text-ink' : 'text-fg-faint'
              }`}
            >
              <span>{section.index}</span>
              <span
                className={`font-sans text-[10px] tracking-normal uppercase ${
                  isActive ? 'text-ink' : 'text-fg-faint'
                }`}
              >
                {section.nav}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};
