#!/usr/bin/env python3
# This script removes Aider-related files from the project root

import os
import sys
import subprocess

# Get the directory of this script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Files to remove
files_to_remove = [
    os.path.join(script_dir, "aider.session"),
    os.path.join(script_dir, "bak.aider.model.settings.yml"),
    os.path.join(script_dir, "session.aider"),
    os.path.join(script_dir, "reasoning-effort")
]

# Remove files
for file_path in files_to_remove:
    if os.path.exists(file_path):
        try:
            os.remove(file_path)
            print(f"Deleted: {os.path.basename(file_path)}")
        except Exception as e:
            print(f"Error deleting {os.path.basename(file_path)}: {e}")
    else:
        print(f"File not found: {os.path.basename(file_path)}")

# Stage deleted files with git
try:
    for file_path in files_to_remove:
        subprocess.run(["git", "rm", "-f", "--cached", os.path.basename(file_path)], 
                      cwd=script_dir, 
                      check=False)
    print("Staged deleted files in git")
except Exception as e:
    print(f"Error staging files in git: {e}")

print("Cleanup completed.")