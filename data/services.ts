export interface ServicePackage {
  id: string;
  title: string;
  basePricePhp: number;
  maxPricePhp?: number;
  scopeLine: string;
  summary: [string, string];
  pagesTitle: string;
  pages: string[];
  extrasTitle: string;
  extras: string[];
  bestFor: string;
  popular: boolean;
  isFlagship?: boolean;
}

export interface EngagementTerm {
  label: string;
  value: string;
}

export interface ComparisonRow {
  feature: string;
  portfolio: string;
  starter: string;
  business: string;
  professional: string;
  flagship: string;
}

export interface AddOnItem {
  name: string;
  investmentPhp: string;
  timeline: string;
  description: string;
}

export const servicePackages: ServicePackage[] = [
  {
    id: 'one-page-sprint',
    title: 'One-Page Sprint / Landing',
    basePricePhp: 10000,
    scopeLine: '1 high-impact page · 2–3 days turnaround',
    summary: [
      'One page, done properly: the fastest route from nothing to a live, high-converting presence.',
      'Covers the hero, bio, project grid, social hub, direct contact CTA, and core SEO.',
    ],
    pagesTitle: 'Pages Included (PHP 6,000 value)',
    pages: [
      'Single-page high-conversion layout (hero, bio, featured work, CTA)',
      'Project modal or external case study showcase link',
    ],
    extrasTitle: 'Included Extras (PHP 4,000 value)',
    extras: [
      'Responsive layout tested on phone, tablet, and desktop',
      'Social profile link hub with icons and verified URLs',
      'Direct contact via mailto: or a booking link',
      'Baseline on-page SEO (meta title, description, OpenGraph preview)',
      '48–72 hour delivery turnaround',
    ],
    bestFor: 'Freelancers, creators, event drops, pre-launch signups, and developers who want a sharp digital presence.',
    popular: false,
  },
  {
    id: 'starter-website',
    title: 'Starter Website Package',
    basePricePhp: 30000,
    scopeLine: '3 core pages · 5–7 days turnaround',
    summary: [
      'Built for emerging businesses and personal brands that need credibility and inbound leads.',
      'A verified lead form with email delivery, responsive QA, and custom brand styling.',
    ],
    pagesTitle: 'Pages Included (PHP 18,000 value)',
    pages: [
      'Home page (value proposition, credibility blocks, featured services, CTA)',
      'About page (story, founder background, mission, core values)',
      'Contact page (interactive lead form, direct channels, office and social details)',
    ],
    extrasTitle: 'Included Extras (PHP 12,000 value)',
    extras: [
      'Responsive layout across mobile, tablet, and desktop',
      'Working contact form with validation, spam prevention, and direct email delivery',
      'Custom visual branding, typography pairing, and clear page hierarchy',
      'Baseline technical SEO (semantic headings, OpenGraph preview cards)',
      'Asset compression and a speed optimization pass',
    ],
    bestFor: 'Small business owners, consultants, coaches, and startups validating their offer online.',
    popular: false,
  },
  {
    id: 'business-website',
    title: 'Business Website Package',
    basePricePhp: 45000,
    scopeLine: '5 conversion pages · 10–12 days turnaround',
    summary: [
      'Designed for established service businesses that need stronger conversion flows and visible trust signals.',
      'A services menu, visual proof gallery, Google Maps embed, and an advanced multi-field inquiry system.',
    ],
    pagesTitle: 'Pages Included (PHP 27,000 value)',
    pages: [
      'Home page (high-conversion hero, social proof, services overview)',
      'About page (company history, team credentials, certifications)',
      'Services page (service categories with package pricing)',
      'Gallery / portfolio page (categorized showcase or before-and-after proof)',
      'Contact page (advanced inquiry system plus location credibility)',
    ],
    extrasTitle: 'Included Extras (PHP 18,000 value)',
    extras: [
      'Custom inquiry form with dropdowns for service, timeline, and budget',
      'Google Maps embed to capture local foot traffic',
      'Proof-first layout architecture (case studies, client visual grids)',
      'Local SEO structure (service keywords plus schema markup)',
      'Cross-device QA (iOS Safari, Android Chrome, Mac and PC desktop)',
    ],
    bestFor: 'Clinics, dental offices, salons, restaurants, architecture firms, and service agencies.',
    popular: true,
  },
  {
    id: 'professional-website',
    title: 'Professional Authority Package',
    basePricePhp: 60000,
    scopeLine: '8 strategic pages · 14–18 days turnaround',
    summary: [
      'Built for authority brands that publish content, answer objections, and need a full digital footprint.',
      'A complete content engine: scalable blog, FAQ accordion, and a testimonials hub.',
    ],
    pagesTitle: 'Pages Included (PHP 40,000 value)',
    pages: [
      'Home page',
      'About page',
      'Services page',
      'Portfolio / work archive',
      'Blog hub (index plus single post template)',
      'FAQ page (accordions that answer common objections)',
      'Testimonials / case studies page (reviews, quotes, social proof)',
      'Contact page',
    ],
    extrasTitle: 'Included Extras (PHP 20,000 value)',
    extras: [
      'Multi-page routing system with breadcrumbs and internal linking',
      'Scalable content system ready for regular article publishing',
      'Multiple conversion touchpoints with automated email notifications',
      'Deeper Core Web Vitals pass (lazy loading, font preloading)',
      'Google Analytics and Search Console readiness',
    ],
    bestFor: 'Corporate brands, established studios, e-learning sites, and businesses scaling organic search traffic.',
    popular: false,
  },
  {
    id: 'bespoke-web-app',
    title: 'Bespoke Web App / Creative Tech Experience',
    basePricePhp: 100000,
    maxPricePhp: 120000,
    scopeLine: 'Full custom experience · 3–4 weeks turnaround',
    summary: [
      'Immersive, gamified digital products for brands that want to leave static templates behind.',
      'Interactive window-manager OS, real-time Web Audio engine, embedded AI companion, headless CMS, and a full legal suite.',
    ],
    pagesTitle: 'Architecture & Interactive Capabilities',
    pages: [
      'Interactive window-manager OS (draggable, stackable windows with dynamic z-index)',
      'Real-time Web Audio API engine (hardware-accelerated synthesizer and persistent audio player)',
      'Embedded AI companion (Google Gemini with brand persona and contextual memory)',
      'Headless cloud CMS and admin portal (Firebase Firestore, CDN pipeline, code-free publishing)',
      'Full legal and performance suite (GDPR cookie consent, legal routes, Core Web Vitals pass)',
    ],
    extrasTitle: 'Production & Engineering Deliverables',
    extras: [
      'Zero-downtime CI/CD pipeline with automated preview branches',
      'Password-protected admin portal with role-based access control',
      'Custom themes, micro-animations, and fluid physics interactions',
      'Cloud database security rules and optimized REST/WebSocket endpoints',
      'Cross-device QA and responsive validation (mobile, tablet, 4K desktop)',
    ],
    bestFor: 'Entertainment campaigns, creative studios, fashion labels, product drops, and ambitious brands after an award-worthy, high-engagement experience.',
    popular: false,
    isFlagship: true,
  },
];

