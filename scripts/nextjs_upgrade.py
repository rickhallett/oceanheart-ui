#!/usr/bin/env python3
"""
Next.js Upgrade Helper Script

This script provides utilities specifically for upgrading Next.js to the latest version.
It handles common tasks required during the upgrade process.

Usage:
  python nextjs_upgrade.py [command] [options]

Commands:
  prepare            Create upgrade branch and backup current build
  update-deps        Update Next.js, React, and related dependencies
  run-codemod        Run the Next.js codemod to automate compatibility changes
  update-async-apis  Update async APIs in the codebase
  fix-ip-properties  Fix IP properties in API routes
  check-cache        Check and fix caching patterns
  verify-build       Verify the build process succeeds
  help               Show this help message

Examples:
  python nextjs_upgrade.py prepare
  python nextjs_upgrade.py update-deps --force
  python nextjs_upgrade.py run-codemod
  python nextjs_upgrade.py update-async-apis
"""

import argparse
import os
import sys
import subprocess
import datetime
import re
import json
from pathlib import Path


def run_command(cmd, shell=False, check=True):
    """Run a command and return the result."""
    if isinstance(cmd, str) and not shell:
        cmd = cmd.split()
    
    try:
        result = subprocess.run(cmd, 
                                check=check, 
                                text=True, 
                                capture_output=True,
                                shell=shell)
        return result
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {cmd}")
        print(f"Error details: {e.stderr}")
        raise


def handle_prepare(args):
    """Create upgrade branch and backup current build."""
    try:
        # Create the branch
        print(f"Creating a new branch for the Next.js upgrade: {args.branch_name}")
        run_command(f"git checkout -b {args.branch_name}")
        
        if args.skip_backup:
            print("Skipping build backup as requested")
            return True
        
        # Generate a production build for backup
        print("Generating a production build for backup...")
        run_command("bun run build")
        
        # Create a backup of the .next directory
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_filename = f"next-backup-{timestamp}.tar.gz"
        print(f"Creating backup of the .next directory: {backup_filename}")
        
        import tarfile
        with tarfile.open(backup_filename, "w:gz") as tar:
            tar.add(".next", arcname=".next")
        
        print(f"Backup created: {backup_filename}")
        
        # Document current dependencies
        print("Documenting current dependencies...")
        deps_filename = f"pre-upgrade-dependencies-{timestamp}.txt"
        with open(deps_filename, "w") as f:
            result = run_command("bun list")
            f.write(result.stdout)
        
        print(f"Dependencies documented in: {deps_filename}")
        return True
    
    except Exception as e:
        print(f"Error preparing for upgrade: {e}")
        return False


def handle_update_deps(args):
    """Update Next.js, React, and related dependencies."""
    try:
        # Update core packages
        print("Updating Next.js, React, and React DOM...")
        cmd = "bun add next@latest react@latest react-dom@latest"
        
        if args.force:
            cmd += " --force"
        
        if args.legacy_peer_deps:
            cmd += " --legacy-peer-deps"
        
        run_command(cmd, shell=True)
        
        # Update TypeScript types
        print("Updating TypeScript types...")
        cmd = "bun add -D @types/react@latest @types/react-dom@latest"
        
        if args.force:
            cmd += " --force"
        
        run_command(cmd, shell=True)
        
        # Update ESLint config
        print("Updating ESLint configuration...")
        cmd = "bun add -D eslint-config-next@latest"
        
        if args.force:
            cmd += " --force"
        
        run_command(cmd, shell=True)
        
        print("Dependencies updated successfully!")
        return True
    
    except Exception as e:
        print(f"Error updating dependencies: {e}")
        return False


def handle_run_codemod(args):
    """Run the Next.js codemod to automate compatibility changes."""
    try:
        print("Running Next.js codemod to apply automated upgrades...")
        codemod_cmd = f"npx @next/codemod@latest upgrade{' --force' if args.force else ''}"
        run_command(codemod_cmd, shell=True)
        
        print("Next.js codemod completed!")
        return True
    
    except Exception as e:
        print(f"Error running codemod: {e}")
        return False


