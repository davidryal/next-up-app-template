import { createRouter } from 'next/router';

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
    layout: 'default'
  }
};

export const getRoute = (name: keyof typeof routes, params?: Record<string, string>) => {
  const route = routes[name];
  if (!route) throw new Error(`Route ${name} not found`);
  
  let path = route.path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value);
    });
  }
  
  return path;
};
