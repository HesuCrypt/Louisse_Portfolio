import React from 'react';
import { Hero } from '../sections/Hero';
import { ProjectTicker, StackTicker } from '../sections/Tickers';
import { About } from '../sections/About';
import { Experience } from '../sections/Experience';
import { Projects } from '../sections/Projects';
import { Capabilities } from '../sections/Capabilities';
import { ReferralBanner } from '../sections/ReferralBanner';
import { GeneralContact } from '../sections/GeneralContact';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <StackTicker />
      <About />
      <Experience />
      <Projects />
      <Capabilities />
      <ReferralBanner />
      <ProjectTicker />
      <GeneralContact />
    </>
  );
};
