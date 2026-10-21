import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { AppRoute, buildHomeSectionPath, pushRoute, scrollToSection, scrollToTop } from '../utils/routing';

const navItems = [
  { name: 'About', sectionId: 'about' },
  { name: 'Work', sectionId: 'projects' },
  { name: 'Experience', sectionId: 'experience' },
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
      const timer = setTimeout(() => {
        scrollToSection(window.location.hash);
      }, 30);
      return () => clearTimeout(timer);
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

  const handleQuoteClick = () => {
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
          <picture className="flex items-center justify-center shrink-0">
            <source srcSet="/logo.webp" type="image/webp" />
            <img
              src="/logo.png"
              alt="Louisse Dominique Bertillo"
              width={36}
              height={36}
              loading="eager"
              decoding="async"
              className="h-9 w-9 object-contain rounded-md"
            />
          </picture>
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
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 h-screen w-full bg-neutral-950/98 backdrop-blur-2xl flex flex-col justify-between md:hidden p-6 pt-24 pb-8 overflow-y-auto"
            >
              {/* Top brand header inside menu */}
              <div className="flex items-center justify-between absolute top-0 left-0 right-0 h-20 px-6 border-b border-neutral-900">
                <span className="font-semibold text-white tracking-tight text-lg">Louisse.</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white rounded-lg border border-neutral-800"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Items List */}
              <div className="space-y-2 my-auto">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 px-3 mb-2">Navigation</p>
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.name}
                    type="button"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.2 }}
                    onClick={() => handleNav(item)}
                    className="w-full flex items-center justify-between py-3.5 px-4 rounded-xl border border-neutral-900 bg-neutral-900/40 text-left text-lg font-medium text-white active:bg-neutral-800 transition-colors"
                  >
                    <span>{item.name}</span>
                    {item.name === 'Services' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-neutral-950 font-semibold shadow-sm">
                        Rates
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Bottom Actions: Quote CTA & Socials */}
              <div className="space-y-4 pt-6 border-t border-neutral-900">
                <button
                  type="button"
                  onClick={handleQuoteClick}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors shadow-lg active:scale-[0.98]"
                >
                  <span>Get a Free Project Quote</span>
                  <ArrowUpRight size={15} />
                </button>

                <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 font-mono">
                  <span>Manila &middot; Remote Worldwide</span>
                  <a
                    href="mailto:louissebertillo2004@gmail.com"
                    className="text-neutral-400 hover:text-white underline"
                  >
                    Email Direct
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
};
