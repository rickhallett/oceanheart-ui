# Archived Code - Oceanheart.ai

This directory contains code that has been archived as part of the Oceanheart.ai refactoring project. The code here is no longer active in the main application but is preserved for reference, historical context, or potential future reuse.

## Purpose of the Archive

The purpose of this archive is to:

1. **Preserve Knowledge**: Maintain access to previous implementations and design decisions
2. **Reduce Active Codebase Size**: Improve maintainability by removing unused code from the active codebase
3. **Enable Future Reference**: Allow developers to understand and potentially reuse previously implemented features
4. **Document History**: Provide context on the evolution of the application

## Archive Structure

The archive is organized by feature area:

- `/archived/saigo/`: The Saigo feature (leaderboard, practice tracking system)
- `/archived/hdi/`: The Human Digital Interface (HDI) experimental section
- `/archived/ab-testing/`: Previous A/B testing implementations

Each feature directory maintains the original structure of the code (app pages, components, API routes, etc.) to facilitate understanding and potential restoration.

## Guidelines for Using Archived Code

When working with archived code:

1. **Reference Only**: Archived code should be treated as reference material, not active code
2. **No Direct Imports**: Do not import archived code into the active codebase
3. **Documentation**: If you restore or reuse archived code, document its history and origin
4. **Testing**: If restoring code, ensure comprehensive testing as requirements may have changed

## When to Archive vs. Delete

- **Archive**: Code that represents significant development effort, implements unique functionality, or provides valuable reference
- **Delete**: Trivial code, duplicate implementations, or code that poses security or maintenance risks

## Archival Process

All code in this directory has been archived following a structured process:

1. Identification of code to be archived
2. Documentation of its purpose and structure
3. Testing to ensure active codebase functions without the code
4. Moving the code to the appropriate archive location
5. Updating any references in the active codebase

If you have questions about archived code, please consult the feature-specific README files or contact the development team.