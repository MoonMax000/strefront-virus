import { determinateWordHelper } from '@/utils/helpers/determinateWordHelper';
import useMediaQuery from '@/utils/hooks/useMediaQuery';
import SubscribeButtom from '../SubscribeButton';
import IconUserPlus from '@/assets/icons/user-plus.svg';
import IconUserMinus from '@/assets/icons/user-minus.svg';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { IUser } from '@/services/AuthService';
import { getUserByStreamId } from '@/utils/hooks/useUserById';
import { getMediaUrl } from '@/utils/helpers/getMediaUrl';

const viewersWordVariants = ['зритель', 'зрителя', 'зрителей'];
const subscribesWordVariants = ['подписчик', 'подписчика', 'подписчиков'];

interface SubscriberItemProps {
  avatarUrl: string;
  username: string;
  isOnline: boolean;
  lastUpdatedAt?: number;
  viewerCount: number;
  subscriberCount: number;
  subscriptionType: 'unsubscribe' | 'subscribe';
  id: string;
}

const SubscriberItem: FC<SubscriberItemProps> = ({
  avatarUrl,
  id,
  isOnline,
  subscriberCount,
  subscriptionType,
  username,
  viewerCount,
  lastUpdatedAt,
}) => {
  const isTablet = useMediaQuery('(max-width:824px)');
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    const loadUsers = async () => {
      const userData = await getUserByStreamId(id);
      setUserData(userData.user);
    };

    loadUsers();
  }, [id]);

  if (isTablet) {
    return (
      <li className='grid gap-3 items-center grid-cols-[64px,calc(100%-132px),44px]'>
        <img
          src={userData?.avatar ? getMediaUrl(userData?.avatar) : '/defaultAvatar.png'}
          className='w-full h-[64px] rounded-full'
          alt='avatar'
        />
        <div className='flex flex-col gap-[2px]'>
          <p className='text-[15px] leading-5 font-bold'>{userData?.username ?? username}</p>
          {!isOnline ? (
            <p className='text-sm font-semibold opacity-40'>Was online {lastUpdatedAt}</p>
          ) : (
            <div className='flex items-center gap-1'>
              <span className='size-2 min-w-2 min-h-2 bg-green rounded-[50%]' />
              <p className='text-sm font-bold'>
                {viewerCount} {determinateWordHelper(viewerCount, viewersWordVariants)}
              </p>
            </div>
          )}
          <p className='text-sm font-semibold opacity-40'>
            {subscriberCount} {determinateWordHelper(subscriberCount, subscribesWordVariants)}
          </p>
        </div>

        <div className='flex justify-end'>
          <SubscribeButtom
            id={id}
            type={subscriptionType}
            className={clsx('border-none', {
              '!bg-[#FFFFFF14]': subscriptionType === 'unsubscribe',
            })}
          >
            {isTablet ? (
              subscriptionType === 'subscribe' ? (
                <IconUserPlus />
              ) : (
                <IconUserMinus className='text-white opacity-[48%]' />
              )
            ) : undefined}
          </SubscribeButtom>
        </div>
      </li>
    );
  }

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

      <div
        className={clsx('flex items-center gap-[6px] w-full justify-start', {
          'opacity-40': !isOnline,
        })}
      >
        <span
          className={clsx('h-3 w-3 rounded-full', {
            'bg-green': isOnline,
            'bg-white': !isOnline,
          })}
        />
        <span
          className={clsx('text-[13px]', {
            'min-w-[73px]': !isOnline,
            'text-green': isOnline,
          })}
        >
          {!isOnline ? 'Offline' : 'Online'}
        </span>
      </div>

      <p className='text-[13px] font-bold flex items-center'>{subscriberCount}</p>

      <div className='flex justify-end'>
        <SubscribeButtom id={id} type={subscriptionType} />
      </div>
    </li>
  );
};

export default SubscriberItem;
