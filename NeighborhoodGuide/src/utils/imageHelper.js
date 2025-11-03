// Helper para obtener la fuente de imagen, soportando imágenes locales y URLs
export function getImageSource(thumbnail) {
  if (!thumbnail) {
    return null;
  }

  // Si el thumbnail empieza con "local:", es una imagen local
  if (thumbnail.startsWith('local:')) {
    const imageName = thumbnail.replace('local:', '');
    
    // Mapeo de nombres de imágenes locales a require()
    const localImages = {
      'parque-rivadavia': require('../../assets/parque-rivadavia.png'),
      'barrio-ingles': require('../../assets/barrio-ingles-caballito.png'),
      'ferro': require('../../assets/ferro.png'),
      'centenario': require('../../assets/centenario.png'),
      'plaza-irlanda': require('../../assets/plaza irlanda.png'),
      'cid-campeador': require('../../assets/cidcampeador.png'),
    };

    return localImages[imageName] || null;
  }

  // Si no es local, es una URL
  return { uri: thumbnail };
}

