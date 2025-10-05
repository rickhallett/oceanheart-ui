import sqlite3
from datetime import datetime

# Connect to SQLite database (creates it if it doesn't exist)
conn = sqlite3.connect("names.db")
cursor = conn.cursor()

# Create the User table
cursor.execute(
    """
CREATE TABLE IF NOT EXISTS Name (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at DATE DEFAULT CURRENT_TIMESTAMP
)
"""
)

names = [
    "Human Digital Interface",
    "Higher Defiance Institute",
    "Hyperconsciousness Design Initiative",
    "Heart Data Integrated",
]

# Insert data into the table
for name in names:
    cursor.execute(
        """
    INSERT INTO Name (name, created_at)
    VALUES (?, ?)
    """,
        (name, datetime.now().isoformat()),
    )

# Commit the changes and close the connection
conn.commit()
conn.close()
