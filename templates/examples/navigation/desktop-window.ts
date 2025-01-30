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
    title: 'Settings',
    url: '/settings',
    options: {
      width: 800,
      height: 600,
      resizable: false,
    }
  }
};

export const openWindow = async (windowKey: keyof typeof windows) => {
  const window = windows[windowKey];
  if (!window) throw new Error(`Window ${windowKey} not found`);

  const webview = new WebviewWindow(window.name, {
    title: window.title,
    url: window.url,
    ...window.options
  });

  await webview.once('tauri://created', () => {
    console.log('Window created');
  });

  return webview;
};
