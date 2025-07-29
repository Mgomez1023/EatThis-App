export default async function handler(req, res) {
  const { lat, lng, restaurantName } = req.query;

  const apiUrl = `https://api.foursquare.com/v3/places/search?query=${encodeURIComponent(
    restaurantName
  )}&ll=${lat},${lng}&limit=1&fields=fsq_id,name,location,categories,tel,website,hours,rating,price,features,photos,geocodes,menu,stats`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: process.env.FOURSQUARE,
        Accept: 'application/json',
      },
    });

    const data = await response.json();
    res.status(200).json(data.results?.[0] || {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Foursquare', details: error.message });
  }
}