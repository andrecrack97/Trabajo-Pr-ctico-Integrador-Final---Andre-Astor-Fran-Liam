import React, { useContext, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { LocationContext } from '../context/LocationContext';
import { PoiContext } from '../context/PoiContext';
import { Ionicons } from '@expo/vector-icons';
import { getImageSource } from '../utils/imageHelper';

export default function MapScreen() {
  const navigation = useNavigation();
  const { coords, refreshLocation } = useContext(LocationContext);
  const { pois } = useContext(PoiContext);
  const mapRef = useRef(null);

  const initialRegion = useMemo(() => {
    if (coords) {
      return {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
    }
    // Buenos Aires center fallback
    return { latitude: -34.6037, longitude: -58.3816, latitudeDelta: 0.05, longitudeDelta: 0.05 };
  }, [coords]);

  const centerOnUser = () => {
    if (coords && mapRef.current) {
      mapRef.current.animateCamera({ center: { latitude: coords.latitude, longitude: coords.longitude }, zoom: 15 });
    } else {
      refreshLocation();
    }
  };

  return (
    <View style={styles.container}>
      {/* Temporary guard: only render MapView after first region is ready. */}
      {!!initialRegion && (
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          showsUserLocation={!!coords}
          initialRegion={initialRegion}
        >
          {pois.map((p) => (
            <Marker key={p.id} coordinate={{ latitude: p.latitude, longitude: p.longitude }} title={p.name}
              tracksViewChanges={false}
            >
              <Callout tooltip={false}>
                <View style={styles.calloutContainer}>
                  <Image
                    source={getImageSource(p.thumbnail) || require('../../assets/icon.png')}
                    style={styles.calloutImage}
                    resizeMode="cover"
                    defaultSource={require('../../assets/icon.png')}
                  />
                  <View style={styles.calloutContent}>
                    <Text style={styles.calloutTitle} numberOfLines={1}>{p.name}</Text>
                    <Text style={styles.calloutCategory}>{p.category}</Text>
                    <TouchableOpacity
                      style={styles.calloutButton}
                      onPress={() => navigation.navigate('PoiDetail', { id: p.id })}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.calloutButtonText}>Ver detalles →</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
      <TouchableOpacity style={styles.fab} onPress={centerOnUser}>
        <Ionicons name="locate" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    elevation: 2,
  },
  calloutContainer: {
    width: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutImage: {
    width: 250,
    height: 150,
    backgroundColor: '#E5E7EB',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  calloutContent: {
    padding: 12,
  },
  calloutTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  calloutCategory: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  calloutButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 4,
  },
  calloutButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
});

