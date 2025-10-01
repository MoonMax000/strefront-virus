import { Tag } from '@/components/ui/Tag/Tag';
import { ISearchChannelEl } from '@/services/RecomendationService';

export const handleGetSearchItem = (
  item: ISearchChannelEl,
  index: number,
  stresmClick: (id: string) => void,
) => {
  return (
    <div className='flex items-center justify-between' key={index}>
      <div
        onClick={() => stresmClick(item.channel.id)}
        className='flex gap-3 text-[15px] cursor-pointer font-bold items-center p-1 rounded-md'
      >
        <img
          src={item?.channel?.cover_url ?? ''}
          width={33}
          height={44}
          alt='cover_image'
          className='rounded-md'
        />

        <div className='flex flex-col gap-[6px]'>
          <span>{item.channel.stream?.stream_name}</span>
          <span className='text-[#B0B0B0] font-bold text-[12px] uppercase'>
            {item.channel.stream?.viewer_count ?? 0} Viewers
          </span>
        </div>
      </div>
      <Tag type='red'>LIVE</Tag>
    </div>
  );
};
