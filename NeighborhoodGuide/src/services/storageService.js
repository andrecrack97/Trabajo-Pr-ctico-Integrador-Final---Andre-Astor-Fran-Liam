import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites_v1';
const SETTINGS_KEY = 'settings_v1';

export async function loadFavorites() {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export async function saveFavorites(favorites) {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites || []));
  } catch (e) {
    // no-op
  }
}

export async function loadSettings() {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : { distanceUnit: 'km' };
  } catch (e) {
    return { distanceUnit: 'km' };
  }
}

export async function saveSettings(settings) {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings || {}));
  } catch (e) {
    // no-op
  }
}


