'use client';

import * as React from 'react';
import { DynamicIcon } from './DynamicIcon';
import { PathSelector } from './PathSelector';
import { ProjectWizard } from './ProjectWizard';
import type { AppPath } from '@/lib/paths';

interface ProjectBuilderClientProps {
  paths: AppPath[];
}

export function ProjectBuilderClient({ paths }: ProjectBuilderClientProps): JSX.Element {
  const [selectedPath, setSelectedPath] = React.useState<string | null>(null);
  const [command, setCommand] = React.useState<string>('');
  const [selections, setSelections] = React.useState<Record<string, string[]>>({
    platform: ['web']
  });
  const [isCopied, setIsCopied] = React.useState(false);
  const [isExpertMode, setIsExpertMode] = React.useState(false); // Add isExpertMode state

  const handleCopyCommand = () => {
    if (command) {
      navigator.clipboard.writeText(command).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">1. Choose App Prompt</h2>
        <PathSelector
          paths={paths}
          selectedPath={selectedPath}
          onSelect={setSelectedPath}
        />
      </div>

      {selectedPath && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">2. Configure Your Stack</h2>
          <ProjectWizard
            templatePath={selectedPath}
            onCommandChange={setCommand}
            onSelectionsChange={setSelections}
            isExpertMode={isExpertMode !== undefined ? isExpertMode : undefined} // Ensure optional prop is passed
          />
        </div>
      )}

      <div className="space-y-4 md:col-span-2 lg:col-span-1">
        <h2 className="text-xl font-semibold mb-4">3. Platform Options</h2>
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium mb-2">Deployment Platform</h3>
            <select
              className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md"
              value={selections.platform?.[0] || ''}
              onChange={(e) => setSelections({ ...selections, platform: [e.target.value] })}
            >
              <option value="">Select Platform</option>
              <option value="vercel">Vercel</option>
              <option value="netlify">Netlify</option>
              <option value="aws">AWS Amplify</option>
            </select>
          </div>
        </div>
      </div>

      {command && (
        <div className="md:col-span-2 lg:col-span-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Step 5. Create Your Project</h3>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {isCopied ? 'Copied!' : 'Click to copy'}
            </span>
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(command).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
              });
            }}
            className={`
              w-full text-left p-3 rounded-lg border transition-colors
              ${isCopied 
                ? 'bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-850'}
            `}
          >
            <code className="break-all">{command}</code>
          </button>
        </div>
      )}
    </div>
  );
}
