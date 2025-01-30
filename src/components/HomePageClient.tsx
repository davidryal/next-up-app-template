'use client';

import React from 'react';
import { DynamicIcon } from './DynamicIcon';
import { PathSelector } from './PathSelector';
import { ProjectWizard } from './ProjectWizard';
import type { AppPath } from '@/lib/paths';

interface HomePageProps {
  paths: AppPath[];
}

export function HomePageClient({ paths }: HomePageProps): React.ReactNode {
  const [selectedPath, setSelectedPath] = React.useState<string | null>(null);
  const [command, setCommand] = React.useState('');
  const [selections, setSelections] = React.useState<Record<string, string[]>>({});
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>([]);

  const platforms = [
    { id: 'web', label: 'Web', description: 'Standard Next.js', icon: 'desktop' },
    { id: 'mobile', label: 'Mobile', description: 'React Native with Expo', icon: 'smartphone' },
    { id: 'desktop', label: 'Desktop', description: 'Tauri Integration', icon: 'desktop' },
  ];

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => {
      const newPlatforms = prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId];
      
      const newSelections = { ...selections, platform: newPlatforms };
      setSelections(newSelections);
      return newPlatforms;
    });
  };

  const handlePathSelect = (pathId: string) => {
    setSelectedPath(pathId);
    // Reset selections when path changes
    setSelections({});
    setSelectedPlatforms([]);
    setCommand('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            All-in-one Next App
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Build virtually anything - from simple static sites to complex full-stack applications.
            Your perfect tech stack is just a few clicks away.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Choose Template</h2>
            <PathSelector
              paths={paths}
              selectedPath={selectedPath}
              onSelect={handlePathSelect}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Configure Stack</h2>
            <ProjectWizard
              templatePath={selectedPath || 'blank'}
              onCommandChange={setCommand}
              onSelectionsChange={setSelections}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Choose Platform</h2>
            <div className="space-y-2">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformToggle(platform.id)}
                  className={`
                    w-full text-left p-3 rounded-lg border transition-colors
                    ${selectedPlatforms.includes(platform.id)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-xl text-gray-600 dark:text-gray-400">
                        <DynamicIcon name={platform.icon} size={20} />
                      </div>
                      <div>
                        <div className="font-medium">{platform.label}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {platform.description}
                        </div>
                      </div>
                    </div>
                    {selectedPlatforms.includes(platform.id) && (
                      <DynamicIcon name="check" size={20} className="text-blue-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Create Your Project</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Run this command in your terminal to create your project:
          </p>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{command || `npx create-next-app@latest --template ${selectedPath || 'blank'}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
