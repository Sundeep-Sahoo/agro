import pandas as pd
from sqlalchemy import create_engine

# PostgreSQL Database Configuration
DB_URI = 'postgresql://postgres:Deba%401234@localhost/agriprophets'

# Create a database connection
engine = create_engine(DB_URI)

def update_database_from_csv(csv_file):
    try:
        # Load CSV into Pandas DataFrame
        df = pd.read_csv(csv_file)

        # Rename columns to match PostgreSQL table
        df.columns = ["date", "district", "fertilizer", "petrol_price", "current_price", "rainfall"]

        # Convert 'date' column to datetime format
        df['date'] = pd.to_datetime(df['date']).dt.date

        # Insert or update records in PostgreSQL
        with engine.connect() as conn:
            for _, row in df.iterrows():
                conn.execute(f"""
                    INSERT INTO potato_data (date, district, fertilizer, petrol_price, current_price, rainfall)
                    VALUES ('{row['date']}', '{row['district']}', {row['fertilizer']}, {row['petrol_price']}, {row['current_price']}, {row['rainfall']})
                    ON CONFLICT (date, district) 
                    DO UPDATE SET 
                        fertilizer = EXCLUDED.fertilizer,
                        petrol_price = EXCLUDED.petrol_price,
                        current_price = EXCLUDED.current_price,
                        rainfall = EXCLUDED.rainfall;
                """)

        print("✅ Database updated successfully!")

    except Exception as e:
        print(f"❌ Error updating database: {e}")

# Example Usage
csv_file_path = "data.csv"  # Replace with your CSV file path
update_database_from_csv(csv_file_path)
