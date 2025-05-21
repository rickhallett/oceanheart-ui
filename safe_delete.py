import os
import argparse
import shutil  # For deleting directories if needed in the future


def delete_item(item_path, is_directory=False, force=False):
    """
    Deletes a file or directory.

    Args:
        item_path (str): The path to the file or directory to delete.
        is_directory (bool): Set to True if item_path is a directory.
        force (bool): If True, suppresses errors if the item doesn't exist (like rm -f).
    """
    try:
        if not os.path.exists(item_path):
            if not force:
                print(
                    f"Warning: Item not found (already deleted or wrong path?): {item_path}"
                )
            else:
                print(
                    f"Info: Item not found (force=True, presumed deleted): {item_path}"
                )
            return True  # Consider it a success if it's already gone and force is true

        if is_directory:
            if os.path.isdir(item_path):
                shutil.rmtree(item_path)
                print(f"Successfully deleted directory: {item_path}")
            elif (
                force
            ):  # If force is true and it's not a dir but exists, try deleting as file
                if os.path.isfile(item_path) or os.path.islink(item_path):
                    os.remove(item_path)
                    print(
                        f"Successfully deleted item (was not a dir but force=True): {item_path}"
                    )
                else:
                    print(
                        f"Warning: Item exists but is not a directory or file (force=True): {item_path}"
                    )
            else:
                print(f"Error: '{item_path}' is not a directory.")
                return False
        else:  # It's a file or symlink
            if os.path.isfile(item_path) or os.path.islink(item_path):
                os.remove(item_path)
                print(f"Successfully deleted file/symlink: {item_path}")
            elif (
                force
            ):  # If force is true and it's not a file/link but exists, and not a dir
                if os.path.isdir(item_path):
                    print(
                        f"Warning: Item is a directory, not a file. Use --dirs if you intend to delete directories. Skipped: {item_path}"
                    )
                    return (
                        False  # Explicitly do not delete directories unless specified
                    )
                else:
                    print(
                        f"Warning: Item exists but is not a file or symlink (force=True): {item_path}"
                    )
            else:
                print(f"Error: '{item_path}' is not a file or symlink.")
                return False
        return True
    except Exception as e:
        print(f"Error deleting '{item_path}': {e}")
        return False


def main():
    parser = argparse.ArgumentParser(
        description="Deletes specified files and/or directories. Bypasses shell evaluation issues."
    )
    parser.add_argument(
        "paths",
        nargs="+",  # Accepts one or more paths
        help="List of file or directory paths to delete.",
    )
    parser.add_argument(
        "--dirs",
        action="store_true",
        help="Treat paths as directories and delete them recursively. Use with caution.",
    )
    parser.add_argument(
        "-f",
        "--force",
        action="store_true",
        help="Force deletion: ignore nonexistent files and never prompt for confirmation (similar to rm -f). For directories with --dirs, this means deleting non-empty directories without error if they exist.",
    )

    args = parser.parse_args()

    if not args.paths:
        print("No paths provided. Use -h for help.")
        return

    print(
        f"\nAttempting to delete the following items (is_directory mode: {args.dirs}, force mode: {args.force}):"
    )
    for item_path in args.paths:
        print(f" - {item_path}")

    confirm = "y"  # Default to yes if force is enabled
    if not args.force:
        confirm = input("Are you sure you want to proceed? (y/N): ").lower()

    if confirm == "y":
        print("\nDeletion process starting...")
        success_count = 0
        fail_count = 0
        for item_path_raw in args.paths:
            # Expand user tilde (~) and environment variables
            item_path = os.path.expanduser(os.path.expandvars(item_path_raw))
            if delete_item(item_path, args.dirs, args.force):
                success_count += 1
            else:
                fail_count += 1

        print(f"\nDeletion process finished.")
        print(f"Successfully processed/deleted: {success_count}")
        print(f"Failed to delete: {fail_count}")
    else:
        print("Deletion aborted by user.")


if __name__ == "__main__":
    main()
