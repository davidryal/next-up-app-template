import { Platform, PlatformConfig } from '../types/platform';

const detectPlatform = (): Platform => {
  if (typeof window === 'undefined') return 'web'; // SSR defaults to web

  // Check for Tauri
  if ('__TAURI__' in window) return 'desktop';
  
  // Check for Expo/React Native
  if ('expo' in globalThis || navigator.product === 'ReactNative') return 'mobile';
  
  return 'web';
};

export const getPlatformConfig = (): PlatformConfig => {
  const platform = detectPlatform();
  
  return {
    platform,
    isSSR: typeof window === 'undefined',
    isMobile: platform === 'mobile',
    isDesktop: platform === 'desktop',
  };
};
