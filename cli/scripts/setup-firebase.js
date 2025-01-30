const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();

// Add Firebase dependencies
const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
pkg.dependencies['firebase'] = '^10.7.0';
pkg.dependencies['firebase-admin'] = '^12.0.0';
fs.writeFileSync(path.join(projectRoot, 'package.json'), JSON.stringify(pkg, null, 2));

// Create Firebase config
const firebaseConfigContent = `import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { app, auth };
`;

// Create Firebase admin config
const firebaseAdminConfigContent = `import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const apps = getApps();

const firebaseAdmin = apps.length === 0
  ? initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\\\n/g, '\\n'),
      }),
    })
  : apps[0];

export const adminAuth = getAuth(firebaseAdmin);
`;

// Create auth hook
const useAuthContent = `import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../config/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    user,
    loading,
  };
}
`;

// Create directories
fs.mkdirSync(path.join(projectRoot, 'src', 'config'), { recursive: true });
fs.mkdirSync(path.join(projectRoot, 'src', 'hooks'), { recursive: true });

// Write files
fs.writeFileSync(path.join(projectRoot, 'src', 'config', 'firebase.ts'), firebaseConfigContent);
fs.writeFileSync(path.join(projectRoot, 'src', 'config', 'firebase-admin.ts'), firebaseAdminConfigContent);
fs.writeFileSync(path.join(projectRoot, 'src', 'hooks', 'useAuth.ts'), useAuthContent);

// Add example .env
const envContent = `
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"

FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="your-client-email"
FIREBASE_PRIVATE_KEY="your-private-key"
`;

fs.appendFileSync(path.join(projectRoot, '.env.example'), envContent);
fs.appendFileSync(path.join(projectRoot, '.env'), envContent);
