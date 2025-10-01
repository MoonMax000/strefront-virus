'use client';
import StreamCard from '@/components/StreamCard';
import StreamsCardGrid from '@/components/StreamsCardGrid';
import { TranslationTape } from '@/components/TranslationTape/TranslationTape';
import { RecomendationService } from '@/services/RecomendationService';
import { getChannelsWithStream } from '@/utils/helpers/getChannelsWithStream';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

export const Category = () => {
  const { push } = useRouter();

  const { categoryId } = useParams<{ categoryId: string }>();
  const decodedCategory = decodeURIComponent(categoryId);
  const { data: categoryData } = useQuery({
    queryKey: ['category'],
    queryFn: () =>
      RecomendationService.getAllChannelsFiltered({
        category: decodedCategory.toLocaleLowerCase(),
      }),
  });

  const filteredData = getChannelsWithStream(categoryData?.data?.data, 3);

  const handleClickStream = (id: string) => {
    push('/video/' + id);
  };

  return (
    <div className='p-5'>
      <TranslationTape streams={filteredData} />
      <h1 className='text-[24px] mb-8 font-bold'>All streams {decodedCategory} category</h1>{' '}
      <StreamsCardGrid>
        {categoryData?.data.data.map((item, index) => (
          <StreamCard
            id={item.id}
            onClick={() => handleClickStream(item.id)}
            key={index}
            author={item?.username}
            preview={item.cover_url}
            avatar={item.avatar_url}
            isLive
            description={item?.description}
            name={item?.stream?.stream_name}
            category={item.stream?.stream_category}
            tags={item?.stream?.stream_tags}
            spectators={1}
          />
        ))}
      </StreamsCardGrid>
    </div>
  );
};
