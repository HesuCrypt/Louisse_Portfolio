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
 * Proof-first order: identity → where he worked → what shipped → what clients
 * said → what it costs → the wider archive → the biography → contact.
 *
 * Experience leads because the numbers behind it are the single strongest
 * argument on the page. The biography is deliberately late: clients buy
 * outcomes first and read the story second.
 */
export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <StackTicker />
      <Experience />
      <Projects />
      <Endorsements />
      <Capabilities />
      <Directory />
      <About />
      <ProjectTicker />
      <GeneralContact />
    </>
  );
};
