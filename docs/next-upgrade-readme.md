# Next.js 15 Upgrade Guide

This directory contains documentation for upgrading Oceanheart UI from Next.js 14.2.25 to Next.js 15.

## Documentation Files

- [Upgrade Plan](./next-upgrade-plan.md) - Comprehensive step-by-step upgrade strategy
- [Breaking Changes Analysis](./next-upgrade-breaking-changes.md) - Detailed breakdown of required code changes
- [Dependency Compatibility](./next-upgrade-dependency-compatibility.md) - Analysis of dependency compatibility issues
- [Upgrade Checklist](./next-upgrade-checklist.md) - Task checklist for completing the upgrade

## Overview

Next.js 15 introduces several significant changes:

1. **React 19 Support** - The App Router uses React 19, bringing performance improvements and new features
2. **Async Request APIs** - Previously synchronous APIs like `cookies()` and `headers()` are now Promise-based
3. **Caching Changes** - Fetch requests are no longer cached by default
4. **Removal of NextRequest geo and ip Properties** - These properties have been removed from the NextRequest object
5. **Improved Error Messages** - Better hydration error reporting and more helpful error messages

## Major Benefits

- **Performance Improvements** - React 19 and Turbopack provide better build and runtime performance
- **Enhanced Developer Experience** - Improved debugging and error messages
- **Future-Proofing** - Positions the application to leverage upcoming React and Next.js features
- **Better Hydration Error Reporting** - Improved debugging of hydration mismatches

## Quick Start

To begin the upgrade process:

1. Review the [Upgrade Plan](./next-upgrade-plan.md) and [Breaking Changes Analysis](./next-upgrade-breaking-changes.md)
2. Create a new branch:
   ```bash
   git checkout -b feature/nextjs-upgrade
   ```
3. Execute the steps in the [Upgrade Checklist](./next-upgrade-checklist.md)
4. Test thoroughly before merging

## Turbopack Performance

Next.js 15 includes a stable release of Turbopack for development, offering significant performance improvements:

- Faster startup times
- Improved hot module replacement
- Enhanced handling of large dependency trees

To enable Turbopack in development:

```bash
bun dev --turbo
```

## Additional Resources

- [Official Next.js 15 Announcement](https://nextjs.org/blog/next-15)
- [Next.js Upgrade Guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)
- [React 19 Documentation](https://react.dev/blog/2024/10/17/react-19-upgrade-guide)