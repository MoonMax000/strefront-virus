export type CardSize = 'md' | 'lg';
export interface CategoryCardProps {
  preview: string;
  name: string;
  viewersCount: string;
  category: string;
  size?: CardSize;
}
export interface CategoryCardStyles {
  titleSize: string;
  width: string;
  height: string;
}
