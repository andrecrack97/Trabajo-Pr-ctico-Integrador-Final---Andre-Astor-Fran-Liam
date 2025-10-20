import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PoiContext } from '../context/PoiContext';
import { formatCurrency, formatNumber } from '../services/localeService';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { pois } = useContext(PoiContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>POIs cercanos</Text>
      <FlatList
        data={pois}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PoiDetail', { id: item.id })}>
            {!!item.thumbnail && (
              <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>
                {item.category} • {item.rating}★ • {formatCurrency(item.price)}
              </Text>
              <Text style={styles.distance}>
                {item.distanceKm != null ? `${formatNumber(item.distanceKm)} km` : '—'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={<Text>No hay POIs disponibles.</Text>}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
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
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    color: '#6B7280',
    marginTop: 2,
  },
  distance: {
    marginTop: 4,
    fontWeight: '500',
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#E5E7EB',
  },
});

