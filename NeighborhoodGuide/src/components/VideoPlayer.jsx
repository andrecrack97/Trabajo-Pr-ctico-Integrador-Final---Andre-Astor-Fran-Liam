import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';

export default function VideoPlayer({ uri, style }) {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return () => {
      // Unload on unmount to free resources
      if (videoRef.current) {
        videoRef.current.unloadAsync().catch(() => {});
      }
    };
  }, []);

  return (
    <View style={style}>
      {loading && (
        <View style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      )}
      <Video
        ref={videoRef}
        source={{ uri }}
        style={{ width: '100%', height: '100%', backgroundColor: '#000' }}
        resizeMode="contain"
        useNativeControls
        onLoadStart={() => setLoading(true)}
        onReadyForDisplay={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </View>
  );
}


