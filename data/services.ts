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
      'Fastest way to go live: high-converting single-page experience with minimal moving parts.',
      'Includes hero, bio, visual project grid, social profile hub, direct contact CTA, and core SEO.',
    ],
    pagesTitle: 'Pages Included (PHP 6,000 value)',
    pages: [
      'Single-Page High-Conversion Layout (Hero, Bio, Featured Work, CTA)',
      'Project Modal / External Case Study Showcase Link',
    ],
    extrasTitle: 'Included Extras (PHP 4,000 value)',
    extras: [
      '100% mobile-friendly responsive layout across phone, tablet, and desktop',
      'Social profile link hub (icons + verified URLs)',
      'Direct contact action via mailto: or booking link',
      'Baseline on-page SEO (meta titles, description, OpenGraph preview)',
      'Rapid 48-to-72 hour delivery turnaround',
    ],
    bestFor: 'Freelancers, creators, event drops, pre-launch signups, and developers wanting a sleek digital presence.',
    popular: false,
  },
  {
    id: 'starter-website',
    title: 'Starter Website Package',
    basePricePhp: 30000,
    scopeLine: '3 core pages · 5–7 days turnaround',
    summary: [
      'Built for emerging businesses and personal brands needing credibility and inbound leads.',
      'Verified lead form with email delivery, responsive QA, and bespoke brand styling.',
    ],
    pagesTitle: 'Pages Included (PHP 18,000 value)',
    pages: [
      'Home Page (Value proposition, credibility blocks, featured services, CTA)',
      'About Page (Story, founder background, mission, core values)',
      'Contact Page (Interactive lead form, direct channels, office/social info)',
    ],
    extrasTitle: 'Included Extras (PHP 12,000 value)',
    extras: [
      'Fully responsive multi-device layout (Mobile, Tablet, Desktop)',
      'Working contact form with input validation, spam prevention & direct email delivery',
      'Bespoke visual branding, typography pairing, and clear page hierarchy',
      'Baseline technical SEO (semantic headings, OpenGraph preview cards)',
      'Asset compression & speed optimization pass',
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
      'Designed for established service businesses requiring stronger conversion flows and trust signals.',
      'Services menu, visual proof gallery, Google Maps embed, and advanced multi-field inquiry system.',
    ],
    pagesTitle: 'Pages Included (PHP 27,000 value)',
    pages: [
      'Home Page (High-conversion hero, social proof, services overview)',
      'About Page (Company history, team credentials, certifications)',
      'Services Page (Dedicated service categories, package pricing descriptions)',
      'Gallery / Portfolio Page (Categorized project showcase / before-and-after proof)',
      'Contact Page (Advanced inquiry system + location credibility)',
    ],
    extrasTitle: 'Included Extras (PHP 18,000 value)',
    extras: [
      'Advanced custom inquiry form with dropdowns (service selected, timeline, budget range)',
      'Google Maps API / interactive location embed for local foot traffic',
      'Proof-oriented layout architecture (case studies / client visual grids)',
      'Local SEO structure (service intent keywords + schema markup)',
      'Cross-device QA testing (iOS Safari, Android Chrome, Mac/PC desktop)',
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
      'Engineered for authority brands that publish content, answer objections, and require a full digital footprint.',
      'Full content engine, scalable Blog system, FAQ accordion, and Testimonials hub.',
    ],
    pagesTitle: 'Pages Included (PHP 40,000 value)',
    pages: [
      'Home Page',
      'About Page',
      'Services Page',
      'Portfolio / Work Archive',
      'Blog / Editorial Hub (Blog index + single post template layout)',
      'FAQ Page (Interactive accordions answering common client objections)',
      'Testimonials / Case Studies Page (Client reviews, quotes, and social proof)',
      'Contact Page',
    ],
    extrasTitle: 'Included Extras (PHP 20,000 value)',
    extras: [
      'Full multi-page routing system with breadcrumbs and internal link architecture',
      'Scalable content system ready for regular article/news publishing',
      'Multiple conversion touchpoints with automated email notifications',
      'Deeper Core Web Vitals optimization pass (lazy loading, font preloading)',
      'Comprehensive Google Analytics & search console readiness',
    ],
    bestFor: 'Corporate brands, established studios, e-learning sites, and businesses scaling organic SEO traffic.',
    popular: false,
  },
  {
    id: 'bespoke-web-app',
    title: 'Bespoke Web App / Creative Tech Experience',
    basePricePhp: 100000,
    maxPricePhp: 120000,
    scopeLine: 'Full custom experience · 3–4 weeks turnaround',
    summary: [
      'Immersive, gamified, and bespoke digital products engineered for brands and creators that want to break away from traditional static templates.',
      'Custom interactive window manager OS, real-time Web Audio API engine, embedded AI companion, headless cloud CMS, and full legal suite.',
    ],
    pagesTitle: 'Architecture & Interactive Capabilities',
    pages: [
      'Interactive Window Manager OS (Draggable, stackable windows & dynamic z-index hierarchy)',
      'Real-Time Web Audio API Engine (Hardware-accelerated sound synthesizer & persistent audio player)',
      'Embedded AI Companion (Google Gemini LLM with brand persona & contextual memory buffer)',
      'Headless Cloud CMS & Admin Portal (Firebase Firestore, CDN pipeline & code-free publishing)',
      'Full Legal & Performance Suite (GDPR cookie consent, legal routes & Core Web Vitals pass)',
    ],
    extrasTitle: 'Production & Engineering Deliverables',
    extras: [
      'Zero-downtime CI/CD deployment pipeline with automated preview branches',
      'Password-protected cloud admin portal with role-based access control',
      'Custom visual themes, micro-animations, and fluid physics interactions',
      'Cloud database security rules & optimized REST/WebSocket API endpoints',
      'Cross-device QA testing & responsive validation (Mobile, Tablet, 4K Desktop)',
    ],
    bestFor: 'Entertainment campaigns, creative studios, fashion labels, innovative product drops, and ambitious brands seeking a high-engagement, award-worthy digital experience.',
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
    value: 'Secures project scheduling and initiates the architecture sprint.',
  },
  {
    label: '50% Final Payment',
    value: 'Invoiced upon staging sign-off, prior to live DNS cutover and repository handover.',
  },
  {
    label: 'Turnaround Timelines',
    value: 'One-Page: 2–3 days · Starter: 5–7 days · Business: 10–12 days · Professional: 14–18 days · Flagship: 3–4 weeks',
  },
  {
    label: 'Revisions Scope',
    value: 'Two consolidated rounds of revisions per page section are included within scope.',
  },
  {
    label: '30-Day Post-Launch Warranty',
    value: '30 days of complimentary bug-fix and technical defect support post-launch.',
  },
  {
    label: 'Exclusions & Direct Billing',
    value: 'Domain registration, web hosting, and third-party API token consumption (e.g., Gemini API) are billed directly to client accounts.',
  },
];

