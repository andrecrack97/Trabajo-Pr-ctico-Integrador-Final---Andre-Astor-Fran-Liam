import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { getVideoSource } from '../utils/videoHelper';

export default function VideoPlayer({ videoUrl, style }) {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const videoSource = getVideoSource(videoUrl);

  useEffect(() => {
    return () => {
      // Unload on unmount to free resources
      if (videoRef.current) {
        videoRef.current.unloadAsync().catch(() => {});
      }
    };
  }, []);

  if (!videoSource) {
    return null;
  }

  return (
    <View style={style}>
      {loading && (
        <View style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
          <ActivityIndicator />
        </View>
      )}
      <Video
        ref={videoRef}
        source={videoSource}
        style={{ width: '100%', height: '100%', backgroundColor: '#000' }}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        onLoadStart={() => setLoading(true)}
        onReadyForDisplay={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </View>
  );
}


