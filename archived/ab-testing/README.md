# Archived: A/B Testing Feature

The A/B Testing feature was a system for testing different versions of UI components and content on the Oceanheart.ai website to optimize user experience and conversion rates. This feature has been archived as part of the refactoring project to simplify the codebase while preserving the knowledge for future implementation.

## Feature Overview

The A/B Testing system was designed to:

- Split traffic between different variations of UI components
- Track user engagement with each variation
- Collect metrics on conversion rates and user behavior
- Provide an admin dashboard for viewing test results

## Original Location

The A/B Testing feature code was originally located in:

- `/libs/abTesting.tsx`: Core A/B testing logic and context provider
- `/app/ab-testing/`: Dashboard for viewing A/B test results
- `/app/api/ab-tracking/`: API endpoints for tracking user interactions
- `/components/HeroABTest.tsx`: Example A/B tested component for the landing page hero section
- `/supabase/migrations/20240601000000_ab_testing.sql`: Database schema for tracking test results

## Implementation Details

The A/B testing implementation included:

- Context-based React component for managing test variations
- User session tracking to ensure consistent experiences
- Analytics integration for measuring performance
- Supabase database tables for storing results
- Admin dashboard for visualization and analysis

## Database Structure

The feature used the following database tables:

- `ab_tests`: Defined test configurations
  - `id`: UUID primary key
  - `name`: Test name
  - `component`: Target component
  - `variants`: Number of variants (usually 2-4)
  - `active`: Boolean indicating if test is active
  - `created_at`: Timestamp

- `ab_test_results`: Tracked user interactions
  - `id`: UUID primary key
  - `test_id`: Reference to ab_tests
  - `variant`: Variant shown (A, B, C, D)
  - `action`: User action (view, click, convert)
  - `user_id`: Anonymous user identifier
  - `created_at`: Timestamp

## Reason for Archival

The A/B Testing feature was archived due to:

1. Shift to a more unified design system with fewer variations
2. Complexity in maintaining multiple component versions
3. Integration of more sophisticated third-party testing tools
4. Focus on streamlining the core codebase

## Potential Future Use

If reinstating this feature, consider:

- Expanding to support more than 4 variants
- Improving statistical analysis capabilities
- Adding heat mapping and session recording
- Implementing integration with popular analytics services

## Dependencies

The A/B Testing feature had dependencies on:

- React Context API for state management
- Supabase for data storage
- SWR for data fetching
- Recharts for results visualization