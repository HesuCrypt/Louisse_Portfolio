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

const chipStyles =
  'inline-flex cursor-pointer items-center gap-2 border border-line-mid px-3 py-2 font-mono text-2xs tracking-wider2 text-fg-dim uppercase transition-colors hover:border-line-strong hover:text-fg';

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
    <div className="py-16 md:py-24">
      <Container>
        {/* Utility row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => pushRoute('/')}
            className="group inline-flex w-fit cursor-pointer items-center gap-2 font-mono text-2xs tracking-wider2 text-fg-dim uppercase transition-colors hover:text-fg"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Back to Portfolio</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={openCookiePreferences}
              className={chipStyles}
              title="Open Cookie Consent Manager"
            >
              <Settings size={13} aria-hidden="true" />
              <span>Cookie Preferences</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className={`${chipStyles} print:hidden`}
              title="Print or Save as PDF"
            >
              <Printer size={13} aria-hidden="true" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10 border-t border-line pt-6 md:mt-14 md:pt-8"
        >
          <p className="font-mono text-2xs tracking-label text-fg-dim uppercase">
            <span>Legal Compliance</span>
            <span className="px-2 text-line-strong">/</span>
            <span className="tnum text-fg-muted">Effective {lastUpdated}</span>
          </p>
          <H1 className="mt-5">{title}</H1>
          <Body className="mt-5 max-w-[62ch]">{subtitle}</Body>
        </motion.div>

        {/* Tab navigation */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-line pb-4 print:hidden">
          {legalTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentRoute === tab.route;

            return (
              <button
                key={tab.route}
                type="button"
                onClick={() => pushRoute(tab.route)}
                className={`inline-flex cursor-pointer items-center gap-2 border px-4 py-2 font-mono text-2xs tracking-wider2 uppercase transition-colors ${
                  isActive
                    ? 'border-paper bg-paper text-ink'
                    : 'border-line-mid text-fg-dim hover:border-line-strong hover:text-fg'
                }`}
              >
                <Icon size={13} aria-hidden="true" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="legal-content mt-12 max-w-[80ch]"
        >
          {children}
        </motion.article>
      </Container>
    </div>
  );
};
