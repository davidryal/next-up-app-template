// Conditional import for Tauri API
type WindowOptionsType = {
  width?: number;
  height?: number;
  resizable?: boolean;
};

let WebviewWindow: any;
try {
  const tauriModule = require('@tauri-apps/api/window');
  WebviewWindow = tauriModule.WebviewWindow;
  // Use Tauri's WindowOptions if available
  type WindowOptionsType = typeof tauriModule.WindowOptions;
} catch {
  // Fallback type already defined above
}

export interface AppWindow {
  name: string;
  title: string;
  url: string;
  options?: WindowOptionsType;
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

export function openWindow(windowKey: keyof typeof windows) {
  const windowConfig = windows[windowKey];
  
  // Web-compatible window opening
  if (typeof window !== 'undefined') {
    window.open(windowConfig.url, windowConfig.name, 
      `width=${windowConfig.options?.width || 800},` +
      `height=${windowConfig.options?.height || 600},` +
      `resizable=${windowConfig.options?.resizable ?? true}`
    );
  }

  // Tauri-specific window creation (if available)
  if (WebviewWindow) {
    return new WebviewWindow(windowConfig.name, windowConfig.options);
  }

  return null;
}
