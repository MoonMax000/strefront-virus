'use client';

import React, { useEffect } from 'react';
import NotificationsList from './NotificationsList';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessages, removeByMessageUid, removeByUid } from '@/store/NotificationSlice';
import { webSocketNotificationService } from '@/utils/websocket/websocket';
import { RootState } from '@/store/store';

const NotificationsTabs = () => {
  const subscribers = useSelector((state: RootState) => state.notification.subscribers);
  console.log('subscribers', subscribers);

  const dispatch = useDispatch();

  const handleRemoveSubscriber = (uid: string) => {
    dispatch(removeByUid(uid));
  };

  const handleReadNotification = (uuid: string) => {
    webSocketNotificationService.sendMessage(JSON.stringify({ type: 'markread', notifi: [uuid] }));
    dispatch(removeByMessageUid(uuid));
  };

  useEffect(() => {
    dispatch(clearMessages());
  }, []);

  return (
    <NotificationsList
      NotificationsList={subscribers}
      onRead={handleReadNotification}
      onRemove={handleRemoveSubscriber}
    />
  );
};

export default NotificationsTabs;
