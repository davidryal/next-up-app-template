'use client';

import * as React from 'react';
import { DynamicIcon } from './DynamicIcon';
import { PathSelector } from './PathSelector';
import { ProjectWizard } from './ProjectWizard';
import type { AppPath } from '@/lib/paths';
import { useTheme } from 'next-themes';

interface HomePageProps {
  paths: AppPath[];
}

interface Platform {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export function HomePageClient({ paths }: HomePageProps): JSX.Element {
  const [selectedPath, setSelectedPath] = React.useState<string | null>(null);
  const [command, setCommand] = React.useState<string>('');
  const [selections, setSelections] = React.useState<Record<string, string[]>>({});
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>(['web']);
  const [isExpertMode, setIsExpertMode] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const { theme = 'light', setTheme } = useTheme();

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme || 'light');
  }, [theme]);

  const platforms: Platform[] = [
    { id: 'web', label: 'Web', description: 'Standard Next.js', icon: 'desktop' },
    { id: 'mobile', label: 'Mobile', description: 'React Native with Expo', icon: 'smartphone' },
    { id: 'desktop', label: 'Desktop', description: 'Tauri Integration', icon: 'desktop' },
  ];

  const handlePlatformToggle = (platformId: string): void => {
    if (platformId === 'web') return; // Web is required
    setSelectedPlatforms((prev: string[]) => {
      const newPlatforms = prev.includes(platformId)
        ? prev.filter((p: string) => p !== platformId)
        : [...prev, platformId];
      
      const newSelections = { ...selections, platform: newPlatforms };
      setSelections(newSelections);
      return newPlatforms;
    });
  };

  const handlePathSelect = (pathId: string): void => {
    setSelectedPath(pathId);
    
    // Ensure web platform is always present, but don't remove other platforms
    const currentPlatforms = selectedPlatforms.includes('web') 
      ? selectedPlatforms 
      : [...selectedPlatforms, 'web'];
    setSelectedPlatforms(currentPlatforms);
    
    // Preserve existing selections
    const updatedSelections = { ...selections };
    setSelections(updatedSelections);
    
    // Reset command to trigger recalculation with new template
    setCommand('');
  };

  React.useEffect(() => {
    if (selectedPath) {
      let baseCommand = `npx create-next-app@latest --template ${selectedPath}`;
      
      if (selectedPlatforms.includes('mobile')) {
        baseCommand += ' --mobile';
      }
      if (selectedPlatforms.includes('desktop')) {
        baseCommand += ' --desktop';
      }
      
      Object.entries(selections).forEach(([category, selected]) => {
        if (category !== 'platform' && selected.length > 0 && !selected.includes('custom')) {
          selected.forEach(option => {
            baseCommand += ` --${category} ${option}`;
          });
        }
      });
      
      setCommand(baseCommand);
    }
  }, [selectedPath, selectedPlatforms, selections]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30">
      <div className="max-w-[1600px] mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-sm"
              aria-label="Toggle theme"
            >
              <DynamicIcon name={theme === 'dark' ? 'sun' : 'moon'} size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent sm:text-5xl mb-4 animate-gradient">
            Next Up - The Universal App Template
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Build virtually anything, from static sites to full-stack apps.
            Your perfect tech stack awaits.
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Column 1: Mode and Platform Selection */}
            <div className="space-y-8 bg-white/60 dark:bg-gray-800/40 p-6 rounded-xl backdrop-blur-sm">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Step 1. Confirm Development Mode</h2>
                <button
                  onClick={() => setIsExpertMode(!isExpertMode)}
                  className="w-full flex items-center justify-between p-4 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/20"
                >
                  <div className="flex items-center space-x-3">
                    <DynamicIcon
                      name={isExpertMode ? 'code' : 'lightbulb'}
                      size={24}
                      className="text-amber-600 dark:text-amber-400"
                    />
                    <div>
                      <div className="font-medium text-amber-900 dark:text-amber-100">
                        {isExpertMode ? 'Expert Mode' : 'Guided Mode'}
                      </div>
                      <div className="text-sm text-amber-700 dark:text-amber-300">
                        {isExpertMode ? 'Advanced options first' : 'Guided setup with explanations'}
                      </div>
                    </div>
                  </div>
                  <DynamicIcon
                    name={isExpertMode ? 'code' : 'check'}
                    size={20}
                    className="text-amber-600 dark:text-amber-400"
                  />
                </button>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Step 2. Choose Platform(s)</h2>
                <div className="space-y-2">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => handlePlatformToggle(platform.id)}
                      disabled={platform.id === 'web'} // Disable web option
                      className={`
                        w-full text-left p-4 rounded-lg border transition-colors
                        ${platform.id === 'web' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500' : ''}
                        ${selectedPlatforms.includes(platform.id)
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'}
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
                        {(selectedPlatforms.includes(platform.id) || platform.id === 'web') && (
                          <DynamicIcon name="check" size={20} className="text-blue-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Stack Configuration */}
            <div className="space-y-4 bg-white/60 dark:bg-gray-800/40 p-6 rounded-xl backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">Step 3. Configure Stack</h2>
              <div className="space-y-2">
                <ProjectWizard
                  templatePath={selectedPath || 'blank'}
                  onCommandChange={setCommand}
                  onSelectionsChange={setSelections}
                  isExpertMode={isExpertMode}
                />
              </div>
            </div>

            {/* Column 3: Templates (only on xl screens) */}
            <div className="hidden xl:block bg-white/60 dark:bg-gray-800/40 p-6 rounded-xl backdrop-blur-sm">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Step 4.    Choose Template</h2>
                <div className="h-[440px] overflow-y-auto pr-2">
                  <PathSelector
                    paths={paths}
                    selectedPath={selectedPath}
                    onSelect={handlePathSelect}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Templates for medium screens */}
          <div className="xl:hidden bg-white/60 dark:bg-gray-800/40 p-6 rounded-xl backdrop-blur-sm">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Choose Template</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PathSelector
                  paths={paths?.slice(0, Math.ceil(paths?.length / 2))}
                  selectedPath={selectedPath}
                  onSelect={handlePathSelect}
                />
                <PathSelector
                  paths={paths?.slice(Math.ceil(paths?.length / 2))}
                  selectedPath={selectedPath}
                  onSelect={handlePathSelect}
                />
              </div>
            </div>
          </div>

          {/* Command section */}
          {command && (
            <div className="p-6 bg-white/80 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm shadow-sm">
              <div className="flex justify-between items-center">
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
                  w-full text-left mt-4 p-4 rounded-lg border transition-colors
                  ${isCopied 
                    ? 'bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-850'}
                `}
              >
                <pre className="overflow-x-auto"><code>{command}</code></pre>
              </button>
            </div>
          )}

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              <a href="https://davidryalanderson.com" className="hover:text-gray-600 dark:hover:text-gray-300">Built with 💜 in California</a>
              <span className="mx-2">|</span>
              <a href="https://buymeacoffee.com/gopug" className="hover:text-gray-600 dark:hover:text-gray-300">Buy me a ☕</a>
            </p>
            <p>Obviously Open Source</p>
          </div>
        </div>
      </div>
    </div>
  );
}
