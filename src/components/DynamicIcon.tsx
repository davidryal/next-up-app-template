'use client';

import React from 'react';
import * as Ri from 'react-icons/ri';
import type { IconType } from 'react-icons';

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

const iconMap: Record<string, IconType> = {
  'desktop': Ri.RiComputerLine,
  'smartphone': Ri.RiSmartphoneLine,
  'code': Ri.RiCodeLine,
  'check': Ri.RiCheckLine,
  'sun': Ri.RiSunLine,
  'moon': Ri.RiMoonLine,
  'book': Ri.RiBookLine,
  'database': Ri.RiDatabase2Line,
  'lock': Ri.RiLockLine,
  'cloud': Ri.RiCloudLine,
  'ai': Ri.RiBrainLine,
};

export function DynamicIcon({ name, size = 24, className = '' }: DynamicIconProps): React.ReactNode {
  const Icon = iconMap[name] || Ri.RiQuestionLine;
  return React.createElement(Icon, { size, className });
}
