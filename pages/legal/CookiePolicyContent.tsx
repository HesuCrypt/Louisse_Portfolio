import React from 'react';
import { Cookie, Settings, ShieldCheck, ToggleRight } from 'lucide-react';
import { COOKIE_INVENTORY, openCookiePreferences } from '../../utils/cookies';

const sectionTitle = 'flex items-baseline gap-3 font-sans text-lg font-medium tracking-[-0.02em] text-fg';
const ordinal = 'tnum font-mono text-2xs text-fg-faint';
const smallText = 'text-[0.8125rem] leading-relaxed text-fg-muted';
const linkStyle = 'text-fg underline underline-offset-4 transition-colors hover:text-fg-muted';
const codeStyle = 'border border-line-mid px-1.5 py-0.5 font-mono text-[0.8125rem] text-fg';
const externalLinkStyle =
  'border border-line-mid px-3 py-3 text-center font-mono text-2xs tracking-wider2 text-fg-muted uppercase transition-colors hover:border-line-strong hover:text-fg';

const categoryBadge = (category: string) => {
  if (category === 'Strictly Necessary') return 'border border-paper bg-paper text-ink';
  if (category === 'Functional') return 'border border-line-strong text-fg';
  return 'border border-line-mid text-fg-dim';
};

export const CookiePolicyContent: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Overview */}
      <div className="border border-line-mid bg-panel p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center border border-line-strong text-fg">
              <Cookie size={18} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-sans text-lg font-medium tracking-[-0.02em] text-fg">Our Approach to Cookies &amp; Tracking</h2>
              <p className="mt-2 max-w-2xl text-[0.9375rem] leading-[1.75] text-fg-muted">
                We believe in privacy-by-design and transparent tracking. We do not use intrusive third-party cross-site ad trackers,
                fingerprinting, or data brokers. This policy explains what local storage and cookies we use, why they are needed,
                and how you maintain total control.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={openCookiePreferences}
            className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 border border-paper bg-paper px-4 py-2.5 font-mono text-2xs tracking-wider2 text-ink uppercase transition-colors hover:bg-ink hover:text-paper"
          >
            <Settings size={14} aria-hidden="true" />
            <span>Manage Cookie Preferences</span>
          </button>
        </div>
      </div>

      {/* Section 1 */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>01.</span>
          <span>What Are Cookies and Local Storage?</span>
        </h3>
        <p className={smallText}>
          Cookies are small text files placed on your device by websites you visit. In modern web applications, browsers also
          provide web storage mechanisms such as <code className={codeStyle}>localStorage</code> and{' '}
          <code className={codeStyle}>sessionStorage</code>. These technologies allow websites
          to remember your preferences, secure session requests, and deliver smooth UI transitions without repeatedly asking for
          the same information.
        </p>
      </section>

      {/* Section 2 */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>02.</span>
          <span>Categories We Use &amp; How They Function</span>
        </h3>
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
          <div className="flex flex-col justify-between gap-3 bg-ink p-5">
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="font-sans text-sm font-medium text-fg">Strictly Necessary</span>
                <span className="border border-paper bg-paper px-2 py-0.5 font-mono text-2xs tracking-wider2 text-ink uppercase">
                  Always Active
                </span>
              </div>
              <p className="text-[0.8125rem] leading-relaxed text-fg-muted">
                Essential for core website operation, security routing, CSRF protection, and preserving your cookie preferences.
                These cannot be turned off as the website cannot function safely without them.
              </p>
            </div>
            <div className="border-t border-line pt-3 font-mono text-2xs text-fg-faint">
              Legal Basis: GDPR Art. 6(1)(f) Legitimate Interest
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 bg-ink p-5">
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="font-sans text-sm font-medium text-fg">Functional &amp; State</span>
                <span className="border border-line-strong px-2 py-0.5 font-mono text-2xs tracking-wider2 text-fg uppercase">
                  Optional
                </span>
              </div>
              <p className="text-[0.8125rem] leading-relaxed text-fg-muted">
                Remembers active conversation context inside the AI Assistant widget, theme preferences, and smooth scroll
                settings across page navigations.
              </p>
            </div>
            <div className="border-t border-line pt-3 font-mono text-2xs text-fg-faint">
              Legal Basis: GDPR Art. 6(1)(a) Explicit Consent
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 bg-ink p-5">
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="font-sans text-sm font-medium text-fg">Analytics &amp; Speed</span>
                <span className="border border-line-strong px-2 py-0.5 font-mono text-2xs tracking-wider2 text-fg uppercase">
                  Optional
                </span>
              </div>
              <p className="text-[0.8125rem] leading-relaxed text-fg-muted">
                Collects aggregated, privacy-masked telemetry (e.g. Largest Contentful Paint, page route frequency) to identify
                slow device rendering and improve responsiveness.
              </p>
            </div>
            <div className="border-t border-line pt-3 font-mono text-2xs text-fg-faint">
              Legal Basis: GDPR Art. 6(1)(a) Explicit Consent
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Cookie Inventory Table */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>03.</span>
          <span>Detailed Cookie &amp; Storage Inventory</span>
        </h3>
        <p className={smallText}>
          The table below lists all identifiers and storage keys that may be set on your device when navigating our portfolio:
        </p>

        <div className="no-scrollbar overflow-x-auto border border-line-mid">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-line-mid">
                <th className="px-4 py-3 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">Key / Cookie Name</th>
                <th className="px-4 py-3 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">Category</th>
                <th className="px-4 py-3 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">Type</th>
                <th className="px-4 py-3 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">Duration</th>
                <th className="px-4 py-3 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">Provider</th>
                <th className="px-4 py-3 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">Detailed Purpose</th>
              </tr>
            </thead>
            <tbody>
              {COOKIE_INVENTORY.map((item) => (
                <tr key={item.name} className="border-b border-line transition-colors last:border-b-0 hover:bg-panel">
                  <td className="whitespace-nowrap px-4 py-3.5 font-mono text-xs font-medium text-fg">{item.name}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-block px-2 py-0.5 font-mono text-2xs tracking-wider2 uppercase ${categoryBadge(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 font-mono text-[11px] text-fg-dim">{item.type}</td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-[0.8125rem] text-fg-muted">{item.duration}</td>
                  <td className="px-4 py-3.5 text-[0.8125rem] text-fg-muted">{item.provider}</td>
                  <td className="min-w-[220px] px-4 py-3.5 text-[0.8125rem] text-fg-muted">{item.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4 */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>04.</span>
          <span>How to Manage and Revoke Your Consent</span>
        </h3>
        <p className={smallText}>
          You can change or withdraw your consent at any time. When you update your preferences via our interactive consent
          manager, changes take effect immediately:
        </p>

        <div className="flex flex-col gap-4 border border-line-mid bg-panel p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="font-sans text-sm font-medium text-fg">Instant Preference Manager</h4>
            <p className="mt-1 text-[0.8125rem] leading-relaxed text-fg-muted">
              Toggle Functional and Analytics cookies on or off with a single click.
            </p>
          </div>
          <button
            type="button"
            onClick={openCookiePreferences}
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 border border-line-mid px-4 py-2 font-mono text-2xs tracking-wider2 text-fg uppercase transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            <ToggleRight size={14} aria-hidden="true" />
            <span>Open Consent Panel</span>
          </button>
        </div>
      </section>

      {/* Section 5 */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>05.</span>
          <span>Managing Cookies in Your Browser Settings</span>
        </h3>
        <p className={smallText}>
          In addition to our on-site manager, you can configure your browser to block, clear, or notify you when cookies are
          issued. Consult your browser&apos;s documentation for instructions:
        </p>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
            className={externalLinkStyle}
          >
            Google Chrome &rarr;
          </a>
          <a
            href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
            className={externalLinkStyle}
          >
            Apple Safari &rarr;
          </a>
          <a
            href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
            target="_blank"
            rel="noopener noreferrer"
            className={externalLinkStyle}
          >
            Mozilla Firefox &rarr;
          </a>
          <a
            href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
            target="_blank"
            rel="noopener noreferrer"
            className={externalLinkStyle}
          >
            Microsoft Edge &rarr;
          </a>
        </div>
      </section>

      {/* Section 6 */}
      <section className="space-y-4">
        <h3 className={sectionTitle}>
          <span className={ordinal}>06.</span>
          <span>Global Privacy Control (GPC) &amp; Do Not Track</span>
        </h3>
        <p className={smallText}>
          We honor Global Privacy Control (GPC) signals transmitted by your browser. If our application detects an enabled GPC
          header or signal, we will automatically disable non-essential analytics tracking as an opt-out preference signal.
        </p>
      </section>

      {/* Section 7 */}
      <section className="space-y-3 border border-line-mid bg-panel p-6">
        <h3 className="flex items-center gap-2 font-sans text-lg font-medium tracking-[-0.02em] text-fg">
          <ShieldCheck size={16} className="text-fg-dim" aria-hidden="true" />
          <span>Questions &amp; Policy Updates</span>
        </h3>
        <p className={smallText}>
          We may periodically update this Cookie Policy to reflect new integrations, performance tooling, or regulatory
          guidance. Any modifications will be posted here with an updated revision date. If you have questions regarding our
          cookie usage, please email{' '}
          <a href="mailto:louissebertillo2004@gmail.com" className={linkStyle}>
            louissebertillo2004@gmail.com
          </a>.
        </p>
      </section>
    </div>
  );
};
