'use client';
import Category from '@/components/Categories';
import PopularSection from '@/components/PopularSection';
import { DetailsLink } from '@/components/ui/DetailsLink/DetailsLink';
import Sections from './Sections';
import { TranslationTape } from '@/components/TranslationTape/TranslationTape';
import { RecomendationService } from '@/services/RecomendationService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getChannelsWithStream } from '@/utils/helpers/getChannelsWithStream';
import { UserService } from '@/services/UserService';

const Home = () => {
  const { data: recomendationData, isLoading: recomendationLoading } = useQuery({
    queryKey: ['getAllStreams'],
    queryFn: () =>
      RecomendationService.getAllChanels({ page: 1, page_size: 3, sort_type: 'recommended' }),
  });

  const filteredData = getChannelsWithStream(recomendationData?.data, 3);

  return (
    <div className='max-w-[1608px] w-full max-small-desktop:overflow-hidden'>
      <TranslationTape streams={filteredData} isLoading={recomendationLoading} />

      <div className='mb-10 border-b border-gunpowder'>
        <div className='flex items-center justify-between'>
          <p className='text-2xl'>Categories you might like</p>
          <DetailsLink className='min-w-[85px]'>View all</DetailsLink>
        </div>
        <Category sliceCount={8} cardSize='md' className='!ml-0 !mt-6' />
      </div>
      <Sections />
    </div>
  );
};

export default Home;
