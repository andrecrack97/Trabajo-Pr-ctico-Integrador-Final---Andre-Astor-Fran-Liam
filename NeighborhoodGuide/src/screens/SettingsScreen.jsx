import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getRuntimeLocaleInfo, formatCurrency, formatDate, formatNumber } from '../services/localeService';

export default function SettingsScreen() {
  const [info, setInfo] = useState({ locale: '', region: '', timeZone: '', currency: 'USD' });

  useEffect(() => {
    setInfo(getRuntimeLocaleInfo());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>
      <Text>Locale: {info.locale}</Text>
      <Text>Región: {info.region}</Text>
      <Text>Timezone: {info.timeZone}</Text>
      <Text>Moneda: {info.currency}</Text>
      <View style={{ height: 16 }} />
      <Text>Precio ejemplo: {formatCurrency(2500.5, info.currency)}</Text>
      <Text>Fecha actual: {formatDate(new Date(), { dateStyle: 'medium', timeStyle: 'short' })}</Text>
      <Text>Número ejemplo: {formatNumber(1234567.89)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
});


