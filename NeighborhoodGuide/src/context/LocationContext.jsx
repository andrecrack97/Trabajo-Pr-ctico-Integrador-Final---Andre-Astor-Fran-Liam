import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { requestForegroundPermissions, getCurrentPosition } from '../services/locationService';

export const LocationContext = createContext({
  coords: null,
  permissionStatus: 'undetermined',
  refreshLocation: async () => {},
});

export default function LocationProvider({ children }) {
  const [coords, setCoords] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('undetermined');

  const refreshLocation = useCallback(async () => {
    try {
      const { status, granted } = await requestForegroundPermissions();
      setPermissionStatus(status);
      if (!granted) return;
      const c = await getCurrentPosition();
      setCoords(c);
    } catch (e) {
      Alert.alert('Ubicación', 'No fue posible obtener tu ubicación. Reintenta o revisa permisos.');
    }
  }, []);

  useEffect(() => {
    // Attempt to fetch location on mount; screens may also call refresh.
    refreshLocation();
  }, [refreshLocation]);

  const value = useMemo(
    () => ({ coords, permissionStatus, refreshLocation }),
    [coords, permissionStatus, refreshLocation]
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}


