import sqlite3
import re
import os


def insert_names_from_sql():
    # Get the directory of the current script
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Paths to the database and SQL file
    db_path = os.path.join(script_dir, "names.db")
    sql_path = os.path.join(script_dir, "seed.sql")

    # Read the SQL file
    with open(sql_path, "r") as file:
        sql_content = file.read()

    # Extract names using regex
    # Looking for patterns like (id, 'Name')
    name_pattern = r"\(\d+,\s*'([^']+)'"
    names = re.findall(name_pattern, sql_content)

    if not names:
        print("No names found in the SQL file.")
        return

    # Connect to the database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Insert each name (without specifying id or created_at)
    for name in names:
        cursor.execute("INSERT INTO Name (name) VALUES (?)", (name,))
        print(f"Inserted: {name}")

    # Commit changes and close connection
    conn.commit()
    print(f"Successfully inserted {len(names)} names into the database.")
    conn.close()


if __name__ == "__main__":
    insert_names_from_sql()
