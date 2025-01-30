import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import * as React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Up - The Universal App Template',
  description: 'Build virtually anything - from simple static sites to complex full-stack applications.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

interface ProviderProps {
  children: React.ReactNode;
  className?: string;
}

function Providers({ children, className }: ProviderProps): JSX.Element {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className={className}>
        {children}
      </div>
    </ThemeProvider>
  );
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Providers className="min-h-screen bg-white dark:bg-gray-900">
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
