#!/bin/bash
# Master script to execute all cleanup steps and create commits

# Display a nicely formatted header
echo "======================================================"
echo "🧹 Oceanheart UI Codebase Cleanup Script 🧹"
echo "======================================================"
echo ""

# Check if we're on the cleanup-code branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "cleanup-code" ]; then
    echo "⚠️  WARNING: You're not on the cleanup-code branch."
    read -p "Would you like to switch to the cleanup-code branch? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Creating and switching to cleanup-code branch..."
        git checkout -b cleanup-code
    else
        echo "⚠️  Continuing on current branch: $CURRENT_BRANCH"
    fi
else
    echo "✅ Already on cleanup-code branch"
fi

echo ""
echo "======================================================"
echo "Step 1: Remove Aider-related files"
echo "======================================================"
python3 delete_aider_files.py
echo "Committing changes..."
git commit -m "chore: remove Aider-related files and tooling"

echo ""
echo "======================================================"
echo "Step 2: Remove duplicate Next.js files from root"
echo "======================================================"
python3 delete_duplicate_nextjs_files.py
echo "Committing changes..."
git commit -m "chore: remove duplicate Next.js files from root directory"

echo ""
echo "======================================================"
echo "Step 3: Remove temporary and test files"
echo "======================================================"
python3 delete_temp_files.py
echo "Committing changes..."
git commit -m "chore: remove temporary and test files"

echo ""
echo "======================================================"
echo "Step 4: Move documentation files to appropriate directories"
echo "======================================================"
python3 move_docs_files.py
echo "Committing changes..."
git commit -m "docs: reorganize documentation files into appropriate directories"

echo ""
echo "======================================================"
echo "Step 5: Update ARCHITECTURE.md with new content"
echo "======================================================"
python3 update_architecture.py
echo "Committing changes..."
git commit -m "docs: update architecture documentation with comprehensive overview"

echo ""
echo "======================================================"
echo "Step 6: Consolidate tasks directories"
echo "======================================================"
python3 consolidate_tasks.py
echo "Committing changes..."
git commit -m "chore: consolidate task directories and remove duplicates"

echo ""
echo "======================================================"
echo "Step 7: Remove cleanup scripts"
echo "======================================================"
# Clean up the cleanup scripts themselves
git rm -f delete_aider_files.py delete_duplicate_nextjs_files.py delete_temp_files.py move_docs_files.py update_architecture.py consolidate_tasks.py cleanup_all.sh cleanup_commands.txt
echo "Committing changes..."
git commit -m "chore: remove cleanup scripts after completion"

echo ""
echo "======================================================"
echo "🎉 Cleanup complete! 🎉"
echo "======================================================"
echo ""
echo "Next steps:"
echo "1. Review the changes with: git log -p"
echo "2. Run 'bun install' to ensure dependencies are up to date"
echo "3. Run 'bun run build' to verify the build still works"
echo "4. Push the changes with: git push origin cleanup-code"
echo "5. Create a pull request to merge into main branch"