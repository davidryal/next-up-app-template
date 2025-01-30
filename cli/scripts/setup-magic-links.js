const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();

// Add Magic dependencies
const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
pkg.dependencies['@magic-sdk/admin'] = '^2.0.0';
pkg.dependencies['magic-sdk'] = '^21.0.0';
fs.writeFileSync(path.join(projectRoot, 'package.json'), JSON.stringify(pkg, null, 2));

// Create Magic config
const magicConfigContent = `import { Magic } from 'magic-sdk';

const createMagic = () => {
  if (typeof window === 'undefined') return null;
  return new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!);
};

export const magic = createMagic();
`;

// Create Magic admin config
const magicAdminConfigContent = `import { Magic } from '@magic-sdk/admin';

export const magicAdmin = new Magic(process.env.MAGIC_SECRET_KEY);
`;

// Create auth hook
const useAuthContent = `import { useEffect, useState } from 'react';
import { magic } from '../config/magic';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    magic?.user.isLoggedIn().then(async (isLoggedIn) => {
      if (isLoggedIn) {
        const userData = await magic.user.getMetadata();
        setUser(userData);
      }
      setLoading(false);
    });
  }, []);

  const login = async (email: string) => {
    try {
      await magic?.auth.loginWithMagicLink({ email });
      const userData = await magic.user.getMetadata();
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      await magic?.user.logout();
      setUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  return {
    user,
    loading,
    login,
    logout,
  };
}
`;

// Create directories
fs.mkdirSync(path.join(projectRoot, 'src', 'config'), { recursive: true });
fs.mkdirSync(path.join(projectRoot, 'src', 'hooks'), { recursive: true });

// Write files
fs.writeFileSync(path.join(projectRoot, 'src', 'config', 'magic.ts'), magicConfigContent);
fs.writeFileSync(path.join(projectRoot, 'src', 'config', 'magic-admin.ts'), magicAdminConfigContent);
fs.writeFileSync(path.join(projectRoot, 'src', 'hooks', 'useAuth.ts'), useAuthContent);

// Add example .env
const envContent = `
NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY="your-publishable-key"
MAGIC_SECRET_KEY="your-secret-key"
`;

fs.appendFileSync(path.join(projectRoot, '.env.example'), envContent);
fs.appendFileSync(path.join(projectRoot, '.env'), envContent);
