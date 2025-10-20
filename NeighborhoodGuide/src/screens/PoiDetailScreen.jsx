import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { PoiContext } from '../context/PoiContext';
import { formatCurrency } from '../services/localeService';

export default function PoiDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { pois } = useContext(PoiContext);
  const poi = useMemo(() => pois.find((p) => p.id === route.params?.id), [pois, route.params]);

  if (!poi) {
    return (
      <View style={styles.container}>
        <Text>POI no encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{poi.name}</Text>
      <Text style={styles.meta}>
        {poi.category} • {poi.rating}★ • {formatCurrency(poi.price)}
      </Text>
      <View style={{ height: 12 }} />
      <Text>{poi.description}</Text>
      <View style={{ height: 12 }} />
      <Button title="Abrir en Mapa" onPress={() => navigation.navigate('Tabs', { screen: 'Map', params: { focus: poi.id } })} />
    </ScrollView>
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
  meta: {
    color: '#6B7280',
  },
});


