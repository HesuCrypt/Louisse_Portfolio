import { describe, expect, it } from 'vitest';
import {
  convertPhpAmount,
  detectCurrencyFromLocale,
  formatMoney,
} from '@/utils/currency';

describe('currency helpers', () => {
  it('maps common locales to their display currency', () => {
    expect(detectCurrencyFromLocale('en-US')).toBe('USD');
    expect(detectCurrencyFromLocale('en-GB')).toBe('GBP');
    expect(detectCurrencyFromLocale('en-PH')).toBe('PHP');
  });

  it('falls back unknown locales to PHP', () => {
    expect(detectCurrencyFromLocale('und')).toBe('PHP');
  });

  it('converts PHP prices using the fetched rate table', () => {
    expect(convertPhpAmount(30000, 'USD', { USD: 0.0175 })).toBeCloseTo(525);
  });

  it('formats readable currency labels', () => {
    expect(formatMoney(30000, 'PHP')).toBe('PHP 30,000');
    expect(formatMoney(525, 'USD')).toBe('USD 525');
  });
});
