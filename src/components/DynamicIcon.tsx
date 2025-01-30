'use client';

import React from 'react';
import * as Icons from 'lucide-react';

export interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  'monitor': Icons.Monitor,
  'smartphone': Icons.Smartphone,
  'code': Icons.Code,
  'check': Icons.Check,
  'sun': Icons.Sun,
  'moon': Icons.Moon,
  'book': Icons.Book,
  'database': Icons.Database,
  'lock': Icons.Lock,
  'cloud': Icons.Cloud,
  'chart': Icons.LineChart,
  'brain': Icons.Brain,
  'server': Icons.Server,
  'layout': Icons.Layout,
  'ai': Icons.Cpu,
  'desktop': Icons.Monitor
};

export function DynamicIcon({ name, size = 24, className = '' }: DynamicIconProps): JSX.Element {
  // Use useEffect to ensure client-side only rendering for theme-related icons
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const IconComponent = iconMap[name] || Icons.Code;
  
  // Prevent hydration mismatch by rendering nothing until mounted
  if (!mounted && (name === 'sun' || name === 'moon')) {
    return <span className={className} style={{ width: size, height: size }} />;
  }
  
  return <IconComponent size={size} className={className} />;
}
