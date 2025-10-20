import React from 'react';
import { View, Text } from 'react-native';

export default function DistanceBadge({ valueKm, unit = 'km' }) {
  if (valueKm == null) return null;
  const value = unit === 'mi' ? (valueKm * 0.621371).toFixed(2) : valueKm.toFixed(2);
  const label = unit === 'mi' ? 'mi' : 'km';
  return (
    <View style={{ backgroundColor: '#E5E7EB', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 6 }}>
      <Text style={{ fontWeight: '600' }}>{value} {label}</Text>
    </View>
  );
}


