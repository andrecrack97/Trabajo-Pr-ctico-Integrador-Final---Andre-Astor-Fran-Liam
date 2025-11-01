import * as Localization from 'expo-localization';

export function getRuntimeLocaleInfo() {
  // Obtener timezone del dispositivo (esto funcionaba correctamente)
  let timeZone = Localization.timezone || Localization.timeZone;
  if (!timeZone && Localization.getCalendars) {
    const calendars = Localization.getCalendars();
    timeZone = calendars?.[0]?.timeZone;
  }
  
  // Obtener locales usando getLocales() - método recomendado que proporciona información más completa
  const locales = Localization.getLocales ? Localization.getLocales() : [];
  const firstLocale = locales?.[0];
  
  // Obtener locale - priorizar languageTag completo de getLocales
  let locale = null;
  if (firstLocale) {
    // languageTag es el formato completo como "es-AR" o "en-US"
    if (firstLocale.languageTag) {
      locale = firstLocale.languageTag;
    } else if (firstLocale.languageCode && firstLocale.regionCode) {
      // Construir locale desde languageCode y regionCode
      locale = `${firstLocale.languageCode}-${firstLocale.regionCode}`;
    } else if (firstLocale.languageCode) {
      locale = firstLocale.languageCode;
    }
  }
  
  // Si no hay locale desde getLocales, usar Localization.locale directamente
  if (!locale) {
    locale = Localization.locale;
  }
  
  // Obtener región - priorizar regionCode de getLocales, luego Localization.region
  let region = null;
  if (firstLocale && firstLocale.regionCode) {
    region = firstLocale.regionCode;
  }
  
  // Si no hay región desde getLocales, usar Localization.region directamente
  if (!region && Localization.region) {
    region = Localization.region;
  }
  
  // Si aún no hay región, intentar extraer del locale (ej: "es-AR" -> "AR")
  if (!region && locale) {
    const parts = locale.split('-');
    if (parts.length >= 2) {
      region = parts[parts.length - 1];
    }
  }
  
  // Obtener moneda - priorizar currencyCode de getLocales
  let currency = null;
  if (firstLocale && firstLocale.currencyCode) {
    currency = firstLocale.currencyCode;
  }
  
  // Si no hay moneda desde getLocales, usar Localization.currency directamente
  if (!currency && Localization.currency) {
    currency = Localization.currency;
  }
  
  // Si aún no hay moneda, usar isoCurrencyCodes como último recurso
  if (!currency && Localization.isoCurrencyCodes && Localization.isoCurrencyCodes.length > 0) {
    currency = Localization.isoCurrencyCodes[0];
  }
  
  // Validar y corregir usando timezone si hay inconsistencia evidente
  // Solo usar esto cuando el timezone claramente indica un país diferente al reportado
  if (timeZone) {
    // Detectar si el timezone indica Argentina pero región/moneda no coinciden
    if (timeZone.includes('Argentina')) {
      if (region !== 'AR') {
        region = 'AR';
        // Actualizar locale si es posible
        if (locale && firstLocale?.languageCode) {
          const langCode = firstLocale.languageCode || locale.split('-')[0] || 'es';
          locale = `${langCode}-AR`;
        } else if (!locale && firstLocale?.languageCode) {
          locale = `${firstLocale.languageCode}-AR`;
        }
      }
      if (currency !== 'ARS') {
        currency = 'ARS';
      }
    }
    // Puedes agregar más validaciones para otros países si es necesario
    // Ejemplo: si timeZone incluye "America/New_York" pero region no es US, corregir
  }
  
  return {
    locale: locale || null,
    region: region || null,
    timeZone: timeZone || null,
    currency: currency || null,
  };
}

export function formatCurrency(amount, currencyFromLocale) {
  const { locale, currency } = getRuntimeLocaleInfo();
  
  // Usar la moneda proporcionada o la detectada del dispositivo
  const cur = currencyFromLocale || currency;
  const loc = locale;
  
  // Si no hay moneda o locale, devolver formato simple
  if (!cur || !loc) {
    return `${amount}`;
  }
  
  try {
    // Usar Intl.NumberFormat con el locale y moneda del dispositivo
    // El locale determina el formato (separadores, símbolo de moneda, etc.)
    return new Intl.NumberFormat(loc, { 
      style: 'currency', 
      currency: cur 
    }).format(amount);
  } catch (e) {
    // Si hay error, devolver formato simple
    return `${amount} ${cur}`;
  }
}

export function formatNumber(n) {
  const { locale } = getRuntimeLocaleInfo();
  const loc = locale;
  
  // Si no hay locale, devolver número como string simple
  if (!loc) {
    return String(n);
  }
  
  try {
    // Usar Intl.NumberFormat con el locale del dispositivo
    // Esto formateará correctamente: separadores de miles, decimales, etc.
    // Ejemplo: 1234567.89 -> "1.234.567,89" en es-AR o "1,234,567.89" en en-US
    return new Intl.NumberFormat(loc).format(n);
  } catch (e) {
    // Si hay error, devolver número como string simple
    return String(n);
  }
}

export function formatDate(date, options) {
  const { locale } = getRuntimeLocaleInfo();
  const loc = locale;
  const d = date instanceof Date ? date : new Date(date);
  
  // Si no hay locale, devolver fecha ISO
  if (!loc) {
    return d.toISOString();
  }
  
  try {
    // Usar Intl.DateTimeFormat con el locale del dispositivo
    // El locale determina el formato de fecha y hora según las preferencias regionales
    // Ejemplo: "15 ene 2024, 14:30" en es-AR o "Jan 15, 2024, 2:30 PM" en en-US
    return new Intl.DateTimeFormat(loc, options).format(d);
  } catch (e) {
    // Si hay error, devolver fecha ISO
    return d.toISOString();
  }
}


