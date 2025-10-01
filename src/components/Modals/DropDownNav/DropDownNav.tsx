import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import GradientBorder from '@/components/GradientBorder/GradientBorder';
import Button from '@/components/ui/Button';
import { menuItems } from './constants';
import IconLogout from '@/assets/icons/user-menu/icon-log-out.svg';

function maskEmail(email: string): string {
  const atIndex = email.indexOf('@');
  if (atIndex <= 0) return email;

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex);

  const match = local.match(/^[A-Za-zА-Яа-яЁё]+/);
  const prefix = match ? match[0] : local;

  return `${prefix}***${domain}`;
}

interface DropDownNavProps {
  setDropdownVisible: Dispatch<SetStateAction<boolean>>;
  logOut: () => void;
  avatarUrl: string;
  email?: string;
  id?: string;
  className?: string;
}

const DropDownNav: React.FC<DropDownNavProps> = ({
  setDropdownVisible,
  logOut,
  avatarUrl,
  email,
  id,
  className,
}) => {
  return (
    <GradientBorder className={className}>
      <div className='py-6 px-4'>
        <div className='flex items-center justify-between gap-2 mb-[14px]'>
          <img src={avatarUrl} alt='avatar' className='w-11 h-11 rounded-full' />
          <div className='flex flex-col gap-[2px]'>
            {email && <span className='text-[15px] font-semibold'>{maskEmail(email)}</span>}
            {id && <span className='text-xs font-semibold text-[#B0B0B0]'>ID: {id}</span>}
          </div>
        </div>
        <Button variant='dark_transparent' className='p-[5px] w-full my-6'>
          Switch sub-account
        </Button>
        <div className='my-[14px] bg-[linear-gradient(90deg,rgba(82,58,131,0)_0%,#523A83_50%,rgba(82,58,131,0)_100%)] w-[256px] h-[2px]' />
        <ul>
          {menuItems.map(({ label, icon: Icon, href, action }, index) => (
            <li
              key={index}
              onClick={() => {
                setDropdownVisible(false);
                if (action) action();
              }}
            >
              {href ? (
                <Link
                  href={href}
                  className='flex items-center gap-[10px] py-[14px] hover:opacity-50 cursor-pointer text-[#B0B0B0]'
                >
                  <Icon className='w-5 h-5' />
                  <span>{label}</span>
                </Link>
              ) : (
                <div className='flex items-center gap-[10px] py-[14px] hover:opacity-50 cursor-pointer text-[#B0B0B0]'>
                  <Icon className='w-5 h-5' />
                  <span>{label}</span>
                </div>
              )}
            </li>
          ))}
          <div className='my-[14px] bg-[linear-gradient(90deg,rgba(82,58,131,0)_0%,#523A83_50%,rgba(82,58,131,0)_100%)] w-[256px] h-[2px]' />

          <li
            onClick={() => {
              setDropdownVisible(false);
              logOut();
            }}
            className='flex items-center gap-[10px] py-[14px] hover:opacity-50 cursor-pointer text-[#B0B0B0]'
          >
            <IconLogout className='w-6 h-6' />
            <span>Log out</span>
          </li>
        </ul>
      </div>
    </GradientBorder>
  );
};

export default DropDownNav;
