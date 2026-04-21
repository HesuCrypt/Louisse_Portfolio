import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Featured } from './sections/Featured';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Contact } from './sections/Contact';
import { Divider } from './ui/Divider';
import { LoadingScreen } from './ui/LoadingScreen';
import { AIChatWidget } from './ui/AIChatWidget';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen w-full bg-background text-neutral-300 selection:bg-white/20 relative">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!loading && (
        <div>
          <Header />
          <Hero />
          <Divider />
          <About />
          <Divider />
          <Services />
          <Divider />
          <Experience />
          <Divider />
          <Featured />
          <Divider />
          <Projects />
          <Divider />
          <Skills />
          <Divider />
          <Contact />

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