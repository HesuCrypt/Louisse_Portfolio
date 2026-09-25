import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Settings, Check, X, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import {
  getStoredCookieConsent,
  saveCookieConsent,
  acceptAllCookies,
  acceptEssentialOnly,
  COOKIE_PREFERENCES_EVENT,
  CookieConsentPreferences,
} from '../utils/cookies';
import { pushRoute } from '../utils/routing';

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
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:bottom-6 md:max-w-md z-[70] bg-neutral-950/95 backdrop-blur-xl border border-neutral-800 text-neutral-200 rounded-2xl shadow-2xl p-5 overflow-hidden"
          role="region"
          aria-label="Cookie consent banner"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3 relative">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">Privacy &amp; Cookie Choices</h3>
                <span className="text-[11px] text-neutral-500 font-mono">Respecting your preferences</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleEssentialOnly}
              className="text-neutral-500 hover:text-white transition-colors p-1 -mr-1 rounded-md"
              aria-label="Close and continue with essential only"
              title="Accept essential only"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Notice */}
          <p className="text-xs text-neutral-400 leading-relaxed mb-4 relative">
            We use strictly necessary storage to keep the site secure and functional. With your consent, we also use optional
            cookies to improve performance and preserve AI chat state. Learn more in our{' '}
            <button
              type="button"
              onClick={() => pushRoute('/cookies')}
              className="text-white underline hover:text-neutral-300 font-medium cursor-pointer"
            >
              Cookie Policy
            </button>{' '}
            and{' '}
            <button
              type="button"
              onClick={() => pushRoute('/privacy')}
              className="text-white underline hover:text-neutral-300 font-medium cursor-pointer"
            >
              Privacy Policy
            </button>.
          </p>

          {/* Expandable Granular Controls */}
          <AnimatePresence>
            {showCustomize && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mb-4 space-y-2.5 border-t border-neutral-800/80 pt-3 text-xs"
              >
                {/* Strictly Necessary */}
                <div className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 font-medium text-white">
                      <span>Strictly Necessary</span>
                      <Lock className="w-3 h-3 text-neutral-500" />
                    </div>
                    <p className="text-[11px] text-neutral-400">
                      Core security, session routing, and consent preferences. Always enabled.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 shrink-0">
                    Required
                  </span>
                </div>

                {/* Functional */}
                <div className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                  <div className="space-y-0.5">
                    <div className="font-medium text-white">Functional &amp; State</div>
                    <p className="text-[11px] text-neutral-400">
                      Preserves recent AI Assistant chat context and custom interface settings.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={functional}
                      onChange={(e) => setFunctional(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-neutral-400 peer-checked:after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                {/* Analytics */}
                <div className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                  <div className="space-y-0.5">
                    <div className="font-medium text-white">Analytics &amp; Performance</div>
                    <p className="text-[11px] text-neutral-400">
                      Anonymous aggregate telemetry to measure page speed and core web vitals.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-neutral-400 peer-checked:after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowCustomize(!showCustomize)}
              className="inline-flex items-center justify-center gap-1.5 text-xs text-neutral-400 hover:text-white py-1.5 transition-colors cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{showCustomize ? 'Hide Options' : 'Customize'}</span>
              {showCustomize ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            <div className="flex items-center gap-2">
              {showCustomize ? (
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium transition-colors border border-neutral-700 cursor-pointer text-center"
                >
                  Save Choices
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-white text-xs font-medium transition-colors cursor-pointer text-center"
                >
                  Essential Only
                </button>
              )}

              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-4 py-1.5 rounded-lg bg-white text-black hover:bg-neutral-200 text-xs font-medium transition-colors cursor-pointer text-center shadow-sm"
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
