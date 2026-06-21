import { useEffect, useMemo, useState } from 'react';
import { convertPhpAmount, detectCurrencyFromLocale, formatMoney } from '@/utils/currency';

interface ExchangeRatesResponse {
  rates?: Record<string, number>;
}

interface CurrencyState {
  viewerCurrency: string;
  rates: Record<string, number>;
  status: 'idle' | 'ready' | 'error';
}

let cachedRates: Record<string, number> | null = null;
let ratesRequest: Promise<Record<string, number>> | null = null;

async function fetchRates(): Promise<Record<string, number>> {
  if (cachedRates) {
    return cachedRates;
  }

  if (!ratesRequest) {
    ratesRequest = fetch('https://api.frankfurter.app/latest?from=PHP')
      .then((response) => response.json() as Promise<ExchangeRatesResponse>)
      .then((data) => {
        cachedRates = data.rates ?? {};
        return cachedRates;
      })
      .finally(() => {
        ratesRequest = null;
      });
  }

  return ratesRequest;
}

export function useLocalizedCurrency() {
  const [state, setState] = useState<CurrencyState>({
    viewerCurrency: 'PHP',
    rates: {},
    status: 'idle',
  });

  useEffect(() => {
    const viewerCurrency = detectCurrencyFromLocale(navigator.language);
    if (viewerCurrency === 'PHP') {
      setState({ viewerCurrency, rates: {}, status: 'ready' });
      return;
    }

    let cancelled = false;

    fetchRates()
      .then((rates) => {
        if (!cancelled) {
          setState({ viewerCurrency, rates, status: 'ready' });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ viewerCurrency: 'PHP', rates: {}, status: 'error' });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return useMemo(() => {
    return {
      viewerCurrency: state.viewerCurrency,
      showEstimate: state.viewerCurrency !== 'PHP' && state.status === 'ready',
      formatPhpPrice: (amount: number) => formatMoney(amount, 'PHP'),
      formatEstimatedPrice: (amount: number) => {
        const converted = convertPhpAmount(amount, state.viewerCurrency, state.rates);

        if (converted == null || state.viewerCurrency === 'PHP') {
          return null;
        }

        return formatMoney(Math.round(converted), state.viewerCurrency);
      },
    };
  }, [state]);
}
