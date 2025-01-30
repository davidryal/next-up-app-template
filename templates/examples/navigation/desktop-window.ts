import { WebviewWindow, WindowOptions } from '@tauri-apps/api/window';

export interface AppWindow {
  name: string;
  title: string;
  url: string;
  options?: WindowOptions;
}

export const windows: Record<string, AppWindow> = {
  main: {
    name: 'main',
    title: 'Main Window',
    url: '/',
    options: {
      width: 1200,
      height: 800,
      resizable: true,
    }
  },
  settings: {
    name: 'settings',
    title: 'Application Settings',
    url: '/settings',
    options: {
      width: 800,
      height: 600,
      resizable: false,
    }
  }
};

export async function openWindow(windowKey: keyof typeof windows) {
  const windowConfig = windows[windowKey];
  
  if (!windowConfig) {
    throw new Error(`Window configuration not found for key: ${windowKey}`);
  }

  const webview = new WebviewWindow(windowConfig.name, {
    url: windowConfig.url,
    title: windowConfig.title,
    ...windowConfig.options
  });

  await webview.show();
  return webview;
}
