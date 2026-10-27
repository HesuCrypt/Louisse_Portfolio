import React from 'react';
import { Hero } from '../sections/Hero';
import { ProjectTicker, StackTicker } from '../sections/Tickers';
import { Experience } from '../sections/Experience';
import { Projects } from '../sections/Projects';
import { Endorsements } from '../sections/Endorsements';
import { Capabilities } from '../sections/Capabilities';
import { Directory } from '../sections/Directory';
import { About } from '../sections/About';
import { GeneralContact } from '../sections/GeneralContact';

/**
 * Page order: Identity → Profile → Experience → Selected Work → Endorsements
 * → Capabilities & Rates → Technical Directory → Contact.
 */
export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <StackTicker />
      <About />
      <Experience />
      <Projects />
      <Endorsements />
      <Capabilities />
      <Directory />
      <ProjectTicker />
      <GeneralContact />
    </>
  );
};
