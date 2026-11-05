import React from 'react';
import { Hero } from '../sections/Hero';
import { StatsRibbon } from '../sections/StatsRibbon';
import { ProjectTicker, StackTicker } from '../sections/Tickers';
import { About } from '../sections/About';
import { Experience } from '../sections/Experience';
import { WorkScreens } from '../sections/WorkScreens';
import { Projects } from '../sections/Projects';
import { Capabilities } from '../sections/Capabilities';
import { ReferralBanner } from '../sections/ReferralBanner';
import { GeneralContact } from '../sections/GeneralContact';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <StatsRibbon />
      <StackTicker />
      <About />
      <Experience />
      <WorkScreens />
      <Projects />
      <Capabilities />
      <ReferralBanner />
      <ProjectTicker />
      <GeneralContact />
    </>
  );
};
