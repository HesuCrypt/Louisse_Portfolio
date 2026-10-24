import React from 'react';
import { Marquee } from '../ui/Marquee';
import { Reveal } from '../ui/Reveal';

/** Tools and platforms, scrolling past immediately after the hero. */
const stack = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'Shopify',
  'PHP',
  'MySQL',
  'Supabase',
  'n8n',
  'Claude',
  'Google Agent ADK',
  'Three.js',
  'Web Audio API',
  'Vercel',
  'Cloudflare',
];

/** The work itself, as a closing statement before the contact block. */
const disciplines = [
  'Shopify Storefronts',
  'Web Apps',
  'AI Agents',
  'n8n Pipelines',
  'Conversion Work',
  'Performance Tuning',
  'Interactive Campaigns',
  'Technical SEO',
];

/** Sits under the hero: instantly communicates the working stack. */
export const StackTicker: React.FC = () => (
  <Reveal>
    <Marquee items={stack} speed={68} />
  </Reveal>
);

/** Sits above the contact block: a last summary of what is on offer. */
export const ProjectTicker: React.FC = () => (
  <Reveal>
    <Marquee items={disciplines} speed={60} reverse />
  </Reveal>
);
