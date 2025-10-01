import { FC, useState } from 'react';
import Link from 'next/link';
import { navElements, NavElementProps } from './constants';
import DoobleArrow from '@/assets/icons/dooble-arrow.svg';
import { cn } from '@/utils/cn';
import ArrowDown from '@/assets/icons/smallArrowDown.svg';

const Navbar: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const toggleGroup = (title: string) => {
    setOpenGroup(openGroup === title ? null : title);
  };

  const renderElement = (el: NavElementProps) => {
    if (el.children) {
      return (
        <div key={el.title}>
          <button
            onClick={() => toggleGroup(el.title)}
            className={cn(
              'flex items-center justify-between w-full px-3 py-[14px] rounded-lg transition',
            )}
          >
            <div
              className={cn(
                'flex items-center gap-2 pl-2 hover:text-white hover:border-l-[2px] hover:border-purple ',
                {
                  'text-white border-l-[2px] border-purple': openGroup === el.title,
                  'text-[#B0B0B0]': openGroup !== el.title,
                  'ml-[5px]': isCollapsed,
                },
              )}
            >
              {el.icon}
              {!isCollapsed && <span className='text-[15px] font-semibold'>{el.title}</span>}
            </div>
            {!isCollapsed && <ArrowDown className={openGroup === el.title ? 'rotate-180 ' : ''} />}
          </button>
          {openGroup === el.title && !isCollapsed && (
            <div className='ml-6 flex flex-col gap-1 '>
              {el.children.map((child) => (
                <Link
                  key={child.title}
                  href={child.route ?? '#'}
                  className={cn('px-3  ', { 'ml-[5px]': !isCollapsed })}
                >
                  <div className='flex items-center gap-2 pl-2 py-2  hover:custom-bg-blur text-[#B0B0B0] hover:text-white hover:border-l-[2px] hover:border-purple'>
                    <div className='size-5'>{child.icon}</div>
                    {!isCollapsed && (
                      <span className='text-[15px] font-semibold'>{child.title}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link key={el.title} href='#' className={cn('px-3 py-[14px]', { 'ml-[5px]': isCollapsed })}>
        <div
          className={cn(
            'flex items-center gap-2 pl-2  transition text-[#B0B0B0] hover:text-white hover:border-l-[2px] hover:border-purple',
          )}
        >
          {el.icon}
          {!isCollapsed && <span>{el.title}</span>}
        </div>
      </Link>
    );
  };

  return (
    <div
      className={cn(
        'w-fit',
        'bg-transparent relative ml-6 h-fit rounded-[12px] p-[1px]',
        `bg-[linear-gradient(170.22deg,#523A83_0.01%,rgba(82,58,131,0)_8.28%),linear-gradient(350.89deg,#523A83_0%,rgba(82,58,131,0)_8.04%)]`,
      )}
    >
      <div
        className={cn(
          'flex flex-col  py-4 transition-all duration-300 custom-bg-blur rounded-[12px]',
          isCollapsed ? 'w-[72px]' : 'w-[222px]',
        )}
      >
        <div className='absolute right-[-12px]'>
          <button
            className='w-[26px] h-[26px]  rounded-lg border border-[#181B22] custom-bg-blur hover:bg-[#1E1E1E] flex items-center justify-center'
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <DoobleArrow className={isCollapsed ? '' : 'rotate-180'} />
          </button>
        </div>

        <div className='flex flex-col gap-1'>
          {navElements.slice(0, 1).map((el) => renderElement(el))}
          <div
            className={cn(
              'my-[14px] bg-[linear-gradient(90deg,rgba(82,58,131,0)_0%,#523A83_50%,rgba(82,58,131,0)_100%)] mx-auto  h-[2px]',
              { 'w-[190px]': !isCollapsed },
              { 'w-[40px]': isCollapsed },
            )}
          />
          {navElements.slice(1).map((el) => renderElement(el))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
