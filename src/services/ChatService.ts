import { chatApi } from '@/api';

export interface HistoryMessage {
  id: string;
  message: string;
  nick: string;
  sender: string;
  timestamp_message: string;
}

export const chatService = {
  getChatHistory(id: string) {
    return chatApi.get<{ message: HistoryMessage[] }>(
      `/history/chat?chatID=${encodeURIComponent(id)}`,
    );
  },
};
