'use client';
import { IGetSubscribersBody, RecomendationService } from '@/services/RecomendationService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import userAvatar from '@/assets/mockAvatars/userAvatar.png';
import useMediaQuery from '@/utils/hooks/useMediaQuery';
import SubscriberItem from '@/components/SubscriberItem';

const tableHeaders = ['User', 'Status', 'Followers', 'Action'];

const MySubscribers = () => {
  const isTablet = useMediaQuery('(max-width:824px)');

  const { data: subscribersData } = useQuery({
    queryKey: ['getSubscriptionsDtata'],
    queryFn: async () => {
      const body: IGetSubscribersBody = {
        page: 1,
        page_size: 20,
        sort_by: 'subscriber_count',
        sort_dir: 'asc',
      };
      return RecomendationService.getSubscribers(body);
    },
  });

  const { data: idData, mutateAsync: idMutate } = useMutation({
    mutationKey: ['getSubscribtionData'],
    mutationFn: () => RecomendationService.getSgetSubscriptionsID(),
  });

  useEffect(() => {
    idMutate();
  }, []);

  const getButtonType = (id: string) => {
    const isSubscribed = idData?.data.data.includes(id);
    return isSubscribed ? 'unsubscribe' : 'subscribe';
  };

  return (
    <>
      {!isTablet && <h1 className='text-[19px] leading-[56px] font-semibold mb-4'>My followers</h1>}
      <div className='flex flex-col gap-4 '>
        <div>
          {!isTablet && (
            <div className='grid grid-cols-[30%,30%,20%,20%] mb-3 pb-4 border-b border-onyxGrey'>
              {tableHeaders.map((el) => (
                <p key={el} className='text-xs opacity-30 font-extrabold last:justify-self-end'>
                  {el.toUpperCase()}
                </p>
              ))}
            </div>
          )}
          <ul className='flex flex-col max-tablet:gap-8'>
            {subscribersData?.data &&
              idData?.data.data &&
              subscribersData?.data.map((el) => {
                const { avatar_url, subscriber_count = 0, username, id, stream } = el;
                const isOnline = stream?.is_online || false;
                const subscriptionType = getButtonType(id);
                const viewerCount = stream?.viewer_count ?? 0;

                return (
                  <SubscriberItem
                    key={id}
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
        </div>
      </div>
    </>
  );
};

export default MySubscribers;
