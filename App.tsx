import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { LegalPage } from './pages/LegalPage';
import { Header } from './sections/Header';
import { DesktopIndexRail } from './ui/IndexRail';
import { AIChatWidget } from './ui/AIChatWidget';
import { CookieConsentBanner } from './ui/CookieConsentBanner';
import { Container } from './ui/Container';
import { sections } from './data/sections';
import { socials } from './data/socials';
import {
  AppRoute,
  buildHomeSectionPath,
  getAppRoute,
  isLegalRoute,
  pushRoute,
  scrollToSection,
} from './utils/routing';
import { openCookiePreferences } from './utils/cookies';
import { pageVariants } from './motion/variants';

export default function App() {
  const [locationState, setLocationState] = useState(() => ({
    pathname: typeof window !== 'undefined' ? window.location.pathname : '/',
    hash: typeof window !== 'undefined' ? window.location.hash : '',
  }));

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const syncLocation = () => {
      setLocationState({
        pathname: window.location.pathname,
        hash: window.location.hash,
      });
    };

    window.addEventListener('popstate', syncLocation);
    window.addEventListener('hashchange', syncLocation);
    return () => {
      window.removeEventListener('popstate', syncLocation);
      window.removeEventListener('hashchange', syncLocation);
    };
  }, []);

  const route: AppRoute = useMemo(
    () => getAppRoute(locationState.pathname, locationState.hash),
    [locationState.pathname, locationState.hash]
  );

  const handleSectionNav = (sectionId: string) => {
    if (route === '/') {
      scrollToSection(sectionId);
      return;
    }
    pushRoute(buildHomeSectionPath(sectionId));
  };

  const renderContent = () => {
    if (route === '/services') {
      return <ServicesPage />;
    }
    if (isLegalRoute(route)) {
      return <LegalPage currentRoute={route} />;
    }
    return <HomePage />;
  };

  return (
    <main className="rail-offset relative min-h-screen w-full bg-ink text-fg">
      {/* Hairline scroll reading position */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 right-0 z-[60] h-px origin-left bg-paper/80 xl:left-[var(--rail-w)]"
        style={{ scaleX }}
      />

      <DesktopIndexRail />
      <Header currentRoute={route} />

      {/* Reserve the fixed bar (and the mobile index strip) so nothing hides under it */}
      <div className="pt-[calc(var(--topbar-h)+var(--strip-h))]">
        <AnimatePresence mode="wait">
          <motion.div
            key={route}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        <footer className="border-t border-line">
          <Container>
            <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center bg-paper font-mono text-[11px] leading-none font-bold text-ink">
                    LB
                  </span>
                  <span className="font-sans text-[13px] font-medium tracking-[-0.02em] text-fg">
                    Louisse Dominique Bertillo
                  </span>
                </div>
                <p className="mt-5 max-w-[42ch] text-[0.9375rem] leading-[1.7] text-fg-dim">
                  Full-stack web development, Shopify e-commerce, and AI implementation.
                  Available for select client projects worldwide.
                </p>
                <a
                  href="mailto:louissebertillo2004@gmail.com"
                  className="mt-5 inline-block font-mono text-2xs tracking-wider2 text-fg-muted uppercase underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg"
                >
                  louissebertillo2004@gmail.com
                </a>
              </div>

              <nav aria-label="Footer index" className="lg:col-span-3">
                <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">Index</span>
                <ul className="mt-4 space-y-2.5">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => handleSectionNav(section.id)}
                        className="group flex items-baseline gap-2.5 text-left"
                      >
                        <span className="tnum font-mono text-2xs text-fg-faint">{section.index}</span>
                        <span className="font-sans text-[13px] text-fg-muted transition-colors group-hover:text-fg">
                          {section.label}
                        </span>
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={() => pushRoute('/services')}
                      className="group flex items-baseline gap-2.5 text-left"
                    >
                      <span className="tnum font-mono text-2xs text-fg-faint">09</span>
                      <span className="font-sans text-[13px] text-fg-muted transition-colors group-hover:text-fg">
                        Services &amp; Rates
                      </span>
                    </button>
                  </li>
                </ul>
              </nav>

              <div className="lg:col-span-4">
                <span className="font-mono text-2xs tracking-label text-fg-dim uppercase">Legal</span>
                <ul className="mt-4 space-y-2.5">
                  {(
                    [
                      ['Privacy Policy', '/privacy'],
                      ['Terms & Conditions', '/terms'],
                      ['Cookie Policy', '/cookies'],
                    ] as const
                  ).map(([label, path]) => (
                    <li key={path}>
                      <button
                        type="button"
                        onClick={() => pushRoute(path)}
                        className="font-sans text-[13px] text-fg-muted transition-colors hover:text-fg"
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={openCookiePreferences}
                      className="font-sans text-[13px] text-fg-dim transition-colors hover:text-fg"
                    >
                      Cookie Preferences
                    </button>
                  </li>
                </ul>

                <span className="mt-8 block font-mono text-2xs tracking-label text-fg-dim uppercase">
                  Elsewhere
                </span>
                <div className="mt-4 flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target={social.url.startsWith('mailto') ? undefined : '_blank'}
                      rel={social.url.startsWith('mailto') ? undefined : 'noreferrer'}
                      className="border border-line-mid px-3 py-1.5 font-mono text-2xs tracking-wider2 text-fg-muted uppercase transition-colors duration-200 hover:border-paper hover:bg-paper hover:text-ink"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-2xs tracking-wider2 text-fg-faint uppercase">
                &copy; {new Date().getFullYear()} Louisse Dominique Bertillo
              </p>
              <p className="font-mono text-2xs tracking-wider2 text-fg-faint uppercase">
                Manila, PH &middot; Remote Worldwide
              </p>
            </div>
          </Container>
        </footer>
      </div>

      <AIChatWidget />
      <CookieConsentBanner />
    </main>
  );
}
