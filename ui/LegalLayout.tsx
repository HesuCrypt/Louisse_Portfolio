import React from 'react';
import { motion } from 'framer-motion';
import { Container } from './Container';
import { H1, Body } from './Text';
import { AppRoute, pushRoute } from '../utils/routing';
import { ArrowLeft, Printer, ShieldCheck, FileText, Cookie, Settings } from 'lucide-react';
import { openCookiePreferences } from '../utils/cookies';

interface LegalLayoutProps {
  currentRoute: AppRoute;
  title: string;
  subtitle: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

const legalTabs = [
  { name: 'Privacy Policy', route: '/privacy' as const, icon: ShieldCheck },
  { name: 'Terms & Conditions', route: '/terms' as const, icon: FileText },
  { name: 'Cookie Policy', route: '/cookies' as const, icon: Cookie },
];

export const LegalLayout: React.FC<LegalLayoutProps> = ({
  currentRoute,
  title,
  subtitle,
  lastUpdated = 'September 19, 2026',
  children,
}) => {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <Container>
        {/* Navigation & Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <button
            type="button"
            onClick={() => pushRoute('/')}
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors group cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openCookiePreferences}
              className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all cursor-pointer"
              title="Open Cookie Consent Manager"
            >
              <Settings className="w-3.5 h-3.5 text-neutral-400" />
              <span>Cookie Preferences</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all cursor-pointer print:hidden"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-neutral-400" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 mb-4 font-mono">
            <span>Legal Compliance</span>
            <span className="text-neutral-600">•</span>
            <span>Effective: {lastUpdated}</span>
          </div>
          <H1 className="mb-4">{title}</H1>
          <Body className="text-neutral-400 text-base md:text-lg max-w-3xl">
            {subtitle}
          </Body>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-neutral-800/80 pb-4 mb-10 print:hidden">
          {legalTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentRoute === tab.route;
            return (
              <button
                key={tab.route}
                type="button"
                onClick={() => pushRoute(tab.route)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                    : 'bg-neutral-900/40 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content Article */}
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="legal-content prose prose-invert max-w-4xl text-neutral-300 leading-relaxed text-sm md:text-base selection:bg-white/20"
        >
          {children}
        </motion.article>
      </Container>
    </div>
  );
};
