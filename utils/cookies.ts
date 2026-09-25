export interface CookieConsentPreferences {
  strictlyNecessary: true;
  functional: boolean;
  analytics: boolean;
  timestamp: number;
  version: string;
}

export const COOKIE_CONSENT_STORAGE_KEY = 'louisse_cookie_consent';
export const CURRENT_CONSENT_VERSION = '1.0.0';
export const COOKIE_PREFERENCES_EVENT = 'open-cookie-preferences';

export interface CookieInventoryItem {
  name: string;
  category: 'Strictly Necessary' | 'Functional' | 'Analytics & Performance';
  type: 'LocalStorage' | 'SessionStorage' | 'Cookie';
  duration: string;
  provider: string;
  purpose: string;
}

export const COOKIE_INVENTORY: CookieInventoryItem[] = [
  {
    name: 'louisse_cookie_consent',
    category: 'Strictly Necessary',
    type: 'LocalStorage',
    duration: '12 Months',
    provider: 'louissebaja.com (First-party)',
    purpose: 'Stores the visitor’s cookie consent settings and category permissions.',
  },
  {
    name: 'louisse_chat_session',
    category: 'Functional',
    type: 'SessionStorage',
    duration: 'Browser Session',
    provider: 'louissebaja.com (First-party)',
    purpose: 'Maintains conversational state and recent prompt context in the AI Assistant widget.',
  },
  {
    name: 'louisse_pref_theme',
    category: 'Functional',
    type: 'LocalStorage',
    duration: '6 Months',
    provider: 'louissebaja.com (First-party)',
    purpose: 'Preserves user interface display preferences and reduced motion settings.',
  },
  {
    name: '_ga, _ga_*',
    category: 'Analytics & Performance',
    type: 'Cookie',
    duration: '2 Years',
    provider: 'Google Analytics (Third-party)',
    purpose: 'Aggregates anonymous telemetry, page visit patterns, and device diagnostics to optimize load speeds.',
  },
];

export function getStoredCookieConsent(): CookieConsentPreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;
    return {
      strictlyNecessary: true,
      functional: Boolean(parsed.functional),
      analytics: Boolean(parsed.analytics),
      timestamp: typeof parsed.timestamp === 'number' ? parsed.timestamp : Date.now(),
      version: typeof parsed.version === 'string' ? parsed.version : CURRENT_CONSENT_VERSION,
    };
  } catch {
    return null;
  }
}

export function saveCookieConsent(options: {
  functional: boolean;
  analytics: boolean;
}): CookieConsentPreferences {
  const preferences: CookieConsentPreferences = {
    strictlyNecessary: true,
    functional: options.functional,
    analytics: options.analytics,
    timestamp: Date.now(),
    version: CURRENT_CONSENT_VERSION,
  };

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(preferences));
      window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: preferences }));
    } catch (e) {
      console.warn('Unable to save cookie preferences to localStorage', e);
    }
  }

  return preferences;
}

export function acceptAllCookies(): CookieConsentPreferences {
  return saveCookieConsent({ functional: true, analytics: true });
}

export function acceptEssentialOnly(): CookieConsentPreferences {
  return saveCookieConsent({ functional: false, analytics: false });
}

export function hasUserConsented(): boolean {
  return getStoredCookieConsent() !== null;
}

export function resetCookieConsent(): void {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('cookie-consent-reset'));
    } catch (e) {
      console.warn('Unable to reset cookie preferences in localStorage', e);
    }
  }
}

export function openCookiePreferences(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(COOKIE_PREFERENCES_EVENT));
  }
}
