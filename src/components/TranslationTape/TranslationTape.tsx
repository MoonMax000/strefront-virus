'use client';
import { FC, useEffect, useState } from 'react';
import { Tag } from '../ui/Tag/Tag';
import VideoPlayer from '@/screens/VideoScreen/VideoPlayer';
import clsx from 'clsx';
import ArrowIcon from '@/assets/icons/arrow.svg';
import ViewersIcon from '@/assets/icons/viewers.svg';
import { IAllChanelsEl } from '@/services/RecomendationService';
import Skeleton from '../ui/Skeleton';
import Link from 'next/link';
import { IUser } from '@/services/AuthService';
import { getUserByStreamId } from '@/utils/hooks/useUserById';
import { getMediaUrl } from '@/utils/helpers/getMediaUrl';

interface IProps {
  streams: IAllChanelsEl[];
  isLoading?: boolean;
}

export type IStreamWithUser = IAllChanelsEl & {
  user: IUser | null;
  email: string | null;
  error?: boolean;
};

export const TranslationTape: FC<IProps> = ({ streams, isLoading }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [streamsWithUsers, setStreamsWithUsers] = useState<IStreamWithUser[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadUsers = async () => {
      if (!streams?.length) return;
      setIsUsersLoading(true);

      try {
        const results = await Promise.all(
          streams.map(async (stream) => {
            try {
              const userData = await getUserByStreamId(stream.id);
              return { ...stream, user: userData.user, email: userData.email };
            } catch (err) {
              return { ...stream, user: null, email: null, error: true };
            }
          }),
        );
        setStreamsWithUsers(results);
      } finally {
        setIsUsersLoading(false);
      }
    };

    loadUsers();
  }, [streams]);

  useEffect(() => console.log(streamsWithUsers), [streamsWithUsers]);

  if (!isLoading && !streams?.length) {
    return <></>;
  }

  const activeCard = streamsWithUsers?.[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : streamsWithUsers.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < streamsWithUsers.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className='grid grid-cols-2 mb-[72px] gap-6'>
      <div className='flex flex-col gap-[37px] items-center justify-between mt-6'>
        <Link
          key={activeCard?.id + 'stream_card'}
          href={`/video/${activeCard?.id}`}
          className='flex flex-col w-full'
        >
          <div className='flex items-center justify-start mb-4 gap-4'>
            {isLoading && isUsersLoading ? (
              <>
                <Skeleton className='w-16 h-16 rounded-full' />
                <Skeleton className='h-6 w-40' />
                <Skeleton className='h-5 w-24' />
              </>
            ) : (
              <>
                <img
                  src={
                    activeCard?.user?.avatar
                      ? getMediaUrl(activeCard?.user?.avatar)
                      : '/defaultAvatar.png'
                  }
                  className='w-16 h-16 rounded-full mr-4'
                />
                <p className='text-[19px] font-bold mr-[25px]'>
                  {activeCard?.user?.username ?? activeCard?.email}
                </p>
                {activeCard?.stream && (
                  <div className='flex items-center gap-1'>
                    <ViewersIcon width={24} height={24} />
                    <p className='text-[15px] font-bold'>
                      viewers -{' '}
                      <span className='text-purple'>{activeCard.stream.viewer_count}</span>
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {isLoading && isUsersLoading ? (
            <Skeleton className='h-6 w-3/4 mb-2' />
          ) : (
            <p className='text-[19px] font-bold mb-2'>{activeCard?.stream?.stream_name}</p>
          )}

          <div className='flex gap-5 items-center'>
            {isLoading && isUsersLoading ? (
              <>
                <Skeleton className='h-5 w-24' />
                <div className='flex gap-2'>
                  <Skeleton className='h-6 w-12 rounded-lg' />
                  <Skeleton className='h-6 w-12 rounded-lg' />
                </div>
              </>
            ) : (
              <>
                <p className='text-[15px] font-medium text-webGray'>
                  {activeCard?.stream?.stream_category}
                </p>
                <div className='flex items-center gap-1'>
                  {activeCard?.stream?.stream_tags?.map((item, idx) => (
                    <Tag key={idx} className='text-[12px] font-bold' type='purple'>
                      {item}
                    </Tag>
                  ))}
                </div>
              </>
            )}
          </div>
        </Link>

        <div className='w-full'>
          <div className='grid grid-cols-3 gap-2 items-start mb-4'>
            {isLoading
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton key={idx} className='w-full h-[147px] rounded-2xl' />
                ))
              : streams.map((item, idx) => (
                  <div key={item.id} className='h-[147px]'>
                    <img
                      src={item.cover_url ? item.cover_url : '/streamBackground.jpg'}
                      className={clsx('w-full h-[147px] rounded-2xl cursor-pointer', {
                        'border-[2px] border-regaliaPurple': idx === activeIndex,
                      })}
                      onClick={() => setActiveIndex(idx)}
                    />
                  </div>
                ))}
          </div>

          <div className='flex justify-center items-center gap-4'>
            {isLoading && isUsersLoading ? (
              <>
                <Skeleton className='w-8 h-8 rounded-full' />
                <div className='flex gap-2'>
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <Skeleton key={idx} className='w-3 h-3 rounded-full' />
                  ))}
                </div>
                <Skeleton className='w-8 h-8 rounded-full' />
              </>
            ) : (
              <>
                {/* <ArrowIcon
                  onClick={handlePrev}
                  width={30}
                  height={30}
                  className='text-white rotate-180 cursor-pointer'
                />
                <div className='flex justify-center items-center gap-2'>
                  {streams.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={clsx('w-3 h-3 rounded-full', {
                        'bg-purple': activeIndex === idx,
                        'bg-regaliaPurple': activeIndex !== idx,
                      })}
                    />
                  ))}
                </div>
                <ArrowIcon
                  onClick={handleNext}
                  width={30}
                  height={30}
                  className='text-white cursor-pointer'
                /> */}
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        {isLoading && isUsersLoading ? (
          <Skeleton className='w-full !h-[398px] rounded-3xl' />
        ) : (
          activeCard?.stream && (
            <Link
              key={activeCard?.id + 'stream_card'}
              href={`/video/${activeCard?.id}`}
              className='flex flex-col w-full'
            >
              <VideoPlayer
                url={activeCard.stream.translation_url}
                poster={activeCard.cover_url ? activeCard.cover_url : '/streamBackground.jpg'}
                className='!h-[398px] rounded-3xl overflow-hidden'
                IsShownSettings={false}
              />
            </Link>
          )
        )}
      </div>
    </section>
  );
};
