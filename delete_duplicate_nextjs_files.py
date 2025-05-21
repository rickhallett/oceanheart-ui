#!/usr/bin/env python3

import os
import sys
import subprocess

# Get the directory of this script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Files to remove - duplicate Next.js files
files_to_remove = [
    os.path.join(script_dir, "error.tsx"),
    os.path.join(script_dir, "not-found.tsx"),
    os.path.join(script_dir, "page.tsx"),
    os.path.join(script_dir, "globals.css"),
    os.path.join(script_dir, "opengraph-image.png"),
    os.path.join(script_dir, "twitter-image.png")
]

# Remove files
for file_path in files_to_remove:
    if os.path.exists(file_path):
        try:
            os.remove(file_path)
            print(f"Deleted: {os.path.basename(file_path)}")
            # Add to git
            subprocess.run(["git", "rm", "-f", os.path.basename(file_path)], 
                          cwd=script_dir, 
                          check=False)
        except Exception as e:
            print(f"Error deleting {os.path.basename(file_path)}: {e}")
    else:
        print(f"File not found: {os.path.basename(file_path)}")

print("Duplicate Next.js files cleanup completed.")