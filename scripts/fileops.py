#!/usr/bin/env python3
"""
File Operations Utility for Next.js Upgrade

This script provides a command-line interface for common file and git operations,
avoiding bash command execution issues that might occur in some environments.

Usage:
  python fileops.py [command] [options]

Commands:
  mkdir       Create directory
  cp          Copy file or directory
  mv          Move file or directory
  rm          Remove file or directory
  git-branch  Create a git branch
  git-add     Add files to git
  git-commit  Commit changes
  git-status  Show git status
  backup      Create a backup of a directory
  install     Run bun/npm install command
  exec        Execute a command and return output
  help        Show this help message

Examples:
  python fileops.py mkdir -p /path/to/new/directory
  python fileops.py rm -rf /path/to/remove
  python fileops.py git-branch feature/nextjs-upgrade
  python fileops.py git-commit -m "feat: upgrade to next.js 15"
  python fileops.py backup .next next-backup
  python fileops.py install next@latest react@latest react-dom@latest
"""

import argparse
import os
import sys
import shutil
import subprocess
import datetime
import tarfile
import pathlib


def ensure_directory_exists(path):
    """Ensure the directory exists, creating it if necessary."""
    os.makedirs(path, exist_ok=True)
    return path


def handle_mkdir(args):
    """Create a directory and its parents if they don't exist."""
    try:
        path = args.path
        if args.parents:
            os.makedirs(path, exist_ok=True)
            print(f"Created directory (with parents): {path}")
        else:
            os.mkdir(path)
            print(f"Created directory: {path}")
        return True
    except Exception as e:
        print(f"Error creating directory {path}: {e}")
        return False


def handle_cp(args):
    """Copy a file or directory."""
    try:
        if os.path.isdir(args.source) and not args.recursive:
            print(f"Error: {args.source} is a directory. Use -r for recursive copying.")
            return False

        # Handle recursive directory copying
        if os.path.isdir(args.source) and args.recursive:
            if os.path.exists(args.destination) and os.path.isdir(args.destination):
                # If destination exists and is a directory, copy source into it
                dest_path = os.path.join(args.destination, os.path.basename(args.source))
            else:
                # Otherwise use the provided destination name
                dest_path = args.destination
            
            shutil.copytree(args.source, dest_path)
            print(f"Copied directory: {args.source} -> {dest_path}")
        else:
            # Simple file copy
            if os.path.exists(args.destination) and os.path.isdir(args.destination):
                # If destination is a directory, copy the file into it
                dest_path = os.path.join(args.destination, os.path.basename(args.source))
            else:
                # Otherwise use the provided destination name
                dest_path = args.destination
            
            shutil.copy2(args.source, dest_path)
            print(f"Copied file: {args.source} -> {dest_path}")
        
        return True
    except Exception as e:
        print(f"Error copying {args.source} to {args.destination}: {e}")
        return False


def handle_mv(args):
    """Move a file or directory."""
    try:
        # Move the file or directory
        if os.path.exists(args.destination) and os.path.isdir(args.destination):
            # If destination is a directory, move the source into it
            dest_path = os.path.join(args.destination, os.path.basename(args.source))
        else:
            # Otherwise use the provided destination name
            dest_path = args.destination
        
        shutil.move(args.source, dest_path)
        print(f"Moved: {args.source} -> {dest_path}")
        
        return True
    except Exception as e:
        print(f"Error moving {args.source} to {args.destination}: {e}")
        return False


def handle_rm(args):
    """Remove a file or directory."""
    try:
        path = args.path
        
        # Check if path exists
        if not os.path.exists(path):
            if args.force:
                print(f"Warning: {path} does not exist, nothing to remove")
                return True
            else:
                print(f"Error: {path} does not exist")
                return False
        
        # Handle recursive directory removal
        if os.path.isdir(path):
            if args.recursive:
                shutil.rmtree(path)
                print(f"Removed directory recursively: {path}")
            else:
                print(f"Error: {path} is a directory. Use -rf to remove directories.")
                return False
        else:
            # Simple file removal
            os.remove(path)
            print(f"Removed file: {path}")
        
        return True
    except Exception as e:
        print(f"Error removing {path}: {e}")
        return False


