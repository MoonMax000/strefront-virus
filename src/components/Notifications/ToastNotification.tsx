'use client';

import { useEffect, useRef, useState } from 'react';
import NotificationItem from '@/components/Notifications/NotificationItem';
import { useToast } from '../ToastPortal/ToastPortal';
import { timeAgo } from '@/helpers/timeAgo';
import { useAppSelector } from '@/store/hooks';

const MOCK_SUBSCRIBERS = [
  {
    id: 'sub-1',
    uid: 'user-1',
    name: 'Alice',
    photo: '/def-logo.png',
    type: 'info',
    date: timeAgo(Date.now()),
    text: 'Добро пожаловать!',
    textLink: '',
  },
  {
    id: 'sub-2',
    uid: 'user-2',
    name: 'Bob',
    photo: '/def-logo.png',
    type: 'warning',
    date: timeAgo(Date.now() - 1000 * 60),
    text: 'У тебя новое сообщение',
    textLink: '/chats/message/user-2',
  },
];

const MOCK_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'user-3',
    nick: 'Charlie',
    timestamp: Date.now() - 2000,
    data: 'Привет 👋',
    type: 'MSG',
  },
];

const ToastNotification = () => {
  const showToast = useToast();
  const [lastIndex, setLastIndex] = useState(0);
  const lastShownMessageIdRef = useRef<string | null>(null);
  const subscribers = useAppSelector((state) => state.notification.subscribers);

  useEffect(() => {
    if (lastIndex >= subscribers.length) return;

    const interval = setInterval(() => {
      const notification = subscribers[lastIndex];
      if (!notification) return;

      showToast(<NotificationItem className='w-[494px]' notification={notification} />);

      setLastIndex((prev) => prev + 1);
    }, 1500);

    return () => clearInterval(interval);
  }, [lastIndex, showToast]);

  // useEffect(() => {
  //   const lastMsg = MOCK_MESSAGES.at(-1);

  //   console.log('lastMsg', lastMsg);

  //   if (lastMsg?.type === 'MSG' && lastMsg.id !== lastShownMessageIdRef.current) {
  //     lastShownMessageIdRef.current = lastMsg.id;

  //     showToast(
  //       <NotificationItem
  //         className='w-[494px]'
  //         notification={{
  //           uid: lastMsg.sender,
  //           name: lastMsg.nick,
  //           photo: '/def-logo.png',
  //           date: timeAgo(lastMsg.timestamp),
  //           text: lastMsg.data,
  //           textLink: `/chats/message/${lastMsg.sender}`,
  //           type: 'text',
  //         }}
  //       />,
  //     );
  //   }
  // }, [showToast]);

  return null;
};

export default ToastNotification;
