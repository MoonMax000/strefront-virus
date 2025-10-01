import { FC, useState } from 'react';
import type { ProfileNotificationModel } from '.';
import Toggle from '@/components/ui/Toggle';

const NotificationItem: FC<{ notification: ProfileNotificationModel }> = ({ notification }) => {
  const [isActive, setIsActive] = useState<boolean>(true);

  return (
    <div className='flex items-center justify-between gap-4 border-b border-onyxGrey p-4 last:border-none max-tablet:bg-transparent max-tablet:border-none max-tablet:gap-1 max-tablet:items-start max-tablet:p-0'>
      <div className='flex flex-col gap-1 text-white max-tablet:gap-2 w-[calc(100%-58px)]'>
        <p className='text-[15px] leading-5 font-bold max-tablet:text-lg/6'>{notification.name}</p>
        <p className='text-[15px] leading-5 font-medium opacity-45'>{notification.description}</p>
      </div>
      <Toggle isActive={isActive} onChange={() => setIsActive((prev) => !prev)} />
    </div>
  );
};

export default NotificationItem;
