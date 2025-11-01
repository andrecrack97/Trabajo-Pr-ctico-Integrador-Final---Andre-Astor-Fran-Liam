import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PoiContext } from '../context/PoiContext';
import { formatCurrency, formatNumber } from '../services/localeService';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const { pois, favorites, toggleFavorite, isFavorite } = useContext(PoiContext);

  const favoritePois = useMemo(() => {
    return pois.filter((poi) => favorites.includes(poi.id));
  }, [pois, favorites]);

  if (favoritePois.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Favoritos</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tienes favoritos guardados aún.</Text>
          <Text style={styles.emptySubtext}>Toca el corazón en cualquier lugar para agregarlo a favoritos.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <FlatList
        data={favoritePois}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PoiDetail', { id: item.id })}
          >
            {!!item.thumbnail && (
              <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>
                {item.category} • {item.rating}★ • {formatCurrency(item.price)}
              </Text>
              {item.distanceKm != null && (
                <Text style={styles.distance}>
                  {formatNumber(item.distanceKm)} km de distancia
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => toggleFavorite(item.id)}
              style={styles.favoriteIcon}
            >
              <Text style={styles.favoriteHeart}>❤️</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#E5E7EB',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    color: '#6B7280',
    marginTop: 2,
    fontSize: 14,
  },
  distance: {
    marginTop: 4,
    fontWeight: '500',
    fontSize: 12,
    color: '#9CA3AF',
  },
  favoriteIcon: {
    padding: 8,
  },
  favoriteHeart: {
    fontSize: 24,
  },
});

