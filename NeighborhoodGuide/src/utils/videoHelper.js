// Helper para obtener la fuente de video, soportando videos locales y URLs
export function getVideoSource(videoUrl) {
  if (!videoUrl) {
    return null;
  }

  // Si el video empieza con "local:", es un video local
  if (videoUrl.startsWith('local:')) {
    const videoName = videoUrl.replace('local:', '');
    
    // Mapeo de nombres de videos locales a require()
    const localVideos = {
      'videoParqueRiv': require('../../assets/videoParqueRiv.mp4'),
    };

    return localVideos[videoName] || null;
  }

  // Si no es local, retornamos null (las URLs de YouTube no se pueden reproducir directamente)
  return null;
}

// Función para verificar si hay un video local disponible
export function hasLocalVideo(videoUrl) {
  return !!getVideoSource(videoUrl);
}

