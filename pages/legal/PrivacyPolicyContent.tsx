import React from 'react';
import { Shield, Mail, Lock, Database, Eye } from 'lucide-react';

const sectionTitle = 'flex items-baseline gap-3 font-sans text-lg font-medium tracking-[-0.02em] text-fg';
const ordinal = 'tnum font-mono text-2xs text-fg-faint';
const bodyText = 'text-[0.9375rem] leading-[1.75] text-fg-muted';
const smallText = 'text-[0.8125rem] leading-relaxed text-fg-muted';
const linkStyle = 'text-fg underline underline-offset-4 transition-colors hover:text-fg-muted';
const cellTitle = 'flex items-center gap-2 font-sans text-sm font-medium text-fg';

export const PrivacyPolicyContent: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Overview */}
      <div className="border border-line-mid bg-panel p-6">
        <div className="flex items-start gap-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center border border-line-strong text-fg">
            <Shield size={18} aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-sans text-lg font-medium tracking-[-0.02em] text-fg">Privacy Commitment</h2>
            <p className="mt-2 text-[0.9375rem] leading-[1.75] text-fg-muted">
              This Privacy Policy explains how Louisse Dominique Bertillo (&quot;we,&quot; &quot;us,&quot; or &quot;the Developer&quot;)
              collects, processes, stores, and protects personal data obtained through the website{' '}
              <a href="https://louissebaja.com" className={linkStyle}>
                https://louissebaja.com
              </a>{' '}
              and associated client services, in compliance with the General Data Protection Regulation (GDPR),
              California Consumer Privacy Act (CCPA/CPRA), and the Philippine Data Privacy Act of 2012 (Republic Act No. 10173).
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Data Controller */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>01.</span>
          <span>Data Controller Identification</span>
        </h3>
        <p className={bodyText}>
          The legal entity and individual responsible for the processing of your personal data is:
        </p>
        <div className="space-y-2 border border-line-mid bg-ink p-4 font-mono text-xs text-fg-muted">
          <div><strong className="font-medium text-fg">Controller:</strong> Louisse Dominique Bertillo</div>
          <div><strong className="font-medium text-fg">Role:</strong> Independent Web Developer, Designer &amp; AI Implementation Specialist</div>
          <div><strong className="font-medium text-fg">Location:</strong> Manila, Philippines</div>
          <div>
            <strong className="font-medium text-fg">Direct Email:</strong>{' '}
            <a href="mailto:louissebertillo2004@gmail.com" className={linkStyle}>
              louissebertillo2004@gmail.com
            </a>
          </div>
          <div><strong className="font-medium text-fg">Website:</strong> https://louissebaja.com</div>
        </div>
      </section>

      {/* Section 2: Information We Collect */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>02.</span>
          <span>Categories of Data Collected</span>
        </h3>
        <p className={bodyText}>
          We collect personal data strictly necessary to communicate with prospective clients, assess project requirements,
          and maintain web performance. These categories include:
        </p>

        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
          <div className="space-y-2 bg-ink p-5">
            <div className={cellTitle}>
              <Mail size={15} className="text-fg-dim" aria-hidden="true" />
              <span>Project Inquiries &amp; Contact</span>
            </div>
            <p className={smallText}>
              When you submit a message or request a quotation, we collect your full name, email address, company/brand name,
              target budget, timeline, and descriptive project specifications.
            </p>
          </div>

          <div className="space-y-2 bg-ink p-5">
            <div className={cellTitle}>
              <Database size={15} className="text-fg-dim" aria-hidden="true" />
              <span>AI Assistant Interactions</span>
            </div>
            <p className={smallText}>
              Messages entered into the interactive AI Chat Assistant are transmitted to generate responses regarding portfolio
              projects and service packages. Transcripts are kept ephemeral and not sold.
            </p>
          </div>

          <div className="space-y-2 bg-ink p-5">
            <div className={cellTitle}>
              <Eye size={15} className="text-fg-dim" aria-hidden="true" />
              <span>Technical Diagnostics &amp; Telemetry</span>
            </div>
            <p className={smallText}>
              IP addresses (anonymized), browser user agents, operating systems, referring URLs, screen resolutions, and
              timestamp logs generated automatically during server requests.
            </p>
          </div>

          <div className="space-y-2 bg-ink p-5">
            <div className={cellTitle}>
              <Lock size={15} className="text-fg-dim" aria-hidden="true" />
              <span>Client Contractual Records</span>
            </div>
            <p className={smallText}>
              For contracted projects: billing details, tax identification, milestone deliverables, project repositories, and
              production access credentials provided securely under NDA.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Legal Bases */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>03.</span>
          <span>Legal Bases for Data Processing</span>
        </h3>
        <p className={bodyText}>
          Under GDPR Article 6 and applicable international frameworks, we only process your information when a legitimate
          legal justification exists:
        </p>
        <ul className="ml-2 list-disc list-inside space-y-2 text-[0.9375rem] leading-relaxed text-fg-muted">
          <li>
            <strong className="text-fg">Contractual Necessity:</strong> To prepare formal proposals, Statements of
            Work (SOW), invoices, and deliver contracted web development or AI automation services.
          </li>
          <li>
            <strong className="text-fg">Consent:</strong> For opt-in features such as non-essential cookies,
            interactive chatbot queries, and direct newsletter or marketing correspondence.
          </li>
          <li>
            <strong className="text-fg">Legitimate Interests:</strong> To secure the infrastructure against denial-of-service
            attacks, investigate anomalous activity, and monitor site reliability.
          </li>
          <li>
            <strong className="text-fg">Legal Obligation:</strong> To satisfy accounting, tax reporting, and statutory
            bookkeeping requirements under Philippine law.
          </li>
        </ul>
      </section>

      {/* Section 4: Third-Party Service Providers */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>04.</span>
          <span>Third-Party Processors &amp; Sub-Processors</span>
        </h3>
        <p className={bodyText}>
          We do not sell, rent, or trade your personal information. Data may be processed by trusted infrastructure partners
          bound by strict confidentiality and data-processing terms:
        </p>
        <div className="no-scrollbar overflow-x-auto border border-line-mid">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-line-mid">
                <th className="px-4 py-3 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">Provider</th>
                <th className="px-4 py-3 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">Purpose</th>
                <th className="px-4 py-3 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">Location</th>
                <th className="px-4 py-3 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">Privacy Safeguards</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line last:border-b-0">
                <td className="px-4 py-3.5 font-mono text-xs text-fg">Vercel Inc.</td>
                <td className="px-4 py-3.5 text-[0.8125rem] text-fg-muted">Edge hosting, CDN caching &amp; serverless APIs</td>
                <td className="px-4 py-3.5 text-[0.8125rem] text-fg-muted">United States / Global CDN</td>
                <td className="px-4 py-3.5 text-[0.8125rem] text-fg-muted">SOC 2 Type II, ISO 27001, Standard Contractual Clauses (SCCs)</td>
              </tr>
              <tr className="border-b border-line last:border-b-0">
                <td className="px-4 py-3.5 font-mono text-xs text-fg">EmailJS</td>
                <td className="px-4 py-3.5 text-[0.8125rem] text-fg-muted">Contact inquiry email dispatch routing</td>
                <td className="px-4 py-3.5 text-[0.8125rem] text-fg-muted">United States</td>
                <td className="px-4 py-3.5 text-[0.8125rem] text-fg-muted">TLS 1.3 transit encryption, zero-sell policy</td>
              </tr>
              <tr className="border-b border-line last:border-b-0">
                <td className="px-4 py-3.5 font-mono text-xs text-fg">Google Gemini API</td>
                <td className="px-4 py-3.5 text-[0.8125rem] text-fg-muted">Natural language processing for AI Assistant widget</td>
                <td className="px-4 py-3.5 text-[0.8125rem] text-fg-muted">United States</td>
                <td className="px-4 py-3.5 text-[0.8125rem] text-fg-muted">Enterprise Cloud Privacy Terms, ephemeral input handling</td>
              </tr>
              <tr className="border-b border-line last:border-b-0">
                <td className="px-4 py-3.5 font-mono text-xs text-fg">GitHub (Microsoft)</td>
                <td className="px-4 py-3.5 text-[0.8125rem] text-fg-muted">Version control and issue management for client deliverables</td>
                <td className="px-4 py-3.5 text-[0.8125rem] text-fg-muted">United States</td>
                <td className="px-4 py-3.5 text-[0.8125rem] text-fg-muted">SOC 1/2/3, GDPR Compliant Data Protection Addendum</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: Data Retention */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>05.</span>
          <span>Data Retention Periods</span>
        </h3>
        <p className={bodyText}>
          We retain personal data only for as long as necessary to fulfill the operational purposes described:
        </p>
        <ul className="ml-2 list-disc list-inside space-y-1.5 text-[0.9375rem] leading-relaxed text-fg-muted">
          <li><strong className="text-fg">General Inquiries:</strong> Retained for 24 months following the last communication, then deleted.</li>
          <li><strong className="text-fg">Contracted Project Deliverables:</strong> Code repositories, architectural specs, and release notes are maintained for the active lifecycle of the client project plus 3 years for warranty support.</li>
          <li><strong className="text-fg">Financial &amp; Tax Records:</strong> Invoices, payment receipts, and tax filings are maintained for 7 years to comply with statutory fiscal obligations.</li>
          <li><strong className="text-fg">Server Access Logs:</strong> Rotated and overwritten within 90 days.</li>
        </ul>
      </section>

      {/* Section 6: User Rights */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>06.</span>
          <span>Your Legal Rights (GDPR, CCPA &amp; RA 10173)</span>
        </h3>
        <p className={bodyText}>
          Depending on your jurisdiction, you possess the following statutory rights regarding your personal data:
        </p>
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
          <div className="bg-ink p-4">
            <strong className="mb-1 block text-[0.8125rem] text-fg">Right to Access:</strong>
            <span className={smallText}>Request a copy of the specific personal data we hold concerning you.</span>
          </div>
          <div className="bg-ink p-4">
            <strong className="mb-1 block text-[0.8125rem] text-fg">Right to Rectification:</strong>
            <span className={smallText}>Request correction of inaccurate or outdated information without undue delay.</span>
          </div>
          <div className="bg-ink p-4">
            <strong className="mb-1 block text-[0.8125rem] text-fg">Right to Erasure (&quot;Be Forgotten&quot;):</strong>
            <span className={smallText}>Request deletion of your data when it is no longer necessary for original purposes.</span>
          </div>
          <div className="bg-ink p-4">
            <strong className="mb-1 block text-[0.8125rem] text-fg">Right to Restrict or Object:</strong>
            <span className={smallText}>Limit processing or object to processing based upon legitimate interests.</span>
          </div>
          <div className="bg-ink p-4">
            <strong className="mb-1 block text-[0.8125rem] text-fg">Right to Data Portability:</strong>
            <span className={smallText}>Receive your provided data in a structured, commonly used, machine-readable format.</span>
          </div>
          <div className="bg-ink p-4">
            <strong className="mb-1 block text-[0.8125rem] text-fg">Right to Withdraw Consent:</strong>
            <span className={smallText}>Revoke consent at any moment for opt-in categories (such as non-essential cookies).</span>
          </div>
        </div>
      </section>

      {/* Section 7: Security Protocols */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>07.</span>
          <span>Security &amp; Encryption Measures</span>
        </h3>
        <p className={bodyText}>
          We implement industry-grade technical and organizational safeguards to prevent unauthorized access, disclosure,
          alteration, or loss of personal data. All traffic is enforced via HTTPS utilizing TLS 1.3 encryption. Secret keys,
          database credentials, and private client tokens are stored solely in encrypted environment variables and never
          committed into public repositories.
        </p>
      </section>

      {/* Section 8: Children's Privacy */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>08.</span>
          <span>Children&apos;s Privacy (COPPA Notice)</span>
        </h3>
        <p className={bodyText}>
          Our website and professional engineering services are intended solely for individuals who are at least 18 years of age
          or older. We do not knowingly collect or solicit personal data from children under 16. If we learn that personal data
          from a child has been collected, we will take immediate steps to permanently delete the data.
        </p>
      </section>

      {/* Section 9: Contact & Inquiries */}
      <section className="space-y-3 border border-line-mid bg-panel p-6">
        <h3 className="flex items-center gap-2 font-sans text-lg font-medium tracking-[-0.02em] text-fg">
          <Mail size={16} className="text-fg-dim" aria-hidden="true" />
          <span>Exercising Your Rights &amp; Privacy Contact</span>
        </h3>
        <p className={smallText}>
          To exercise any of your statutory rights, submit an inquiry, or register a data concern, please email us directly.
          We will acknowledge your request within 48 hours and provide a complete response within 30 days free of charge:
        </p>
        <div className="pt-2">
          <a
            href="mailto:louissebertillo2004@gmail.com?subject=Privacy%20Inquiry%20-%20louissebaja.com"
            className="inline-flex items-center gap-2 border border-paper bg-paper px-4 py-2 font-mono text-2xs tracking-wider2 text-ink uppercase transition-colors hover:bg-ink hover:text-paper"
          >
            <Mail size={14} aria-hidden="true" />
            <span>Contact Privacy Controller: louissebertillo2004@gmail.com</span>
          </a>
        </div>
      </section>
    </div>
  );
};
