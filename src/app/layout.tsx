import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '@/components/ThemeToggle';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Up - The Universal App Template',
  description: 'Build virtually anything - from simple static sites to complex full-stack applications',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
}

interface ThemeToggleProps {
  className?: string;
}

const CustomThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  attribute = 'class',
  defaultTheme = 'system',
  enableSystem = true,
}) => {
  return (
    <ThemeProvider attribute={attribute} defaultTheme={defaultTheme} enableSystem={enableSystem}>
      {children}
    </ThemeProvider>
  );
};

const CustomThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  return <ThemeToggle className={className} />;
};

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CustomThemeProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="absolute top-4 right-4">
              <CustomThemeToggle />
            </div>
            <main className="pt-4">{children}</main>
            <footer className="py-6 text-center">
              <div className="inline-flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <a
                  href="https://davidryalanderson.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 dark:hover:text-gray-200 inline-flex items-center"
                >
                  Made with in California
                </a>
              </div>
            </footer>
          </div>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
