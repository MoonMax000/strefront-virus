import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface NavElementProps {
  icon: ReactNode;
  title: string;
  isActive?: boolean;
  collapsed?: boolean;
}

const NavElement: FC<NavElementProps> = ({ icon, title, isActive, collapsed }) => {
  return (
    <div
      className={clsx('flex items-center rounded-xl cursor-pointer transition-all duration-200', {
        'p-[14px] gap-[10px] w-[220px]': !collapsed,
        'p-[14px] justify-center w-[48px]': collapsed,
        'bg-blackedGray text-white': isActive,
        'text-webGray': !isActive,
      })}
    >
      {icon}
      {!collapsed && <p className='text-[14px]'>{title}</p>}
    </div>
  );
};

export default NavElement;
