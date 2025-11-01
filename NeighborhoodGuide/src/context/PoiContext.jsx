import React, { createContext, useEffect, useMemo, useState, useCallback, useContext } from 'react';
import { Alert } from 'react-native';
import { haversine } from '../services/distanceService';
import { loadFavorites, saveFavorites } from '../services/storageService';
import { LocationContext } from './LocationContext';
import poisData from '../data/pois.json';

export const PoiContext = createContext({
  pois: [],
  favorites: [],
  toggleFavorite: (id) => {},
  isFavorite: (id) => false,
});

export default function PoiProvider({ children }) {
  const { coords } = useContext(LocationContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    (async () => {
      const favs = await loadFavorites();
      setFavorites(favs);
    })();
  }, []);

  const toggleFavorite = useCallback(
    async (id) => {
      try {
        setFavorites((prev) => {
          const exists = prev.includes(id);
          const next = exists ? prev.filter((x) => x !== id) : [...prev, id];
          saveFavorites(next);
          return next;
        });
      } catch (e) {
        Alert.alert('Favoritos', 'No se pudo actualizar el favorito.');
      }
    },
    []
  );

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

  const pois = useMemo(() => {
    const enriched = poisData.map((p) => {
      if (coords) {
        const distanceKm = haversine(coords.latitude, coords.longitude, p.latitude, p.longitude, 'km');
        return { ...p, distanceKm };
      }
      return { ...p, distanceKm: null };
    });
    return enriched.sort((a, b) => {
      if (a.distanceKm == null && b.distanceKm == null) return 0;
      if (a.distanceKm == null) return 1;
      if (b.distanceKm == null) return -1;
      return a.distanceKm - b.distanceKm;
    });
  }, [coords]);

  const value = useMemo(
    () => ({ pois, favorites, toggleFavorite, isFavorite }),
    [pois, favorites, toggleFavorite, isFavorite]
  );

  return <PoiContext.Provider value={value}>{children}</PoiContext.Provider>;
}

