import { FC, useState } from 'react';
import IconNotifications from '@/assets/icons/notification.svg';
import FullScreenOverlay from '../FullScreenOverlay/FullScreenOverlay';

interface NotificationProps {
  count?: number;
}

const Notification: FC<NotificationProps> = ({ count }) => {
  const [isOpen, setIsOpen] = useState(false);

  const badgeCount = count && count > 0 ? count : 0;

  return (
    <div className='relative p-2 min-w-[44px] min-h-[44px] h-[44px]'>
      {badgeCount > 0 && (
        <span
          className='flex justify-center items-center absolute bg-red w-fit size-5 rounded-full 
          leading-[15px] min-w-5 h-[18px] -top-[1px] right-0 text-white text-xs text-center self-center'
        >
          {badgeCount}
        </span>
      )}

      <button onClick={() => setIsOpen((prev) => !prev)}>
        <IconNotifications width={28} height={28} />
      </button>

      <FullScreenOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Notification;
