// setupDB_resumable.js
import duckdb from "duckdb";

const BATCH_SIZE = 50000; // adjust if needed
const db = new duckdb.Database("E:/EatThis_DataBase/place_data.duckdb");
const con = db.connect();

function runExec(sql) {
  return new Promise((resolve, reject) => {
    con.run(sql, (err, result) => (err ? reject(err) : resolve(result)));
  });
}

(async () => {
  try {
    console.log("🔧 Setting DuckDB options for performance...");
    await runExec(`SET memory_limit='8GB';`);
    await runExec(`SET threads=4;`);
    await runExec(`SET preserve_insertion_order=false;`);
    await runExec(`SET temp_directory='E:/EatThis_DataBase;'`);

    console.log("📦 Creating normalized table if it doesn't exist...");
    await runExec(`
      CREATE TABLE IF NOT EXISTS places_norm (
        id VARCHAR,
        name TEXT,
        normalized_name TEXT,
        lat3 DOUBLE,
        lon3 DOUBLE,
        fsq_category_ids TEXT
      );
    `);

  function getCount(query) {
    return new Promise((resolve, reject) => {
      con.all(query, (err, rows) => {
        if (err) return reject(err);
        // DuckDB returns rows as an array of objects
        resolve(rows[0].cnt || 0);
      });
    });
  }

    // Find how many rows are already inserted
    const alreadyInserted = await getCount(`SELECT COUNT(*) as cnt FROM places_norm`);


    console.log(`Already inserted rows: ${alreadyInserted}`);

    console.log("🚀 Starting batch insert into places_norm...");
    let offset = alreadyInserted;

    while (true) {

      const cnt = await getCount(`
        SELECT COUNT(*) as cnt
        FROM (
          SELECT * FROM places
          LIMIT ${BATCH_SIZE} OFFSET ${offset}
        )
      `);

      if (cnt === 0) break; // no more rows

      console.log(`Inserting batch starting at offset ${offset}...`);
      await runExec(`
        INSERT INTO places_norm
        SELECT
          COALESCE(fsq_place_id, CAST(ROW_NUMBER() OVER () AS VARCHAR)) AS id,
          name,
          lower(regexp_replace(name, '[^a-z0-9 ]', '', 'g')) AS normalized_name,
          CAST(ROUND(latitude, 3) AS DOUBLE) AS lat3,
          CAST(ROUND(longitude, 3) AS DOUBLE) AS lon3,
          fsq_category_ids
        FROM places
        LIMIT ${BATCH_SIZE} OFFSET ${offset};
      `);

      offset += BATCH_SIZE;
    }

    console.log("✅ Batch insert complete.");

    console.log("🏷 Creating index on normalized_name...");
    await runExec(`
      CREATE INDEX IF NOT EXISTS idx_places_norm_name
      ON places_norm(normalized_name);
    `);

    console.log("📊 Optional: creating sorted table for scan locality...");
    await runExec(`
      CREATE TABLE IF NOT EXISTS places_norm_sorted AS
      SELECT * FROM places_norm
      ORDER BY normalized_name, lat3, lon3;
    `);

    console.log("🎉 DB setup complete: places_lookup_sorted is ready for fast lookups.");
  } catch (err) {
    console.error("❌ Error during DB setup:", err);
  } finally {
    con.close();
  }
})();