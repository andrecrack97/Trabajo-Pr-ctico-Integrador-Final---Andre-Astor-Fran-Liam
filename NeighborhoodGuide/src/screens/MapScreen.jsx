import React, { useContext, useMemo, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { LocationContext } from '../context/LocationContext';
import { PoiContext } from '../context/PoiContext';
import { Ionicons } from '@expo/vector-icons';

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
            <Marker 
              key={p.id} 
              coordinate={{ latitude: p.latitude, longitude: p.longitude }} 
              title={p.name}
              tracksViewChanges={false}
              onPress={() => navigation.navigate('PoiDetail', { id: p.id })}
            />
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
});

