import { CardSize } from '../CategoryCard/types';
import { CategoriesStylesConfig } from './types';

export const styles: Record<CardSize, CategoriesStylesConfig> = {
  md: {
    grid: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8', //измкеить когда будет мобилка для главной
  },
  lg: {
    grid: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7',
  },
};
