'use client';

import { useTheme } from 'next-themes';
import React from 'react';
import { DynamicIcon } from './DynamicIcon';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`p-2 rounded-lg bg-gray-200 dark:bg-gray-800 ${className}`}
      aria-label="Toggle theme"
    >
      <DynamicIcon 
        name={theme === 'dark' ? 'sun' : 'moon'} 
        size={20} 
        className="text-gray-800 dark:text-gray-200" 
      />
    </button>
  );
};
