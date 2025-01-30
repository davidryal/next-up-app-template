import path from 'path';
import matter from 'gray-matter';
import fs from 'fs/promises';

export interface AppPath {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  bestFor: string[];
  template: string;
}

export async function getPaths(): Promise<AppPath[]> {
  try {
    const pathsDir = path.join(process.cwd(), 'public', 'paths');
    const files = await fs.readdir(pathsDir);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    const paths = await Promise.all(mdFiles.map(async (file) => {
      const filePath = path.join(pathsDir, file);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      return {
        id: path.basename(file, '.md'),
        title: data.title || '',
        description: data.description || '',
        iconName: data.icon || 'code',
        features: data.features || [],
        bestFor: data.bestFor || [],
        template: content || ''
      };
    }));

    return paths;
  } catch (error) {
    console.error('Error loading paths:', error);
    return [];
  }
}
