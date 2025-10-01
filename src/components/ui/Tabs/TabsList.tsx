import React from 'react';
import clsx from 'clsx';
import { TabsListProps } from './types';

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  return <div className={clsx(className, 'flex border-b border-white border-opacity-10 space-x-4')}>{children}</div>;
};