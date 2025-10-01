import { CardSize, CategoryCardStyles } from './types';

export const styles: Record<CardSize, CategoryCardStyles> = {
  md: {
    titleSize: 'text-[15px]',
    width: 'max-w-[175px]',
    height: 'max-h-[233px]',
  },
  lg: {
    titleSize: 'text-[19px]',
    width: 'max-w-[215px]',
    height: 'max-h-[280px]',
  },
};
