'use client';
import { FC } from 'react';
import { getUserByStreamId } from '@/utils/hooks/useUserById';

interface IChanelProps {
  icon: string;
  name: string;
  folowers?: number;
  isOnline: boolean;
  category: string;
}

const ChanelEl: FC<IChanelProps> = ({ icon, name, folowers, isOnline, category }) => {
  return (
    <div className='flex items-center'>
      <img src={icon} className='mr-2 min-w-8 h-8 rounded-full' />

      <div className='font-semibold text-[14px] flex flex-col mr-[10px] max-w-[103px]'>
        <span className=''>{name}</span>
        <span className='opacity-[40%] mt-[-1px]'>{category}</span>
      </div>

      {!isOnline && (
        <div className='flex items-center opacity-[40%] gap-[6px] w-full justify-end'>
          <div className='h-3 w-3 bg-white rounded-full  '></div>
          <span className='text-[12px]'>{folowers}</span>
        </div>
      )}
      {isOnline && (
        <div className='flex items-center gap-[6px] w-full justify-end'>
          <div className='h-3 w-3 bg-green rounded-full '></div>
          <span className='text-[12px]'>{folowers}</span>
        </div>
      )}
    </div>
  );
};

export default ChanelEl;
