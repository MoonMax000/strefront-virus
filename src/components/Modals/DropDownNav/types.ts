import { ComponentType, SVGProps } from 'react';

export interface MenuItem {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href?: string;
  action?: () => void;
}
