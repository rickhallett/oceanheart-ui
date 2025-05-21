# Archived: Saigo Feature

The Saigo feature was a gamified practice tracking and leaderboard system originally implemented in the Oceanheart.ai application. This feature has been archived as part of the refactoring project to focus on the core functionality of the application.

## Feature Overview

Saigo was a system designed to:

- Track user practice activities and assign points
- Display a leaderboard of user progress
- Integrate with Instagram checks for external validation
- Provide visualization of practice data through various charts

## Original Location

The Saigo feature code was originally located in:

- `/app/saigo/`: Pages and components for the Saigo UI
- `/app/api/saigo/`: API endpoints for Saigo functionality
- `/app/api/auth/saigo-callback/`: Saigo-specific authentication routes
- `/components/`: Various Saigo-related components (LeaderboardTable, practice charts, etc.)
- `/migrations/`: Database migrations for Saigo tables

## Database Structure

Saigo used the following database tables (defined in `/migrations/saigo_tables.sql`):

- `saigo_users`: User information specific to the Saigo system
  - `id`: UUID primary key
  - `email`: User email (unique)
  - `user_id`: Reference to auth.users
  - `username`: User-selected username (unique)
  - `created_at`: Timestamp
  - `force`: Points modifier value

- `practices`: Records of user practice activities
  - `id`: UUID primary key
  - `type`: Type of practice
  - `points`: Points awarded for the practice
  - `user_id`: Reference to saigo_users
  - `created_at`: Timestamp

## Key Components

- `LeaderboardTable.tsx`: Displays user rankings and points
- `LiveLeaderboard.tsx`: Real-time leaderboard updates
- `PracticeTypesRadarChart.tsx`: Visualization of practice by type
- `PracticeTypesStackedBarChart.tsx`: Alternative visualization
- `CumulativePointsAreaChart.tsx`: Progress tracking over time
- `PracticeSummaryPieChart.tsx`: Summary of practice distribution

## Reason for Archival

The Saigo feature was archived due to:

1. Shift in business focus to core consulting and educational content
2. Maintenance overhead compared to active user engagement
3. Backend complexity and resource requirements
4. Streamlined user experience without gamification elements

## Potential Future Use

If reinstating this feature, consider:

- Updating authentication to current standards
- Modernizing the visualization components
- Enhancing the point system algorithm
- Improving mobile responsiveness of leaderboards and charts

## Dependencies

The Saigo feature had dependencies on:

- Supabase Authentication
- Recharts for data visualization
- Instagram API for external validation
- Stripe for potential premium features