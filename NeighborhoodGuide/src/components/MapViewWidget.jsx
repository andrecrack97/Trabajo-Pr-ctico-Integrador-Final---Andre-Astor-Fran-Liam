import React, { useRef, useEffect } from 'react';
import MapView from 'react-native-maps';

export default function MapViewWidget({ region, animateToRegion, style, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (animateToRegion && ref.current) {
      ref.current.animateToRegion(animateToRegion, 500);
    }
  }, [animateToRegion]);

  return (
    <MapView ref={ref} style={style} initialRegion={region}>
      {children}
    </MapView>
  );
}


