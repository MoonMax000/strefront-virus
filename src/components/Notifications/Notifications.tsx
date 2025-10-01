'use client';

import React from 'react';
import IconCheck from '@/assets/icons/accept.svg';
import IconSettings from '@/assets/icons/icon-settings.svg';
import NotificationsTabs from './NotoficationTabs';
// import { websocketService } from '@/utilts/websocket/websocket';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useAppDispatch } from '@/store/hooks';
import { clearSubscribers } from '@/store/NotificationSlice';
import { webSocketNotificationService } from '@/utils/websocket/websocket';
// import { clearSubscribers } from '@/store/slices/websocketSlice';

const Notifications = () => {
  const dispatch = useAppDispatch();
  const subscribers = useSelector((state: RootState) => state.notification.subscribers);

  const handleReadNotifications = () => {
    dispatch(clearSubscribers());
    webSocketNotificationService.sendMessage(
      JSON.stringify({ type: 'markread', notifi: [...subscribers.map((item) => item.id)] }),
    );
  };

  return (
    <div className='flex justify-center mt-12'>
      <div className='flex flex-col w-[712px]'>
        <div className='flex items-center justify-between mb-[26px]'>
          <h2 className='font-bold text-[24px] leading-[32.74px]'>Notifications</h2>
          <div className='flex items-center gap-2' onClick={handleReadNotifications}>
            <div className='bg-transparent rounded-lg w-11 h-11 '>
              <IconCheck className='w-11 h-11 hover:cursor-pointer' />
            </div>
            <div className='bg-transparent rounded-lg w-11 h-11 '>
              <IconSettings className='w-11 h-11 hover:cursor-pointer' />
            </div>
          </div>
        </div>
        <NotificationsTabs />
      </div>
    </div>
  );
};

export default Notifications;
