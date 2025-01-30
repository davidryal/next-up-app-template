# Platform-Specific Features

This template supports development for web, mobile, and desktop platforms.

## Web (Next.js)

### Features
- Server-side rendering
- API routes
- Static site generation
- Image optimization

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm run start
```

### Platform-specific components:
```typescript
import { Platform } from '@/core/platform';

function MyComponent() {
  return Platform.isWeb ? (
    <WebSpecificComponent />
  ) : (
    <CrossPlatformFallback />
  );
}
```

## Mobile (Expo)

### Features
- iOS & Android support
- Native components
- Hot reloading
- Over-the-air updates

### Requirements
1. Install Expo Go on your device
2. Install development tools:
```bash
npm install -g expo-cli
```

### Development
```bash
# Start Expo development server
npm run mobile:dev

# Start web version
npm run mobile:web
```

### Platform-specific components:
```typescript
import { Platform } from '@/core/platform';

function MyComponent() {
  return Platform.isMobile ? (
    <MobileSpecificComponent />
  ) : (
    <CrossPlatformFallback />
  );
}
```

## Desktop (Tauri)

### Features
- Native performance
- Small bundle size
- System tray support
- File system access

### Requirements
1. Install Rust: https://rustup.rs/
2. Platform-specific dependencies:
   - Windows: Visual Studio Build Tools
   - macOS: Xcode
   - Linux: Build essentials

### Development
```bash
npm run desktop:dev
```

### Production
```bash
npm run desktop:build
```

### Platform-specific components:
```typescript
import { Platform } from '@/core/platform';

function MyComponent() {
  return Platform.isDesktop ? (
    <DesktopSpecificComponent />
  ) : (
    <CrossPlatformFallback />
  );
}
```

## Cross-Platform Development

### 1. Shared Code
- Use platform-agnostic code in `src/core`
- Share types and utilities
- Use feature detection

### 2. Navigation
```typescript
import { useNavigation } from '@/core/navigation';

// Works across all platforms
const navigation = useNavigation();
navigation.push('/users');
```

### 3. Storage
```typescript
import { storage } from '@/core/storage';

// Platform-specific implementation, same API
await storage.setItem('key', value);
const value = await storage.getItem('key');
```

### 4. File System
```typescript
import { fs } from '@/core/fs';

// Desktop-only features fail gracefully on web/mobile
if (Platform.isDesktop) {
  await fs.writeFile('path', data);
}
```

## Best Practices

1. **Code Organization**
   - Keep platform-specific code isolated
   - Share business logic
   - Use feature detection

2. **UI/UX**
   - Follow platform conventions
   - Adapt to screen sizes
   - Handle platform capabilities

3. **Performance**
   - Optimize for each platform
   - Use native features when available
   - Handle offline states

4. **Testing**
   - Test on all platforms
   - Mock platform APIs
   - Use platform-specific testing tools
