#!/usr/bin/env python3

import os
import sys
import subprocess
import shutil

# Get the directory of this script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Create destination directories if they don't exist
directories_to_create = [
    os.path.join(script_dir, "docs"),
    os.path.join(script_dir, "docs/refactor"),
    os.path.join(script_dir, "docs/development"),
    os.path.join(script_dir, "docs/database")
]

for directory in directories_to_create:
    if not os.path.exists(directory):
        try:
            os.makedirs(directory)
            print(f"Created directory: {directory}")
        except Exception as e:
            print(f"Error creating directory {directory}: {e}")

# Files to move - documentation files
files_to_move = [
    (os.path.join(script_dir, "CODE_REVIEW.md"), os.path.join(script_dir, "docs/CODE_REVIEW.md")),
    (os.path.join(script_dir, "DEAD_CODE_TARGETS.md"), os.path.join(script_dir, "docs/refactor/DEAD_CODE_TARGETS.md")),
    (os.path.join(script_dir, "gitflow.mdc"), os.path.join(script_dir, "docs/development/gitflow.mdc")),
    (os.path.join(script_dir, "erd.md"), os.path.join(script_dir, "docs/database/ERD.md")),
    (os.path.join(script_dir, "spec.md"), os.path.join(script_dir, "docs/spec.md"))
]

# Move files
for src, dest in files_to_move:
    if os.path.exists(src):
        try:
            # Try to use git mv
            subprocess.run(["git", "mv", src, dest], 
                          cwd=script_dir, 
                          check=False)
            print(f"Moved: {os.path.basename(src)} to {dest}")
        except Exception as e:
            # Fall back to regular move if git mv fails
            try:
                shutil.move(src, dest)
                print(f"Moved (fallback): {os.path.basename(src)} to {dest}")
            except Exception as e2:
                print(f"Error moving {os.path.basename(src)}: {e2}")
    else:
        print(f"File not found: {os.path.basename(src)}")

print("Documentation files move completed.")