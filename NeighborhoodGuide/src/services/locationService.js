import * as Location from 'expo-location';

export async function requestForegroundPermissions() {
  // Request location permission. Caller should handle denied state.
  const { status, granted } = await Location.requestForegroundPermissionsAsync();
  return { status, granted };
}

export async function getCurrentPosition() {
  // Get a reasonably accurate current position; may throw if permission denied.
  const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
  return {
    latitude: loc.coords.latitude,
    longitude: loc.coords.longitude,
  };
}


