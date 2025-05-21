# Archival Process Documentation

This document outlines the standard process for archiving code in the Oceanheart.ai project. Following these guidelines ensures consistent and well-documented code archival.

## When to Archive Code

Code should be archived rather than deleted when:

1. It represents significant development effort (more than a few days of work)
2. It implements unique or complex functionality that might be useful in the future
3. It provides valuable historical context or design patterns
4. It's being removed due to changing business requirements, not because it's flawed
5. It may be needed for reference in understanding other parts of the codebase

Code should be deleted rather than archived when:

1. It's a duplicate implementation with no unique aspects
2. It contains security vulnerabilities or serious bugs
3. It's trivial and easily reproducible
4. It's obsolete technology that will never be reused

## Archival Process Steps

### 1. Identification and Approval

- Identify code to be archived
- Get approval from the tech lead or project manager
- Create a ticket/issue to track the archival process

### 2. Documentation Preparation

- Document the purpose and functionality of the code
- Identify all related components and dependencies
- Note the reason for archival
- Update the tracking.csv file with basic information

### 3. Creation of Archive Structure

- Create appropriate directories in the `/archived` folder
- Maintain a structure similar to the original code location
- Use feature-specific subdirectories when appropriate

### 4. Code Migration

- Move the code to the archive location
- Update imports in the archived code to maintain internal references
- Remove or update references in the active codebase
- Use git mv to preserve file history when possible

### 5. Testing

- Verify the application builds without the archived code
- Run tests to ensure no regressions
- Fix any issues in the active codebase related to the removed code

### 6. Detailed Documentation

- Complete the component documentation using the TEMPLATE.md format
- Update README.md files in relevant archive directories
- Finalize the tracking.csv entry with all details

### 7. Review and Commit

- Have another developer review the archive changes
- Commit the changes with a clear message about what was archived and why
- Update the ticket/issue with the completed work

## Using the Tracking File

The `tracking.csv` file contains the following columns:

- **Component Name**: The name of the archived component or feature
- **Original Path**: The original location in the codebase
- **Archived Path**: The new location in the archive directory
- **Type**: Component, Page, API Route, Utility, etc.
- **Date Archived**: When the code was archived (YYYY-MM-DD)
- **Archived By**: The developer who performed the archival
- **Ticket Reference**: Link or reference to the relevant ticket/issue

When archiving code, always update this file to maintain a comprehensive record.

## Component Documentation Template

Use the TEMPLATE.md file as a starting point for documenting archived components. This template includes:

- Basic component information
- Description of functionality
- Implementation details
- Dependencies
- Reason for archival
- Reuse considerations
- Related components
- External references
- Archival notes

## Restoration Process

If archived code needs to be restored:

1. Review the documentation in the archive
2. Assess if the code needs updates for the current codebase
3. Create a new ticket/issue for the restoration
4. Move the code back to the appropriate location
5. Update imports and references
6. Test thoroughly to ensure compatibility
7. Remove the entry from the tracking.csv file
8. Update archive documentation to note the restoration