'use client';

import React from 'react';
import clsx from 'clsx';
import { useTabs } from './Tabs';
import { TabsTriggerProps } from './types';

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  className,
  onClick,
}) => {
  const { activeTab, setActiveTab } = useTabs();

  const handleClickTabTrigger = () => {
    if (onClick) {
      onClick();
    }

    setActiveTab(value);
  };

  const isTabActive = activeTab === value;

  return (
    <button
      className={clsx(
        className,
        'text-[17px] font-semibold px-4 py-1.5 border-b-4 border-transparent',
        {
          'border-b-purple': isTabActive,
          'opacity-45': !isTabActive,
        },
      )}
      onClick={handleClickTabTrigger}
    >
      {children}
    </button>
  );
};
