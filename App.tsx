import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { Header } from './sections/Header';
import { LoadingScreen } from './ui/LoadingScreen';
import { AIChatWidget } from './ui/AIChatWidget';
import { getAppRoute } from './utils/routing';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', syncPathname);
    return () => window.removeEventListener('popstate', syncPathname);
  }, []);

  const route = useMemo(() => getAppRoute(pathname), [pathname]);

  return (
    <main className="min-h-screen w-full bg-background text-neutral-300 selection:bg-white/20 relative">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!loading && (
        <div>
          <Header currentRoute={route} />
          {route === '/services' ? <ServicesPage /> : <HomePage />}

          <footer className="py-12 text-center text-neutral-600 text-sm">
            <p>&copy; {new Date().getFullYear()} Louisse Dominique Bertillo. All rights reserved.</p>
            <div className="mt-3 flex items-center justify-center gap-4 text-xs">
              <a href="#privacy" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#terms" className="hover:text-neutral-400 transition-colors">Terms of Service</a>
            </div>
          </footer>
          <AIChatWidget />
        </div>
      )}
    </main>
  );
}
