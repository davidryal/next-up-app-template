'use client';

import * as React from 'react';
import { PathSelector } from './PathSelector';
import { ProjectWizard } from './ProjectWizard';
import type { AppPath } from '@/lib/paths';

interface ProjectBuilderClientProps {
  paths: AppPath[];
}

export function ProjectBuilderClient({ paths }: ProjectBuilderClientProps): JSX.Element {
  const [selectedPath, setSelectedPath] = React.useState<string | null>(null);
  const [command, setCommand] = React.useState<string>('');
  const [selections, setSelections] = React.useState<Record<string, string>>({});

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
              value={selections.platform || ''}
              onChange={(e) => setSelections({ ...selections, platform: e.target.value })}
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
          <h3 className="text-lg font-semibold mb-2">Create Your Project</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Run this command in your terminal to create your project:
          </p>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{command}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
