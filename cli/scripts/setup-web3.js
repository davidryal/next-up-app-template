const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();

// Add Web3 dependencies
const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
pkg.dependencies['wagmi'] = '^2.0.0';
pkg.dependencies['viem'] = '^2.0.0';
pkg.dependencies['@web3modal/wagmi'] = '^3.0.0';
fs.writeFileSync(path.join(projectRoot, 'package.json'), JSON.stringify(pkg, null, 2));

// Create Web3 config
const web3ConfigContent = `import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { createWeb3Modal } from '@web3modal/wagmi/react';

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export const web3Modal = createWeb3Modal({
  wagmiConfig: config,
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet, sepolia],
});
`;

// Create Web3 provider component
const web3ProviderContent = `'use client';

import { WagmiProvider } from 'wagmi';
import { config } from './web3Config';

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      {children}
    </WagmiProvider>
  );
}
`;

// Create auth hook
const useAuthContent = `import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { web3Modal } from '../config/web3Config';

export function useAuth() {
  const { address, isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const login = async () => {
    try {
      await web3Modal.open();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      await disconnectAsync();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  return {
    user: isConnected ? { address } : null,
    loading: false,
    login,
    logout,
  };
}
`;

// Create directories
fs.mkdirSync(path.join(projectRoot, 'src', 'config'), { recursive: true });
fs.mkdirSync(path.join(projectRoot, 'src', 'components'), { recursive: true });
fs.mkdirSync(path.join(projectRoot, 'src', 'hooks'), { recursive: true });

// Write files
fs.writeFileSync(path.join(projectRoot, 'src', 'config', 'web3Config.ts'), web3ConfigContent);
fs.writeFileSync(path.join(projectRoot, 'src', 'components', 'Web3Provider.tsx'), web3ProviderContent);
fs.writeFileSync(path.join(projectRoot, 'src', 'hooks', 'useAuth.ts'), useAuthContent);

// Add example .env
const envContent = `
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your-project-id"
`;

fs.appendFileSync(path.join(projectRoot, '.env.example'), envContent);
fs.appendFileSync(path.join(projectRoot, '.env'), envContent);
