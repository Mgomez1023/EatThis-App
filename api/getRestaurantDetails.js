export default async function handler(req, res) {
  const { lat, lng, restaurantName } = req.query;

  const apiUrl = `https://api.foursquare.com/v3/places/search?query=${encodeURIComponent(
    restaurantName
  )}&ll=${lat},${lng}&limit=1&fields=fsq_id,name,location,categories,tel,website,hours,rating,price,features,photos,geocodes,menu,stats`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: process.env.FOURSQUARE_API_KEY,
        Accept: 'application/json',
      },
    });

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      console.warn("No results found from Foursquare:", data);
      return res.status(200).json({ message: "No results" });
    }

    console.log("Foursquare API response:", data);
    return res.status(200).json(data.results[0]);
  } catch (error) {
    console.error("Foursquare API error:", error);
    return res.status(500).json({ error: "Failed to fetch from Foursquare" });
  }
}