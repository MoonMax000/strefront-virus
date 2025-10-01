import { useEffect } from 'react';
import { webSocketNotificationService } from '../websocket/websocket';

export const useNotificationWebSocket = (token: string) => {
  useEffect(() => {
    if (!token) return;
    webSocketNotificationService.connect(token);

    return () => {
      webSocketNotificationService.close();
    };
  }, [token]);
};
