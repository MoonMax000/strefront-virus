import Link from 'next/link';
import { NavElementProps, navElements } from '../constants';
import IconChevronRight from '@/assets/icons/chevron-right.svg';
import Button from '@/components/ui/Button';
import { ProfileResponse } from '@/services/UserService';
import { FC, memo } from 'react';
import IconVideoCamera from '@/assets/icons/icon-videocamera.svg';
import IconProfile from '@/assets/icons/profile.svg';
import IconPlay from '@/assets/icons/video/play.svg';
import IconLogin from '@/assets/icons/login.svg';

interface MobileNavbarProps {
  token: string;
  roles: ProfileResponse['roles'];
  onBecomeStreamer: () => void;
  onLogin: () => void;
  onLogout: () => void;
  onMobileNavbarClose: () => void;
}

const MobileNavbar: FC<MobileNavbarProps> = ({
  token,
  roles,
  onBecomeStreamer,
  onLogin,
  onLogout,
  onMobileNavbarClose,
}) => {
  const isStreamer = roles && roles.indexOf('streamer') !== -1;

  const dynamicNaVelements: NavElementProps[] = token
    ? [{ route: '/profile', title: 'Профиль', icon: <IconProfile /> }, ...navElements]
    : navElements;

  return (
    <nav className='py-[48px] px-4 overflow-y-scroll max-h-[557px]'>
      <div className='flex flex-col gap-4 pb-[48px] border-b-2 border-[#ffffff29]'>
        {token && (
          <Button onClick={onBecomeStreamer} className='py-[10px] px-[15px] bg-purple'>
            {isStreamer ? <IconVideoCamera /> : <IconPlay />}
            <span className='text-[16px] leading-[22px] font-bold ml-[10px]'>
              {isStreamer ? 'Настроить трансляцию' : 'Стать стримером'}
            </span>
            <IconChevronRight className='opacity-20 ml-auto' />
          </Button>
        )}
        {dynamicNaVelements.map((element) => {
          if (element.route === '/') {
            return (
              <div
                key={element.route}
                className='flex justify-between items-center gap-[10px] py-[10px] px-[15px] bg-moonlessNight rounded-2xl cursor-not-allowed opacity-50'
              >
                <div className='flex items-center gap-[10px] [&>svg]:size-6 [&>svg]:min-w-6 [&>svg]:min-h-6 [&>svg]:text-purple'>
                  {element.icon}
                  <span className='text-[15px] leading-5 font-semibold'>{element.title}</span>
                </div>
                <IconChevronRight className='opacity-20' />
              </div>
            );
          }

          return (
            <Link
              key={element.route}
              href='#'
              className='flex justify-between items-center gap-[10px] py-[10px] px-[15px] bg-[#23252D] rounded-2xl'
              onClick={onMobileNavbarClose}
            >
              <div className='flex items-center gap-[10px] [&>svg]:size-6 [&>svg]:min-w-6 [&>svg]:min-h-6 [&>svg]:text-purple'>
                {element.icon}
                <span className='text-[15px] leading-5 font-semibold'>{element.title}</span>
              </div>
              <IconChevronRight className='opacity-20' />
            </Link>
          );
        })}
      </div>

      <Button
        onClick={token ? onLogout : onLogin}
        className='mt-[48px] py-[10px] px-[15px] !bg-[#23252D] w-full'
      >
        <IconLogin className={`${token ? 'rotate-180' : ''} text-purple`} />
        <span className='text-[15px] leading-5 font-semibold ml-[10px]'>
          {token ? 'Log Out' : 'Log In'}
        </span>
        <IconChevronRight className='opacity-20 ml-auto' />
      </Button>
    </nav>
  );
};

export default memo(MobileNavbar);
