import React from 'react';
import { View, Text } from 'react-native';

// Placeholder to explain how a real locale switcher would be wired.
export default function LocaleSwitcher() {
  return (
    <View style={{ padding: 12, backgroundColor: '#EEF2FF', borderRadius: 8 }}>
      <Text style={{ fontWeight: '600' }}>Locale</Text>
      <Text>
        La app toma el locale del dispositivo vía expo-localization. Un switch real
        requeriría mantener una preferencia y re-crear Intl con ese locale.
      </Text>
    </View>
  );
}


