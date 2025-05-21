#!/usr/bin/env python3

import os
import sys
import subprocess
import shutil

# Get the directory of this script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Files for architecture update
new_architecture = os.path.join(script_dir, "NEW_ARCHITECTURE.md")
current_architecture = os.path.join(script_dir, "ARCHITECTURE.md")

if os.path.exists(new_architecture) and os.path.exists(current_architecture):
    try:
        # Remove the current ARCHITECTURE.md file from git tracking
        subprocess.run(["git", "rm", current_architecture], 
                      cwd=script_dir, 
                      check=False)
        
        # Move NEW_ARCHITECTURE.md to ARCHITECTURE.md
        shutil.copy(new_architecture, current_architecture)
        print(f"Updated: ARCHITECTURE.md with content from NEW_ARCHITECTURE.md")
        
        # Remove the NEW_ARCHITECTURE.md file
        subprocess.run(["git", "rm", new_architecture], 
                      cwd=script_dir, 
                      check=False)
        
        # Add the updated ARCHITECTURE.md to git
        subprocess.run(["git", "add", current_architecture], 
                      cwd=script_dir, 
                      check=False)
        
        print("Architecture file update completed.")
    except Exception as e:
        print(f"Error updating architecture file: {e}")
else:
    if not os.path.exists(new_architecture):
        print(f"Error: NEW_ARCHITECTURE.md not found")
    if not os.path.exists(current_architecture):
        print(f"Error: ARCHITECTURE.md not found")