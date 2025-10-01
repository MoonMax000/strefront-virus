import { FC, useEffect, useState } from 'react';
import AcceptedIcon from '@/assets/icons/accepted.svg';
import { Tag } from '../ui/Tag/Tag';
import { getUserByStreamId } from '@/utils/hooks/useUserById';
import { IUser } from '@/services/AuthService';
import { getMediaUrl } from '@/utils/helpers/getMediaUrl';

export interface StreamCard {
  preview?: string;
  avatar?: string;
  isLive?: boolean;
  description: string;
  spectators: number;
  name?: string;
  category?: string;
  tags?: string[];
  author?: string;
  onClick?: () => void;
  id: string;
}

const SteramCard: FC<StreamCard> = ({
  id,
  preview,
  avatar,
  isLive,
  description,
  spectators,
  name,
  category,
  author,
  tags,
  onClick,
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
    <div className='flex flex-col gap-3' onClick={onClick}>
      <div className='relative rounded-xl'>
        <img src={preview || '/streamBackground.jpg'} className='w-full h-[220px] rounded-lg' />

        {isLive && (
          <Tag type='red' className='absolute  top-3 left-3 '>
            LIVE
          </Tag>
        )}
        {spectators && (
          <Tag type='moonless' className='absolute  bottom-3 left-3 '>
            {spectators} viewrs
          </Tag>
        )}
      </div>
      <div className='flex gap-3'>
        <img
          src={userData?.avatar ? getMediaUrl(userData?.avatar) : '/defaultAvatar.png'}
          className='h-11 w-11 rounded-full object-cover'
        />
        <div className='max-w-[290px] flex font-normal flex-col items-start'>
          {/* <div className='text-[15px] line-clamp-2 max-big-mobile:line-clamp-1'>{description}</div> */}
          <div className='flex flex-col gap-1 font-light text-[14px] mb-[6px]'>
            <span className='text-[15px] font-bold'>{name}</span>
            <span className='flex gap-1 text-[#B0B0B0]'>
              {userData?.username ?? author}
              <AcceptedIcon />
            </span>
            <span className='font-medium text-[#B0B0B0]'>{category}</span>
          </div>
          <div className='flex gap-2 flex-wrap'>
            {tags &&
              !!tags.length &&
              tags.map((item, index) => (
                <div
                  key={index}
                  className='rounded-[4px] py-[1px] text-white px-2 bg-[#523A83] text-[12px] font-bold'
                >
                  {item}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SteramCard;
