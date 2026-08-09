import { CurrencyCode, CurrencyConfig } from '../types';

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', locale: 'en-NG' },
  { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
  { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE' },
  { code: 'CAD', symbol: '$', name: 'Canadian Dollar', locale: 'en-CA' },
  { code: 'AUD', symbol: '$', name: 'Australian Dollar', locale: 'en-AU' },
];

/**
 * Exchange rate table normalized relative to 1.0 USD.
 * In production backend, this service is easily swapped with an API call (e.g. OpenExchangeRates / Fixer).
 */
const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  USD: 1.0,
  NGN: 1375.0, // $1 USD = ₦1,375 NGN (Approx. ₦250,000 NGN = $182 USD)
  GBP: 0.78,   // $1 USD = £0.78 GBP
  EUR: 0.92,   // $1 USD = €0.92 EUR
  CAD: 1.36,   // $1 USD = $1.36 CAD
  AUD: 1.52,   // $1 USD = $1.52 AUD
};

/**
 * Converts numerical price from one currency to another without mutating original price.
 */
export const convertPrice = (
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
): number => {
  if (fromCurrency === toCurrency) return amount;
  const fromRate = EXCHANGE_RATES[fromCurrency] || 1.0;
  const toRate = EXCHANGE_RATES[toCurrency] || 1.0;
  
  // Convert from origin currency to USD reference, then to target currency
  const inUSD = amount / fromRate;
  return inUSD * toRate;
};

/**
 * Formats a raw number using standard Intl.NumberFormat according to target currency locale.
 */
export const formatRawAmount = (amount: number, currency: CurrencyCode): string => {
  const config = SUPPORTED_CURRENCIES.find(c => c.code === currency);
  const locale = config ? config.locale : 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Converts price from stored original currency to customer's target currency and formats it cleanly.
 */
export const formatPriceWithCurrency = (
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
): string => {
  const converted = convertPrice(amount, fromCurrency, toCurrency);
  return formatRawAmount(converted, toCurrency);
};

/**
 * Customer initial locale auto-detection with automatic fallback.
 */
export const detectCustomerCurrency = (): CurrencyCode => {
  try {
    const language = typeof window !== 'undefined' ? (window.navigator.language || '') : '';
    const timeZone = typeof Intl !== 'undefined' ? (Intl.DateTimeFormat().resolvedOptions().timeZone || '') : '';

    if (language.includes('NG') || timeZone.includes('Lagos')) {
      return 'NGN';
    }
    if (language.includes('GB') || timeZone.includes('London')) {
      return 'GBP';
    }
    if (language.includes('CA')) return 'CAD';
    if (language.includes('AU')) return 'AUD';
    if (language.includes('DE') || language.includes('FR') || language.includes('ES') || language.includes('IT') || language.includes('NL')) {
      return 'EUR';
    }
  } catch (e) {
    // Ignore error in SSR / strict environments
  }
  return 'USD';
};
