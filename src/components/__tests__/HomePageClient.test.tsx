import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomePageClient } from '../HomePageClient';

// Mock the paths import to avoid potential resolution issues
const mockPaths = [
  { 
    id: 'test-path', 
    title: 'Test Path', 
    description: 'A test path for rendering', 
    iconName: 'test-icon',
    features: [],
    bestFor: [],
    template: ''
  }
];

// Mock next-themes to avoid issues with theme hooks
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn()
  })
}));

describe('HomePageClient', () => {
  test('renders homepage client with paths', () => {
    render(<HomePageClient paths={mockPaths} />);
    
    // Check for key elements
    const mainHeading = screen.getByText(/Next Up - The Universal App Template/i);
    expect(mainHeading).toBeInTheDocument();
    
    // Check for platform selection
    const webPlatform = screen.getByText(/Web/i);
    expect(webPlatform).toBeInTheDocument();
  });
});