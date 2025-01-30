'use client';

import React from 'react';
import { DynamicIcon } from './DynamicIcon';

interface ProjectWizardProps {
  templatePath: string;
  onCommandChange: (command: string) => void;
  onSelectionsChange: (selections: Record<string, string[]>) => void;
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
}: ProjectWizardProps): React.ReactNode {
  const [isExpertMode, setIsExpertMode] = React.useState(false);
  const [justClicked, setJustClicked] = React.useState<string | null>(null);
  const [selection, setSelection] = React.useState<Record<string, string[]>>({});

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
      id: 'web3',
      title: 'Web3/Wallet',
      description: 'Crypto wallet authentication',
      iconName: 'lock',
      complexity: 'expert',
    },
    {
      id: 'auth0',
      title: 'Auth0',
      description: 'Enterprise-grade authentication',
      iconName: 'lock',
      complexity: 'beginner',
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
    {
      id: 'custom',
      title: 'Custom Tailwind',
      description: 'Build your own design system',
      iconName: 'code',
      complexity: 'expert',
    },
  ];

  const ai: Option[] = [
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
      id: 'replicate',
      title: 'Replicate',
      description: 'Open source AI models',
      iconName: 'ai',
      complexity: 'expert',
    },
    {
      id: 'custom',
      title: 'Custom/None',
      description: 'Build your own AI integration',
      iconName: 'code',
      complexity: 'expert',
    },
  ];

  const hosting: Option[] = [
    {
      id: 'vercel',
      title: 'Vercel',
      description: 'Zero config deployments',
      iconName: 'cloud',
      complexity: 'beginner',
    },
    {
      id: 'local',
      title: 'Local Only',
      description: 'Development environment only',
      iconName: 'desktop',
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

  const steps: Step[] = [
    { id: 'database', title: 'Database', options: databases },
    { id: 'auth', title: 'Authentication', options: auth },
    { id: 'ui', title: 'UI Framework', options: ui },
    { id: 'ai', title: 'AI Integration', options: ai },
    { id: 'hosting', title: 'Hosting', options: hosting },
  ];

  // Helper function to get default selection for a step based on mode
  const getDefaultSelection = (options: Option[]): string => {
    const sortedOptions = sortOptions(options);
    return sortedOptions[0].id;
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

  const sortOptions = (options: Option[]) => {
    return [...options].sort((a, b) => {
      const complexityOrder = { beginner: 0, intermediate: 1, expert: 2 };
      if (isExpertMode) {
        return complexityOrder[b.complexity] - complexityOrder[a.complexity];
      }
      return complexityOrder[a.complexity] - complexityOrder[b.complexity];
    });
  };

  return React.createElement('div', { className: 'space-y-6' }, [
    React.createElement('button', {
      key: 'mode-toggle',
      onClick: () => setIsExpertMode(!isExpertMode),
      className: 'w-full p-4 rounded-lg border transition-colors bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 border-amber-200 dark:border-amber-800',
      children: React.createElement('div', {
        className: 'flex items-center justify-between',
        children: [
          React.createElement('div', {
            key: 'left',
            className: 'flex items-center space-x-3',
            children: [
              React.createElement(DynamicIcon, {
                key: 'icon',
                name: isExpertMode ? 'code' : 'book',
                size: 24,
                className: 'text-amber-600 dark:text-amber-400'
              }),
              React.createElement('div', {
                key: 'text',
                className: 'text-left',
                children: [
                  React.createElement('h4', {
                    key: 'title',
                    className: 'font-medium text-amber-900 dark:text-amber-100',
                    children: isExpertMode ? 'Expert Mode' : 'Beginner Mode'
                  }),
                  React.createElement('p', {
                    key: 'description',
                    className: 'text-sm text-amber-700 dark:text-amber-300',
                    children: isExpertMode ? 'Advanced options first' : 'Guided setup with explanations'
                  })
                ]
              })
            ]
          }),
          React.createElement(DynamicIcon, {
            key: 'check',
            name: isExpertMode ? 'code' : 'check',
            size: 20,
            className: 'text-amber-600 dark:text-amber-400'
          })
        ]
      })
    }),

    ...steps.map((step, stepIndex) => {
      const sortedOptions = sortOptions(step.options);
      return React.createElement('div', {
        key: step.id,
        className: 'space-y-4',
        children: [
          React.createElement('h3', {
            className: 'text-lg font-medium text-gray-900 dark:text-gray-100',
            children: step.title
          }),
          React.createElement('div', {
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
                  className: 'flex items-center justify-between',
                  children: [
                    React.createElement('div', {
                      key: 'content',
                      className: 'flex items-center space-x-3',
                      children: [
                        React.createElement('div', {
                          key: 'icon',
                          className: 'text-xl text-gray-600 dark:text-gray-400',
                          children: React.createElement(DynamicIcon, {
                            name: option.iconName,
                            size: 24
                          })
                        }),
                        React.createElement('div', {
                          key: 'text',
                          children: [
                            React.createElement('div', {
                              key: 'title-complexity',
                              className: 'flex items-center space-x-2',
                              children: [
                                React.createElement('h4', {
                                  key: 'title',
                                  className: 'font-medium',
                                  children: option.title
                                }),
                                React.createElement('span', {
                                  key: 'complexity',
                                  className: `
                                    text-xs px-2 py-0.5 rounded-full
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
                    }),
                    isSelected && React.createElement(DynamicIcon, {
                      key: 'check',
                      name: 'check',
                      size: 20,
                      className: 'text-blue-500'
                    })
                  ]
                })
              });
            })
          })
        ]
      });
    })
  ]);
}
