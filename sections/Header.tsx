import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, Volume2, VolumeX, X } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { MobileIndexStrip } from '../ui/IndexRail';
import { sections } from '../data/sections';
import { socials } from '../data/socials';
import { sound } from '../utils/sound';
import {
  AppRoute,
  buildHomeSectionPath,
  pushRoute,
  scrollToSection,
  scrollToTop,
} from '../utils/routing';

/** Desktop bar shows a deliberate subset, ordered to follow the page itself. */
const desktopNavIds = ['top', 'about', 'experience', 'projects', 'capabilities', 'contact'];
const desktopNav = sections.filter((section) => desktopNavIds.includes(section.id));

interface HeaderProps {
  currentRoute: AppRoute;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => sound.isEnabled());

  useEffect(() => {
    return sound.subscribe(setSoundEnabled);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (currentRoute === '/' && window.location.hash) {
      const timer = setTimeout(() => scrollToSection(window.location.hash), 30);
      return () => clearTimeout(timer);
    }
    if (currentRoute === '/services') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [currentRoute]);

  const handleSectionNav = (sectionId: string) => {
    sound.playClick();
    setIsOpen(false);
    if (currentRoute === '/') {
      scrollToSection(sectionId);
      return;
    }
    pushRoute(buildHomeSectionPath(sectionId));
  };

  const handleLogoClick = () => {
    sound.playClick();
    setIsOpen(false);
    if (currentRoute === '/') {
      scrollToTop();
      return;
    }
    pushRoute('/');
  };

  const handleServicesNav = () => {
    sound.playClick();
    setIsOpen(false);
    pushRoute('/services');
  };

  const handleQuoteClick = () => {
    sound.playClick();
    setIsOpen(false);
    handleSectionNav('contact');
  };

  const solid = scrolled || isOpen;

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-300 xl:left-[var(--rail-w)] ${
        solid
          ? 'border-b border-line bg-ink/90 backdrop-blur-md'
          : 'border-b border-transparent bg-ink/60 backdrop-blur-sm'
      }`}
    >
      <div className="h-[var(--topbar-h)]">
        <Container className="flex h-full items-center justify-between gap-4">
          {/* Authentic Louisse Bertillo Brand Mark */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="group flex shrink-0 cursor-pointer items-center gap-3"
            aria-label="Louisse Dominique Bertillo: back to top"
          >
            <span className="grid h-8 w-8 place-items-center rounded-md border border-line-strong bg-panel font-mono text-2xs leading-none font-semibold text-fg transition-colors group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
              LB
            </span>
            <span className="flex items-center gap-2">
              <span className="font-sans text-sm font-medium tracking-[-0.02em] text-fg">
                Louisse Bertillo
              </span>
              <span className="hidden rounded border border-line-mid bg-panel px-1.5 py-0.5 font-mono text-[10px] tracking-wider2 text-fg-dim uppercase sm:inline-block">
                WEB // AI
              </span>
            </span>
          </button>

          {/* Center Navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
            {desktopNav.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => handleSectionNav(section.id)}
                className="group flex cursor-pointer items-center gap-1.5 font-sans text-xs text-fg-muted transition-colors duration-200 hover:text-fg"
              >
                <span>{section.id === 'top' ? 'Overview' : section.nav}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={handleServicesNav}
              className={`flex cursor-pointer items-center gap-1.5 font-sans text-xs transition-colors duration-200 ${
                currentRoute === '/services' ? 'font-medium text-fg' : 'text-fg-muted hover:text-fg'
              }`}
            >
              {currentRoute === '/services' && (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              )}
              <span>Services &amp; Rates</span>
            </button>
          </nav>

          {/* Right Actions: Sound Toggle & CTA */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => sound.toggle()}
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-line-mid bg-panel text-fg-dim transition-colors hover:border-line-strong hover:text-fg"
              title={soundEnabled ? 'Mute UI sound effects' : 'Enable UI sound effects'}
              aria-label={soundEnabled ? 'Mute UI sound effects' : 'Enable UI sound effects'}
            >
              {soundEnabled ? <Volume2 size={14} className="text-emerald-400" /> : <VolumeX size={14} />}
            </button>

            <button
              type="button"
              onClick={handleQuoteClick}
              className="hidden cursor-pointer items-center gap-2 rounded-lg border border-line-strong bg-panel px-4 py-2 font-sans text-xs font-medium text-fg transition-all duration-200 hover:border-paper hover:bg-paper hover:text-ink xl:inline-flex"
            >
              <span>Start a Project</span>
              <ArrowUpRight size={13} />
            </button>

            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="p-2 text-fg xl:hidden"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </Container>
      </div>

      {/* Tablet and mobile keep the section index — only its form changes */}
      {!isOpen && <MobileIndexStrip />}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 top-[var(--topbar-h)] overflow-y-auto bg-ink xl:hidden"
          >
            <Container className="flex min-h-full flex-col justify-between py-8">
              <nav aria-label="Mobile sections" className="flex flex-col">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.24 }}
                    onClick={() => handleSectionNav(section.id)}
                    className="flex items-center justify-between border-b border-line py-4 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="tnum font-mono text-2xs text-fg-faint">{section.index}</span>
                      <span className="font-sans text-lg font-medium tracking-[-0.02em] text-fg">
                        {section.label}
                      </span>
                    </span>
                    <ArrowUpRight size={16} className="text-fg-faint" />
                  </motion.button>
                ))}

                <button
                  type="button"
                  onClick={handleServicesNav}
                  className="flex items-center justify-between border-b border-line py-4 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="tnum font-mono text-2xs text-fg-faint">09</span>
                    <span className="font-sans text-lg font-medium tracking-[-0.02em] text-fg">
                      Services &amp; Rates
                    </span>
                  </span>
                  <ArrowUpRight size={16} className="text-fg-faint" />
                </button>
              </nav>

              <div className="mt-10 flex flex-col gap-6">
                <Button onClick={handleQuoteClick} className="w-full py-4" icon={<ArrowUpRight size={14} />}>
                  Get a Free Project Quote
                </Button>

                <div className="flex flex-col gap-3 border-t border-line pt-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                      Manila · Remote Worldwide
                    </span>
                    <a
                      href="mailto:louissebertillo2004@gmail.com"
                      className="font-mono text-2xs tracking-wider2 text-fg-dim uppercase underline hover:text-fg"
                    >
                      Email Direct
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target={social.url.startsWith('mailto') ? undefined : '_blank'}
                        rel={social.url.startsWith('mailto') ? undefined : 'noreferrer'}
                        className="border border-line-mid px-3 py-2 font-mono text-2xs tracking-wider2 text-fg-muted uppercase transition-colors duration-200 hover:border-paper hover:bg-paper hover:text-ink"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
