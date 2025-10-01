'use client';
import { FC, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  IAllChanelsEl,
  IGetSubscriptions,
  RecomendationService,
} from '@/services/RecomendationService';
import { AxiosResponse } from 'axios';
import { ProfileResponse } from '@/services/UserService';
import Link from 'next/link';
import userAvatar from '@/assets/mockAvatars/userAvatar.png';
import ChanelEl from '../ChanelEl';

const RecomendetionSubscribersLists: FC = () => {
  const [filteredRecommendations, setFilteredRecommendations] = useState<IAllChanelsEl[]>([]);
  const queryClient = useQueryClient();

  const { data: recomendationData } = useQuery({
    queryKey: ['getAllChanels'],
    queryFn: () =>
      RecomendationService.getAllChanels({ page: 1, page_size: 20, sort_type: 'normal' }),
  });

  const { data: subscribesData } = useQuery({
    queryKey: ['getSubscribers'],
    queryFn: () => RecomendationService.getSubscriptions(),
  });

  const { data: idData } = useQuery({
    queryKey: ['getSubscriptionData'],
    queryFn: async () => {
      try {
        const response = await RecomendationService.getSgetSubscriptionsID();
        return response.data;
      } catch (error: any) {
        console.log(error);
        return [];
      }
    },
  });

  useEffect(() => {
    if (recomendationData?.data && idData) {
      const filtered = recomendationData.data.filter(
        (el: IAllChanelsEl) => !(idData as IGetSubscriptions)?.data?.includes(el.id),
      );
      setFilteredRecommendations(filtered);
    }
  }, [recomendationData, idData]);

  const profileData = queryClient.getQueryData<AxiosResponse<ProfileResponse>>(['getProfile']);

  return (
    <div className='w-[220px] py-[8px]  ml-6 flex flex-col max-small-desktop:hidden'>
      <div className='flex flex-col mb-[40px]'>
        <h2 className='text-[18px] mb-[12px] font-semibold'>Recommended</h2>
        <div className='flex flex-col gap-4 w-[220px] '>
          {filteredRecommendations &&
            filteredRecommendations.map((el, index) => {
              const { avatar_url, username, subscriber_count } = el;
              const isOnline = el?.stream?.is_online || false;
              return profileData?.data.id !== el.id ? (
                <Link key={index} href={`/video/${el.id}`}>
                  <ChanelEl
                    icon={avatar_url || userAvatar.src}
                    isOnline={isOnline}
                    category={''}
                    name={username}
                    folowers={subscriber_count}
                  />
                </Link>
              ) : null;
            })}
        </div>
      </div>

      {subscribesData?.data && (
        <div className='flex flex-col pb-[40px]'>
          <h2 className='text-[18px] mb-[12px] font-semibold'>My Subscriptions</h2>
          <div className='flex flex-col gap-4 w-[220px]'>
            {subscribesData?.data.map((el, index) => {
              const { avatar_url, username, subscriber_count } = el;
              const isOnline = el?.stream?.is_online || false;
              return (
                <Link key={index} href={`/video/${el.id}`}>
                  <ChanelEl
                    icon={avatar_url || userAvatar.src}
                    isOnline={isOnline}
                    category={''}
                    name={username}
                    folowers={subscriber_count}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecomendetionSubscribersLists;
