import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { Menu, X, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { AppRoute, buildHomeSectionPath, pushRoute, scrollToSection, scrollToTop } from '../utils/routing';
import { sound } from '../utils/sound';

const navItems = [
  { name: 'About', sectionId: 'about' },
  { name: 'Experience', sectionId: 'experience' },
  { name: 'Work', sectionId: 'featured' },
  { name: 'Contact', sectionId: 'contact' },
  { name: 'Services', path: '/services' },
] as const;

interface HeaderProps {
  currentRoute: AppRoute;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(() => sound.isEnabled());

  useEffect(() => {
    return sound.subscribe((active) => setSoundActive(active));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
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
      const timer = setTimeout(() => {
        scrollToSection(window.location.hash);
      }, 30);
      return () => clearTimeout(timer);
    } else if (currentRoute === '/services') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [currentRoute]);

  const handleNav = (item: (typeof navItems)[number]) => {
    sound.playClick();
    setIsOpen(false);

    if ('path' in item) {
      pushRoute(item.path);
      return;
    }

    if (currentRoute === '/') {
      scrollToSection(item.sectionId);
      return;
    }

    pushRoute(buildHomeSectionPath(item.sectionId));
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

  const handleQuoteClick = () => {
    sound.playPop();
    setIsOpen(false);
    if (currentRoute === '/services') {
      pushRoute('/#contact');
    } else {
      scrollToSection('contact');
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-background/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent border-transparent'
        }`}
    >
      <Container className="flex items-center justify-between h-20">
        {/* Logo */}
        <button
          type="button"
          onClick={handleLogoClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity z-50 relative focus:outline-none cursor-pointer"
        >
          <img src="/logo.png" alt="Louisse Dominique Bertillo" className="h-9 w-auto object-contain rounded-sm" />
          <span className="text-xl font-medium tracking-tight text-white">Louisse.</span>
        </button>

        {/* Desktop Nav & Actions */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => handleNav(item)}
                className={`text-sm font-medium transition-colors relative flex items-center gap-1.5 cursor-pointer ${
                  (item.name === 'Services' && currentRoute === '/services')
                    ? 'text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>{item.name}</span>
                {item.name === 'Services' && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                    Rates
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="h-4 w-px bg-neutral-800" />

          {/* Sound Synthesizer Opt-in Toggle */}
          <button
            type="button"
            onClick={() => {
              const active = sound.toggle();
              setSoundActive(active);
            }}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800/60 hover:border-neutral-700 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
            title={soundActive ? 'Mute Procedural Web Audio FX' : 'Enable Procedural Web Audio FX'}
            aria-label="Toggle procedural sound synthesizer"
          >
            {soundActive ? <Volume2 size={15} className="text-emerald-400" /> : <VolumeX size={15} />}
            <span className="text-[10px] hidden lg:inline text-neutral-400">{soundActive ? 'Audio ON' : 'Audio OFF'}</span>
          </button>

          {/* Direct Conversion CTA */}
          <button
            type="button"
            onClick={handleQuoteClick}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors shadow-sm cursor-pointer"
          >
            <span>Get a Quote</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            onClick={() => {
              const active = sound.toggle();
              setSoundActive(active);
            }}
            className="p-2 rounded-lg text-neutral-400 hover:text-white border border-neutral-800"
            aria-label="Toggle procedural sound synthesizer"
          >
            {soundActive ? <Volume2 size={16} className="text-emerald-400" /> : <VolumeX size={16} />}
          </button>
          <button
            className="text-white z-50 relative p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 top-0 h-screen w-full bg-background flex flex-col items-center justify-center space-y-8 md:hidden p-4"
            >
              {navItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleNav(item)}
                  className="text-3xl font-light text-white hover:text-neutral-400 transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
};
