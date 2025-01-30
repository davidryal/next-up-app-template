'use client';

import React from 'react';
import { DynamicIcon } from './DynamicIcon';

interface ProjectWizardProps {
  templatePath: string;
  onCommandChange: (command: string) => void;
  onSelectionsChange: (selections: Record<string, string[]>) => void;
  isExpertMode: boolean;
}

interface Option {
  id: string;
  title: string;
  description: string;
  iconName: string;
  complexity: 'beginner' | 'intermediate' | 'expert';
}

interface Step {
  id: string;
  title: string;
  options: Option[];
}

export function ProjectWizard({
  templatePath,
  onCommandChange,
  onSelectionsChange,
  isExpertMode,
}: ProjectWizardProps): JSX.Element {
  const [justClicked, setJustClicked] = React.useState<string | null>(null);
  const [selection, setSelection] = React.useState<Record<string, string[]>>({});
  const [activeTab, setActiveTab] = React.useState<string>('hosting');

  const databases: Option[] = [
    {
      id: 'prisma',
      title: 'Prisma + PostgreSQL',
      description: 'Full-featured ORM with type safety',
      iconName: 'database',
      complexity: 'beginner',
    },
    {
      id: 'drizzle',
      title: 'Drizzle',
      description: 'Lightweight and high-performance',
      iconName: 'database',
      complexity: 'expert',
    },
    {
      id: 'mongodb',
      title: 'MongoDB + Mongoose',
      description: 'Flexible schema design',
      iconName: 'database',
      complexity: 'intermediate',
    },
    {
      id: 'supabase',
      title: 'Supabase',
      description: 'Open source Firebase alternative',
      iconName: 'database',
      complexity: 'beginner',
    },
    {
      id: 'firebase',
      title: 'Firebase',
      description: "Google's app development platform",
      iconName: 'database',
      complexity: 'beginner',
    },
  ];

  const auth: Option[] = [
    {
      id: 'next-auth',
      title: 'NextAuth.js',
      description: 'Complete auth solution for Next.js',
      iconName: 'lock',
      complexity: 'beginner',
    },
    {
      id: 'firebase-auth',
      title: 'Firebase Auth',
      description: 'Authentication with multiple providers',
      iconName: 'lock',
      complexity: 'beginner',
    },
    {
      id: 'magic-links',
      title: 'Magic Links',
      description: 'Passwordless email authentication',
      iconName: 'lock',
      complexity: 'intermediate',
    },
    {
      id: 'auth0',
      title: 'Auth0',
      description: 'Enterprise-grade authentication',
      iconName: 'lock',
      complexity: 'intermediate',
    },
    {
      id: 'web3',
      title: 'Web3/Wallet',
      description: 'Crypto wallet authentication',
      iconName: 'lock',
      complexity: 'expert',
    },
  ];

  const ui: Option[] = [
    {
      id: 'tailwind',
      title: 'Tailwind CSS',
      description: 'Utility-first CSS framework',
      iconName: 'code',
      complexity: 'beginner',
    },
    {
      id: 'mui',
      title: 'Material UI',
      description: 'Google Material Design components',
      iconName: 'code',
      complexity: 'intermediate',
    },
    {
      id: 'chakra',
      title: 'Chakra UI',
      description: 'Modular component library',
      iconName: 'code',
      complexity: 'intermediate',
    },
    {
      id: 'shadcn',
      title: 'shadcn/ui',
      description: 'High-quality, accessible components',
      iconName: 'code',
      complexity: 'expert',
    },
  ];

  const ai: Option[] = [
    {
      id: 'none',
      title: 'None/Custom',
      description: 'Build your own AI integration',
      iconName: 'code',
      complexity: 'beginner'
    },
    {
      id: 'openai',
      title: 'OpenAI',
      description: 'GPT-4 and DALL-E integration',
      iconName: 'ai',
      complexity: 'beginner',
    },
    {
      id: 'anthropic',
      title: 'Anthropic',
      description: 'Claude integration',
      iconName: 'ai',
      complexity: 'intermediate',
    },
    {
      id: 'openrouter',
      title: 'OpenRouter',
      description: 'AI model aggregation platform',
      iconName: 'ai',
      complexity: 'intermediate',
    },
    {
      id: 'replicate',
      title: 'Replicate',
      description: 'Open source AI models',
      iconName: 'ai',
      complexity: 'expert',
    },
  ];

  const hosting: Option[] = [
    {
      id: 'local',
      title: 'Local Only',
      description: 'Development environment only',
      iconName: 'desktop',
      complexity: 'beginner',
    },
    {
      id: 'vercel',
      title: 'Vercel',
      description: 'Zero config deployments',
      iconName: 'cloud',
      complexity: 'beginner',
    },
    {
      id: 'aws',
      title: 'AWS Amplify',
      description: 'Full-stack deployment on AWS',
      iconName: 'cloud',
      complexity: 'intermediate',
    },
    {
      id: 'docker',
      title: 'Docker + Custom',
      description: 'Containerized deployment',
      iconName: 'cloud',
      complexity: 'expert',
    },
  ];

  const analytics: Option[] = [
    {
      id: 'none',
      title: 'None/Custom',
      description: 'Build your own analytics integration',
      iconName: 'code',
      complexity: 'beginner'
    },
    {
      id: 'google-analytics',
      title: 'Google Analytics',
      description: 'Web analytics service',
      iconName: 'chart',
      complexity: 'beginner',
    },
    {
      id: 'plausible',
      title: 'Plausible',
      description: 'Open-source analytics',
      iconName: 'chart',
      complexity: 'intermediate',
    },
    {
      id: 'umami',
      title: 'Umami',
      description: 'Self-hosted analytics',
      iconName: 'chart',
      complexity: 'expert',
    },
  ];

  const steps: Step[] = [
    { id: 'hosting', title: 'Hosting', options: hosting },
    { id: 'database', title: 'Database', options: databases },
    { id: 'auth', title: 'Authentication', options: auth },
    { id: 'ui', title: 'UI Framework', options: ui },
    { id: 'ai', title: 'AI Integration', options: ai },
    { id: 'analytics', title: 'Analytics', options: analytics },
  ];

  // Helper function to get default selection for a step based on mode
  const getDefaultSelection = (options: Option[]): string => {
    const sortedOptions = sortOptions(options);
    return sortedOptions[0].id;
  };

  // Helper function to sort options based on mode
  const sortOptions = (options: Option[]): Option[] => {
    if (!isExpertMode) {
      return options.sort((a, b) => {
        // Special case for hosting: local should always be first in beginner mode
        if (options === hosting) {
          if (a.id === 'local') return -1;
          if (b.id === 'local') return 1;
        }
        // Special case for AI and Analytics: none/custom should be first in beginner mode
        if ((options === ai || options === analytics) && (a.id === 'none' || b.id === 'none')) {
          if (a.id === 'none') return -1;
          if (b.id === 'none') return 1;
        }
        return a.complexity === 'beginner' ? -1 : 
               b.complexity === 'beginner' ? 1 : 
               a.complexity === 'intermediate' ? -1 : 
               b.complexity === 'intermediate' ? 1 : 0;
      });
    }
    return options.sort((a, b) => {
      // Special case for hosting: local should still be first
      if (options === hosting) {
        if (a.id === 'local') return -1;
        if (b.id === 'local') return 1;
      }
      return a.complexity === 'expert' ? -1 : 
             b.complexity === 'expert' ? 1 : 
             a.complexity === 'intermediate' ? -1 : 
             b.complexity === 'intermediate' ? 1 : 0;
    });
  };

  // Initialize default selections when mode changes or component mounts
  React.useEffect(() => {
    const defaultSelections = steps.reduce((acc, step) => {
      acc[step.id] = [getDefaultSelection(step.options)];
      return acc;
    }, {} as Record<string, string[]>);

    setSelection(defaultSelections);
    onSelectionsChange(defaultSelections);

    const command = `npx create-next-app@latest --template ${templatePath}${
      Object.entries(defaultSelections)
        .map(([key, value]) => value[0] ? ` --${key} ${value[0]}` : '')
        .join('')
    }`;
    onCommandChange(command);
  }, [isExpertMode, templatePath]);

  const handleSelect = (stepId: string, optionId: string) => {
    const newSelection = {
      ...selection,
      [stepId]: [optionId],
    };

    setSelection(newSelection);
    onSelectionsChange(newSelection);
    
    setJustClicked(optionId);
    setTimeout(() => setJustClicked(null), 1000);

    const command = `npx create-next-app@latest --template ${templatePath}${
      Object.entries(newSelection)
        .map(([key, value]) => value[0] ? ` --${key} ${value[0]}` : '')
        .join('')
    }`;
    onCommandChange(command);
  };

  return React.createElement('div', {
    key: 'wizard',
    className: 'space-y-6',
    children: [
      // Tab navigation
      React.createElement('div', {
        key: 'tabs',
        className: 'flex flex-wrap gap-2 mb-6',
        children: steps.map(step => 
          React.createElement('button', {
            key: step.id,
            onClick: () => setActiveTab(step.id),
            className: `
              px-3 py-1.5 text-sm font-medium rounded-full transition-colors
              ${activeTab === step.id 
                ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-500/50'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'}
            `,
            children: [
              React.createElement(DynamicIcon, {
                key: 'icon',
                name: step.id === 'database' ? 'database' :
                      step.id === 'auth' ? 'lock' :
                      step.id === 'ui' ? 'layout' :
                      step.id === 'ai' ? 'brain' :
                      step.id === 'hosting' ? 'server' :
                      'chart',
                size: 14,
                className: 'inline-block mr-1.5 -mt-0.5'
              }),
              step.title
            ]
          })
        )
      }),

      // Active tab content
      React.createElement('div', {
        key: 'content',
        className: 'space-y-4',
        children: steps
          .filter(step => step.id === activeTab)
          .map(step => {
            const sortedOptions = sortOptions(step.options);
            return React.createElement('div', {
              key: step.id,
              className: 'space-y-2',
              children: sortedOptions.map(option => {
                const isSelected = selection[step.id]?.[0] === option.id || justClicked === option.id;
                return React.createElement('button', {
                  key: option.id,
                  onClick: () => handleSelect(step.id, option.id),
                  className: `
                    w-full text-left p-4 rounded-lg border transition-colors
                    ${isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                    }
                  `,
                  children: React.createElement('div', {
                    key: 'content',
                    className: 'flex items-start space-x-3',
                    children: [
                      React.createElement('div', {
                        key: 'icon',
                        className: 'text-xl text-gray-600 dark:text-gray-400 pt-0.5',
                        children: React.createElement(DynamicIcon, {
                          key: 'icon',
                          name: option.iconName,
                          size: 20
                        })
                      }),
                      React.createElement('div', {
                        key: 'text',
                        className: 'flex-1 min-w-0',
                        children: [
                          React.createElement('div', {
                            key: 'title-complexity',
                            className: 'flex items-center',
                            children: [
                              React.createElement('span', {
                                key: 'title',
                                className: 'font-medium',
                                children: option.title
                              }),
                              React.createElement('span', {
                                key: 'complexity',
                                className: `
                                  ml-2 px-2 py-0.5 text-xs rounded-full
                                  ${option.complexity === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                                    option.complexity === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                                    'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'}
                                `,
                                children: option.complexity
                              })
                            ]
                          }),
                          React.createElement('p', {
                            key: 'description',
                            className: 'text-sm text-gray-600 dark:text-gray-400',
                            children: option.description
                          })
                        ]
                      })
                    ]
                  })
                });
              })
            });
          })
      })
    ]
  });
}
