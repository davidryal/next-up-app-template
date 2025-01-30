'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';

export interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  'monitor': LucideIcons.Monitor,
  'smartphone': LucideIcons.Smartphone,
  'code': LucideIcons.Code,
  'check': LucideIcons.Check,
  'sun': LucideIcons.Sun,
  'moon': LucideIcons.Moon,
  'book': LucideIcons.Book,
  'database': LucideIcons.Database,
  'lock': LucideIcons.Lock,
  'cloud': LucideIcons.Cloud,
  'chart': LucideIcons.LineChart,
  'brain': LucideIcons.Brain,
  'server': LucideIcons.Server,
  'layout': LucideIcons.Layout,
  'ai': LucideIcons.Cpu,
  'desktop': LucideIcons.Monitor
};

export function DynamicIcon({ name, size = 24, className = '' }: DynamicIconProps): JSX.Element {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const IconComponent = iconMap[name] || LucideIcons.Code;
  
  // Prevent hydration mismatch by rendering nothing until mounted
  if (!mounted && (name === 'sun' || name === 'moon')) {
    return null;
  }
  
  if (!IconComponent) {
    return <></>;
  }

  return <IconComponent data-testid="dynamic-icon" size={size} className={className} />;
}
