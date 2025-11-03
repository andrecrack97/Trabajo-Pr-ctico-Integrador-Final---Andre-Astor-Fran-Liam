import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { PoiContext } from '../context/PoiContext';
import { formatCurrency } from '../services/localeService';
import { getImageSource } from '../utils/imageHelper';
import { hasLocalVideo } from '../utils/videoHelper';
import VideoPlayer from '../components/VideoPlayer';

export default function PoiDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { pois, toggleFavorite, isFavorite } = useContext(PoiContext);
  const poi = useMemo(() => pois.find((p) => p.id === route.params?.id), [pois, route.params]);

  if (!poi) {
    return (
      <View style={styles.container}>
        <Text>POI no encontrado.</Text>
      </View>
    );
  }

  const favorite = isFavorite(poi.id);
  const hasVideo = hasLocalVideo(poi.videoUrl);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!!poi.thumbnail && getImageSource(poi.thumbnail) && (
        <Image source={getImageSource(poi.thumbnail)} style={styles.thumbnail} />
      )}
      <Text style={styles.title}>{poi.name}</Text>
      <Text style={styles.meta}>
        {poi.category} • {poi.rating}★ • {formatCurrency(poi.price)}
      </Text>
      <View style={{ height: 16 }} />
      <Text style={styles.description}>{poi.description}</Text>
      <View style={{ height: 16 }} />
      <Text style={styles.sectionTitle}>Video</Text>
      {hasVideo ? (
        <VideoPlayer videoUrl={poi.videoUrl} style={styles.videoPlayer} />
      ) : (
        <View style={styles.noVideoContainer}>
          <Text style={styles.noVideoText}>No hay video cargado para este lugar</Text>
        </View>
      )}
      <View style={{ height: 16 }} />
      <TouchableOpacity
        style={[styles.favoriteButton, favorite && styles.favoriteButtonActive]}
        onPress={() => toggleFavorite(poi.id)}
      >
        <Ionicons
          name={favorite ? 'heart' : 'heart-outline'}
          size={20}
          color={favorite ? '#FFFFFF' : '#EF4444'}
        />
        <Text style={[styles.favoriteButtonText, favorite && styles.favoriteButtonTextActive]}>
          {favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        </Text>
      </TouchableOpacity>
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
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  meta: {
    color: '#6B7280',
    fontSize: 14,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  favoriteButtonActive: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  favoriteButtonText: {
    marginLeft: 8,
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 16,
  },
  favoriteButtonTextActive: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#374151',
  },
  videoPlayer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#000',
  },
  noVideoContainer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  noVideoText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
  },
});


