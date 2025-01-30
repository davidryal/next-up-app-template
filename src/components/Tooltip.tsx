'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ 
  content, 
  children, 
  position = 'top',
  ...props 
}: TooltipProps): JSX.Element {
  const [isVisible, setIsVisible] = React.useState(false);

  const positionClasses = {
    top: '-top-2 left-1/2 -translate-x-1/2 -translate-y-full',
    bottom: 'top-full left-1/2 -translate-x-1/2',
    left: 'top-1/2 right-full -translate-y-1/2 -translate-x-2',
    right: 'top-1/2 left-full -translate-y-1/2 translate-x-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      {...props}
    >
      {children}
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={`absolute z-50 ${positionClasses[position]} pointer-events-none`}
          >
            <div className="px-2 py-1 text-sm bg-gray-900 text-white rounded shadow-lg whitespace-nowrap">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
