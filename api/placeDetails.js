export default async function handler(req, res) {
  const { placeId } = req.query;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!placeId) {
    return res.status(400).json({ error: "Missing placeId." });
  }
  if (!apiKey) {
    return res.status(400).json({ error: "Missing API key." });
  }

  console.log("place_id", placeId);

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      return res.status(500).json({ error: "Failed to fetch place details." });
    }

    res.status(200).json({ place: data.result });
  } catch (error) {
    console.error("Place Details failed:", error);
    res.status(500).json({ error: "Place detail fetch failed." });
  }
}