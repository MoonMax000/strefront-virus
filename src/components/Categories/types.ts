import { CardSize } from '../CategoryCard/types';

export interface CategoriesStylesConfig {
  grid: string;
}

export interface CategoriesProps {
  className?: string;
  sliceCount?: number;
  cardSize?: CardSize;
}
