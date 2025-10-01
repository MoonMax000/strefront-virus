import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FC } from 'react';

export interface TabModel {
  name: string;
  key: string;
}

interface TabProps {
  tab: TabModel;
  onClick?: (tab: TabModel) => void;
  isActive?: boolean;
  tabClassName?: string;
}

const Tab: FC<TabProps> = ({ tab, isActive, onClick, tabClassName }) => {
  return (
    <div
      role='button'
      data-active={isActive}
      className={clsx(
        'text-[14px] leading-[14px] font-semibold pb-[9px] transition-all relative',
        tabClassName,
        {
          'opacity-40': !isActive,
        },
      )}
      onClick={() => {
        onClick?.(tab);
      }}
    >
      {tab.name}

      {isActive && (
        <motion.div className='absolute -bottom-3 w-full bg-white h-1' layoutId='underline' />
      )}
    </div>
  );
};

export default Tab;
