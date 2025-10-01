'use client';

import React from 'react';
import { useTabs } from './Tabs';
import { TabsContentProps } from './types';

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className }) => {
  const { activeTab } = useTabs();

  const isTabActive = activeTab === value;

  return isTabActive ? <div className={className}>{children}</div> : null;
};