'use client';

import React from 'react';
import * as Icons from 'lucide-react';

interface DynamicIconProps {
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
};

export function DynamicIcon({ name, size = 24, className = '' }: DynamicIconProps): JSX.Element {
  const IconComponent = iconMap[name] || Icons.Code;
  
  return <IconComponent size={size} className={className} />;
}
