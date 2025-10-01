import { FC } from 'react';
import SearchIcon from '@/assets/icons/search/icon-serach.svg';

interface Props {
  searchValue: string;
  setSearchValue: (text: string) => void;
  handleKeyDown: (key: React.KeyboardEvent<HTMLInputElement>['key']) => void;
}

const SearchField: FC<Props> = ({ searchValue, setSearchValue, handleKeyDown }) => {
  return (
    <div className='flex py-[10px] px-[16px] gap-2 rounded-lg bg-transparent w-full border border-gunpowder justify-between items-center max-h-[44px]'>
      <div className='w-6 h-6 pointer'>
        <SearchIcon />
      </div>

      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e.key)}
        placeholder='Search'
        className='bg-transparent border-0 p-0 text-[14px] font-semibold max-h-[44px] outline-none w-full text-white placeholder:text-white/50'
      />
    </div>
  );
};

export default SearchField;
