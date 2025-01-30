'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import type { AppPath } from '@/lib/paths';
import { PathSelector } from './PathSelector';
import { ProjectWizard } from './ProjectWizard';
import { stacks } from '@/lib/stacks';

interface TemplateBuilderProps {
  paths: AppPath[];
}

export function TemplateBuilder({ paths }: TemplateBuilderProps): JSX.Element {
  const [selectedPath, setSelectedPath] = React.useState<string | null>(null);
  const [command, setCommand] = React.useState('');
  const [selections, setSelections] = React.useState<Record<string, string[]>>({
    platform: ['web']
  });
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>([]);
  const [isExpertMode, setIsExpertMode] = React.useState(false); // Add isExpertMode state

  const platforms = [
    { id: 'web', label: 'Web', description: 'Build for browsers' },
    { id: 'mobile', label: 'Mobile', description: 'iOS and Android apps' },
    { id: 'desktop', label: 'Desktop', description: 'Windows, Mac, Linux' },
  ];

  const handlePathSelect = (pathId: string) => {
    setSelectedPath(pathId);
    updateCommand(pathId, selections, selectedPlatforms);
  };

  const handleSelectionsChange = (newSelections: Record<string, string[]>) => {
    setSelections(newSelections);
    updateCommand(selectedPath, newSelections, selectedPlatforms);
  };

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => {
      const newPlatforms = prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId];
      updateCommand(selectedPath, selections, newPlatforms);
      return newPlatforms;
    });
  };

  const updateCommand = (
    pathId: string | null,
    stackSelections: Record<string, string[]>,
    platforms: string[]
  ) => {
    if (!pathId) {
      setCommand('');
      return;
    }

    const stackArgs = Object.entries(stackSelections)
      .map(([key, value]) => `--${key} ${value.join(',')}`)
      .join(' ');

    const platformArgs = platforms.length > 0
      ? `--platform ${platforms.join(',')}`
      : '';

    setCommand(`npx create-next-app@latest --template ${pathId} ${stackArgs} ${platformArgs}`.trim());
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-4xl font-bold text-center mb-12">
        Next.js Project Builder
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Left column - Template Selection */}
        <div>
          <h2 className="text-2xl font-semibold mb-6"> Step 4. Choose Template</h2>
          <PathSelector
            paths={paths}
            selectedPath={selectedPath}
            onSelect={handlePathSelect}
          />
        </div>

        {/* Middle column - Stack Selection */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Step 3. Configure Stack</h2>
          {selectedPath ? (
            <ProjectWizard
              templatePath={selectedPath}
              onCommandChange={setCommand}
              onSelectionsChange={handleSelectionsChange}
              isExpertMode={isExpertMode !== undefined ? isExpertMode : undefined} // Ensure optional prop is passed
            />
          ) : (
            <div className="text-gray-500 dark:text-gray-400">
              Select a template to configure your stack
            </div>
          )}
        </div>

        {/* Right column - Platform Selection & Command */}
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Target Platforms</h2>
            <div className="space-y-4">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformToggle(platform.id)}
                  className={`
                    w-full text-left p-4 rounded-lg border transition-colors
                    ${selectedPlatforms.includes(platform.id)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{platform.label}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {platform.description}
                      </p>
                    </div>
                    {selectedPlatforms.includes(platform.id) && (
                      <svg
                        className="w-5 h-5 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {command && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Create Project</h2>
              <div className="p-4 bg-gray-900 text-gray-100 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">
                  Run this command in your terminal:
                </p>
                <code className="block whitespace-pre-wrap break-all font-mono text-sm">
                  {command}
                </code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
