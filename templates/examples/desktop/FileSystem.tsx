import React from 'react';
import { readTextFile, writeTextFile, readDir } from '@tauri-apps/api/fs';
import { open, save } from '@tauri-apps/api/dialog';
import type { FileEntry } from '@tauri-apps/api/fs';

interface FileSystemProps {
  initialPath?: string;
  onFileSelect?: (path: string) => void;
  onError?: (error: Error) => void;
}

export const FileSystem: React.FC<FileSystemProps> = ({ 
  initialPath = '.', 
  onFileSelect,
  onError 
}) => {
  const [files, setFiles] = React.useState<string[]>([]);
  const [fileContent, setFileContent] = React.useState<string | null>(null);

  const handleOpenFile = React.useCallback(async () => {
    try {
      const selected = await open({
        defaultPath: initialPath,
        filters: [
          {
            name: 'Text Files',
            extensions: ['txt', 'md', 'json'],
          },
        ],
      });

      if (typeof selected === 'string') {
        const content = await readTextFile(selected);
        setFileContent(content);
        onFileSelect?.(selected);
      }
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error(String(error)));
    }
  }, [initialPath, onFileSelect, onError]);

  const handleSaveFile = React.useCallback(async () => {
    try {
      const filePath = await save({
        defaultPath: initialPath,
        filters: [
          {
            name: 'Text Files',
            extensions: ['txt', 'md', 'json'],
          },
        ],
      });

      if (typeof filePath === 'string' && fileContent) {
        await writeTextFile(filePath, fileContent);
        onFileSelect?.(filePath);
      }
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error(String(error)));
    }
  }, [initialPath, fileContent, onFileSelect, onError]);

  const handleReadDir = React.useCallback(async () => {
    try {
      const entries: FileEntry[] = await readDir(initialPath);
      setFiles(entries.map(entry => entry.name || '').filter(Boolean));
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error(String(error)));
    }
  }, [initialPath, onError]);

  return (
    <div className="space-y-4">
      <button 
        type="button" 
        onClick={handleOpenFile} 
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Open File
      </button>
      <button 
        type="button" 
        onClick={handleSaveFile} 
        className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        Save File
      </button>
      <button 
        type="button" 
        onClick={handleReadDir} 
        className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
      >
        Read Directory
      </button>
      {fileContent && (
        <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">File Content:</h3>
          <pre className="overflow-x-auto whitespace-pre-wrap break-words">
            {fileContent}
          </pre>
        </div>
      )}
      {files.length > 0 && (
        <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Directory Files:</h3>
          <ul className="list-disc pl-6 space-y-1">
            {files.map(file => (
              <li key={file} className="text-gray-700 dark:text-gray-300">
                {file}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
