#!/usr/bin/env python3
"""
Make Scripts Executable

This script is used to make other Python scripts in the directory executable.
"""

import os
import stat
import sys

def make_executable(file_path):
    """Make a file executable for the owner."""
    # Get current permissions
    current_permissions = os.stat(file_path).st_mode
    
    # Add executable permission for owner, group, and others
    new_permissions = current_permissions | stat.S_IXUSR | stat.S_IXGRP | stat.S_IXOTH
    
    # Set the new permissions
    os.chmod(file_path, new_permissions)
    
    print(f"Made {file_path} executable")
    return True

def main():
    # Get directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Scripts to make executable
    scripts = ['fileops.py', 'nextjs_upgrade.py']
    
    for script in scripts:
        script_path = os.path.join(script_dir, script)
        
        if os.path.exists(script_path):
            make_executable(script_path)
        else:
            print(f"Warning: {script} not found at {script_path}")
    
    print("\nAll scripts have been made executable.")
    print("You can now run them directly using:")
    print("./scripts/fileops.py [command] [options]")
    print("./scripts/nextjs_upgrade.py [command] [options]")

if __name__ == "__main__":
    main()