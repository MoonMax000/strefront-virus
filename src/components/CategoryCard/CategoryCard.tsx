'use client';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { CategoryCardProps } from './types';
import { styles } from './constants';

const CategoryCard: FC<CategoryCardProps> = ({
  preview,
  name,
  category,
  viewersCount,
  size = 'lg',
}) => {
  const { push } = useRouter();
  return (
    <div
      onClick={() => push(`/categories/${name}`)}
      className={clsx('w-full flex flex-col relative group cursor-pointer', styles[size].width)}
    >
      <div
        className={clsx(
          'relative max-h-[280px] h-full rounded-xl mb-3 overflow-hidden',
          styles[size].height,
        )}
      >
        <img
          src={preview}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          alt={name}
        />
        <div
          className='absolute inset-0 rounded-xl
          [mask-image:linear-gradient(to_bottom,transparent_10%,black_70%)]
          [-webkit-mask-image:linear-gradient(to_bottom,transparent_10%,black_70%)]
          backdrop-blur-sm
          bg-gradient-to-b from-black/20 via-black/10 to-transparent
          group-hover:bg-[linear-gradient(180deg,rgba(160,106,255,0)_0%,rgba(160,106,255,0.64)_100%)]
          transition-all duration-300'
        />
      </div>

      <div className='absolute bottom-5 left-3 right-3 z-10 flex flex-col gap-3'>
        <span className={clsx('line-clamp-1 text-white drop-shadow-md  font-bold', styles[size])}>
          {name}
        </span>
        <div className='flex flex-col gap-1'>
          <span className='font-bold text-[12px] text-white/90'>{viewersCount}</span>
          <span className='w-fit bg-[#523A83]/80 group-hover:bg-[#523A83] rounded-md px-2 py-[2px] text-[14px] font-light text-white/80 uppercase transition-colors'>
            {category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