export const trustItems = [
  'Fast delivery',
  'Mobile optimized',
  'Clean modern design',
  'Free consultation',
  '30-day post-launch warranty',
];

export const engagementTerms: EngagementTerm[] = [
  {
    label: '50% Upfront Deposit',
    value: 'Secures your slot in the schedule and starts the build.',
  },
  {
    label: '50% Final Payment',
    value: 'Invoiced on staging sign-off, before the DNS cutover and repository handover.',
  },
  {
    label: 'Turnaround Timelines',
    value: 'One-Page 2–3 days · Starter 5–7 days · Business 10–12 days · Professional 14–18 days · Flagship 3–4 weeks',
  },
  {
    label: 'Revisions Scope',
    value: 'Two consolidated rounds of revisions per page section are included within scope.',
  },
  {
    label: '30-Day Post-Launch Warranty',
    value: '30 days of free bug-fix and technical defect support after launch.',
  },
  {
    label: 'Exclusions & Direct Billing',
    value: 'Domain registration, hosting, and third-party API usage (such as the Gemini API) are billed directly to your own accounts.',
  },
];

export const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Typical Scope',
    portfolio: '1 Page Sprint',
    starter: '3 Core Pages',
    business: '5 Conversion Pages',
    professional: '8 Strategic Pages',
    flagship: 'Full Custom Web App / OS',
  },
  {
    feature: 'Turnaround',
    portfolio: '2–3 days',
    starter: '5–7 days',
    business: '10–12 days',
    professional: '14–18 days',
    flagship: '3–4 weeks',
  },
  {
    feature: 'Pages & Content Architecture',
    portfolio: 'Hero + Showcase + CTA',
    starter: 'Home + About + Contact',
    business: 'Home, About, Services, Gallery, Contact',
    professional: '8 Pages incl. Blog, FAQ, Testimonials',
    flagship: 'Bespoke UI, Draggable Windows & CMS',
  },
  {
    feature: 'Contact & Lead Capture',
    portfolio: 'mailto: / direct CTA',
    starter: 'Validated form + email delivery',
    business: 'Advanced form + Google Maps embed',
    professional: 'Multi-touchpoint forms + email alerts',
    flagship: 'Embedded AI Agent + direct inquiry flows',
  },
  {
    feature: 'Visual Proof & Media',
    portfolio: 'Work grid showcase',
    starter: 'Credibility blocks',
    business: 'Dedicated visual gallery',
    professional: 'Gallery + Testimonials hub',
    flagship: 'Cloudinary CDN media + audio engine',
  },
  {
    feature: 'Audio & Gamification',
    portfolio: 'Not Included',
    starter: 'Not Included',
    business: 'Not Included',
    professional: 'Not Included',
    flagship: 'Web Audio API procedural sound engine',
  },
  {
    feature: 'CMS & Admin',
    portfolio: 'Code-only updates',
    starter: 'Code-only updates',
    business: 'Code-only updates',
    professional: 'Scalable content templates',
    flagship: 'Headless Firebase Firestore CMS + Cloudinary',
  },
  {
    feature: 'SEO & Performance',
    portfolio: 'Basic meta tags',
    starter: 'Core on-page + speed baseline',
    business: 'Local SEO + optimization pass',
    professional: 'Full SEO architecture + deep CWV pass',
    flagship: 'Hardware-accelerated performance',
  },
];

