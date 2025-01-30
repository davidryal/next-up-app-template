import { IconType } from 'react-icons';
import { FaCode, FaDatabase, FaDesktop, FaMobile } from 'react-icons/fa';
import { SiSupabase, SiFirebase, SiMongodb, SiAuth0, SiNextdotjs, SiChakraui, SiMui, SiTailwindcss } from 'react-icons/si';

export interface Stack {
  id: string;
  title: string;
  description: string;
  iconName: string;
  complexity: 'beginner' | 'intermediate' | 'expert';
}

export const stacks: Stack[] = [
  {
    id: 'postgres',
    title: 'PostgreSQL',
    description: 'Powerful open-source SQL database',
    iconName: 'database',
    complexity: 'intermediate',
  },
  {
    id: 'mysql',
    title: 'MySQL',
    description: 'Popular open-source SQL database',
    iconName: 'database',
    complexity: 'intermediate',
  },
  {
    id: 'mongodb',
    title: 'MongoDB',
    description: 'NoSQL document database',
    iconName: 'database',
    complexity: 'intermediate',
  },
  {
    id: 'next-auth',
    title: 'NextAuth.js',
    description: 'Complete auth solution for Next.js',
    iconName: 'nextjs',
    complexity: 'intermediate',
  },
  {
    id: 'clerk',
    title: 'Clerk',
    description: 'Authentication & user management',
    iconName: 'code',
    complexity: 'beginner',
  },
  {
    id: 'custom',
    title: 'Custom Auth',
    description: 'Build your own auth system',
    iconName: 'code',
    complexity: 'expert',
  },
  {
    id: 'tailwind',
    title: 'Tailwind CSS',
    description: 'Utility-first CSS framework',
    iconName: 'code',
    complexity: 'beginner',
  },
  {
    id: 'chakra',
    title: 'Chakra UI',
    description: 'Modular component library',
    iconName: 'code',
    complexity: 'intermediate',
  },
  {
    id: 'mui',
    title: 'Material-UI',
    description: 'Google Material Design components',
    iconName: 'code',
    complexity: 'intermediate',
  },
];
