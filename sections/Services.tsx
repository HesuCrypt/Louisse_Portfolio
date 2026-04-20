import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Container } from '../ui/Container';
import { H2, Body } from '../ui/Text';
import { Button } from '../ui/Button';
import { containerVariants, itemVariants } from '../motion/variants';

interface PricingCard {
  id: string;
  title: string;
  price: string;
  scopeLine: string;
  summary: [string, string];
  pagesTitle: string;
  pages: string[];
  extrasTitle: string;
  extras: string[];
  bestFor: string;
  popular: boolean;
}

const pricingCards: PricingCard[] = [
  {
    id: 'portfolio-starter',
    title: 'Portfolio Starter Package',
    price: '₱5,000',
    scopeLine: '2 pages · quick personal showcase',
    summary: [
      'Fastest way to go live: home + work, minimal moving parts.',
      'Not included: About/Services pages, working form backend, or multi-section business layouts.',
    ],
    pagesTitle: 'Pages (₱3,000 value)',
    pages: ['Home Page', 'Portfolio / Projects Page'],
    extrasTitle: 'Included Extras (₱2,000 value)',
    extras: [
      'Mobile-friendly layout (2 pages)',
      'Project grid / showcase for your work',
      'Social profile links (icons + URLs)',
      'Contact via mailto or simple CTA block (no form integration)',
      'Light SEO: page titles & meta descriptions',
    ],
    bestFor: 'Freelancers, designers, developers, photographers—anyone who mainly needs “here’s my work.”',
    popular: false,
  },
  {
    id: 'starter-website',
    title: 'Starter Website Package',
    price: '₱30,000',
    scopeLine: '3 pages · credible small-business presence',
    summary: [
      'Adds real business structure: story (About) + trust + contact that actually sends messages.',
      'Sweet spot when you’ve outgrown a link-in-bio but don’t need maps, galleries, or extra modules yet.',
    ],
    pagesTitle: 'Pages (₱18,000 value)',
    pages: ['Home Page', 'About Page', 'Contact Page'],
    extrasTitle: 'Included Extras (₱12,000 value)',
    extras: [
      'Responsive layout (phone, tablet, desktop)',
      'Contact form with validation + email delivery setup',
      'Clear navigation & on-brand sections',
      'Social links + footer essentials',
      'Basic SEO setup (titles, meta, semantic headings)',
    ],
    bestFor: 'Small businesses, personal brands, startups validating their offer online.',
    popular: false,
  },
  {
    id: 'business-website',
    title: 'Business Website Package',
    price: '₱40,000',
    scopeLine: '5 pages · built for local & service businesses',
    summary: [
      'More surface area for services, proof, and visuals—plus location and performance tuning.',
      'Adds what Starter can’t: dedicated Services, gallery, Maps, and speed-focused polish.',
    ],
    pagesTitle: 'Pages (₱24,000 value)',
    pages: [
      'Home Page',
      'About Page',
      'Services Page',
      'Gallery / Portfolio',
      'Contact Page',
    ],
    extrasTitle: 'Included Extras (₱16,000 value)',
    extras: [
      'Responsive QA across common devices & breakpoints',
      'Advanced contact form (custom fields as needed)',
      'Google Maps / location embed for your business',
      'Gallery page with image-forward layouts (ties to your gallery page)',
      'Social integration (links + on-page placements)',
      'Basic SEO + local-friendly structure (business details, clear service pages)',
      'Speed & image optimization (lighter assets, faster loads)',
    ],
    bestFor: 'Restaurants, salons, clinics, agencies—anyone who needs services + visuals + location.',
    popular: true,
  },
  {
    id: 'professional-website',
    title: 'Professional Website Package',
    price: '₱45,000',
    scopeLine: '8 pages · marketing site with content depth',
    summary: [
      'For teams that need publishing (blog), objections handled (FAQ), and proof (testimonials).',
      'Heavier information architecture, stronger SEO scaffolding, and conversion-focused modules.',
    ],
    pagesTitle: 'Pages (₱30,000 value)',
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
    extrasTitle: 'Included Extras (₱15,000 value)',
    extras: [
      'Fully responsive UI with more modules & page types',
      'SEO-ready structure (clean URLs, internal linking, heading hierarchy)',
      'Contact forms with email notifications (multiple touchpoints if needed)',
      'Blog setup (layout + post template; you provide content)',
      'FAQ + testimonials sections wired into the design',
      'Performance optimization (images, loading strategy, practical audits)',
    ],
    bestFor: 'Companies and brands that publish content, answer objections, and need a fuller marketing footprint.',
    popular: false,
  },
];

const trustItems = [
  'Fast delivery',
  'Mobile optimized',
  'Clean modern design',
  'Free consultation',
];

