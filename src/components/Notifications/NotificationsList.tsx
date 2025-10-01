'use client';

import React from 'react';
import { SubscriberItem } from './constatnts';
import NotificationItem from './NotificationItem';
import IconBell from '@/assets/icons/notification.svg';

interface NotificationsListProps {
  NotificationsList: SubscriberItem[];
  onRemove?: (uid: string) => void;
  onRead?: (uuid: string) => void;
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  NotificationsList,
  onRemove,
  onRead,
}) => {
  console.log('NotificationsList', NotificationsList);
  return (
    <div className='flex flex-col  gap-2 mt-6'>
      {NotificationsList.filter((notify) => notify.status === 'unread').length ? (
        NotificationsList.map((notification, index) => {
          if (notification.status === 'unread') {
            return (
              <NotificationItem
                key={notification.uid ? notification.uid + index.toString() : index}
                notification={notification}
                onRemove={onRemove}
                onRead={onRead}
              />
            );
          }
        })
      ) : (
        <div className='flex flex-col m-auto gap-2 mt-6 items-center opacity-50'>
          <IconBell />
          <span>Nothing new yet</span>
        </div>
      )}
    </div>
  );
};

export default NotificationsList;
