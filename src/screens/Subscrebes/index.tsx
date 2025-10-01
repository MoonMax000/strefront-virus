'use client';
import { RecomendationService } from '@/services/RecomendationService';
import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import SubscribeButtom from '@/components/SubscribeButton';
import useMediaQuery from '@/utils/hooks/useMediaQuery';
import SearchField from '@/components/ui/SearchField';
import { IUser } from '@/services/AuthService';
import { getUserByStreamId } from '@/utils/hooks/useUserById';
import { getMediaUrl } from '@/utils/helpers/getMediaUrl';

const SubscribesScreen: FC = () => {
  const isTablet = useMediaQuery('(max-width:950px)');

  const { data: subscribesData } = useQuery({
    queryKey: ['getSubscribers'],
    queryFn: () => RecomendationService.getSubscriptions(),
  });

  return (
    <div className={isTablet ? '' : 'ml-[45px]'}>
      <h1 className='text-[39px] leading-[56px] font-semibold mb-4'>My Subscriptions</h1>
      <div className='flex flex-col gap-6 p-6 container-card'>
        <SearchField searchValue={''} setSearchValue={() => {}} handleKeyDown={() => {}} />
        <div>
          <ul>
            {subscribesData?.data &&
              subscribesData?.data.map((el) => {
                return (
                  <SubscribeListItem
                    key={el.id}
                    id={el.id}
                    username={el.username}
                    avatar_url={el.avatar_url}
                    subscriber_count={el.subscriber_count}
                    isOnline={el.stream?.is_online || false}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubscribesScreen;

interface SubscribeListItemProps {
  id: string;
  username: string;
  avatar_url?: string;
  subscriber_count: number;
  isOnline: boolean;
}

const SubscribeListItem: FC<SubscribeListItemProps> = ({
  id,
  username,
  avatar_url,
  subscriber_count,
  isOnline,
}) => {
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    const loadUsers = async () => {
      const userData = await getUserByStreamId(id);
      setUserData(userData.user);
    };

    loadUsers();
  }, [id]);

  return (
    <li className='grid grid-cols-[15%,15%,15%,auto] pb-4 mt-4 border-b border-onyxGrey' key={id}>
      <div className='flex items-center'>
        <img
          src={userData?.avatar ? getMediaUrl(userData?.avatar) : '/defaultAvatar.png'}
          className='mr-2 w-11 h-11 rounded-full'
          alt='avatar'
        />
        <span className='text-[15px] font-bold'>{userData?.username ?? username}</span>
      </div>

      {!isOnline ? (
        <div className='flex items-center opacity-[40%] gap-[6px] w-full justify-start'>
          <div className='h-3 w-3 bg-white rounded-full' />
          <span className='text-[13px] min-w-[73px]'> Offline</span>
        </div>
      ) : (
        <div className='flex items-center gap-[6px] w-full justify-start'>
          <div className='h-3 w-3 bg-green rounded-full' />
          <span className='text-[13px] text-green'> Online</span>
        </div>
      )}

      <div className='flex items-center'>
        <p className='text-[13px] font-bold'>{subscriber_count}</p>
      </div>

      <div className='flex justify-end'>
        <SubscribeButtom id={id} type='unsubscribe' />
      </div>
    </li>
  );
};
