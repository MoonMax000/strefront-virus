import { streamApi } from '@/api';

export interface IStartStream {
  translation_category: string;
  translation_name: string;
  translation_notify_message: string;
  translation_tags: string[];
}

export const StreamService = {
  startStream(body: IStartStream) {
    return streamApi.put('stream/start', body);
  },
  endStream() {
    return streamApi.delete('stream/stop');
  },
};
