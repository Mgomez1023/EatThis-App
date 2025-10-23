export default async function handler(req, res) {
  const { lat, lng, restaurantName } = req.query;

  const apiKey = process.env.FOURSQUARE;
  const fsqKey = process.env.FSQ_PLACE;
  const EatThis = process.env.EatThis;

  console.log("FOURSQUARE_API_KEY:", apiKey);
  console.log("process.env: ", process.env.FOURSQUARE);
  console.log("process.env.FSQ_PLACE:", fsqKey);
  console.log("process.env.EatThis:", EatThis);

  const apiUrl = `https://places-api.foursquare.com/places/search?ll=${lat},${lng}&query=${encodeURIComponent(restaurantName)}&limit=1`;
  const testUrl = `https://places-api.foursquare.com/places/search?ll=40.7484,-73.9857&query=Starbucks&limit=1`

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: apiKey,
      'X-Places-Api-Version' : '2025-06-17'
    },
  }

  try {
    const response = await fetch(apiUrl, options);

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