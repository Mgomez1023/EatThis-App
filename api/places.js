export default async function handler(req, res) {
  const { lat, lng, keyword, radiusMeters } = req.query;

  const apiKey = process.env.GOOGLE_API_KEY;
  const radius = radiusMeters || 5000;

  console.log("Radius: ", radius);

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=${keyword}&key=${apiKey}`;

  console.log("GOOGLE_API_KEY:", apiKey);
  console.log("process.env: ", process.env.GOOGLE_API_KEY);
  console.log("Google Places API URL:", url);

  try {
      console.log("GOOGLE_API_KEY222:", apiKey);
      const response = await fetch(url);
      const data = await response.json();
      console.log("API Response:", data);
      res.status(200).json(data, { message: "API ROUTE WORKING FR"});
  } catch (err) {
      res.status(500).json({ error: "Failed to fetch data from Google Places API." });
  }
}
