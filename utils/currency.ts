const REGION_TO_CURRENCY: Record<string, string> = {
  AU: 'AUD',
  CA: 'CAD',
  DE: 'EUR',
  ES: 'EUR',
  FR: 'EUR',
  GB: 'GBP',
  IE: 'EUR',
  IT: 'EUR',
  JP: 'JPY',
  NL: 'EUR',
  NZ: 'NZD',
  PH: 'PHP',
  SG: 'SGD',
  US: 'USD',
};

export function detectCurrencyFromLocale(locale: string): string {
  try {
    if (!locale || locale === 'und') {
      return 'PHP';
    }

    const region = new Intl.Locale(locale).maximize().region;
    return (region && REGION_TO_CURRENCY[region]) || 'PHP';
  } catch {
    return 'PHP';
  }
}

export function convertPhpAmount(
  phpAmount: number,
  currency: string,
  rates: Record<string, number>,
): number | null {
  if (currency === 'PHP') {
    return phpAmount;
  }

  const rate = rates[currency];
  if (!rate) {
    return null;
  }

  return phpAmount * rate;
}

export function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
    currencyDisplay: 'code',
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\u00A0/g, ' ');
}
