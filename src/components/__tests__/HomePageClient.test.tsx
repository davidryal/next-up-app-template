import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomePageClient } from '../HomePageClient';
import type { AppPath } from '@/lib/paths';

const mockPaths: AppPath[] = [
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