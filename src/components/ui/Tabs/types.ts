import React from 'react';

export interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}