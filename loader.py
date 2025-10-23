import duckdb
import os

# Set this to where your local Parquet files are stored after downloading from S3
PLACES_PARQUET_PATH = "E:/fsq_data/places/"
CATEGORIES_PARQUET_PATH = "E:/fsq_data/categories/"

# Only load the necessary columns
PLACES_COLUMNS = ["fsq_place_id", "name", "latitude", "longitude", "fsq_category_ids"]
CATEGORIES_COLUMNS = ["level1_category_id", "level2_category_id", "level3_category_id", "level4_category_id", 
"level5_category_id", "category_name", "category_name"]

os.makedirs("E:/EatThis_DataBase", exist_ok=True)

def load_data():
    # Create or connect to DuckDB
    con = duckdb.connect("E:/EatThis_DataBase/place_data.duckdb")

    # Create filtered `places` table from all matching parquet files in the directory
    con.execute(f"""
        CREATE OR REPLACE TABLE places AS
        SELECT {", ".join(PLACES_COLUMNS)}
        FROM read_parquet('{PLACES_PARQUET_PATH}*.parquet', union_by_name=True)
    """)

    # Create filtered `categories` table
    con.execute(f"""
        CREATE OR REPLACE TABLE categories AS
        SELECT {", ".join(CATEGORIES_COLUMNS)}
        FROM read_parquet('{CATEGORIES_PARQUET_PATH}*.parquet', union_by_name=True)
    """)

    con.close()
    print("DONEEEE!!!!")

if __name__ == "__main__":
    load_data()