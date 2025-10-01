import { FC } from 'react';
import LoginModal from './LoginModal';
import RegistrationModal from './RegistrationModal';
import authorizationAdvertisementBackground from '@/assets/authorization-advertisement-background.png';
import RecoveryModal from './RecoveryModal';
import { TLogin } from '../Header';
import clsx from 'clsx';
import LogoIcon from '@/assets/new-logo.svg';
import GoogleIcon from '@/assets/icons/sochial-web/google.svg';
import ApleIcon from '@/assets/icons/sochial-web/aple.svg';
import QrIcon from '@/assets/icons/qr.svg';
import TelegramIcon from '@/assets/icons/sochial-web/tg.svg';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import useMediaQuery from '@/utils/hooks/useMediaQuery';

const SOCIAL_NETWORKS = [
  { icon: <GoogleIcon width={24} height={24} />, link: '' },
  { icon: <ApleIcon width={20} height={24} />, link: '' },
  { icon: <TelegramIcon width={24} height={24} />, link: '' },
];

const LoginModalWrapper: FC<{
  type: TLogin;
  onModalChange: (type: TLogin) => void;
}> = ({ type, onModalChange }) => {
  const isTablet = useMediaQuery('(max-width:824px)');
  const pageData = {
    login: {
      title: 'Log In',
      component: <LoginModal onModalChange={onModalChange} />,
      footerText: (
        <p className='mt-4 text-center flex gap-1 font-semibold'>
          <span className='opacity-[48%] font-bold text-sm'>Not registered yet?</span>
          <span
            onClick={() => onModalChange('registration')}
            className='text-purple text-sm underline'
          >
            Register
          </span>
        </p>
      ),
      footerAction: () => onModalChange('registration'),
    },
    registration: {
      title: 'Create an account',
      component: <RegistrationModal onModalChange={onModalChange} />,
      footerText: (
        <p className='mt-4 text-center flex gap-1 font-semibold justify-center'>
          <span className='opacity-[48%] font-bold text-sm'>Already have an account?</span>
          <span onClick={() => onModalChange('login')} className='text-purple text-sm underline'>
            Login
          </span>
        </p>
      ),
      footerAction: () => onModalChange('login'),
    },
    recovery: {
      title: 'Восстановление пароля',
      component: <RecoveryModal onModalChange={onModalChange} />,
      footerText: (
        <p className='mt-4 text-center flex gap-1 font-semibold justify-center'>
          <span onClick={() => onModalChange('login')} className='text-purple text-sm underline'>
            Login
          </span>
        </p>
      ),
      footerAction: () => onModalChange('login'),
    },
  };
  return (
    <div
      className={clsx(
        'grid  items-center',
        { 'grid-cols-2': !isTablet },
        { 'justify-center': isTablet },
      )}
    >
      <div className={clsx('px-6 py-[70px] max-w-[389px]', { 'py-0': isTablet })}>
        {type && (
          <>
            {isTablet && (
              <div
                style={{ backgroundImage: `url(${authorizationAdvertisementBackground.src})` }}
                className='px-4 py-[22px] mb-[22px]'
              >
                <LogoIcon width={60} height={76} alt='logo' className='mx-auto mb-12' />
                <p className='m-w-[318px] text-xl font-bold text-center'>
                  Join the 100,000+ AXA Stocks community
                </p>
              </div>
            )}
            <h2 className='text-2xl font-semibold text-center mb-6'>{pageData[type]?.title}</h2>
            <div>
              <Tabs defaultValue='email'>
                <TabsList className='flex border-b-0 justify-between items-center mb-4'>
                  <div className='flex items-center gap-2 '>
                    <TabsTrigger
                      value='email'
                      className='text-4 font-semiboldx py-1 border-b-4 border-transparent text-gray-500 !px-0'
                    >
                      Email
                    </TabsTrigger>
                    <TabsTrigger
                      value='phone'
                      className='text-4 font-semibold  py-1 border-b-4 border-transparent text-gray-500 !px-0'
                    >
                      Telephone
                    </TabsTrigger>
                  </div>
                  <div className='bg-[#272A32] rounded-lg w-[40px] h-[40px] flex items-center justify-center'>
                    <QrIcon width={24} height={24} color={'white'} />
                  </div>
                </TabsList>
                <TabsContent value='email'>{pageData[type]?.component}</TabsContent>
                <TabsContent value='phone'>{pageData[type]?.component}</TabsContent>
              </Tabs>
            </div>
          </>
        )}

        <div className='mt-4'>
          <div className='flex gap-1 justify-center items-center'>
            <div className='max-w-[80px] h-[1px] w-full bg-onyxGrey'></div>
            <span className='opacity-[48%] font-bold text-sm'>or sign in with</span>
            <div className='max-w-[80px] h-[1px] w-full bg-onyxGrey'></div>
          </div>
          <div className='flex items-center justify-center gap-8 mt-4'>
            {SOCIAL_NETWORKS.map((item, index) => {
              return (
                <div
                  key={index}
                  className='bg-[#272A32] w-12 h-12 rounded-full flex items-center justify-center'
                >
                  {item.icon}
                </div>
              );
            })}
          </div>
        </div>

        {type && (
          <div role='button' className='' onClick={pageData[type]?.footerAction}>
            {pageData[type]?.footerText}
          </div>
        )}
      </div>
      {!isTablet && (
        <div
          className='bg-[#FFFFFF05] backdrop-blur-[240px] py-[70px] px-6 rounded-r-xl bg-cover h-full'
          style={{ backgroundImage: `url(${authorizationAdvertisementBackground.src})` }}
        >
          <LogoIcon width={100} height={128} alt='logo' className='mx-auto mb-12' />
          <h2 className='text-title text-center'>Join the 100,000+ AXA Stocks community</h2>
          <p className='mt-4 text-[15px] leading-5 opacity-[48%] font-bold text-center'>
            Become part of an active community of investors and traders. We offer various tariffs,
            including 7 days of free access! Unlock all the platform's features, get tips and share
            experiences. Improve your investment skills with AXA Stocks!
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginModalWrapper;
