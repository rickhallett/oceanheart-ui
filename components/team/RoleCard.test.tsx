import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoleCard from './RoleCard';
import { RoleDetail } from '@/lib/teamData'; // Assuming types are here

// Mock data for testing
const mockFilledRole: RoleDetail = {
  id: 'test-role',
  title: 'Test Engineer',
  description: 'This is a test description.',
  memberName: 'Test User',
  avatarUrl: '/path/to/avatar.jpg',
  background: 'Test background info.',
  advisorTitle: 'Test Advisor Title',
  acronym: 'TE'
};

const mockAvailableRole: RoleDetail = {
  id: 'available-role',
  title: 'Available Position',
  description: 'This description should not be visible',
  advisorTitle: 'Advisor for Available'
  // memberName is intentionally missing or set to "position available"
};

describe('RoleCard Component', () => {
  // Test for standard (filled) role rendering
  test('renders full details for a filled role', () => {
    render(<RoleCard role={mockFilledRole} onSelectRole={() => { }} />);

    // Check for key elements of a filled role
    expect(screen.getByText('Test Engineer')).toBeInTheDocument();
    expect(screen.getByText('TE:')).toBeInTheDocument(); // Acronym
    expect(screen.getByText('This is a test description.')).toBeInTheDocument();
    expect(screen.getByText('Test background info.')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    // Check that advisor title isn't shown if main title exists (per component logic)
    expect(screen.queryByText('Perspective: Test Advisor Title')).not.toBeInTheDocument();
    // Check image alt text (or presence of img tag)
    expect(screen.getByAltText('Test User Avatar')).toBeInTheDocument(); // Assuming alt text includes name
  });

  // Test for available role rendering
  test('renders minimal details for an available role', () => {
    render(<RoleCard role={mockAvailableRole} onSelectRole={() => { }} isAvailable={true} />);

    // Check for elements that SHOULD be present
    expect(screen.getByText('Available Position')).toBeInTheDocument();
    expect(screen.queryByText('Advisor for Available')).toBeInTheDocument(); // Advisor title should show if main title is missing

    // Check for elements that SHOULD NOT be present
    expect(screen.queryByText('This description should not be visible')).not.toBeInTheDocument();
    expect(screen.queryByText('Test background info.')).not.toBeInTheDocument();
    expect(screen.queryByText('Test User')).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument(); // No image/placeholder
  });

  // Add more tests as needed (e.g., interactions, dimming/highlighting if applicable)
}); 