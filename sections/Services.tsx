import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { H2, Body } from '../ui/Text';
import { Button } from '../ui/Button';
import { containerVariants, itemVariants } from '../motion/variants';
import { Check } from 'lucide-react';

const pricingCards = [
  {
    id: 'portfolio-starter',
    title: 'Portfolio Starter Package',
    price: '₱3,000',
    pagesTitle: 'Pages (₱2,000 value)',
    pages: ['Home Page', 'Portfolio / Projects Page'],
    extrasTitle: 'Included Extras (₱1,000 value)',
    extras: [
      'Mobile responsive design',
      'Project gallery showcase',
      'Social media links',
      'Contact form for inquiries',
      'Basic SEO setup',
    ],
    bestFor: 'Freelancers, designers, developers, photographers, content creators',
    popular: false,
  },
  {
    id: 'starter-website',
    title: 'Starter Website Package',
    price: '₱8,000',
    pagesTitle: 'Pages (₱6,000 value)',
    pages: ['Home Page', 'About Page', 'Contact Page'],
    extrasTitle: 'Included Extras (₱2,000 value)',
    extras: [
      'Mobile responsive design',
      'Contact form',
      'Social media links',
      'Basic SEO setup',
    ],
    bestFor: 'Small businesses, personal brands, startups',
    popular: false,
  },
  {
    id: 'business-website',
    title: 'Business Website Package',
    price: '₱14,000',
    pagesTitle: 'Pages (₱10,000 value)',
    pages: [
      'Home Page',
      'About Page',
      'Services Page',
      'Gallery / Portfolio',
      'Contact Page',
    ],
    extrasTitle: 'Included Extras (₱4,000 value)',
    extras: [
      'Mobile, tablet, and desktop optimization',
      'Advanced contact form',
      'Social media integration',
      'Google Maps integration',
      'Image gallery section',
      'Basic SEO setup',
      'Speed optimization',
    ],
    bestFor: 'Restaurants, salons, service businesses, agencies',
    popular: true,
  },
  {
    id: 'professional-website',
    title: 'Professional Website Package',
    price: '₱20,000',
    pagesTitle: 'Pages (₱16,000 value)',
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
    extrasTitle: 'Included Extras (₱4,000 value)',
    extras: [
      'Fully responsive design',
      'SEO ready structure',
      'Contact forms with email notification',
      'Social media integration',
      'Blog setup',
      'Testimonials section',
      'Performance optimization',
    ],
    bestFor: 'Companies, growing businesses, professional brands',
    popular: false,
  },
];

const trustItems = [
  'Fast delivery',
  'Mobile optimized',
  'Clean modern design',
  'Free consultation',
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
              Professional websites designed to help businesses grow online.
            </Body>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 mb-16">
            {pricingCards.map((card, index) => (
              <motion.div
                key={card.id}
                variants={itemVariants}
                className="relative"
              >
                <motion.article
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`h-full flex flex-col rounded-2xl border bg-neutral-900/50 backdrop-blur-sm p-6 md:p-6 transition-all duration-300 hover:border-neutral-600 hover:shadow-xl hover:shadow-black/20 ${
                    card.popular
                      ? 'border-white/30 shadow-lg shadow-white/5 lg:scale-[1.05] z-10'
                      : 'border-neutral-800'
                  }`}
                >
                  {card.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white border border-white/30">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-2xl font-bold text-white">{card.price}</p>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div>
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                        {card.pagesTitle}
                      </p>
                      <ul className="space-y-1.5">
                        {card.pages.map((item, i) => (
                          <li
                            key={i}
                            className="text-sm text-neutral-300 flex items-center gap-2"
                          >
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
                          <li
                            key={i}
                            className="text-sm text-neutral-300 flex items-center gap-2"
                          >
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
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10 py-6 border-t border-neutral-800"
          >
            {trustItems.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-sm text-neutral-400"
              >
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
