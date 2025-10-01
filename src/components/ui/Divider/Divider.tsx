import React, { FC } from 'react';
import ArrowDown from '@/assets/icons/arrowDown.svg';
import clsx from 'clsx';

interface Props {
  className?: string;
  onClick?: () => void;
  widthText?: boolean;
}

export const Divider: FC<Props> = ({ className, onClick, widthText }) => {
  return (
    <div className={clsx('relative flex items-center py-4', className)}>
      <div className='flex-grow border-t border-[#2E2744]'></div>
      {widthText && (
        <span
          onClick={onClick}
          className='flex-shrink flex mx-4 text-sm text-gray-500 text-[#A06AFF] font-bold text-[15px] tracking-wider cursor-pointer'
        >
          Show more <ArrowDown />
        </span>
      )}
      <div className='flex-grow border-t border-[#2E2744]'></div>
    </div>
  );
};
