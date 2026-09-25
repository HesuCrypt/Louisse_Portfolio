import React from 'react';
import { FileText, CheckCircle2, ShieldAlert, Code2, Scale, HelpCircle } from 'lucide-react';

export const TermsContent: React.FC = () => {
  return (
    <div className="space-y-10 text-neutral-300">
      {/* Overview Card */}
      <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-md bg-neutral-800 text-neutral-200 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Terms and Conditions of Service</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Client,&quot;
              &quot;User,&quot; or &quot;you&quot;) and Louisse Dominique Bertillo (&quot;Developer,&quot; &quot;we,&quot; or &quot;us&quot;),
              governing your access to and use of{' '}
              <a href="https://louissebaja.com" className="text-white underline hover:text-neutral-300">
                https://louissebaja.com
              </a>{' '}
              and all professional design, development, and AI engineering services rendered.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Agreement to Terms */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">01.</span>
          Acceptance of Terms
        </h3>
        <p className="text-neutral-400 leading-relaxed">
          By browsing this website, requesting a project quote, engaging our consulting services, or executing a Statement of
          Work (SOW), you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree
          with any part of these Terms, you must immediately discontinue use of this site and refrain from engaging services.
        </p>
      </section>

      {/* Section 2: Scope of Professional Services */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">02.</span>
          Scope of Professional Services
        </h3>
        <p className="text-neutral-400 leading-relaxed">
          Louisse Dominique Bertillo provides professional engineering and creative services, including but not limited to:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded border border-neutral-800 bg-neutral-900/30">
            <strong className="text-white block mb-1">Web Development:</strong>
            Full-stack responsive websites, SPA web apps (React, Next.js, TypeScript), animations (Framer Motion), and API integrations.
          </div>
          <div className="p-3.5 rounded border border-neutral-800 bg-neutral-900/30">
            <strong className="text-white block mb-1">E-Commerce Architecture:</strong>
            Shopify storefront development, Liquid customization, conversion rate optimization, and checkout workflows.
          </div>
          <div className="p-3.5 rounded border border-neutral-800 bg-neutral-900/30">
            <strong className="text-white block mb-1">AI Automation &amp; Agents:</strong>
            Autonomous workflow automations (n8n, Google Agent ADK, Claude API, OpenAI), customer support bots, and internal tools.
          </div>
          <div className="p-3.5 rounded border border-neutral-800 bg-neutral-900/30">
            <strong className="text-white block mb-1">UI/UX Design &amp; Prototyping:</strong>
            Design systems, wireframes, modern component architecture, and high-fidelity prototypes.
          </div>
        </div>
      </section>

      {/* Section 3: Proposals, SOWs & Payment Terms */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">03.</span>
          Proposals, SOWs &amp; Payment Schedule
        </h3>
        <p className="text-neutral-400 leading-relaxed">
          Individual projects are executed under separate written project proposals or Statements of Work (SOW) specifying milestones,
          timeline, deliverables, and fees. Unless otherwise mutually negotiated in a signed SOW:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-400 text-sm ml-2">
          <li>
            <strong className="text-neutral-200">Deposit Requirement:</strong> A non-refundable 50% upfront deposit is required
            before project kickoff, resource allocation, and initial sprint scheduling.
          </li>
          <li>
            <strong className="text-neutral-200">Final Balance:</strong> The remaining 50% balance is invoiced upon final review
            approval and must be paid in full prior to code deployment, domain transfer, or repository handoff.
          </li>
          <li>
            <strong className="text-neutral-200">Payment Methods:</strong> Invoices are payable in Philippine Peso (PHP) or US
            Dollars (USD) via direct bank transfer, Wise, or credit card invoicing. Payment terms are net-7 days from invoice date.
          </li>
          <li>
            <strong className="text-neutral-200">Late Invoices:</strong> Overdue accounts may be subject to suspension of active
            work or staging server access until balances are resolved.
          </li>
        </ul>
      </section>

      {/* Section 4: Revisions & Scope Boundaries */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">04.</span>
          Revisions &amp; Scope Adjustments
        </h3>
        <p className="text-neutral-400 leading-relaxed">
          Each contracted deliverable includes up to two (2) consolidated rounds of feedback and revision within the initial
          defined scope. Additional revisions, substantial architectural alterations, or feature additions outside the agreed
          SOW will be estimated as a change order and billed at our standard hourly or fixed addendum rate.
        </p>
      </section>

      {/* Section 5: Intellectual Property */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">05.</span>
          Intellectual Property Rights
        </h3>
        <div className="space-y-3 text-neutral-400 text-sm leading-relaxed">
          <p>
            <strong className="text-white">Client Ownership:</strong> Upon receipt of 100% full payment for the project,
            the Client is granted exclusive ownership and copyright of the final bespoke code, copy, and graphic assets created
            specifically for the Client under the applicable SOW.
          </p>
          <p>
            <strong className="text-white">Developer Retained Tools &amp; Libraries:</strong> The Developer retains all right,
            title, and interest in pre-existing codebases, boilerplate libraries, generic utility algorithms, and open-source
            frameworks incorporated into the project. The Client receives a perpetual, non-exclusive, royalty-free license to use
            such components as part of the delivered software.
          </p>
          <p>
            <strong className="text-white">Portfolio Showcase:</strong> Unless explicitly restricted by an executed mutual
            Non-Disclosure Agreement (NDA), the Developer reserves the right to showcase screenshots, live previews, and case
            studies of completed work on https://louissebaja.com, social profiles, and client pitches.
          </p>
        </div>
      </section>

      {/* Section 6: Client Responsibilities */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">06.</span>
          Client Responsibilities &amp; Delays
        </h3>
        <p className="text-neutral-400 leading-relaxed text-sm">
          Project timelines depend on collaborative communication. The Client agrees to provide prompt feedback (typically
          within 3 business days), necessary branding collateral, licensed typography/photography, API keys, and third-party
          credentials. Project delays resulting from Client inaction or missing materials shall extend estimated delivery
          milestones accordingly without penalty to the Developer.
        </p>
      </section>

      {/* Section 7: Acceptable Use & Conduct */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">07.</span>
          Acceptable Use of Website &amp; Tools
        </h3>
        <p className="text-neutral-400 leading-relaxed text-sm">
          When accessing this website and its interactive tools (including the AI Assistant widget and contact forms), you agree
          NOT to:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-neutral-400 text-sm ml-2">
          <li>Conduct automated scraping, data extraction, or denial-of-service stress tests without written permission.</li>
          <li>Submit malicious code, SQL injection payloads, or cross-site scripting vectors into form fields.</li>
          <li>Prompt the AI Assistant with illegal, abusive, defamatory, or harmful instructions.</li>
          <li>Attempt to reverse-engineer or circumvent client authorization barriers or API rate limits.</li>
        </ul>
      </section>

      {/* Section 8: Warranties & Disclaimers */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">08.</span>
          Warranty &amp; Bug-Fix Grace Period
        </h3>
        <p className="text-neutral-400 leading-relaxed text-sm">
          The website and its promotional materials are provided on an &quot;as is&quot; and &quot;as available&quot; basis. For contracted
          custom projects, the Developer provides a thirty (30) day post-launch warranty period during which verifiable defects,
          broken links, or functional bugs directly attributable to original scope are corrected promptly at no additional charge.
          This warranty excludes defects caused by third-party API changes, client server modifications, or unauthorized edits by
          external parties.
        </p>
      </section>

      {/* Section 9: Limitation of Liability */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">09.</span>
          Limitation of Liability
        </h3>
        <p className="text-neutral-400 leading-relaxed text-sm">
          To the maximum extent permitted by applicable law, in no event shall Louisse Dominique Bertillo be liable for any
          indirect, punitive, incidental, special, consequential, or exemplary damages, including lost profits, business
          interruption, loss of data, or goodwill arising out of the use or inability to use the site or services. In all cases,
          total aggregate liability shall be strictly limited to the actual fees paid to the Developer under the disputed project
          in the preceding six (6) months.
        </p>
      </section>

      {/* Section 10: Governing Law */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">10.</span>
          Governing Law &amp; Jurisdiction
        </h3>
        <p className="text-neutral-400 leading-relaxed text-sm">
          These Terms and any contractual relations shall be governed by and construed in accordance with the substantive laws
          of the Republic of the Philippines. Parties agree to attempt informal, good-faith negotiation for at least thirty (30)
          days prior to initiating formal legal proceedings in the competent courts of Metro Manila, Philippines.
        </p>
      </section>

      {/* Section 11: Contact */}
      <section className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/50 space-y-3">
        <h3 className="text-lg font-medium text-white flex items-center gap-2">
          <Scale className="w-4 h-4 text-neutral-400" />
          Questions About Terms of Service
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed">
          If you have questions regarding these terms or wish to discuss custom enterprise contracts or NDAs, please contact:
        </p>
        <div className="pt-1">
          <a
            href="mailto:louissebertillo2004@gmail.com?subject=Terms%20Inquiry%20-%20louissebaja.com"
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-white text-black font-medium hover:bg-neutral-200 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Email: louissebertillo2004@gmail.com</span>
          </a>
        </div>
      </section>
    </div>
  );
};
