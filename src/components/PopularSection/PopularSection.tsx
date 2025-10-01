'use client';
import { FC } from 'react';

import maxPreview from '@/assets/MockPrev/MaximClass.png';

import StreamsCardGrid from '../StreamsCardGrid';
import StreamCard from '../StreamCard/StreamCard';
import Link from 'next/link';
import {
  IAllChanelsEl,
  IGetAllChanelsBody,
  IGetAllChanelsResponse,
  RecomendationService,
} from '@/services/RecomendationService';
import { useMutation, useQuery } from '@tanstack/react-query';
import userAvatar from '@/assets/mockAvatars/userAvatar.png';

const PopularSection: FC = () => {
  // const { data: recomendationData } = useQuery({
  //   queryKey: ['getAllStreams'],
  //   queryFn: () =>
  //     RecomendationService.getAllChanels({ page: 1, page_size: 4, sort_type: 'recommended' }),
  //   refetchInterval: 2000,
  //   staleTime: 5000,
  // });

  const recomendationData: IGetAllChanelsResponse = { data: [] as IAllChanelsEl[], status: '' };

  return (
    <section className='flex flex-col'>
      <h2 className=' tracking-tight font-semibold text-2xl mb-6 max-small-desktop:text-[32px]'>
        Popular
      </h2>
      <div className='pb-8 border-b-[1px] border-b-white-opacity-16'>
        <StreamsCardGrid>
          {recomendationData?.data &&
            recomendationData.data.map((el, index) => {
              return (
                <Link key={index} href={`/video/${el.id}`}>
                  <StreamCard
                    id={el.id}
                    name={el.username}
                    preview={el.cover_url || maxPreview.src}
                    avatar={el.avatar_url || userAvatar.src}
                    isLive={el.stream?.is_online}
                    category={''}
                    description={el.stream?.stream_name || ''}
                    tags={[]}
                    spectators={el.stream?.viewer_count || 0}
                  />
                </Link>
              );
            })}
        </StreamsCardGrid>
      </div>
    </section>
  );
};

export default PopularSection;