def run_git_command(args, command_desc):
    """Run a git command and return the result."""
    try:
        result = subprocess.run(args, 
                                check=True, 
                                text=True, 
                                capture_output=True)
        print(f"{command_desc} output:")
        if result.stdout:
            print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error executing git command: {e}")
        if e.stderr:
            print(f"Error details: {e.stderr}")
        return False


def handle_git_branch(args):
    """Create a git branch."""
    git_args = ["git", "checkout", "-b", args.branch_name]
    return run_git_command(git_args, "Create branch")


def handle_git_add(args):
    """Add files to git staging area."""
    git_args = ["git", "add"]
    git_args.extend(args.files)
    return run_git_command(git_args, "Git add")


def handle_git_commit(args):
    """Commit changes to git."""
    git_args = ["git", "commit"]
    if args.message:
        git_args.extend(["-m", args.message])
    return run_git_command(git_args, "Git commit")


def handle_git_status(args):
    """Show git status."""
    git_args = ["git", "status"]
    return run_git_command(git_args, "Git status")


def handle_backup(args):
    """Create a backup of a directory."""
    try:
        source_dir = args.source_dir
        dest_name = args.dest_name
        
        if not os.path.exists(source_dir):
            print(f"Error: Source directory {source_dir} does not exist")
            return False
        
        # Generate timestamp if needed
        if args.timestamp:
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            dest_name = f"{dest_name}_{timestamp}"
        
        # Add .tar.gz extension if not present
        if not dest_name.endswith(".tar.gz"):
            dest_name = f"{dest_name}.tar.gz"
        
        # Create the tar.gz backup
        with tarfile.open(dest_name, "w:gz") as tar:
            tar.add(source_dir, arcname=os.path.basename(source_dir))
        
        print(f"Created backup: {dest_name}")
        return True
    except Exception as e:
        print(f"Error creating backup: {e}")
        return False


def handle_install(args):
    """Run bun/npm install command."""
    try:
        # Determine package manager to use
        package_manager = args.package_manager
        
        # Base command
        install_cmd = [package_manager, "add" if package_manager == "bun" else "install"]
        
        # Add packages to install
        install_cmd.extend(args.packages)
        
        # Add any options
        if args.dev:
            install_cmd.append("-D" if package_manager == "bun" else "--save-dev")
        
        if args.force:
            install_cmd.append("--force")
        
        if args.legacy_peer_deps:
            install_cmd.append("--legacy-peer-deps")
        
        # Execute the command
        result = subprocess.run(install_cmd, 
                                check=True, 
                                text=True, 
                                capture_output=True)
        
        print(f"Package installation output:")
        if result.stdout:
            print(result.stdout)
        
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error installing packages: {e}")
        if e.stderr:
            print(f"Error details: {e.stderr}")
        return False


def handle_exec(args):
    """Execute a command and return the output."""
    try:
        # Join the command args into a single string
        cmd = " ".join(args.command)
        
        # Execute the command
        result = subprocess.run(cmd, 
                                shell=True, 
                                check=True, 
                                text=True, 
                                capture_output=True)
        
        print(f"Command output:")
        if result.stdout:
            print(result.stdout)
        
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {e}")
        if e.stderr:
            print(f"Error details: {e.stderr}")
        return False


