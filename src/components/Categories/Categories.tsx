import { FC } from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';
import clsx from 'clsx';
import { CategoriesProps } from './types';
import { mockCategory } from './mock';
import { styles } from './constants';

const Categories: FC<CategoriesProps> = ({ className, sliceCount, cardSize = 'lg' }) => {
  return (
    <section className={clsx('flex flex-col mt-8 ml-7 pb-6 overflow-hidden', className)}>
      <div className={clsx('grid  gap-4 overflow-y-auto w-full', styles[cardSize].grid)}>
        {mockCategory.slice(0, sliceCount ? sliceCount : mockCategory.length).map((el, index) => {
          return (
            <CategoryCard
              key={index}
              viewersCount={el.viewersCount}
              preview={el.preview}
              name={el.name}
              category={el.category}
              size={cardSize}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
