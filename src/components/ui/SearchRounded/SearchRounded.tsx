import { FC } from 'react';
import SearchIcon from '@/assets/icons/search/icon-serach.svg';
import { cn } from '@/utils/cn';

interface Props {
  searchValue: string;
  setSearchValue: (text: string) => void;
  handleKeyDown: (key: React.KeyboardEvent<HTMLInputElement>['key']) => void;
  className?: string;
}

const SearchRounded: FC<Props> = ({ searchValue, setSearchValue, handleKeyDown, className }) => {
  return (
    <div
      className={cn(
        'p-[1px] px-[2px] rounded-3xl bg-gradient-to-r from-[rgba(160,106,255,0.8)] via-[#482090] to-[rgba(160,106,255,0.8)] max-w-[256px] max-h-fit w-full',
        className,
      )}
    >
      <div className=' bg-background flex items-center justify-between gap-2 rounded-3xl  py-2 px-[16px] text-white'>
        <div className='w-6 h-6 pointer text-[#B0B0B0]'>
          <SearchIcon />
        </div>

        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e.key)}
          placeholder='Search (Ctrl + K)'
          className='bg-transparent  p-0 text-[15px] font-semibold max-h-[40px] outline-none w-full text-white placeholder:text-[#B0B0B0]'
        />
      </div>
    </div>
  );
};

export default SearchRounded;
