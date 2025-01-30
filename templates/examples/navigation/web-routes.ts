import { useRouter } from 'next/navigation';

export type AppRoute = {
  path: string;
  protected?: boolean;
  layout?: string;
};

export const routes: Record<string, AppRoute> = {
  home: {
    path: '/',
    layout: 'default'
  },
  dashboard: {
    path: '/dashboard',
    protected: true,
    layout: 'dashboard'
  },
  profile: {
    path: '/profile',
    protected: true,
    layout: 'profile'
  },
  settings: {
    path: '/settings',
    protected: true,
    layout: 'settings'
  }
};

export function getRoute(name: keyof typeof routes, params?: Record<string, string>): string {
  const route = routes[name];
  
  if (!route) {
    throw new Error(`Route not found: ${String(name)}`);
  }

  let path = route.path;

  // Replace route parameters if provided
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value);
    });
  }

  return path;
}

export function useAppRouter() {
  return useRouter();
}
