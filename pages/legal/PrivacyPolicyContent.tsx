import React from 'react';
import { Shield, Mail, Lock, Database, Eye, Globe, UserCheck, AlertCircle } from 'lucide-react';

export const PrivacyPolicyContent: React.FC = () => {
  return (
    <div className="space-y-10 text-neutral-300">
      {/* Overview Card */}
      <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-md bg-neutral-800 text-neutral-200 shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Privacy Commitment</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              This Privacy Policy explains how Louisse Dominique Bertillo (&quot;we,&quot; &quot;us,&quot; or &quot;the Developer&quot;)
              collects, processes, stores, and protects personal data obtained through the website{' '}
              <a href="https://louissebaja.com" className="text-white underline hover:text-neutral-300">
                https://louissebaja.com
              </a>{' '}
              and associated client services, in compliance with the General Data Protection Regulation (GDPR),
              California Consumer Privacy Act (CCPA/CPRA), and the Philippine Data Privacy Act of 2012 (Republic Act No. 10173).
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Data Controller */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">01.</span>
          Data Controller Identification
        </h3>
        <p className="text-neutral-400 leading-relaxed">
          The legal entity and individual responsible for the processing of your personal data is:
        </p>
        <div className="p-4 rounded-md border border-neutral-800/80 bg-neutral-950/60 font-mono text-xs text-neutral-300 space-y-1">
          <div><strong className="text-white">Controller:</strong> Louisse Dominique Bertillo</div>
          <div><strong className="text-white">Role:</strong> Independent Web Developer, Designer &amp; AI Implementation Specialist</div>
          <div><strong className="text-white">Location:</strong> Manila, Philippines</div>
          <div>
            <strong className="text-white">Direct Email:</strong>{' '}
            <a href="mailto:louissebertillo2004@gmail.com" className="text-neutral-200 underline hover:text-white">
              louissebertillo2004@gmail.com
            </a>
          </div>
          <div><strong className="text-white">Website:</strong> https://louissebaja.com</div>
        </div>
      </section>

      {/* Section 2: Information We Collect */}
      <section className="space-y-4">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">02.</span>
          Categories of Data Collected
        </h3>
        <p className="text-neutral-400 leading-relaxed">
          We collect personal data strictly necessary to communicate with prospective clients, assess project requirements,
          and maintain web performance. These categories include:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-md border border-neutral-800 bg-neutral-900/20 space-y-2">
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <Mail className="w-4 h-4 text-neutral-400" />
              <span>Project Inquiries &amp; Contact</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              When you submit a message or request a quotation, we collect your full name, email address, company/brand name,
              target budget, timeline, and descriptive project specifications.
            </p>
          </div>

          <div className="p-5 rounded-md border border-neutral-800 bg-neutral-900/20 space-y-2">
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <Database className="w-4 h-4 text-neutral-400" />
              <span>AI Assistant Interactions</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Messages entered into the interactive AI Chat Assistant are transmitted to generate responses regarding portfolio
              projects and service packages. Transcripts are kept ephemeral and not sold.
            </p>
          </div>

          <div className="p-5 rounded-md border border-neutral-800 bg-neutral-900/20 space-y-2">
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <Eye className="w-4 h-4 text-neutral-400" />
              <span>Technical Diagnostics &amp; Telemetry</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              IP addresses (anonymized), browser user agents, operating systems, referring URLs, screen resolutions, and
              timestamp logs generated automatically during server requests.
            </p>
          </div>

          <div className="p-5 rounded-md border border-neutral-800 bg-neutral-900/20 space-y-2">
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <Lock className="w-4 h-4 text-neutral-400" />
              <span>Client Contractual Records</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              For contracted projects: billing details, tax identification, milestone deliverables, project repositories, and
              production access credentials provided securely under NDA.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Legal Bases */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">03.</span>
          Legal Bases for Data Processing
        </h3>
        <p className="text-neutral-400 leading-relaxed">
          Under GDPR Article 6 and applicable international frameworks, we only process your information when a legitimate
          legal justification exists:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-400 text-sm ml-2">
          <li>
            <strong className="text-neutral-200">Contractual Necessity:</strong> To prepare formal proposals, Statements of
            Work (SOW), invoices, and deliver contracted web development or AI automation services.
          </li>
          <li>
            <strong className="text-neutral-200">Consent:</strong> For opt-in features such as non-essential cookies,
            interactive chatbot queries, and direct newsletter or marketing correspondence.
          </li>
          <li>
            <strong className="text-neutral-200">Legitimate Interests:</strong> To secure the infrastructure against denial-of-service
            attacks, investigate anomalous activity, and monitor site reliability.
          </li>
          <li>
            <strong className="text-neutral-200">Legal Obligation:</strong> To satisfy accounting, tax reporting, and statutory
            bookkeeping requirements under Philippine law.
          </li>
        </ul>
      </section>

      {/* Section 4: Third-Party Service Providers */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">04.</span>
          Third-Party Processors &amp; Sub-Processors
        </h3>
        <p className="text-neutral-400 leading-relaxed">
          We do not sell, rent, or trade your personal information. Data may be processed by trusted infrastructure partners
          bound by strict confidentiality and data-processing terms:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300 border border-neutral-800">
            <thead className="bg-neutral-900 text-neutral-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3 border-b border-neutral-800">Provider</th>
                <th className="p-3 border-b border-neutral-800">Purpose</th>
                <th className="p-3 border-b border-neutral-800">Location</th>
                <th className="p-3 border-b border-neutral-800">Privacy Safeguards</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-mono">
              <tr>
                <td className="p-3 text-white font-semibold">Vercel Inc.</td>
                <td className="p-3 font-sans">Edge hosting, CDN caching &amp; serverless APIs</td>
                <td className="p-3">United States / Global CDN</td>
                <td className="p-3 font-sans">SOC 2 Type II, ISO 27001, Standard Contractual Clauses (SCCs)</td>
              </tr>
              <tr>
                <td className="p-3 text-white font-semibold">EmailJS</td>
                <td className="p-3 font-sans">Contact inquiry email dispatch routing</td>
                <td className="p-3">United States</td>
                <td className="p-3 font-sans">TLS 1.3 transit encryption, zero-sell policy</td>
              </tr>
              <tr>
                <td className="p-3 text-white font-semibold">Google Gemini API</td>
                <td className="p-3 font-sans">Natural language processing for AI Assistant widget</td>
                <td className="p-3">United States</td>
                <td className="p-3 font-sans">Enterprise Cloud Privacy Terms, ephemeral input handling</td>
              </tr>
              <tr>
                <td className="p-3 text-white font-semibold">GitHub (Microsoft)</td>
                <td className="p-3 font-sans">Version control and issue management for client deliverables</td>
                <td className="p-3">United States</td>
                <td className="p-3 font-sans">SOC 1/2/3, GDPR Compliant Data Protection Addendum</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: Data Retention */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">05.</span>
          Data Retention Periods
        </h3>
        <p className="text-neutral-400 leading-relaxed">
          We retain personal data only for as long as necessary to fulfill the operational purposes described:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-neutral-400 text-sm ml-2">
          <li><strong>General Inquiries:</strong> Retained for 24 months following the last communication, then deleted.</li>
          <li><strong>Contracted Project Deliverables:</strong> Code repositories, architectural specs, and release notes are maintained for the active lifecycle of the client project plus 3 years for warranty support.</li>
          <li><strong>Financial &amp; Tax Records:</strong> Invoices, payment receipts, and tax filings are maintained for 7 years to comply with statutory fiscal obligations.</li>
          <li><strong>Server Access Logs:</strong> Rotated and overwritten within 90 days.</li>
        </ul>
      </section>

      {/* Section 6: User Rights */}
      <section className="space-y-4">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">06.</span>
          Your Legal Rights (GDPR, CCPA &amp; RA 10173)
        </h3>
        <p className="text-neutral-400 leading-relaxed">
          Depending on your jurisdiction, you possess the following statutory rights regarding your personal data:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded border border-neutral-800 bg-neutral-900/30">
            <strong className="text-white block mb-1">Right to Access:</strong>
            Request a copy of the specific personal data we hold concerning you.
          </div>
          <div className="p-3.5 rounded border border-neutral-800 bg-neutral-900/30">
            <strong className="text-white block mb-1">Right to Rectification:</strong>
            Request correction of inaccurate or outdated information without undue delay.
          </div>
          <div className="p-3.5 rounded border border-neutral-800 bg-neutral-900/30">
            <strong className="text-white block mb-1">Right to Erasure (&quot;Be Forgotten&quot;):</strong>
            Request deletion of your data when it is no longer necessary for original purposes.
          </div>
          <div className="p-3.5 rounded border border-neutral-800 bg-neutral-900/30">
            <strong className="text-white block mb-1">Right to Restrict or Object:</strong>
            Limit processing or object to processing based upon legitimate interests.
          </div>
          <div className="p-3.5 rounded border border-neutral-800 bg-neutral-900/30">
            <strong className="text-white block mb-1">Right to Data Portability:</strong>
            Receive your provided data in a structured, commonly used, machine-readable format.
          </div>
          <div className="p-3.5 rounded border border-neutral-800 bg-neutral-900/30">
            <strong className="text-white block mb-1">Right to Withdraw Consent:</strong>
            Revoke consent at any moment for opt-in categories (such as non-essential cookies).
          </div>
        </div>
      </section>

      {/* Section 7: Security Protocols */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">07.</span>
          Security &amp; Encryption Measures
        </h3>
        <p className="text-neutral-400 leading-relaxed">
          We implement industry-grade technical and organizational safeguards to prevent unauthorized access, disclosure,
          alteration, or loss of personal data. All traffic is enforced via HTTPS utilizing TLS 1.3 encryption. Secret keys,
          database credentials, and private client tokens are stored solely in encrypted environment variables and never
          committed into public repositories.
        </p>
      </section>

      {/* Section 8: Children's Privacy */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">08.</span>
          Children&apos;s Privacy (COPPA Notice)
        </h3>
        <p className="text-neutral-400 leading-relaxed">
          Our website and professional engineering services are intended solely for individuals who are at least 18 years of age
          or older. We do not knowingly collect or solicit personal data from children under 16. If we learn that personal data
          from a child has been collected, we will take immediate steps to permanently delete the data.
        </p>
      </section>

      {/* Section 9: Contact & Inquiries */}
      <section className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/50 space-y-3">
        <h3 className="text-lg font-medium text-white flex items-center gap-2">
          <Mail className="w-4 h-4 text-neutral-400" />
          Exercising Your Rights &amp; Privacy Contact
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed">
          To exercise any of your statutory rights, submit an inquiry, or register a data concern, please email us directly.
          We will acknowledge your request within 48 hours and provide a complete response within 30 days free of charge:
        </p>
        <div className="pt-2">
          <a
            href="mailto:louissebertillo2004@gmail.com?subject=Privacy%20Inquiry%20-%20louissebaja.com"
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-white text-black font-medium hover:bg-neutral-200 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Privacy Controller: louissebertillo2004@gmail.com</span>
          </a>
        </div>
      </section>
    </div>
  );
};
