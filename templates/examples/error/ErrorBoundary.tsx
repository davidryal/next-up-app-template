import React, { Component, ErrorInfo, ReactNode } from 'react';
import { getPlatformConfig } from '@/core/config/platform';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);

    // Platform-specific error handling
    const { platform } = getPlatformConfig();
    switch (platform) {
      case 'desktop':
        // Log to file system or show native dialog
        console.log('Desktop-specific error handling');
        break;
      case 'mobile':
        // Show mobile-friendly error UI
        console.log('Mobile-specific error handling');
        break;
      default:
        // Web default
        console.log('Web-specific error handling');
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.message}</pre>
          </details>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Example usage:
/*
<ErrorBoundary
  onError={(error, errorInfo) => {
    // Log to your error reporting service
    reportError(error, errorInfo);
  }}
  fallback={<CustomErrorComponent />}
>
  <YourApp />
</ErrorBoundary>
*/
