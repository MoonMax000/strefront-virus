import { FC } from 'react';

import TradingPsyhology from './conponents/TradingPsyhology.svg';
import Serch from './conponents/Search.svg';
import Calendar from './conponents/Calendar.svg';
import News from './conponents/News.svg';
import Portfolio from './conponents/Portfolio.svg';
import SectorMover from './conponents/SectorMover.svg';
import WatchList from './conponents/WatchList.svg';

import { cn } from '@/utils/cn';

interface Props {
  isCollapsed: boolean;
}

export const RightMenu: FC<Props> = ({ isCollapsed }) => {
  return (
    <section
      className={cn(
        'flex flex-col gap-6 min-h-full overflow-hidden transition-all duration-500 ease-in-out',
        {
          'h-0 w-0 p-0 opacity-0 ': !isCollapsed,
          'min-w-[312px] pr-6  opacity-100 ': isCollapsed,
        },
      )}
    >
      <Serch />
      <TradingPsyhology />
      <SectorMover />
      <Portfolio />
      <WatchList />
      <News />
      <Calendar />
    </section>
  );
};
