import duckdb from 'duckdb';

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

      if (!data.results || data.results.length === 0) {
        return res.status(404).json({ error: "No results found." });
      }

      const placeNames = data.results.map(place => place.name);
      console.log("Place Names:", placeNames);

      const categories = await getCategoryForPlace(placeNames);

      const categoryMap = {};
      categories.forEach((row) => {
        categoryMap[row.term.toLowerCase()] = row.categories;
      });
      console.log("Category Map:", categoryMap);
      const enhancedResults = data.results.map((place) => ({
        ...place,
        category: categoryMap[place.name.toLowerCase()] || "Unknown Boiii",
      }))

      //console.log("Enhanced Results:", enhancedResults);


      // Return the enhanced results
      res.status(200).json({results: data.results}, { message: "DATABASE API ROUTE WORKING FR"});
      

  } catch (err) {
      res.status(500).json({ error: "Failed to fetch data from Google Places API." });
  }
}

const db = new duckdb.Database('E:/EatThis_DataBase/place_data.duckdb');
const con = db.connect();

function cleanName(name) {
  return name.toLowerCase().replace(/[^\w\s]/g, '').trim();
}

function runQuery(query) {
  return new Promise((resolve, reject) => {
    con.all(query, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function getCategoryForPlace(names) {
  const cleanNames = [...new Set(
    names.map((n) =>
      n.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim()
    )
  )];

  const valuesClause = cleanNames
    .map((n) => `('${n}')`)
    .join(", ");

  const query = `
      WITH search_terms AS (
        SELECT * FROM (VALUES
          ${valuesClause}
        ) AS t(term)
      ),
      ranked AS (
        SELECT
          s.term,
          p.fsq_category_ids,
          p.name,
          p.latitude,
          p.longitude,
          ROW_NUMBER() OVER (
            PARTITION BY s.term 
            ORDER BY p.name -- or whatever ordering you prefer
          ) AS rn
        FROM places p
        JOIN search_terms s
          ON regexp_replace(lower(p.name), '[^a-z0-9 ]', '', 'g')
            LIKE '%' || s.term || '%'
      )
      SELECT term, fsq_category_ids, name, latitude, longitude
      FROM ranked
      WHERE rn = 1;
  `;

  console.log("DuckDB Query:\n", query);

  try {
    const rows = await runQuery(query);
    console.log("DuckDB Rows:", rows);
    return rows;
  } catch (err) {
    console.error("DuckDB batch query error:", err);
    return [];
  }
}