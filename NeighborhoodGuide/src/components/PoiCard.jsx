import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import RatingStars from './RatingStars';
import DistanceBadge from './DistanceBadge';
import { formatCurrency } from '../services/localeService';

export default function PoiCard({ poi, onPress, onToggleFavorite, isFavorite, unit = 'km' }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', padding: 12, backgroundColor: '#F8FAFC', borderRadius: 8 }}>
      {!!poi.thumbnail && <Image source={{ uri: poi.thumbnail }} style={{ width: 80, height: 80, borderRadius: 8, marginRight: 12 }} />}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '700', fontSize: 16 }}>{poi.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <RatingStars rating={poi.rating} />
          <View style={{ width: 8 }} />
          <DistanceBadge valueKm={poi.distanceKm} unit={unit} />
        </View>
        <Text style={{ color: '#6B7280', marginTop: 6 }}>
          {poi.category} • {formatCurrency(poi.price)}
        </Text>
        {!!onToggleFavorite && (
          <TouchableOpacity onPress={onToggleFavorite} style={{ marginTop: 8 }}>
            <Text style={{ color: isFavorite ? '#EF4444' : '#2563EB', fontWeight: '600' }}>
              {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}


