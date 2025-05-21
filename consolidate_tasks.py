#!/usr/bin/env python3

import os
import sys
import subprocess
import filecmp
import shutil

# Get the directory of this script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Define the tasks directories
tasks_dir = os.path.join(script_dir, "tasks")
tasks_refactor_dir = os.path.join(script_dir, "tasks-refactor")

def compare_directories(dir1, dir2):
    """
    Compare two directories to check if they are similar in structure and content.
    Returns a tuple (is_similar, differences)
    """
    # Get the list of files in each directory
    dir1_files = set(os.listdir(dir1))
    dir2_files = set(os.listdir(dir2))
    
    # Check if the directories have the same files
    common_files = dir1_files.intersection(dir2_files)
    only_in_dir1 = dir1_files - dir2_files
    only_in_dir2 = dir2_files - dir1_files
    
    # If there are significant differences in file structure, they're not similar
    if len(only_in_dir1) > 5 or len(only_in_dir2) > 5:
        return False, {
            "only_in_dir1": only_in_dir1,
            "only_in_dir2": only_in_dir2
        }
    
    # Compare the content of common files
    match, mismatch, errors = filecmp.cmpfiles(dir1, dir2, common_files, shallow=False)
    
    # Calculate the similarity percentage
    similarity = len(match) / len(common_files) if common_files else 0
    
    # If more than 80% of common files match, consider the directories similar
    is_similar = similarity >= 0.8
    
    return is_similar, {
        "only_in_dir1": only_in_dir1,
        "only_in_dir2": only_in_dir2,
        "matching_files": match,
        "mismatching_files": mismatch,
        "error_files": errors,
        "similarity": similarity
    }

# Check if both directories exist
if os.path.exists(tasks_dir) and os.path.exists(tasks_refactor_dir):
    # Compare the directories
    is_similar, differences = compare_directories(tasks_dir, tasks_refactor_dir)
    
    if is_similar:
        print(f"The directories tasks/ and tasks-refactor/ are similar in content (similarity: {differences['similarity']:.2f}).")
        print("Removing tasks-refactor/ directory...")
        
        try:
            # Remove the directory using git rm
            subprocess.run(["git", "rm", "-rf", tasks_refactor_dir], 
                          cwd=script_dir, 
                          check=False)
            
            # If the directory still exists, remove it manually
            if os.path.exists(tasks_refactor_dir):
                shutil.rmtree(tasks_refactor_dir)
            
            print("tasks-refactor/ directory successfully removed.")
        except Exception as e:
            print(f"Error removing tasks-refactor/ directory: {e}")
    else:
        print("The directories tasks/ and tasks-refactor/ have significant differences:")
        print(f"Files only in tasks/: {', '.join(differences['only_in_dir1']) if len(differences['only_in_dir1']) <= 5 else f'{len(differences['only_in_dir1'])} files'}")
        print(f"Files only in tasks-refactor/: {', '.join(differences['only_in_dir2']) if len(differences['only_in_dir2']) <= 5 else f'{len(differences['only_in_dir2'])} files'}")
        print("Please review the directories manually and decide which one to keep.")
else:
    if not os.path.exists(tasks_dir):
        print("Error: tasks/ directory not found")
    if not os.path.exists(tasks_refactor_dir):
        print("Error: tasks-refactor/ directory not found")