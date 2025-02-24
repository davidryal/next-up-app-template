'use client';

import * as React from 'react';
import { DynamicIcon } from './DynamicIcon';
import type { AppPath } from '@/lib/paths';
import { marked } from 'marked';

interface PathSelectorProps {
  paths: AppPath[];
  selectedPath: string | null;
  onSelect: (id: string) => void;
}

export function PathSelector({ paths = [], selectedPath, onSelect }: PathSelectorProps): React.ReactElement {
  const [selectedInfo, setSelectedInfo] = React.useState<string | null>(null);

  // Configure marked to output GitHub-flavored markdown
  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  return (
    <div className="space-y-4">
      {paths?.map((path) => (
        <div
          key={path.id}
          className="relative"
        >
          <button
            onClick={() => onSelect(path.id)}
            className={`
              w-full text-left p-4 rounded-lg border transition-colors
              ${selectedPath === path.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
              }
            `}
          >
            <div className="flex items-center space-x-3 pr-24">
              <div className="text-xl text-gray-600 dark:text-gray-400">
                <DynamicIcon name={path.iconName} size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium whitespace-normal">{path.template.split('\n')[0].replace(/^#\s+/, '')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {path.description}
                </p>
              </div>
            </div>
          </button>
          <button
            onClick={() => setSelectedInfo(selectedInfo === path.id ? null : path.id)}
            className="absolute right-2 top-2 p-2 px-3 text-sm font-medium text-amber-900 dark:text-amber-100 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg"
          >
            See prompt
          </button>
          {selectedInfo === path.id && (
            <div
              className="mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: marked(path.template.split('\n').slice(2).join('\n')) }} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
