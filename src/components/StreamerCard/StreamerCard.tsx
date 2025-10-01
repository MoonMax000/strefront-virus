import React, { FC, useEffect, useState } from 'react';
import SubscribeButton from '../SubscribeButton';
import { IUser } from '@/services/AuthService';
import { getUserByStreamId } from '@/utils/hooks/useUserById';
import { getMediaUrl } from '@/utils/helpers/getMediaUrl';

interface Props {
  avatar: string;
  name: string;
  subscribersCount: string;
  description: string;
  id: string;
}

export const StreamerCard: FC<Props> = ({ id, avatar, name, subscribersCount, description }) => {
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    const loadUsers = async () => {
      const userData = await getUserByStreamId(id);
      setUserData(userData.user);
    };

    loadUsers();
  }, [id]);
  return (
    <div className='flex gap-9'>
      <div>
        <img
          src={userData?.avatar ? getMediaUrl(userData?.avatar) : '/defaultAvatar.png'}
          className='w-[160px] h-[160px] object-cover overflow-hidden rounded-[50px]'
          alt='streamer'
        />
      </div>
      <div className='flex flex-col w-[512px] py-2 gap-1'>
        <div className='flex justify-between w-full items-center'>
          <span>{userData?.username}</span>
          <SubscribeButton
            className='rounded-lg pt-[15px] pr-[24px] pb-[15px] pl-[24px] max-w-[117px] max-h-[32px] bg-[linear-gradient(270deg,#A06AFF_0%,#482090_100%)]'
            id=''
            type='subscribe'
          />
        </div>
        <div className='text-[15px] font-bold py-1 text-[#B0B0B0]'>
          Subscribers - <span className='text-[#A06AFF]'> {subscribersCount}</span>
        </div>
        <div className='text-[#B0B0B0] text-[15px] font-medium py-1'>{userData?.bio}</div>
      </div>
    </div>
  );
};
