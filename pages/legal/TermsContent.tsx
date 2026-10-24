import React from 'react';
import { FileText, Scale } from 'lucide-react';

const sectionTitle = 'flex items-baseline gap-3 font-sans text-lg font-medium tracking-[-0.02em] text-fg';
const ordinal = 'tnum font-mono text-2xs text-fg-faint';
const bodyText = 'text-[0.9375rem] leading-[1.75] text-fg-muted';
const smallText = 'text-[0.8125rem] leading-relaxed text-fg-muted';
const linkStyle = 'text-fg underline underline-offset-4 transition-colors hover:text-fg-muted';

export const TermsContent: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Overview */}
      <div className="border border-line-mid bg-panel p-6">
        <div className="flex items-start gap-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center border border-line-strong text-fg">
            <FileText size={18} aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-sans text-lg font-medium tracking-[-0.02em] text-fg">Terms and Conditions of Service</h2>
            <p className="mt-2 text-[0.9375rem] leading-[1.75] text-fg-muted">
              These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Client,&quot;
              &quot;User,&quot; or &quot;you&quot;) and Louisse Dominique Bertillo (&quot;Developer,&quot; &quot;we,&quot; or &quot;us&quot;),
              governing your access to and use of{' '}
              <a href="https://louissebaja.com" className={linkStyle}>
                https://louissebaja.com
              </a>{' '}
              and all professional design, development, and AI engineering services rendered.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Agreement to Terms */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>01.</span>
          <span>Acceptance of Terms</span>
        </h3>
        <p className={bodyText}>
          By browsing this website, requesting a project quote, engaging our consulting services, or executing a Statement of
          Work (SOW), you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree
          with any part of these Terms, you must immediately discontinue use of this site and refrain from engaging services.
        </p>
      </section>

      {/* Section 2: Scope of Professional Services */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>02.</span>
          <span>Scope of Professional Services</span>
        </h3>
        <p className={bodyText}>
          Louisse Dominique Bertillo provides professional engineering and creative services, including but not limited to:
        </p>
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
          <div className="bg-ink p-4">
            <strong className="mb-1 block text-[0.8125rem] text-fg">Web Development:</strong>
            <span className={smallText}>Full-stack responsive websites, SPA web apps (React, Next.js, TypeScript), animations (Framer Motion), and API integrations.</span>
          </div>
          <div className="bg-ink p-4">
            <strong className="mb-1 block text-[0.8125rem] text-fg">E-Commerce Architecture:</strong>
            <span className={smallText}>Shopify storefront development, Liquid customization, conversion rate optimization, and checkout workflows.</span>
          </div>
          <div className="bg-ink p-4">
            <strong className="mb-1 block text-[0.8125rem] text-fg">AI Automation &amp; Agents:</strong>
            <span className={smallText}>Autonomous workflow automations (n8n, Google Agent ADK, Claude API, OpenAI), customer support bots, and internal tools.</span>
          </div>
          <div className="bg-ink p-4">
            <strong className="mb-1 block text-[0.8125rem] text-fg">UI/UX Design &amp; Prototyping:</strong>
            <span className={smallText}>Design systems, wireframes, modern component architecture, and high-fidelity prototypes.</span>
          </div>
        </div>
      </section>

      {/* Section 3: Proposals, SOWs & Payment Terms */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>03.</span>
          <span>Proposals, SOWs &amp; Payment Schedule</span>
        </h3>
        <p className={bodyText}>
          Individual projects are executed under separate written project proposals or Statements of Work (SOW) specifying milestones,
          timeline, deliverables, and fees. Unless otherwise mutually negotiated in a signed SOW:
        </p>
        <ul className="ml-2 list-disc list-inside space-y-2 text-[0.9375rem] leading-relaxed text-fg-muted">
          <li>
            <strong className="text-fg">Deposit Requirement:</strong> A non-refundable 50% upfront deposit is required
            before project kickoff, resource allocation, and initial sprint scheduling.
          </li>
          <li>
            <strong className="text-fg">Final Balance:</strong> The remaining 50% balance is invoiced upon final review
            approval and must be paid in full prior to code deployment, domain transfer, or repository handoff.
          </li>
          <li>
            <strong className="text-fg">Payment Methods:</strong> Invoices are payable in Philippine Peso (PHP) or US
            Dollars (USD) via direct bank transfer, Wise, or credit card invoicing. Payment terms are net-7 days from invoice date.
          </li>
          <li>
            <strong className="text-fg">Late Invoices:</strong> Overdue accounts may be subject to suspension of active
            work or staging server access until balances are resolved.
          </li>
        </ul>
      </section>

      {/* Section 4: Revisions & Scope Boundaries */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>04.</span>
          <span>Revisions &amp; Scope Adjustments</span>
        </h3>
        <p className={bodyText}>
          Each contracted deliverable includes up to two (2) consolidated rounds of feedback and revision within the initial
          defined scope. Additional revisions, substantial architectural alterations, or feature additions outside the agreed
          SOW will be estimated as a change order and billed at our standard hourly or fixed addendum rate.
        </p>
      </section>

      {/* Section 5: Intellectual Property */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>05.</span>
          <span>Intellectual Property Rights</span>
        </h3>
        <div className="space-y-3">
          <p className={smallText}>
            <strong className="text-fg">Client Ownership:</strong> Upon receipt of 100% full payment for the project,
            the Client is granted exclusive ownership and copyright of the final bespoke code, copy, and graphic assets created
            specifically for the Client under the applicable SOW.
          </p>
          <p className={smallText}>
            <strong className="text-fg">Developer Retained Tools &amp; Libraries:</strong> The Developer retains all right,
            title, and interest in pre-existing codebases, boilerplate libraries, generic utility algorithms, and open-source
            frameworks incorporated into the project. The Client receives a perpetual, non-exclusive, royalty-free license to use
            such components as part of the delivered software.
          </p>
          <p className={smallText}>
            <strong className="text-fg">Portfolio Showcase:</strong> Unless explicitly restricted by an executed mutual
            Non-Disclosure Agreement (NDA), the Developer reserves the right to showcase screenshots, live previews, and case
            studies of completed work on https://louissebaja.com, social profiles, and client pitches.
          </p>
        </div>
      </section>

      {/* Section 6: Client Responsibilities */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>06.</span>
          <span>Client Responsibilities &amp; Delays</span>
        </h3>
        <p className={smallText}>
          Project timelines depend on collaborative communication. The Client agrees to provide prompt feedback (typically
          within 3 business days), necessary branding collateral, licensed typography/photography, API keys, and third-party
          credentials. Project delays resulting from Client inaction or missing materials shall extend estimated delivery
          milestones accordingly without penalty to the Developer.
        </p>
      </section>

      {/* Section 7: Acceptable Use & Conduct */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>07.</span>
          <span>Acceptable Use of Website &amp; Tools</span>
        </h3>
        <p className={smallText}>
          When accessing this website and its interactive tools (including the AI Assistant widget and contact forms), you agree
          NOT to:
        </p>
        <ul className="ml-2 list-disc list-inside space-y-1.5 text-[0.8125rem] leading-relaxed text-fg-muted">
          <li>Conduct automated scraping, data extraction, or denial-of-service stress tests without written permission.</li>
          <li>Submit malicious code, SQL injection payloads, or cross-site scripting vectors into form fields.</li>
          <li>Prompt the AI Assistant with illegal, abusive, defamatory, or harmful instructions.</li>
          <li>Attempt to reverse-engineer or circumvent client authorization barriers or API rate limits.</li>
        </ul>
      </section>

      {/* Section 8: Warranties & Disclaimers */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>08.</span>
          <span>Warranty &amp; Bug-Fix Grace Period</span>
        </h3>
        <p className={smallText}>
          The website and its promotional materials are provided on an &quot;as is&quot; and &quot;as available&quot; basis. For contracted
          custom projects, the Developer provides a thirty (30) day post-launch warranty period during which verifiable defects,
          broken links, or functional bugs directly attributable to original scope are corrected promptly at no additional charge.
          This warranty excludes defects caused by third-party API changes, client server modifications, or unauthorized edits by
          external parties.
        </p>
      </section>

      {/* Section 9: Limitation of Liability */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>09.</span>
          <span>Limitation of Liability</span>
        </h3>
        <p className={smallText}>
          To the maximum extent permitted by applicable law, in no event shall Louisse Dominique Bertillo be liable for any
          indirect, punitive, incidental, special, consequential, or exemplary damages, including lost profits, business
          interruption, loss of data, or goodwill arising out of the use or inability to use the site or services. In all cases,
          total aggregate liability shall be strictly limited to the actual fees paid to the Developer under the disputed project
          in the preceding six (6) months.
        </p>
      </section>

      {/* Section 10: Governing Law */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>10.</span>
          <span>Governing Law &amp; Jurisdiction</span>
        </h3>
        <p className={smallText}>
          These Terms and any contractual relations shall be governed by and construed in accordance with the substantive laws
          of the Republic of the Philippines. Parties agree to attempt informal, good-faith negotiation for at least thirty (30)
          days prior to initiating formal legal proceedings in the competent courts of Metro Manila, Philippines.
        </p>
      </section>

      {/* Section 11: Contact */}
      <section className="space-y-3 border border-line-mid bg-panel p-6">
        <h3 className="flex items-center gap-2 font-sans text-lg font-medium tracking-[-0.02em] text-fg">
          <Scale size={16} className="text-fg-dim" aria-hidden="true" />
          <span>Questions About Terms of Service</span>
        </h3>
        <p className={smallText}>
          If you have questions regarding these terms or wish to discuss custom enterprise contracts or NDAs, please contact:
        </p>
        <div className="pt-1">
          <a
            href="mailto:louissebertillo2004@gmail.com?subject=Terms%20Inquiry%20-%20louissebaja.com"
            className="inline-flex items-center gap-2 border border-paper bg-paper px-4 py-2 font-mono text-2xs tracking-wider2 text-ink uppercase transition-colors hover:bg-ink hover:text-paper"
          >
            <FileText size={14} aria-hidden="true" />
            <span>Email: louissebertillo2004@gmail.com</span>
          </a>
        </div>
      </section>
    </div>
  );
};