def update_async_api_in_file(file_path):
    """Update async APIs in a specific file."""
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Define patterns to search for
    patterns = [
        (r'(const\s+\w+\s*=\s*)cookies\(\)', r'\1await cookies()'),
        (r'(const\s+\w+\s*=\s*)headers\(\)', r'\1await headers()'),
        (r'(const\s+\w+\s*=\s*)searchParams\(\)', r'\1await searchParams()')
    ]
    
    # Apply replacements
    modified = False
    for pattern, replacement in patterns:
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            modified = True
    
    # Write back if modified
    if modified:
        with open(file_path, 'w') as f:
            f.write(content)
        print(f"Updated async APIs in: {file_path}")
    
    return modified


def handle_update_async_apis(args):
    """Update async APIs in the codebase."""
    try:
        print("Updating async APIs in the codebase...")
        
        # Define directories to scan
        dirs_to_scan = ['app', 'components', 'lib', 'libs', 'hooks']
        
        # Track modified files
        modified_files = []
        
        # Recursively find TypeScript/JavaScript files
        for dir_name in dirs_to_scan:
            if not os.path.exists(dir_name):
                continue
                
            for root, _, files in os.walk(dir_name):
                for file in files:
                    if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
                        file_path = os.path.join(root, file)
                        if update_async_api_in_file(file_path):
                            modified_files.append(file_path)
        
        if modified_files:
            print(f"Updated async APIs in {len(modified_files)} files:")
            for file in modified_files[:10]:  # Show first 10 files
                print(f"  - {file}")
            
            if len(modified_files) > 10:
                print(f"  ... and {len(modified_files) - 10} more files")
        else:
            print("No files needed async API updates")
        
        return True
    
    except Exception as e:
        print(f"Error updating async APIs: {e}")
        return False


def update_ip_property_in_file(file_path):
    """Update IP properties in a specific file."""
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Check if file uses request.ip
    if not re.search(r'request\.ip', content):
        return False
    
    # Add Vercel functions import if using Vercel
    modified_content = content
    
    # Check if we already have the import
    if not re.search(r'from\s+[\'"]@vercel/functions[\'"]', content):
        # Add import at the top, after other imports
        modified_content = re.sub(
            r'(import.*?\n\n|import.*?\n(?=\S))',
            r'\1import { ipAddress } from \'@vercel/functions\';\n\n',
            content,
            count=1
        )
    
    # Replace request.ip with ipAddress(request)
    modified_content = re.sub(
        r'request\.ip',
        r'ipAddress(request)',
        modified_content
    )
    
    # Write back if modified
    if modified_content != content:
        with open(file_path, 'w') as f:
            f.write(modified_content)
        print(f"Updated IP properties in: {file_path}")
        return True
    
    return False


def handle_fix_ip_properties(args):
    """Fix IP properties in API routes."""
    try:
        print("Checking if @vercel/functions is installed...")
        try:
            # Check if @vercel/functions is installed
            run_command("bun list | grep '@vercel/functions'", shell=True, check=False)
        except:
            # Install @vercel/functions if not found
            print("Installing @vercel/functions...")
            run_command("bun add @vercel/functions", shell=True)
        
        print("Fixing IP properties in API routes...")
        
        # Define directory to scan
        api_dir = 'app/api'
        
        if not os.path.exists(api_dir):
            print(f"API directory {api_dir} not found")
            return False
        
        # Track modified files
        modified_files = []
        
        # Recursively find TypeScript/JavaScript files in API routes
        for root, _, files in os.walk(api_dir):
            for file in files:
                if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
                    file_path = os.path.join(root, file)
                    if update_ip_property_in_file(file_path):
                        modified_files.append(file_path)
        
        if modified_files:
            print(f"Updated IP properties in {len(modified_files)} files:")
            for file in modified_files:
                print(f"  - {file}")
        else:
            print("No files needed IP property updates")
        
        return True
    
    except Exception as e:
        print(f"Error fixing IP properties: {e}")
        return False


def update_cache_in_file(file_path):
    """Update caching patterns in a specific file."""
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Check if file contains fetch calls without cache options
    fetch_pattern = r'fetch\s*\(\s*[\'"][^\'"]+[\'"]\s*\)'
    if not re.search(fetch_pattern, content):
        return False
    
    # Replace fetch calls with ones that include cache option
    modified_content = re.sub(
        fetch_pattern,
        r'\g<0>, { cache: \'force-cache\' }',
        content
    )
    
    # Write back if modified
    if modified_content != content:
        with open(file_path, 'w') as f:
            f.write(modified_content)
        print(f"Updated caching in: {file_path}")
        return True
    
    return False