export const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Typical Scope & Pages',
    portfolio: '1 Page Sprint',
    starter: '3 Core Pages',
    business: '5 Conversion Pages',
    professional: '8 Strategic Pages',
    flagship: 'Full Custom Web App / OS',
  },
  {
    feature: 'Turnaround Timeline',
    portfolio: '2–3 days',
    starter: '5–7 days',
    business: '10–12 days',
    professional: '14–18 days',
    flagship: '3–4 weeks',
  },
  {
    feature: 'Core Pages & Content Architecture',
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
    feature: 'Visual Proof & Media Display',
    portfolio: 'Work grid showcase',
    starter: 'Credibility blocks',
    business: 'Dedicated visual gallery',
    professional: 'Gallery + Testimonials hub',
    flagship: 'Cloudinary CDN media + audio engine',
  },
  {
    feature: 'Interactive Audio & Gamification',
    portfolio: 'Not Included',
    starter: 'Not Included',
    business: 'Not Included',
    professional: 'Not Included',
    flagship: 'Web Audio API procedural sound engine',
  },
  {
    feature: 'CMS & Admin Capability',
    portfolio: 'Code-only updates',
    starter: 'Code-only updates',
    business: 'Code-only updates',
    professional: 'Scalable content templates',
    flagship: 'Headless Firebase Firestore CMS + Cloudinary',
  },
  {
    feature: 'SEO & Performance Baseline',
    portfolio: 'Basic meta tags',
    starter: 'Core on-page + speed baseline',
    business: 'Local SEO + optimization pass',
    professional: 'Full SEO architecture + deep CWV pass',
    flagship: 'Hardware-accelerated reactive performance',
  },
];

export const addOnItems: AddOnItem[] = [
  {
    name: 'Additional Standard Page',
    investmentPhp: '₱5,000',
    timeline: '+1–2 days',
    description: 'Custom-designed, mobile-responsive page matching existing brand architecture.',
  },
  {
    name: 'Custom AI Chatbot (Gemini / OpenAI)',
    investmentPhp: '₱20,000',
    timeline: '+4–6 days',
    description: 'Persona prompt engineering, knowledge base ingestion, and multi-turn conversational interface.',
  },
  {
    name: 'Headless CMS & Admin Dashboard',
    investmentPhp: '₱20,000',
    timeline: '+4–6 days',
    description: 'Cloud database (Firebase Firestore) + Cloudinary CDN pipeline with private login portal.',
  },
  {
    name: 'Web Audio API & Sound Engine',
    investmentPhp: '₱15,000',
    timeline: '+3–5 days',
    description: 'Synthesizer sound FX, interactive draggable elements, and persistent audio player integration.',
  },
  {
    name: 'Automated Lead Workflows (n8n / Zapier)',
    investmentPhp: '₱10,000',
    timeline: '+2–3 days',
    description: 'Instant lead delivery from website forms to CRM, Discord, Telegram, or Google Sheets.',
  },
  {
    name: 'Developer Maintenance Day Rate',
    investmentPhp: '₱3,000 / day',
    timeline: 'As needed',
    description: 'On-demand engineering sprint for new feature additions, content drops, or updates.',
  },
  {
    name: 'Monthly Care Retainer',
    investmentPhp: '₱10,000 / month',
    timeline: 'Ongoing',
    description: 'Up to 2 content updates/drops per month, API monitoring, bug fixes, and security patches.',
  },
];
