import { SubscriberItem } from '@/components/Notifications/constatnts';
import { timeAgo } from '@/helpers/timeAgo';

import {
  addMessage,
  addNotification,
  clearMessages,
  setConnected,
} from '@/store/NotificationSlice';
import { store } from '@/store/store';
import { getUserByStreamId } from '../hooks/useUserById';
import { getMediaUrl } from '../helpers/getMediaUrl';

const mockWS = 'wss://notify.k8s.tyriantrade.com/ws';
const WS_URL = process.env.NEXT_PUBLIC_NOTIFICATION_WS_URL || mockWS;

class WebSocketNotificationService {
  private socket: WebSocket | null = null;
  private reconnectTimeout: number = 5000;
  private url: string = WS_URL;

  connect(token: string) {
    if (this.socket) {
      console.warn('WebSocket уже подключен');
      return;
    }

    const protocols = ['chat', token];
    console.log('🔌 Подключаем WebSocket с параметрами:', { url: this.url, protocols });

    this.socket = new WebSocket(this.url, protocols);

    this.socket.onopen = () => {
      console.log('✅ WebSocket подключен:', this.url);
      store.dispatch(setConnected(true));
    };

    this.socket.onmessage = async (event) => {
      console.log('📩 Получено сообщение:', event.data);

      if (!event.data || event.data === 'null') {
        console.warn('⚠️ Пустое сообщение от сервера, пропускаем...');
        return;
      }

      try {
        const parsedData = JSON.parse(event.data);
        const messages = Array.isArray(parsedData) ? parsedData : [parsedData];

        messages.forEach(async (msg: any) => {
          const { id, message, status, targetUserId, timestamp } = msg;
          const { user } = await getUserByStreamId(targetUserId);

          console.log('AVATAR', getMediaUrl(user?.avatar));

          switch (message?.type) {
            case 'status_stream':
              switch (message.data) {
                case 'start':
                  store.dispatch(
                    addNotification({
                      id,
                      uid: targetUserId,
                      name: user.username ?? user.email,
                      photo: user?.avatar ? getMediaUrl(user?.avatar) : '/defaultAvatar.png',
                      type: 'stream_start',
                      date: timeAgo(timestamp),
                      text: 'Stream started',
                      textLink: `video/${targetUserId}`,
                      status,
                    }),
                  );
                  break;
              }
            case 'chat_message':
              store.dispatch(
                addNotification({
                  id,
                  uid: targetUserId,
                  name: user.username ?? user.email,
                  photo: user?.avatar ? getMediaUrl(user?.avatar) : '/defaultAvatar.png',
                  type: 'stream_subscription',
                  date: timeAgo(timestamp),
                  text: 'Sent a message ' + message.data,
                  textLink: '',
                  status,
                }),
              );
              break;

            case 'subscription':
              store.dispatch(
                addNotification({
                  id,
                  uid: targetUserId,
                  name: user.username ?? user.email,
                  photo: user?.avatar ? getMediaUrl(user?.avatar) : '/defaultAvatar.png',
                  type: 'stream_subscription',
                  date: timeAgo(timestamp),
                  text: 'Subscribed to your channel',
                  textLink: '',
                  status,
                }),
              );
              break;

            default:
              console.warn('⚠️ Неизвестный статус стрима:', message.data);
          }
        });
      } catch (error) {
        console.error('❗ Ошибка парсинга сообщения:', error);
      }
    };

    this.socket.onclose = (event) => {
      console.log(event);
      console.warn(
        `⚠️ WebSocket отключен. Код: ${event.code}, Причина: ${event.reason || 'нет данных'}`,
      );

      store.dispatch(clearMessages());
      store.dispatch({ type: 'websocket/clearSubscribers' });
      store.dispatch(setConnected(false));
      this.socket = null;

      setTimeout(() => this.connect(token), this.reconnectTimeout);
    };
  }

  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.log('🚫 WebSocket не подключен');
    }
  }

  close() {
    console.log('🔌 Закрываем WebSocket...');
    this.socket?.close();
    this.socket = null;
  }
}

export const webSocketNotificationService = new WebSocketNotificationService();
