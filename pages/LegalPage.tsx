import React, { useEffect } from 'react';
import { AppRoute } from '../utils/routing';
import { LegalLayout } from '../ui/LegalLayout';
import { PrivacyPolicyContent } from './legal/PrivacyPolicyContent';
import { TermsContent } from './legal/TermsContent';
import { CookiePolicyContent } from './legal/CookiePolicyContent';

interface LegalPageProps {
  currentRoute: AppRoute;
}

export const LegalPage: React.FC<LegalPageProps> = ({ currentRoute }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [currentRoute]);

  if (currentRoute === '/terms') {
    return (
      <LegalLayout
        currentRoute={currentRoute}
        title="Terms and Conditions"
        subtitle="Standard commercial terms governing client web engineering, deliverable handoffs, licensing, and usage."
        lastUpdated="September 19, 2026"
      >
        <TermsContent />
      </LegalLayout>
    );
  }

  if (currentRoute === '/cookies') {
    return (
      <LegalLayout
        currentRoute={currentRoute}
        title="Cookie Policy"
        subtitle="Transparent documentation regarding local storage keys, necessary security tokens, and user preference controls."
        lastUpdated="September 19, 2026"
      >
        <CookiePolicyContent />
      </LegalLayout>
    );
  }

  // Default to /privacy
  return (
    <LegalLayout
      currentRoute={currentRoute}
      title="Privacy Policy"
      subtitle="How Louisse Dominique Bertillo collects, processes, and respects your personal data under GDPR, CCPA, and RA 10173."
      lastUpdated="September 19, 2026"
    >
      <PrivacyPolicyContent />
    </LegalLayout>
  );
};
