export interface ServicePackage {
  id: string;
  title: string;
  basePricePhp: number;
  scopeLine: string;
  summary: [string, string];
  pagesTitle: string;
  pages: string[];
  extrasTitle: string;
  extras: string[];
  bestFor: string;
  popular: boolean;
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
}

export const servicePackages: ServicePackage[] = [
  {
    id: 'portfolio-starter',
    title: 'Portfolio Starter Package',
    basePricePhp: 5000,
    scopeLine: '2 pages · quick personal showcase',
    summary: [
      'Fastest way to go live: home + work, minimal moving parts.',
      'Not included: About/Services pages, working form backend, or multi-section business layouts.',
    ],
    pagesTitle: 'Pages (PHP 3,000 value)',
    pages: ['Home Page', 'Portfolio / Projects Page'],
    extrasTitle: 'Included Extras (PHP 2,000 value)',
    extras: [
      'Mobile-friendly layout (2 pages)',
      'Project grid / showcase for your work',
      'Social profile links (icons + URLs)',
      'Contact via mailto or simple CTA block (no form integration)',
      'Light SEO: page titles & meta descriptions',
    ],
    bestFor: 'Freelancers, designers, developers, and photographers who mainly need a focused work showcase.',
    popular: false,
  },
  {
    id: 'starter-website',
    title: 'Starter Website Package',
    basePricePhp: 30000,
    scopeLine: '3 core pages · clean brand presence',
    summary: [
      'Built for businesses that need a polished online presence with a clear message and a real inquiry flow.',
      'Best starting tier for launching professionally before adding heavier features like gallery, maps, and content modules.',
    ],
    pagesTitle: 'Pages (PHP 18,000 value)',
    pages: ['Home Page', 'About Page', 'Contact Page'],
    extrasTitle: 'Included Extras (PHP 12,000 value)',
    extras: [
      'Responsive layout (phone, tablet, desktop)',
      'Contact form with validation + email delivery setup',
      'On-brand section design and clear page hierarchy',
      'Social links + footer essentials',
      'Basic on-page SEO (titles, meta, headings)',
      'Speed baseline setup (compressed assets + clean structure)',
    ],
    bestFor: 'Small businesses, personal brands, startups validating their offer online.',
    popular: false,
  },
  {
    id: 'business-website',
    title: 'Business Website Package',
    basePricePhp: 40000,
    scopeLine: '5 conversion pages · service-business ready',
    summary: [
      'Expanded for businesses that need stronger conversion flow, service clarity, and location-based trust.',
      'Adds dedicated service and gallery content plus more advanced lead capture and optimization.',
    ],
    pagesTitle: 'Pages (PHP 24,000 value)',
    pages: [
      'Home Page',
      'About Page',
      'Services Page',
      'Gallery / Portfolio',
      'Contact Page',
    ],
    extrasTitle: 'Included Extras (PHP 16,000 value)',
    extras: [
      'Responsive QA across common devices and breakpoints',
      'Advanced contact form (custom fields + stronger inquiry structure)',
      'Google Maps / location embed for local trust',
      'Dedicated gallery visuals and proof-oriented layouts',
      'Local SEO structure (service intent + business/location signals)',
      'Speed and image optimization pass',
      'Social integration placements across key sections',
    ],
    bestFor: 'Restaurants, salons, clinics, and agencies that need services, visuals, and location trust signals.',
    popular: true,
  },
  {
    id: 'professional-website',
    title: 'Professional Website Package',
    basePricePhp: 45000,
    scopeLine: '8 strategic pages · content and authority focused',
    summary: [
      'Designed for brands that need authority content, deeper trust signals, and long-term SEO growth.',
      'Best for teams ready for full funnel messaging: discovery, proof, objections, and ongoing content.',
    ],
    pagesTitle: 'Pages (PHP 30,000 value)',
    pages: [
      'Home Page',
      'About Page',
      'Services Page',
      'Portfolio / Gallery',
      'Blog Page',
      'FAQ Page',
      'Testimonials',
      'Contact Page',
    ],
    extrasTitle: 'Included Extras (PHP 15,000 value)',
    extras: [
      'Fully responsive multi-page UI system',
      'SEO-ready site architecture (URLs, internal linking, heading hierarchy)',
      'Multiple conversion touchpoints with email notifications',
      'Blog system setup (listing + post template structure)',
      'FAQ and testimonials integrated into conversion flow',
      'Deeper performance pass (loading strategy + asset optimization)',
      'Scalable layout structure for future pages/content expansion',
    ],
    bestFor: 'Companies and brands that publish content, answer objections, and need a fuller marketing footprint.',
    popular: false,
  },
];

export const trustItems = [
  'Fast delivery',
  'Mobile optimized',
  'Clean modern design',
  'Free consultation',
];

export const engagementTerms: EngagementTerm[] = [
  {
    label: 'Timeline',
    value: 'Portfolio: 3-5 days · Starter: 7-10 days · Business: 10-14 days · Professional: 14-21 days',
  },
  {
    label: 'Revisions',
    value: 'Two revision rounds per page section are included in every package.',
  },
  {
    label: 'Payment Terms',
    value: '50% upfront to start, 50% before final handoff and deployment.',
  },
  {
    label: 'What Is Not Included',
    value: 'Domain/hosting fees, premium paid plugins, and custom copywriting unless agreed in scope.',
  },
];

export const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Typical page count',
    portfolio: '2',
    starter: '3',
    business: '5',
    professional: '8',
  },
  {
    feature: 'Business pages (About / Services)',
    portfolio: 'Not Included',
    starter: 'About',
    business: 'About + Services',
    professional: 'About + Services',
  },
  {
    feature: 'Contact',
    portfolio: 'mailto / simple CTA',
    starter: 'Form + email delivery',
    business: 'Advanced form + Maps',
    professional: 'Multi-touch forms + notifications',
  },
  {
    feature: 'Gallery / proof',
    portfolio: 'Work grid on portfolio page',
    starter: 'Not Included',
    business: 'Dedicated gallery page',
    professional: 'Gallery + testimonials',
  },
  {
    feature: 'Blog / FAQ / long-form',
    portfolio: 'Not Included',
    starter: 'Not Included',
    business: 'Not Included',
    professional: 'Blog + FAQ included',
  },
  {
    feature: 'SEO & performance focus',
    portfolio: 'Light (meta)',
    starter: 'Core on-page + speed baseline',
    business: 'Local SEO + optimization pass',
    professional: 'Advanced structure + deeper perf pass',
  },
];
