import React from 'react';
import { Cookie, Settings, Check, HelpCircle, ShieldCheck, ToggleRight } from 'lucide-react';
import { COOKIE_INVENTORY, openCookiePreferences } from '../../utils/cookies';

export const CookiePolicyContent: React.FC = () => {
  return (
    <div className="space-y-10 text-neutral-300">
      {/* Overview Card */}
      <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-md bg-neutral-800 text-neutral-200 shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Our Approach to Cookies &amp; Tracking</h2>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl">
                We believe in privacy-by-design and transparent tracking. We do not use intrusive third-party cross-site ad trackers,
                fingerprinting, or data brokers. This policy explains what local storage and cookies we use, why they are needed,
                and how you maintain total control.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={openCookiePreferences}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-white text-black font-medium text-xs md:text-sm hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer shadow-sm"
          >
            <Settings className="w-4 h-4" />
            <span>Manage Cookie Preferences</span>
          </button>
        </div>
      </div>

      {/* Section 1: What Are Cookies and Storage Technologies */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">01.</span>
          What Are Cookies and Local Storage?
        </h3>
        <p className="text-neutral-400 leading-relaxed text-sm">
          Cookies are small text files placed on your device by websites you visit. In modern web applications, browsers also
          provide web storage mechanisms such as <code className="text-neutral-200 font-mono bg-neutral-900 px-1.5 py-0.5 rounded text-xs">localStorage</code> and{' '}
          <code className="text-neutral-200 font-mono bg-neutral-900 px-1.5 py-0.5 rounded text-xs">sessionStorage</code>. These technologies allow websites
          to remember your preferences, secure session requests, and deliver smooth UI transitions without repeatedly asking for
          the same information.
        </p>
      </section>

      {/* Section 2: Categories of Tracking Technologies */}
      <section className="space-y-4">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">02.</span>
          Categories We Use &amp; How They Function
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-md border border-neutral-800 bg-neutral-900/20 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-sm">Strictly Necessary</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                  Always Active
                </span>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Essential for core website operation, security routing, CSRF protection, and preserving your cookie preferences.
                These cannot be turned off as the website cannot function safely without them.
              </p>
            </div>
            <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-800/60">
              Legal Basis: GDPR Art. 6(1)(f) Legitimate Interest
            </div>
          </div>

          <div className="p-5 rounded-md border border-neutral-800 bg-neutral-900/20 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-sm">Functional &amp; State</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/60">
                  Optional
                </span>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Remembers active conversation context inside the AI Assistant widget, theme preferences, and smooth scroll
                settings across page navigations.
              </p>
            </div>
            <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-800/60">
              Legal Basis: GDPR Art. 6(1)(a) Explicit Consent
            </div>
          </div>

          <div className="p-5 rounded-md border border-neutral-800 bg-neutral-900/20 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-sm">Analytics &amp; Speed</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/60">
                  Optional
                </span>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Collects aggregated, privacy-masked telemetry (e.g. Largest Contentful Paint, page route frequency) to identify
                slow device rendering and improve responsiveness.
              </p>
            </div>
            <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-800/60">
              Legal Basis: GDPR Art. 6(1)(a) Explicit Consent
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Cookie Inventory Table */}
      <section className="space-y-4">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">03.</span>
          Detailed Cookie &amp; Storage Inventory
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed">
          The table below lists all identifiers and storage keys that may be set on your device when navigating our portfolio:
        </p>

        <div className="overflow-x-auto rounded-lg border border-neutral-800">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-neutral-900 text-neutral-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5 border-b border-neutral-800">Key / Cookie Name</th>
                <th className="p-3.5 border-b border-neutral-800">Category</th>
                <th className="p-3.5 border-b border-neutral-800">Type</th>
                <th className="p-3.5 border-b border-neutral-800">Duration</th>
                <th className="p-3.5 border-b border-neutral-800">Provider</th>
                <th className="p-3.5 border-b border-neutral-800">Detailed Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {COOKIE_INVENTORY.map((item) => (
                <tr key={item.name} className="hover:bg-neutral-900/40 transition-colors font-mono">
                  <td className="p-3.5 font-bold text-white whitespace-nowrap">{item.name}</td>
                  <td className="p-3.5 font-sans">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] ${
                        item.category === 'Strictly Necessary'
                          ? 'bg-neutral-800 text-neutral-200'
                          : item.category === 'Functional'
                          ? 'bg-blue-950 text-blue-300'
                          : 'bg-purple-950 text-purple-300'
                      }`}
                    >
                      {item.category}
                    </span>
                  </td>
                  <td className="p-3.5 text-neutral-400 font-mono text-[11px]">{item.type}</td>
                  <td className="p-3.5 text-neutral-300 whitespace-nowrap">{item.duration}</td>
                  <td className="p-3.5 text-neutral-400 font-sans text-xs">{item.provider}</td>
                  <td className="p-3.5 text-neutral-300 font-sans text-xs min-w-[220px]">{item.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: How to Manage and Revoke Consent */}
      <section className="space-y-4">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">04.</span>
          How to Manage and Revoke Your Consent
        </h3>
        <p className="text-neutral-400 leading-relaxed text-sm">
          You can change or withdraw your consent at any time. When you update your preferences via our interactive consent
          manager, changes take effect immediately:
        </p>

        <div className="p-5 rounded-lg border border-neutral-800 bg-neutral-900/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="text-white font-medium text-sm mb-1">Instant Preference Manager</h4>
            <p className="text-neutral-400 text-xs">
              Toggle Functional and Analytics cookies on or off with a single click.
            </p>
          </div>
          <button
            type="button"
            onClick={openCookiePreferences}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium transition-colors border border-neutral-700 cursor-pointer shrink-0"
          >
            <ToggleRight className="w-4 h-4 text-emerald-400" />
            <span>Open Consent Panel</span>
          </button>
        </div>
      </section>

      {/* Section 5: Browser-Level Controls */}
      <section className="space-y-4">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">05.</span>
          Managing Cookies in Your Browser Settings
        </h3>
        <p className="text-neutral-400 leading-relaxed text-sm">
          In addition to our on-site manager, you can configure your browser to block, clear, or notify you when cookies are
          issued. Consult your browser&apos;s documentation for instructions:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 hover:text-white transition-all text-neutral-300 text-center"
          >
            Google Chrome &rarr;
          </a>
          <a
            href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 hover:text-white transition-all text-neutral-300 text-center"
          >
            Apple Safari &rarr;
          </a>
          <a
            href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 hover:text-white transition-all text-neutral-300 text-center"
          >
            Mozilla Firefox &rarr;
          </a>
          <a
            href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 hover:text-white transition-all text-neutral-300 text-center"
          >
            Microsoft Edge &rarr;
          </a>
        </div>
      </section>

      {/* Section 6: GPC & Do Not Track */}
      <section className="space-y-3">
        <h3 className="text-xl font-medium text-white flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-500">06.</span>
          Global Privacy Control (GPC) &amp; Do Not Track
        </h3>
        <p className="text-neutral-400 leading-relaxed text-sm">
          We honor Global Privacy Control (GPC) signals transmitted by your browser. If our application detects an enabled GPC
          header or signal, we will automatically disable non-essential analytics tracking as an opt-out preference signal.
        </p>
      </section>

      {/* Section 7: Updates to this Policy */}
      <section className="p-6 rounded-lg border border-neutral-800 bg-neutral-900/50 space-y-3">
        <h3 className="text-lg font-medium text-white">Questions &amp; Policy Updates</h3>
        <p className="text-neutral-400 text-sm leading-relaxed">
          We may periodically update this Cookie Policy to reflect new integrations, performance tooling, or regulatory
          guidance. Any modifications will be posted here with an updated revision date. If you have questions regarding our
          cookie usage, please email{' '}
          <a href="mailto:louissebertillo2004@gmail.com" className="text-white underline hover:text-neutral-300">
            louissebertillo2004@gmail.com
          </a>.
        </p>
      </section>
    </div>
  );
};
