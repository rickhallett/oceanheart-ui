#!/bin/bash

# Create backup branch
echo "Creating backup branch 'cleanup-branch'..."
git checkout -b cleanup-branch

# Remove Aider-related files
echo "Removing Aider-related files..."
rm -f aider.session bak.aider.model.settings.yml session.aider reasoning-effort

# Remove temporary or duplicate files
echo "Removing temporary or duplicate files..."
rm -f names.db blog.prompt.xml error.tsx not-found.tsx page.tsx cxo.html

# Move documentation files to docs directory
echo "Moving documentation files..."
mkdir -p docs/refactor
mv gitflow.mdc docs/
mv DEAD_CODE_TARGETS.md docs/refactor/
mv CODE_REVIEW.md docs/

# Clean up duplicate task directories
echo "Cleaning up duplicate task directories..."
# Compare tasks/ and tasks-refactor/ directories
# If they're identical, keep tasks/ and remove tasks-refactor/
if diff -r tasks/ tasks-refactor/ > /dev/null; then
  rm -rf tasks-refactor/
else
  echo "Warning: tasks/ and tasks-refactor/ directories are not identical."
  echo "Please manually consolidate them."
fi

# Remove src/ directory if empty
echo "Checking src/ directory..."
if [ -z "$(ls -A src/)" ]; then
  rm -rf src/
else
  echo "Warning: src/ directory is not empty. Please review its contents manually."
fi

# Remove signin/ directory in root (duplicate of app/signin/)
echo "Removing signin/ directory in root..."
rm -rf signin/

echo "Cleanup complete!"