export const addOnItems: AddOnItem[] = [
  {
    name: 'Additional Standard Page',
    investmentPhp: '₱5,000',
    timeline: '+1–2 days',
    description: 'A custom, responsive page that matches the existing design system.',
  },
  {
    name: 'Custom AI Chatbot (Gemini / OpenAI)',
    investmentPhp: '₱20,000',
    timeline: '+4–6 days',
    description: 'Persona prompt engineering, knowledge-base ingestion, and a multi-turn chat interface.',
  },
  {
    name: 'Headless CMS & Admin Dashboard',
    investmentPhp: '₱20,000',
    timeline: '+4–6 days',
    description: 'Cloud database (Firebase Firestore) with a Cloudinary CDN pipeline and private login portal.',
  },
  {
    name: 'Web Audio API & Sound Engine',
    investmentPhp: '₱15,000',
    timeline: '+3–5 days',
    description: 'Synthesized sound effects, draggable interactive elements, and a persistent audio player.',
  },
  {
    name: 'Automated Lead Workflows (n8n / Zapier)',
    investmentPhp: '₱10,000',
    timeline: '+2–3 days',
    description: 'Route form leads instantly to your CRM, Discord, Telegram, or Google Sheets.',
  },
  {
    name: 'Developer Maintenance Day Rate',
    investmentPhp: '₱3,000 / day',
    timeline: 'As needed',
    description: 'On-demand engineering time for new features, content drops, or updates.',
  },
  {
    name: 'Monthly Care Retainer',
    investmentPhp: '₱10,000 / month',
    timeline: 'Ongoing',
    description: 'Up to two content updates a month, API monitoring, bug fixes, and security patches.',
  },
];
