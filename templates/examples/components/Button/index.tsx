import { ComponentProps } from 'react';
import { getPlatformConfig } from '@/core/config/platform';

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

// Platform-agnostic button interface
export interface IButton {
  render: (props: ButtonProps) => JSX.Element;
}

// Example usage in your app:
// import { Button } from '@/platforms/[platform]/components/Button';
export const Button = (props: ButtonProps) => {
  const { platform } = getPlatformConfig();
  
  // In a real app, you would dynamically import the platform-specific button
  return (
    <button
      {...props}
      className={`btn btn-${props.variant || 'primary'} btn-${props.size || 'md'}`}
      disabled={props.loading || props.disabled}
    >
      {props.loading ? 'Loading...' : props.children}
    </button>
  );
};
