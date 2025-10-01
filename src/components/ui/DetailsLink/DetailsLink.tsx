'use client';
import Arrow from '@/assets/icons/arrow.svg';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  className?: string;
  children: string | ReactNode;
  onClick?: () => void;
}

export const DetailsLink: FC<Props> = ({ className, children, onClick }) => {
  const handleClick = () => {
    if (onClick) onClick();
  };
  return (
    <div
      className={clsx(
        'flex text-[15px] font-bold text-purple items-center cursor-pointer ',
        className,
      )}
      onClick={handleClick}
    >
      <span className='underline'>{children}</span>
      <Arrow width={24} height={24} />
    </div>
  );
};
