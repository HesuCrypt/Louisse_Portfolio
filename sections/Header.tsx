import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { Menu, X } from 'lucide-react';
import { AppRoute, buildHomeSectionPath, pushRoute, scrollToSection, scrollToTop } from '../utils/routing';
import { useTheme } from '../utils/theme';

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
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      requestAnimationFrame(() => scrollToSection(window.location.hash));
    } else if (currentRoute === '/services') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [currentRoute]);

  const handleNav = (item: (typeof navItems)[number]) => {
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
    setIsOpen(false);

    if (currentRoute === '/') {
      scrollToTop();
      return;
    }

    pushRoute('/');
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
          className="text-xl font-medium tracking-tight text-white hover:opacity-80 transition-opacity z-50 relative"
        >
          Louisse.
        </button>

        {/* Right Section: Desktop Nav + Theme Toggle + Mobile Menu Button */}
        <div className="flex items-center gap-4 md:gap-8 z-50">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => handleNav(item)}
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border border-neutral-700/60 bg-neutral-900/80 hover:bg-neutral-800 hover:border-neutral-500 text-neutral-300 transition-all shadow-sm cursor-pointer shrink-0"
            aria-label="Toggle liquid glass theme"
          >
            <span className={`w-2 h-2 rounded-full transition-all ${theme === 'glass' ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-neutral-400'}`}></span>
            <span>{theme === 'glass' ? 'Liquid Glass' : 'Monochrome'}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white relative p-2 focus:outline-none"
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

              <div className="pt-4 border-t border-neutral-800 w-full flex justify-center">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-neutral-700 bg-neutral-900 text-neutral-200"
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${theme === 'glass' ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-neutral-400'}`}></span>
                  <span>{theme === 'glass' ? 'Liquid Glass Theme' : 'Monochrome Theme'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
};
