import { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Divider } from '@/components/ui/Divider/Divider';
import StreamsCardGrid from '@/components/StreamsCardGrid';
import StreamCard from '@/components/StreamCard';
import {
  IAllChanelsEl,
  ICategory,
  IGetAllChanelsResponse,
  RecomendationService,
} from '@/services/RecomendationService';

const Sections: FC = () => {
  const { push } = useRouter();

  const handleClickStream = (id: string) => {
    push('/video/' + id);
  };

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery<ICategory[]>({
    queryKey: ['categories'],
    queryFn: () => RecomendationService.getCategories(),
  });

  const { data: streamsByCategory = {}, isLoading: isStreamsLoading } = useQuery<
    Record<string, IGetAllChanelsResponse>
  >({
    queryKey: ['streams-by-category', categories.map((c) => c.name)],
    queryFn: async () => {
      const results = await Promise.all(
        categories.map(async (cat) => {
          const res = await RecomendationService.getAllChannelsFiltered({
            page_size: 100,
            category: cat.name.toLowerCase(),
          });
          return [cat.name, res.data] as const;
        }),
      );

      return Object.fromEntries(results);
    },
    enabled: categories.length > 0,
  });

  useEffect(() => {
    console.log('streamsByCategory', streamsByCategory);
  }, [streamsByCategory]);

  if (isCategoriesLoading || isStreamsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {categories.map((cat) => {
        const streams = streamsByCategory?.[cat.name].data || [];
        const hasMore =
          streamsByCategory[cat.name].pagination?.current_page !==
          streamsByCategory[cat.name].pagination?.total_pages;

        if (streams.length === 0) {
          return null;
        }

        return (
          <div key={cat.name}>
            <h1 className='text-[24px] mb-8 font-bold'>{cat.name}</h1>
            <StreamsCardGrid>
              {streams.map((item) => (
                <StreamCard
                  id={item.id}
                  onClick={() => handleClickStream(item.id)}
                  key={item.id}
                  author={item.username}
                  preview={item.cover_url}
                  avatar={item.avatar_url ? item.avatar_url : '/streamerAvatar.jpg'}
                  isLive={!!item.stream?.is_online}
                  description={item.description}
                  name={item.stream?.stream_name || item.name}
                  category={item.stream?.stream_category || cat.name}
                  tags={item.stream?.stream_tags || []}
                  spectators={item.stream?.viewer_count || 0}
                />
              ))}
            </StreamsCardGrid>
            <Divider widthText={hasMore} className='mt-5' />
          </div>
        );
      })}
    </>
  );
};

export default Sections;
