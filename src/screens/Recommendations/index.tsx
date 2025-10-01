'use client';

import {
  IAllChanelsEl,
  IGetSubscriptions,
  RecomendationService,
} from '@/services/RecomendationService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import userAvatar from '@/assets/mockAvatars/userAvatar.png';
import { AxiosResponse } from 'axios';
import { ProfileResponse } from '@/services/UserService';
import SubscriberItem from '@/components/SubscriberItem';

import useMediaQuery from '@/utils/hooks/useMediaQuery';
import SearchField from '@/components/ui/SearchField';

const RecommendationsScreen: FC = () => {
  const isTablet = useMediaQuery('(max-width:950px)');
  const [idUnauthorized, setIdUnauthorized] = useState(false);
  const [filteredRecommendations, setFilteredRecommendations] = useState<IAllChanelsEl[]>([]);



  const { data: recomendationData } = useQuery({
    queryKey: ['getRecommendationData'],
    queryFn: () =>
      RecomendationService.getAllChanels({ page: 1, page_size: 20, sort_type: 'normal' }),
  });

  const { data: idData } = useQuery({
    queryKey: ['getSubscriptionData'],
    queryFn: async () => {
      try {
        const response = await RecomendationService.getSgetSubscriptionsID();
        return response.data;
      } catch (error: any) {
        if (error.response?.status === 400) {
          setIdUnauthorized(true);
        }
        return [];
      }
    },
  });

  const getButtonType = (id: string) => {
    const isSubscribed = (idData as IGetSubscriptions)?.data?.includes(id);
    return isSubscribed ? 'unsubscribe' : 'subscribe';
  };

  useEffect(() => {
    if (recomendationData?.data && idData) {
      const filtered = recomendationData.data.filter(
        (el: IAllChanelsEl) => !(idData as IGetSubscriptions)?.data?.includes(el.id),
      );
      setFilteredRecommendations(filtered);
    }
  }, [recomendationData, idData]);

  return (
    <div className={isTablet ? '' : 'ml-[45px]'}>
      <h1 className='text-[39px] leading-[56px] font-semibold mb-4 max-tablet:mb-8'>
        Recommendations
      </h1>
      <div className='flex flex-col gap-6 p-6 container-card'>
        <SearchField searchValue={''} setSearchValue={() => {}} handleKeyDown={() => {}} />
        <div>
          {(idData || idUnauthorized) && (
            <ul>
              {filteredRecommendations.map((el) => {
                const { avatar_url, subscriber_count, username, id, stream } = el;
                const subscriptionType = getButtonType(id);
                const isOnline = stream?.is_online || false;
                const viewerCount = stream?.viewer_count ?? 0;

                return (
                  <SubscriberItem
                    avatarUrl={avatar_url || userAvatar.src}
                    id={id}
                    isOnline={isOnline}
                    subscriberCount={subscriber_count}
                    subscriptionType={subscriptionType}
                    username={username}
                    viewerCount={viewerCount}
                    lastUpdatedAt={stream?.last_updated_at}
                  />
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsScreen;
