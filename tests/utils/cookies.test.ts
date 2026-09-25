import { beforeEach, describe, expect, it } from 'vitest';
import {
  acceptAllCookies,
  acceptEssentialOnly,
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_INVENTORY,
  getStoredCookieConsent,
  hasUserConsented,
  resetCookieConsent,
  saveCookieConsent,
} from '@/utils/cookies';

describe('cookie consent utilities', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns null when no consent has been stored', () => {
    expect(getStoredCookieConsent()).toBeNull();
    expect(hasUserConsented()).toBe(false);
  });

  it('saves accept all preferences', () => {
    const prefs = acceptAllCookies();
    expect(prefs.strictlyNecessary).toBe(true);
    expect(prefs.functional).toBe(true);
    expect(prefs.analytics).toBe(true);
    expect(hasUserConsented()).toBe(true);

    const stored = getStoredCookieConsent();
    expect(stored).not.toBeNull();
    expect(stored?.functional).toBe(true);
    expect(stored?.analytics).toBe(true);
  });

  it('saves essential only preferences', () => {
    const prefs = acceptEssentialOnly();
    expect(prefs.strictlyNecessary).toBe(true);
    expect(prefs.functional).toBe(false);
    expect(prefs.analytics).toBe(false);

    const stored = getStoredCookieConsent();
    expect(stored?.functional).toBe(false);
    expect(stored?.analytics).toBe(false);
  });

  it('supports granular custom preferences', () => {
    saveCookieConsent({ functional: true, analytics: false });
    const stored = getStoredCookieConsent();
    expect(stored?.functional).toBe(true);
    expect(stored?.analytics).toBe(false);
  });

  it('clears stored consent on reset', () => {
    acceptAllCookies();
    expect(hasUserConsented()).toBe(true);

    resetCookieConsent();
    expect(hasUserConsented()).toBe(false);
    expect(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)).toBeNull();
  });

  it('provides a complete inventory table with required fields', () => {
    expect(COOKIE_INVENTORY.length).toBeGreaterThanOrEqual(3);
    const hasConsentKey = COOKIE_INVENTORY.some(
      (item) => item.name === 'louisse_cookie_consent' && item.category === 'Strictly Necessary'
    );
    expect(hasConsentKey).toBe(true);
  });
});
