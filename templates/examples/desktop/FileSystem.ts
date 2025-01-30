import { readTextFile, writeTextFile, readDir } from '@tauri-apps/api/fs';
import { open, save } from '@tauri-apps/api/dialog';

export interface FileSystemService {
  readFile: (path: string) => Promise<string>;
  writeFile: (path: string, contents: string) => Promise<void>;
  listFiles: (dir: string) => Promise<string[]>;
  openFileDialog: (options?: OpenDialogOptions) => Promise<string | null>;
  saveFileDialog: (options?: SaveDialogOptions) => Promise<string | null>;
}

interface OpenDialogOptions {
  multiple?: boolean;
  filters?: FileFilter[];
}

interface SaveDialogOptions {
  defaultPath?: string;
  filters?: FileFilter[];
}

interface FileFilter {
  name: string;
  extensions: string[];
}

export const createFileSystemService = (): FileSystemService => {
  return {
    readFile: async (path: string) => {
      try {
        return await readTextFile(path);
      } catch (error) {
        console.error('Error reading file:', error);
        throw error;
      }
    },

    writeFile: async (path: string, contents: string) => {
      try {
        await writeTextFile(path, contents);
      } catch (error) {
        console.error('Error writing file:', error);
        throw error;
      }
    },

    listFiles: async (dir: string) => {
      try {
        const entries = await readDir(dir);
        return entries.map(entry => entry.path);
      } catch (error) {
        console.error('Error listing files:', error);
        throw error;
      }
    },

    openFileDialog: async (options?: OpenDialogOptions) => {
      try {
        const selected = await open({
          multiple: options?.multiple ?? false,
          filters: options?.filters,
        });
        return selected as string || null;
      } catch (error) {
        console.error('Error opening file dialog:', error);
        return null;
      }
    },

    saveFileDialog: async (options?: SaveDialogOptions) => {
      try {
        const path = await save({
          defaultPath: options?.defaultPath,
          filters: options?.filters,
        });
        return path || null;
      } catch (error) {
        console.error('Error opening save dialog:', error);
        return null;
      }
    },
  };
};

// Example usage:
/*
const fs = createFileSystemService();

// Open file dialog
const filePath = await fs.openFileDialog({
  filters: [{ name: 'Text Files', extensions: ['txt'] }]
});

if (filePath) {
  // Read file contents
  const contents = await fs.readFile(filePath);
  console.log('File contents:', contents);

  // Save file
  await fs.writeFile(filePath, 'New contents');
}
*/
