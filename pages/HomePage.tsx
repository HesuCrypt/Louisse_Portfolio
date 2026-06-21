import React from 'react';
import { About } from '../sections/About';
import { Experience } from '../sections/Experience';
import { Featured } from '../sections/Featured';
import { GeneralContact } from '../sections/GeneralContact';
import { Hero } from '../sections/Hero';
import { Projects } from '../sections/Projects';
import { Skills } from '../sections/Skills';
import { Divider } from '../ui/Divider';

export const HomePage: React.FC = () => {
  return (
    <>
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
      <GeneralContact />
    </>
  );
};
