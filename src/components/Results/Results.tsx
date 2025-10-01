'use client';
import React, { useEffect } from 'react';
import StreamsCardGrid from '../StreamsCardGrid';
import StreamCard from '../StreamCard';
import { StreamerCard } from '../StreamerCard/StreamerCard';
import { Divider } from '../ui/Divider/Divider';
import Categories from '../Categories';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { RecomendationService } from '@/services/RecomendationService';

export const Results = () => {
  const params = useSearchParams();

  const { push } = useRouter();

  const handleClickStream = (id: string) => {
    push('/video/' + id);
  };

  const { mutateAsync: getSearchValue, data: searchData } = useMutation({
    mutationFn: (subString: string) => RecomendationService.searchChannels(subString),
  });

  useEffect(() => {
    const searchQueue = params.get('q');
    getSearchValue(searchQueue ?? '');
  }, [params]);

  return (
    <div className='p-5'>
      <div className=''>
        <h1 className='text-[24px] mb-8 font-bold'>Live Streams</h1>
        <StreamsCardGrid>
          {searchData?.data?.map((item, index) => (
            <StreamCard
              id={item.channel.id}
              onClick={() => handleClickStream(item.channel.id)}
              key={index}
              author={item.channel.username}
              preview={item.channel.cover_url}
              avatar={item.channel.avatar_url}
              isLive
              description={item.channel.description}
              name={item.channel.stream?.stream_name}
              category={item.channel.stream?.stream_category}
              tags={item.channel.stream?.stream_tags}
              spectators={1}
            />
          ))}
        </StreamsCardGrid>
        <Divider className='mt-5' />
      </div>
      <div className='w-full h-fit'>
        <h1 className='text-[24px] mb-8 font-bold'>Channels</h1>
        <div className='grid grid-cols-2 gap-y-9 gap-4 w-full'>
          {searchData?.data?.map((item, index) => (
            <StreamerCard
              id={item.channel.id}
              key={index}
              avatar={item.channel.avatar_url}
              name={item.channel.username}
              subscribersCount={item.channel.subscriber_count.toString()}
              description={item.channel.description}
            />
          ))}
        </div>
        <Divider className='mt-5' />
      </div>
      <div className='flex flex-col items-start'>
        <h1 className='text-[24px] mb-8 font-bold'>Categories</h1>
        <Categories className='ml-0' sliceCount={7} />
      </div>
      <Divider className='mt-5' />
    </div>
  );
};
