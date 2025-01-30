import { type ComponentProps } from 'react';
import { getPlatformConfig } from '@/core/config/platform';

export interface BaseButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

// Base button interface that platform-specific buttons will implement
export interface IPlatformButton {
  render: (props: BaseButtonProps) => JSX.Element;
}

// Default web implementation
export const Button = (props: BaseButtonProps) => {
  const { platform } = getPlatformConfig();
  
  // In a real implementation, we would dynamically import the platform-specific button
  return (
    <button
      {...props}
      className={`btn btn-${props.variant || 'primary'} btn-${props.size || 'md'}`}
    />
  );
};
