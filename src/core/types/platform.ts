export type Platform = 'web' | 'mobile' | 'desktop';

export interface PlatformConfig {
  platform: Platform;
  isSSR: boolean;
  isMobile: boolean;
  isDesktop: boolean;
}

export interface PlatformCapabilities {
  fileSystem: boolean;
  push: boolean;
  camera: boolean;
  location: boolean;
  biometrics: boolean;
}
