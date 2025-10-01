import { IAllChanelsEl } from '@/services/RecomendationService';

export interface IGetChannelsWithStreamArgs {
  channels: IAllChanelsEl[] | undefined;
  limit?: number;
}

export const getChannelsWithStream = (
  channels: IGetChannelsWithStreamArgs['channels'],
  limit: IGetChannelsWithStreamArgs['limit'],
): IAllChanelsEl[] => {
  if (!channels) return [];
  return channels.filter((ch) => ch.stream).slice(0, limit ? limit : channels.length);
};
