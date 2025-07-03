import { haversineDistance } from "./haversineDistance";

export function getNearbyRestaurants(restaurants, userLocation, radiusMeters) {
  return restaurants
    .map(r => {
      try {
        if (!r.geometry || !r.geometry.location) {
          console.warn('Invalid restaurant object:', r);
          return null;
        }
  
        const { lat, lng } = r.geometry.location;
        const distance = haversineDistance(userLocation.lat, userLocation.lng, lat, lng);
        return { ...r, distance };
      } catch (err) {
        console.error('Error mapping restaurant:', err);
        return null;
      }
    })
        .filter(r => r && r.distance <= radiusMeters)
        .sort((a, b) => a.distance - b.distance);

}