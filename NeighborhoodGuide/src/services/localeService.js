import * as Localization from 'expo-localization';

export function getRuntimeLocaleInfo() {
  // expo-localization exposes best available locale, region, and currency
  const { locale, region, timeZone, currency } = Localization.getLocales?.()[0] || Localization;
  return {
    locale: locale || Localization.locale,
    region: region || Localization.region,
    timeZone: timeZone || Localization.timezone || Localization.timeZone,
    currency: currency || 'USD',
  };
}

export function formatCurrency(amount, currencyFromLocale) {
  const { locale, currency } = getRuntimeLocaleInfo();
  const cur = currencyFromLocale || currency || 'USD';
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: cur }).format(amount);
  } catch (e) {
    return `${amount} ${cur}`;
  }
}

export function formatNumber(n) {
  const { locale } = getRuntimeLocaleInfo();
  try {
    return new Intl.NumberFormat(locale).format(n);
  } catch (e) {
    return String(n);
  }
}

export function formatDate(date, options) {
  const { locale } = getRuntimeLocaleInfo();
  const d = date instanceof Date ? date : new Date(date);
  try {
    return new Intl.DateTimeFormat(locale, options).format(d);
  } catch (e) {
    return d.toISOString();
  }
}


