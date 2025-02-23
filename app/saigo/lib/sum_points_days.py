import csv
import sys
from datetime import datetime, timedelta


def main():
    if len(sys.argv) < 2:
        print("Usage: python script.py <csv_file>")
        sys.exit(1)

    csv_file = sys.argv[1]
    today = datetime.utcnow().date()  # CSV timestamps are in UTC
    start_date = today - timedelta(days=6)  # Last 7 days including today

    total_points = {start_date + timedelta(days=i): 0 for i in range(7)}

    with open(csv_file, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            iso_str = row["created_at"].replace(" ", "T")
            try:
                dt = datetime.fromisoformat(iso_str)
            except Exception as e:
                print(f"Error parsing date '{row['created_at']}': {e}")
                continue

            row_date = dt.date()
            if start_date <= row_date <= today:
                try:
                    points = float(row["points"])
                except ValueError:
                    points = 0
                total_points[row_date] += points

    for date in sorted(total_points):
        print(f"{date}: {total_points[date]}")


if __name__ == "__main__":
    main()
