import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Featured } from './sections/Featured';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Contact } from './sections/Contact';
import { Divider } from './ui/Divider';
import { LoadingScreen } from './ui/LoadingScreen';

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
            <p className="notranslate" translate="no">&copy; {new Date().getFullYear()} Louisse Dominique Bertillo. All rights reserved.</p>
          </footer>
        </div>
      )}
    </main>
  );
}