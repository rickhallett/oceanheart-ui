#!/usr/bin/env python3
# This script performs the cleanup tasks for the Oceanheart UI project

import os
import subprocess
import sys
import shutil
from pathlib import Path

def run_command(command, cwd=None):
    """Run a shell command and return the output"""
    try:
        result = subprocess.run(
            command, 
            shell=True, 
            check=True, 
            text=True, 
            capture_output=True,
            cwd=cwd
        )
        print(f"SUCCESS: {command}")
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"ERROR: {command}")
        print(f"STDERR: {e.stderr}")
        return None

def git_rm(file_path, force=True):
    """Remove a file using git rm"""
    force_flag = "-f" if force else ""
    if os.path.exists(file_path):
        result = run_command(f"git rm {force_flag} {os.path.basename(file_path)}", os.path.dirname(file_path))
        return result is not None
    else:
        print(f"File not found, skipping: {file_path}")
        return True

def remove_file(file_path):
    """Remove a file using os.remove"""
    if os.path.exists(file_path):
        try:
            os.remove(file_path)
            print(f"Removed file: {file_path}")
            return True
        except Exception as e:
            print(f"Error removing file {file_path}: {e}")
            return False
    else:
        print(f"File not found, skipping: {file_path}")
        return True

def remove_dir(dir_path):
    """Remove a directory recursively"""
    if os.path.exists(dir_path) and os.path.isdir(dir_path):
        try:
            shutil.rmtree(dir_path)
            print(f"Removed directory: {dir_path}")
            return True
        except Exception as e:
            print(f"Error removing directory {dir_path}: {e}")
            return False
    else:
        print(f"Directory not found, skipping: {dir_path}")
        return True

def git_commit(message):
    """Create a git commit with the specified message"""
    return run_command(f'git commit -m "{message}"')

def create_dir(dir_path):
    """Create a directory if it doesn't exist"""
    if not os.path.exists(dir_path):
        try:
            os.makedirs(dir_path)
            print(f"Created directory: {dir_path}")
            return True
        except Exception as e:
            print(f"Error creating directory {dir_path}: {e}")
            return False
    else:
        print(f"Directory already exists: {dir_path}")
        return True

def git_mv(src, dest):
    """Move a file using git mv"""
    if os.path.exists(src):
        # Create destination directory if it doesn't exist
        dest_dir = os.path.dirname(dest)
        if dest_dir and not os.path.exists(dest_dir):
            create_dir(dest_dir)
        
        result = run_command(f"git mv {src} {dest}")
        return result is not None
    else:
        print(f"Source file not found, skipping: {src}")
        return False

def main():
    # Get the project root directory (where this script is located)
    project_root = os.path.dirname(os.path.abspath(__file__))
    os.chdir(project_root)
    
    print(f"Starting cleanup of project at: {project_root}")
    
    # Step 1: Remove Aider-related files
    print("\n1. Removing Aider-related files...")
    aider_files = [
        "aider.session",
        "bak.aider.model.settings.yml",
        "session.aider",
        "reasoning-effort"
    ]
    for file in aider_files:
        git_rm(os.path.join(project_root, file))
        
    git_commit("chore: remove aider-related files")
    
    # Step 2: Remove duplicate Next.js files from root
    print("\n2. Removing duplicate Next.js files...")
    nextjs_files = [
        "error.tsx",
        "not-found.tsx",
        "page.tsx",
        "globals.css",
        "opengraph-image.png",
        "twitter-image.png"
    ]
    for file in nextjs_files:
        git_rm(os.path.join(project_root, file))
        
    git_commit("chore: remove duplicate Next.js files from root")
    
    # Step 3: Remove temporary and test files
    print("\n3. Removing temporary and test files...")
    temp_files = [
        "names.db",
        "blog.prompt.xml",
        "cxo.html"
    ]
    for file in temp_files:
        git_rm(os.path.join(project_root, file))
        
    git_commit("chore: remove temporary and test files")
    
    # Step 4: Remove orphaned directories
    print("\n4. Removing orphaned directories...")
    orphaned_dirs = [
        "signin",
        "privacy-policy",
        "tos"
    ]
    
    # Check if src/ is empty and remove if it is
    src_dir = os.path.join(project_root, "src")
    if os.path.exists(src_dir) and os.path.isdir(src_dir) and not os.listdir(src_dir):
        orphaned_dirs.append("src")
    
    for directory in orphaned_dirs:
        dir_path = os.path.join(project_root, directory)
        if os.path.exists(dir_path):
            # Add files to git rm before removing the directory
            run_command(f"git rm -rf {directory}")
            # Then remove the directory if it still exists
            remove_dir(dir_path)
    
    git_commit("chore: remove orphaned directories")
    
    # Step 5: Consolidate tasks/ and tasks-refactor/ directories
    print("\n5. Checking tasks/ and tasks-refactor/ directories...")
    tasks_dir = os.path.join(project_root, "tasks")
    tasks_refactor_dir = os.path.join(project_root, "tasks-refactor")
    
    if os.path.exists(tasks_dir) and os.path.exists(tasks_refactor_dir):
        # Check if they are identical
        are_identical = run_command(f"diff -r {tasks_dir} {tasks_refactor_dir} > /dev/null && echo 'identical' || echo 'different'").strip() == "identical"
        
        if are_identical:
            print("tasks/ and tasks-refactor/ are identical. Removing tasks-refactor/...")
            run_command(f"git rm -rf tasks-refactor")
            git_commit("chore: remove duplicate tasks-refactor directory")
        else:
            print("tasks/ and tasks-refactor/ are different. Please review them manually.")
    
    # Step 6: Move documentation files to appropriate directories
    print("\n6. Moving documentation files...")
    
    # Create necessary directories
    docs_dirs = [
        "docs/refactor",
        "docs/development",
        "docs/database"
    ]
    for dir_path in docs_dirs:
        create_dir(os.path.join(project_root, dir_path))
    
    # Move files
    doc_moves = [
        ("CODE_REVIEW.md", "docs/CODE_REVIEW.md"),
        ("DEAD_CODE_TARGETS.md", "docs/refactor/DEAD_CODE_TARGETS.md"),
        ("gitflow.mdc", "docs/development/gitflow.mdc"),
        ("erd.md", "docs/database/ERD.md"),
        ("spec.md", "docs/spec.md")
    ]
    
    for src, dest in doc_moves:
        git_mv(os.path.join(project_root, src), os.path.join(project_root, dest))
    
    git_commit("docs: reorganize documentation files")
    
    # Step 7: Replace ARCHITECTURE.md with NEW_ARCHITECTURE.md if it exists
    new_arch = os.path.join(project_root, "NEW_ARCHITECTURE.md")
    arch = os.path.join(project_root, "ARCHITECTURE.md")
    
    if os.path.exists(new_arch):
        print("\n7. Updating ARCHITECTURE.md...")
        if os.path.exists(arch):
            git_rm(arch)
        git_mv(new_arch, arch)
        git_commit("docs: update ARCHITECTURE.md")
    
    print("\nCleanup process completed successfully!")
    print("\nNext steps:")
    print("1. Run 'bun install' to ensure dependencies are up to date")
    print("2. Run 'bun run build' to verify the build still works")
    print("3. Create a pull request to merge these changes into the main branch")

if __name__ == "__main__":
    main()