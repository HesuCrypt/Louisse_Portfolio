import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { LegalPage } from './pages/LegalPage';
import { Header } from './sections/Header';
import { LoadingScreen } from './ui/LoadingScreen';
import { AIChatWidget } from './ui/AIChatWidget';
import { CookieConsentBanner } from './ui/CookieConsentBanner';
import { getAppRoute, isLegalRoute, pushRoute } from './utils/routing';
import { openCookiePreferences } from './utils/cookies';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [locationState, setLocationState] = useState(() => ({
    pathname: typeof window !== 'undefined' ? window.location.pathname : '/',
    hash: typeof window !== 'undefined' ? window.location.hash : '',
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

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

  const route = useMemo(
    () => getAppRoute(locationState.pathname, locationState.hash),
    [locationState.pathname, locationState.hash]
  );

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
    <main className="min-h-screen w-full bg-background text-neutral-300 selection:bg-white/20 relative">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!loading && (
        <div>
          <Header currentRoute={route} />
          {renderContent()}

          <footer className="py-12 px-4 text-center text-neutral-600 text-sm border-t border-neutral-900/60 mt-12">
            <p className="text-neutral-400 text-xs mb-1.5 font-medium">
              Louisse Dominique Bertillo (Louisse Baja) &middot; Full-Stack Web Developer &amp; AI Implementation
            </p>
            <p className="text-neutral-500 text-xs mb-3">
              Specializing in high-conversion websites, custom Shopify platforms, and automated AI workflows.
            </p>
            <p>&copy; {new Date().getFullYear()} Louisse Dominique Bertillo. All rights reserved.</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs">
              <button
                type="button"
                onClick={() => pushRoute('/privacy')}
                className="hover:text-neutral-300 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => pushRoute('/terms')}
                className="hover:text-neutral-300 transition-colors cursor-pointer"
              >
                Terms &amp; Conditions
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => pushRoute('/cookies')}
                className="hover:text-neutral-300 transition-colors cursor-pointer"
              >
                Cookie Policy
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={openCookiePreferences}
                className="hover:text-neutral-300 transition-colors cursor-pointer text-neutral-500 underline"
              >
                Cookie Preferences
              </button>
            </div>
          </footer>

          <AIChatWidget />
          <CookieConsentBanner />
        </div>
      )}
    </main>
  );
}
