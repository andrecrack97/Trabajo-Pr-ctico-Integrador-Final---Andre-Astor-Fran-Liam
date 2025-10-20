// Haversine distance between two lat/lon coordinates.
// Returns distance in kilometers by default, or miles if unit === 'mi'.
export function haversine(lat1, lon1, lat2, lon2, unit = 'km') {
  if (
    typeof lat1 !== 'number' ||
    typeof lon1 !== 'number' ||
    typeof lat2 !== 'number' ||
    typeof lon2 !== 'number'
  ) {
    return null;
  }
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R_KM = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const km = R_KM * c;
  if (unit === 'mi') {
    return Number((km * 0.621371).toFixed(2));
  }
  return Number(km.toFixed(2));
}