def main():
    # Create the main parser
    parser = argparse.ArgumentParser(
        description="File operations utility for Next.js upgrade",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    subparsers = parser.add_subparsers(dest="command", help="Command to run")
    
    # mkdir command
    mkdir_parser = subparsers.add_parser("mkdir", help="Create directory")
    mkdir_parser.add_argument("-p", "--parents", action="store_true", help="Create parent directories as needed")
    mkdir_parser.add_argument("path", help="Directory path to create")
    
    # cp command
    cp_parser = subparsers.add_parser("cp", help="Copy file or directory")
    cp_parser.add_argument("-r", "--recursive", action="store_true", help="Copy directories recursively")
    cp_parser.add_argument("source", help="Source file or directory")
    cp_parser.add_argument("destination", help="Destination file or directory")
    
    # mv command
    mv_parser = subparsers.add_parser("mv", help="Move file or directory")
    mv_parser.add_argument("source", help="Source file or directory")
    mv_parser.add_argument("destination", help="Destination file or directory")
    
    # rm command
    rm_parser = subparsers.add_parser("rm", help="Remove file or directory")
    rm_parser.add_argument("-r", "--recursive", action="store_true", help="Remove directories and their contents recursively")
    rm_parser.add_argument("-f", "--force", action="store_true", help="Ignore nonexistent files, never prompt")
    rm_parser.add_argument("path", help="Path to remove")
    
    # git branch command
    git_branch_parser = subparsers.add_parser("git-branch", help="Create a git branch")
    git_branch_parser.add_argument("branch_name", help="Name of the branch to create")
    
    # git add command
    git_add_parser = subparsers.add_parser("git-add", help="Add files to git")
    git_add_parser.add_argument("files", nargs="+", help="Files to add")
    
    # git commit command
    git_commit_parser = subparsers.add_parser("git-commit", help="Commit changes to git")
    git_commit_parser.add_argument("-m", "--message", help="Commit message")
    
    # git status command
    git_status_parser = subparsers.add_parser("git-status", help="Show git status")
    
    # backup command
    backup_parser = subparsers.add_parser("backup", help="Create a backup of a directory")
    backup_parser.add_argument("source_dir", help="Directory to backup")
    backup_parser.add_argument("dest_name", help="Destination name (without extension)")
    backup_parser.add_argument("-t", "--timestamp", action="store_true", help="Add timestamp to backup name")
    
    # install command
    install_parser = subparsers.add_parser("install", help="Run bun/npm install command")
    install_parser.add_argument("packages", nargs="+", help="Packages to install")
    install_parser.add_argument("--package-manager", default="bun", choices=["bun", "npm", "yarn", "pnpm"], 
                          help="Package manager to use (default: bun)")
    install_parser.add_argument("-D", "--dev", action="store_true", help="Install as dev dependency")
    install_parser.add_argument("--force", action="store_true", help="Force installation")
    install_parser.add_argument("--legacy-peer-deps", action="store_true", help="Use legacy peer deps")
    
    # exec command
    exec_parser = subparsers.add_parser("exec", help="Execute a command and return output")
    exec_parser.add_argument("command", nargs="+", help="Command to execute")
    
    # Parse arguments
    args = parser.parse_args()
    
    # Exit if no command is provided
    if not args.command:
        parser.print_help()
        return False
    
    # Execute the appropriate handler based on the command
    if args.command == "mkdir":
        return handle_mkdir(args)
    elif args.command == "cp":
        return handle_cp(args)
    elif args.command == "mv":
        return handle_mv(args)
    elif args.command == "rm":
        return handle_rm(args)
    elif args.command == "git-branch":
        return handle_git_branch(args)
    elif args.command == "git-add":
        return handle_git_add(args)
    elif args.command == "git-commit":
        return handle_git_commit(args)
    elif args.command == "git-status":
        return handle_git_status(args)
    elif args.command == "backup":
        return handle_backup(args)
    elif args.command == "install":
        return handle_install(args)
    elif args.command == "exec":
        return handle_exec(args)
    elif args.command == "help":
        parser.print_help()
        return True
    else:
        print(f"Error: Unknown command '{args.command}'")
        parser.print_help()
        return False


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)