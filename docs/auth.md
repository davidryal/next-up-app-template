# Authentication Methods

This template offers three authentication options to suit different needs.

## Firebase Auth

### Overview
- Complete auth solution with multiple providers
- Built-in security rules
- Real-time session management
- Cross-platform support

### Setup
1. Environment variables:
```env
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
```

2. Usage example:
```typescript
import { auth } from '@/config/firebase';
import { useAuth } from '@/hooks/useAuth';

// Hook usage
const { user, loading } = useAuth();

// Sign in
await auth.signInWithEmailAndPassword(email, password);

// Sign out
await auth.signOut();
```

## Magic Links

### Overview
- Passwordless authentication
- High conversion rate
- Simple user experience
- Cross-platform support

### Setup
1. Environment variables:
```env
NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY="your-publishable-key"
MAGIC_SECRET_KEY="your-secret-key"
```

2. Usage example:
```typescript
import { magic } from '@/config/magic';
import { useAuth } from '@/hooks/useAuth';

// Hook usage
const { user, login, logout } = useAuth();

// Login
await login('user@example.com');

// Logout
await logout();
```

## Web3/Wallet

### Overview
- Crypto wallet authentication
- Support for multiple chains
- WalletConnect integration
- Perfect for Web3 apps

### Setup
1. Environment variables:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your-project-id"
```

2. Usage example:
```typescript
import { useAuth } from '@/hooks/useAuth';

// Hook usage
const { user, login, logout } = useAuth();

// Connect wallet
await login();

// Disconnect
await logout();
```

## Common Features

All authentication methods provide:

1. **Unified Auth Hook**
```typescript
const { user, loading, login, logout } = useAuth();
```

2. **Protected Routes**
```typescript
// middleware.ts
export { default } from '@/auth/middleware';
```

3. **Type-safe User Object**
```typescript
interface User {
  id: string;
  email?: string;
  name?: string;
  // Method-specific fields
}
```

## Best Practices

1. **Security**
   - Implement proper CSRF protection
   - Use secure session management
   - Follow OAuth best practices

2. **User Experience**
   - Handle loading states
   - Provide clear error messages
   - Implement proper redirects

3. **Error Handling**
   - Graceful error recovery
   - Clear user feedback
   - Proper logging

4. **Testing**
   - Mock auth providers
   - Test protected routes
   - Verify error states