const comparisonRows: { feature: string; portfolio: string; starter: string; business: string; professional: string }[] = [
  {
    feature: 'Typical page count',
    portfolio: '2',
    starter: '3',
    business: '5',
    professional: '8',
  },
  {
    feature: 'Business pages (About / Services)',
    portfolio: '—',
    starter: 'About',
    business: 'About + Services',
    professional: 'About + Services',
  },
  {
    feature: 'Contact',
    portfolio: 'mailto / simple CTA',
    starter: 'Form + email delivery',
    business: 'Advanced form + Maps',
    professional: 'Forms + notifications',
  },
  {
    feature: 'Gallery / proof',
    portfolio: 'Work grid on portfolio page',
    starter: '—',
    business: 'Dedicated gallery page',
    professional: 'Gallery + testimonials',
  },
  {
    feature: 'Blog / FAQ / long-form',
    portfolio: '—',
    starter: '—',
    business: '—',
    professional: 'Blog + FAQ included',
  },
  {
    feature: 'SEO & performance focus',
    portfolio: 'Light (meta)',
    starter: 'Basics',
    business: 'Basics + speed tuning',
    professional: 'Deeper structure + perf pass',
  },
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-32 scroll-mt-20">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-16">
            <H2 className="mb-4">Website Development Services</H2>
            <Body className="text-neutral-400 !max-w-none">
              Four fixed packages so scope is clear. You pay for page depth, integrations (forms, maps), and the amount of
              layout + content systems (blog, FAQ, testimonials). Everything below is what typically ships in each tier—tell
              me your niche and we align copy and sections.
            </Body>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {pricingCards.map((card) => (
              <motion.div key={card.id} variants={itemVariants} className="relative">
                <motion.article
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`h-full flex flex-col rounded-2xl border bg-neutral-900/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-neutral-600 hover:shadow-xl hover:shadow-black/20 ${
                    card.popular
                      ? 'border-white/30 shadow-lg shadow-white/5 lg:scale-[1.05] z-10'
                      : 'border-neutral-800'
                  }`}
                >
                  {card.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-neutral-900 border border-white">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                    <p className="text-2xl font-bold text-white">{card.price}</p>
                    <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{card.scopeLine}</p>
                    <div className="mt-3 space-y-2 text-xs text-neutral-500 leading-relaxed border-t border-neutral-800/80 pt-3">
                      <p>{card.summary[0]}</p>
                      <p>{card.summary[1]}</p>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div>
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                        {card.pagesTitle}
                      </p>
                      <ul className="space-y-1.5">
                        {card.pages.map((item, i) => (
                          <li key={i} className="text-sm text-neutral-300 flex items-center gap-2">
                            <Check className="w-4 h-4 text-emerald-500/80 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                        {card.extrasTitle}
                      </p>
                      <ul className="space-y-1.5">
                        {card.extras.map((item, i) => (
                          <li key={i} className="text-sm text-neutral-300 flex items-center gap-2">
                            <Check className="w-4 h-4 text-emerald-500/80 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <p className="text-xs text-neutral-500 mb-1">Best for:</p>
                      <p className="text-sm text-neutral-400">{card.bestFor}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-neutral-800">
                    <Button
                      href="#contact"
                      variant={card.popular ? 'primary' : 'secondary'}
                      className="w-full justify-center"
                    >
                      Get Started
                    </Button>
                  </div>
                </motion.article>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mb-16 rounded-2xl border border-neutral-800 bg-neutral-950/40 overflow-hidden"
          >
            <div className="px-4 py-4 md:px-6 border-b border-neutral-800">
              <p className="text-sm font-medium text-white">Compare packages</p>
              <p className="text-xs text-neutral-500 mt-1">
                Use this table to see what changes between tiers. The big jump from ₱5k → ₱30k is mostly{' '}
                <span className="text-neutral-400">structure + a real contact form</span>; ₱40k adds{' '}
                <span className="text-neutral-400">more pages, Maps, gallery, and speed work</span>; ₱45k adds{' '}
                <span className="text-neutral-400">blog + FAQ + testimonials</span> as full site sections.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-500 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 md:px-6 font-medium">Feature</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">₱5k</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">₱30k</th>
                    <th className="px-3 py-3 font-medium whitespace-nowrap">₱40k</th>
                    <th className="px-3 py-3 pr-4 md:pr-6 font-medium whitespace-nowrap">₱45k</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-300">
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-b border-neutral-800/80 last:border-0">
                      <td className="px-4 py-3 md:px-6 text-neutral-400">{row.feature}</td>
                      <td className="px-3 py-3 text-neutral-300">{row.portfolio}</td>
                      <td className="px-3 py-3 text-neutral-300">{row.starter}</td>
                      <td className="px-3 py-3 text-neutral-300">{row.business}</td>
                      <td className="px-3 py-3 pr-4 md:pr-6 text-neutral-300">{row.professional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10 py-6 border-t border-neutral-800"
          >
            {trustItems.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-sm text-neutral-400">
                <Check className="w-4 h-4 text-emerald-500/80 shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