def handle_check_cache(args):
    """Check and fix caching patterns."""
    try:
        print("Checking caching patterns in the codebase...")
        
        # Define directories to scan
        dirs_to_scan = ['app', 'components', 'lib', 'libs', 'hooks']
        
        # Track modified files
        modified_files = []
        
        # Recursively find TypeScript/JavaScript files
        for dir_name in dirs_to_scan:
            if not os.path.exists(dir_name):
                continue
                
            for root, _, files in os.walk(dir_name):
                for file in files:
                    if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
                        file_path = os.path.join(root, file)
                        if update_cache_in_file(file_path):
                            modified_files.append(file_path)
        
        if modified_files:
            print(f"Updated caching in {len(modified_files)} files:")
            for file in modified_files[:10]:  # Show first 10 files
                print(f"  - {file}")
            
            if len(modified_files) > 10:
                print(f"  ... and {len(modified_files) - 10} more files")
        else:
            print("No files needed caching updates")
        
        return True
    
    except Exception as e:
        print(f"Error checking caching patterns: {e}")
        return False


def handle_verify_build(args):
    """Verify the build process succeeds."""
    try:
        print("Running lint check...")
        try:
            run_command("bun lint")
            print("Lint check passed!")
        except subprocess.CalledProcessError:
            print("Lint check found issues. Please fix them before continuing.")
            if not args.ignore_errors:
                return False
        
        print("Building the application...")
        try:
            run_command("bun run build")
            print("Build completed successfully!")
        except subprocess.CalledProcessError:
            print("Build failed. Please check the error messages.")
            return False
        
        return True
    
    except Exception as e:
        print(f"Error verifying build: {e}")
        return False


def main():
    # Create the main parser
    parser = argparse.ArgumentParser(
        description="Next.js upgrade helper script",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    subparsers = parser.add_subparsers(dest="command", help="Command to run")
    
    # prepare command
    prepare_parser = subparsers.add_parser("prepare", help="Create upgrade branch and backup current build")
    prepare_parser.add_argument("--branch-name", default="feature/nextjs-upgrade", 
                             help="Name of the branch to create (default: feature/nextjs-upgrade)")
    prepare_parser.add_argument("--skip-backup", action="store_true", 
                              help="Skip building and backing up the .next directory")
    
    # update-deps command
    update_deps_parser = subparsers.add_parser("update-deps", help="Update Next.js, React, and related dependencies")
    update_deps_parser.add_argument("--force", action="store_true", 
                                 help="Force installation (ignore peer dependency conflicts)")
    update_deps_parser.add_argument("--legacy-peer-deps", action="store_true", 
                                  help="Use legacy peer dependencies resolution")
    
    # run-codemod command
    run_codemod_parser = subparsers.add_parser("run-codemod", help="Run the Next.js codemod to automate compatibility changes")
    run_codemod_parser.add_argument("--force", action="store_true", 
                                 help="Force codemod execution")
    
    # update-async-apis command
    update_async_apis_parser = subparsers.add_parser("update-async-apis", help="Update async APIs in the codebase")
    
    # fix-ip-properties command
    fix_ip_properties_parser = subparsers.add_parser("fix-ip-properties", help="Fix IP properties in API routes")
    
    # check-cache command
    check_cache_parser = subparsers.add_parser("check-cache", help="Check and fix caching patterns")
    
    # verify-build command
    verify_build_parser = subparsers.add_parser("verify-build", help="Verify the build process succeeds")
    verify_build_parser.add_argument("--ignore-errors", action="store_true", 
                                   help="Continue even if lint checks fail")
    
    # Parse arguments
    args = parser.parse_args()
    
    # Exit if no command is provided
    if not args.command:
        parser.print_help()
        return False
    
    # Execute the appropriate handler based on the command
    if args.command == "prepare":
        return handle_prepare(args)
    elif args.command == "update-deps":
        return handle_update_deps(args)
    elif args.command == "run-codemod":
        return handle_run_codemod(args)
    elif args.command == "update-async-apis":
        return handle_update_async_apis(args)
    elif args.command == "fix-ip-properties":
        return handle_fix_ip_properties(args)
    elif args.command == "check-cache":
        return handle_check_cache(args)
    elif args.command == "verify-build":
        return handle_verify_build(args)
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