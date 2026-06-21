import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { Menu, X } from 'lucide-react';
import { AppRoute, buildHomeSectionPath, pushRoute, scrollToSection } from '../utils/routing';

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => handleNav(item)}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white z-50 relative p-2 -mr-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

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
