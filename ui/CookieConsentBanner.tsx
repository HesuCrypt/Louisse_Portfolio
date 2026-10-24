import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Settings, X, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import {
  getStoredCookieConsent,
  saveCookieConsent,
  acceptAllCookies,
  acceptEssentialOnly,
  COOKIE_PREFERENCES_EVENT,
  CookieConsentPreferences,
} from '../utils/cookies';
import { pushRoute } from '../utils/routing';

const inlineLinkStyles = 'font-medium text-fg underline underline-offset-4 transition-colors hover:text-fg-muted';
const inlineButtonStyles =
  'inline-flex cursor-pointer items-center gap-2 border border-line-mid px-3.5 py-2 font-mono text-2xs tracking-wider2 text-fg-muted uppercase transition-colors hover:border-line-strong hover:text-fg';
const primaryButtonStyles =
  'inline-flex cursor-pointer items-center justify-center border border-paper bg-paper px-4 py-2 font-mono text-2xs tracking-wider2 text-ink uppercase transition-colors hover:bg-ink hover:text-paper';
const checkboxStyles =
  'h-4 w-4 shrink-0 cursor-pointer appearance-none border border-line-strong bg-ink transition-colors checked:border-paper checked:bg-paper';

export const CookieConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const stored = getStoredCookieConsent();
    if (!stored) {
      // Delay slightly for smooth page entrance
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setFunctional(stored.functional);
      setAnalytics(stored.analytics);
    }
  }, []);

  // Listen for request to re-open cookie preferences from footer or policy pages
  useEffect(() => {
    const handleOpen = () => {
      const stored = getStoredCookieConsent();
      if (stored) {
        setFunctional(stored.functional);
        setAnalytics(stored.analytics);
      }
      setShowCustomize(true);
      setVisible(true);
    };

    window.addEventListener(COOKIE_PREFERENCES_EVENT, handleOpen);
    return () => window.removeEventListener(COOKIE_PREFERENCES_EVENT, handleOpen);
  }, []);

  // Broadcast banner visibility so overlapping floating widgets (like Ask AI) can adapt
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('cookie-banner-visibility', {
          detail: { visible, expanded: showCustomize },
        })
      );
    }
  }, [visible, showCustomize]);

  const handleAcceptAll = () => {
    acceptAllCookies();
    setVisible(false);
    setShowCustomize(false);
  };

  const handleEssentialOnly = () => {
    acceptEssentialOnly();
    setVisible(false);
    setShowCustomize(false);
  };

  const handleSavePreferences = () => {
    saveCookieConsent({ functional, analytics });
    setVisible(false);
    setShowCustomize(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-consent"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-4 bottom-4 left-4 z-[70] border border-line-mid bg-ink p-5 text-fg md:right-auto md:bottom-6 md:left-6 md:max-w-md"
          role="region"
          aria-label="Cookie consent banner"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-line pb-3">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center border border-line-strong text-fg">
                <Shield size={15} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-mono text-2xs tracking-label text-fg uppercase">
                  Privacy &amp; Cookie Choices
                </h3>
                <span className="mt-0.5 block font-mono text-2xs text-fg-dim">
                  Respecting your preferences
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleEssentialOnly}
              className="cursor-pointer p-1 text-fg-dim transition-colors hover:text-fg"
              aria-label="Close and continue with essential only"
              title="Accept essential only"
            >
              <X size={16} />
            </button>
          </div>

          {/* Main notice */}
          <p className="mt-4 text-[0.8125rem] leading-relaxed text-fg-muted">
            We use strictly necessary storage to keep the site secure and functional. With your consent, we also use optional
            cookies to improve performance and preserve AI chat state. Learn more in our{' '}
            <button
              type="button"
              onClick={() => pushRoute('/cookies')}
              className={`${inlineLinkStyles} cursor-pointer`}
            >
              Cookie Policy
            </button>{' '}
            and{' '}
            <button
              type="button"
              onClick={() => pushRoute('/privacy')}
              className={`${inlineLinkStyles} cursor-pointer`}
            >
              Privacy Policy
            </button>.
          </p>

          {/* Expandable granular controls */}
          <AnimatePresence>
            {showCustomize && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-px border border-line bg-line">
                  {/* Strictly Necessary */}
                  <div className="flex items-start justify-between gap-3 bg-panel p-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-sans text-[0.8125rem] font-medium text-fg">
                        <span>Strictly Necessary</span>
                        <Lock size={12} className="text-fg-dim" aria-hidden="true" />
                      </div>
                      <p className="text-[11px] leading-relaxed text-fg-dim">
                        Core security, session routing, and consent preferences. Always enabled.
                      </p>
                    </div>
                    <span className="shrink-0 border border-line-mid px-2 py-0.5 font-mono text-2xs tracking-wider2 text-fg-faint uppercase">
                      Required
                    </span>
                  </div>

                  {/* Functional */}
                  <div className="flex items-start justify-between gap-3 bg-panel p-3">
                    <div className="space-y-1">
                      <div className="font-sans text-[0.8125rem] font-medium text-fg">Functional &amp; State</div>
                      <p className="text-[11px] leading-relaxed text-fg-dim">
                        Preserves recent AI Assistant chat context and custom interface settings.
                      </p>
                    </div>
                    <label className="inline-flex shrink-0 cursor-pointer items-center pt-0.5">
                      <input
                        type="checkbox"
                        checked={functional}
                        onChange={(e) => setFunctional(e.target.checked)}
                        className={checkboxStyles}
                        aria-label="Enable functional and state storage"
                      />
                    </label>
                  </div>

                  {/* Analytics */}
                  <div className="flex items-start justify-between gap-3 bg-panel p-3">
                    <div className="space-y-1">
                      <div className="font-sans text-[0.8125rem] font-medium text-fg">Analytics &amp; Performance</div>
                      <p className="text-[11px] leading-relaxed text-fg-dim">
                        Anonymous aggregate telemetry to measure page speed and core web vitals.
                      </p>
                    </div>
                    <label className="inline-flex shrink-0 cursor-pointer items-center pt-0.5">
                      <input
                        type="checkbox"
                        checked={analytics}
                        onChange={(e) => setAnalytics(e.target.checked)}
                        className={checkboxStyles}
                        aria-label="Enable analytics and performance storage"
                      />
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons */}
          <div className="mt-4 flex flex-col items-stretch justify-between gap-2 border-t border-line pt-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setShowCustomize(!showCustomize)}
              className="inline-flex cursor-pointer items-center justify-center gap-1.5 font-mono text-2xs tracking-wider2 text-fg-dim uppercase transition-colors hover:text-fg"
            >
              <Settings size={13} aria-hidden="true" />
              <span>{showCustomize ? 'Hide Options' : 'Customize'}</span>
              {showCustomize ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            <div className="flex items-center gap-2">
              {showCustomize ? (
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className={`${inlineButtonStyles} w-full justify-center text-fg sm:w-auto`}
                >
                  Save Choices
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className={`${inlineButtonStyles} w-full justify-center sm:w-auto`}
                >
                  Essential Only
                </button>
              )}

              <button
                type="button"
                onClick={handleAcceptAll}
                className={`${primaryButtonStyles} w-full sm:w-auto`}
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
