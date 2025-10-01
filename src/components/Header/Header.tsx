'use client';
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Button from '../ui/Button';
import Notification from '../Notification';
import ModalWrapper from '../Modals/ModalWrapper';
import Logo from '@/assets/icons/icon-logo.svg';
import BecomeStreamer from '../BecomeStreamer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProfileResponse, UserService } from '@/services/UserService';
import StartStreamModal from './StartStreamModal';
import DropDownNav from '../Modals/DropDownNav';
import Link from 'next/link';
import IconSearch from '@/assets/icons/search.svg';
import { AnimatePresence, motion } from 'framer-motion';
import MobileNavbar from '../Navbar/MobileNavbar';
import clsx from 'clsx';
import { ModalWrapperProps } from '../Modals/ModalWrapper/ModalWrapper';
import { getCookie } from '@/utils/cookie';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/AuthService';
import ArrowIcon from '@/assets/icons/mini-arrow-down.svg';

import { AuthAll } from '../AuthAll/AuthAll';
import { RecomendationService } from '@/services/RecomendationService';
import { handleGetSearchItem } from './Search/getSerchItem';
import { useClickOutside } from '@/utils/hooks/useClickOutside';
import RightBarButton from '../RightBar/RightBar';
import SearchRounded from '../ui/SearchRounded';
import { useNotificationWebSocket } from '@/utils/hooks/useNotificationWebSocket';
import { getMediaUrl } from '@/utils/helpers/getMediaUrl';
import { useAppSelector } from '@/store/hooks';

export type ModalType =
  | 'becomeStreamer'
  | 'login'
  | 'registration'
  | 'startStream'
  | 'recovery'
  | 'auth';

export type TLogin = 'login' | 'registration' | 'recovery' | null;

interface Props {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}
const Header: FC<Props> = ({ isCollapsed, setIsCollapsed }) => {
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [isUserMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [searchValue, setSearchValue] = useState('');
  const [user, setUser] = useState<ProfileResponse | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authTimer, setAuthTimer] = useState<NodeJS.Timeout | null>(null);
  const { push, replace } = useRouter();
  const serchRef = useRef<HTMLDivElement>(null);

  const notificationCount = useAppSelector((state) => state.notification);
  useEffect(() => {
    console.log(notificationCount.subscribers, notificationCount.subscribers.length);
  }, [notificationCount]);
  useNotificationWebSocket(token ?? '');

  useClickOutside(serchRef, () => {
    setSearchOpen(false);
    setSearchValue('');
  });

  const handleClickStream = (id: string) => {
    push('/video/' + id);
    setSearchOpen(false);
    setSearchValue('');
  };

  const handleKeyDown = (key: React.KeyboardEvent<HTMLInputElement>['key']) => {
    if (key === 'Enter') {
      const urlParams = new URLSearchParams();
      urlParams.set('q', searchValue);
      replace(`/results?${urlParams.toString()}`, { scroll: false });
      setSearchOpen(false);
    }
  };

  const handleGetSearchResults = () => {
    if (!searchValue.length) return;
    push('/results');
    setSearchOpen(false);
  };

  const {} = useQuery({
    queryKey: ['getProfile'],
    queryFn: async () => {
      const userData = await UserService.getProfile();
      setUser(userData.data);
      return userData;
    },
  });

  const { data: ProfileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => AuthService.getProfile(),
  });

  useEffect(() => {
    const crsfToken = getCookie('sessionid');
    if (!crsfToken) return;
    setToken(crsfToken);
  }, []);

  const { mutateAsync: logoutFunc } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => AuthService.logout(),
    onSuccess: (resp) => console.log(resp),
    onError: (err) => console.log(err),
  });

  const handleLogout = useCallback(() => {
    window.location.reload();
    logoutFunc();
    setUser(null);
    setUserMenuOpen(false);
    setIsOpenMobileMenu(false);
  }, []);

  const modals = useMemo((): Record<ModalType, Omit<ModalWrapperProps, 'isOpen' | 'onClose'>> => {
    return {
      login: { title: '', children: <></> },
      registration: { title: '', children: <></> },
      recovery: { title: '', children: <></> },
      becomeStreamer: {
        title: 'Become Streamer',
        children: <BecomeStreamer />,
      },
      startStream: {
        title: 'Broadcast Information',
        children: <StartStreamModal closeModal={() => setModalType(null)} />,
      },
      auth: {
        title: 'Sign In to Have Access to All Materials of the Tyrian Community',
        children: <AuthAll />,
        className: '!max-w-[400px] bg-[#0C101480] backdrop-blur-[100px] !rounded-3xl !p-6',
        withCloseIcon: false,
        isClosable: false,
      },
    };
  }, []);

  const onBecomeStreamer = useCallback(() => {
    setModalType(user?.roles?.indexOf('streamer') !== -1 ? 'startStream' : 'becomeStreamer');
    setIsOpenMobileMenu(false);
  }, [user?.roles]);

  const handleLogin = useCallback(() => {
    setModalType('login');
    setIsOpenMobileMenu(false);
  }, []);

  const onMobileNavbarClose = useCallback(() => {
    setIsOpenMobileMenu(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !ProfileData?.id) {
      const authCheckKey = 'authCheckTime';
      const timeLeftKey = 'timeLeft';
      const savedTime = localStorage.getItem(authCheckKey);
      const currentTimeLeft = localStorage.getItem(timeLeftKey);
      const currentTime = Date.now();
      let timeLeft = Number(process.env.NEXT_PUBLIC_TIMER_AUTH) || 30000;

      if (currentTimeLeft) {
        timeLeft = Number(currentTimeLeft);
      }

      if (Number(savedTime) && timeLeft === 0) {
        setModalType('auth');
        return;
      }

      if (savedTime) {
        const elapsed = currentTime - parseInt(savedTime, 10);
        timeLeft = Math.max(0, Number(process.env.NEXT_PUBLIC_TIMER_AUTH) || 30000 - elapsed);
      }

      const timeoutId = setTimeout(() => {
        setModalType('auth');
      }, timeLeft);

      setAuthTimer(timeoutId);
      localStorage.setItem(authCheckKey, currentTime.toString());
      localStorage.setItem(timeLeftKey, timeLeft.toString());
    }

    return () => {
      if (authTimer) {
        clearTimeout(authTimer);
      }
    };
  }, [isLoading]);

  const { mutateAsync: mutateSerch, data: serchData } = useMutation({
    mutationFn: (subString: string) => RecomendationService.searchChannels(subString),
  });

  const handleSearch = (value: string) => {
    setSearchValue(value);

    if (!!value?.trim()?.length) {
      setSearchOpen(true);
      mutateSerch(value);
    } else {
      setSearchResults([]);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <header className='pb-1 pt-3 w-full pl-[30px] pr-[24px] flex justify-between   bg-background items-center  max-small-desktop:border-none max-small-desktop:pt-[50px] gap-2 mb-6'>
        {/* <Link href='/home' className='hidden max-small-desktop:block'>
          <IconMobileLogo />
        </Link> */}

        <div className='min-w-[230px]'>
          <Link href='/home' className='flex gap-[10px] items-center'>
            <Logo width={18} height={22} />
            <span className='text-2xl font-bold text-white'>Tyrian Trade</span>
          </Link>
        </div>
        <div className='relative max-small-desktop:hidden max-w-fit w-full'>
          <div className='flex gap-4'>
            <div onClick={() => searchValue.length && setSearchOpen(true)}>
              <SearchRounded
                handleKeyDown={handleKeyDown}
                searchValue={searchValue}
                setSearchValue={handleSearch}
              />
            </div>

            <Link
              href={process.env.NEXT_PUBLIC_AI_ASSISTANT_URL ?? `https://aihelp.tyriantrade.com/`}
              className='flex gap-[6px] items-center'
            >
              <div className='p-[0.5px] rounded-[4px] bg-gradient-to-r from-[#A06AFF] via-[#A06AFF] to-transparent size-[32px] flex items-center justify-center'>
                <div className='p-[2px] bg-black rounded-[4px] size-[29px]'>
                  <div className='size-[26px] rounded-[4px] bg-background p-[5px] text-white flex items-center justify-center'>
                    AI
                  </div>
                </div>
              </div>

              <span className='font-medium text-[15px] text-white'>Assistant</span>
            </Link>
          </div>

          {searchOpen && (
            <div
              ref={serchRef}
              className='absolute top-full mt-2 w-full h-fit z-20
                flex flex-col gap-4 rounded-lg border-[1px] border-[#523A83]
                bg-[#0C101480] shadow-lg p-4 backdrop-blur-[100px]'
            >
              <div className='flex-1 flex flex-col gap-4 text-gray-400'>
                {serchData?.data?.map((item, index) =>
                  handleGetSearchItem(item, index, handleClickStream),
                )}
                <div
                  onClick={handleGetSearchResults}
                  className='flex gap-3 text-[15pxs]  cursor-pointer font-bold items-center p-1 rounded-md'
                >
                  Go to {searchValue}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='flex gap-6 items-center max-small-desktop:hidden'>
          {ProfileData ? (
            <div className='flex items-center justify-center relative z-1000'>
              {/* <div className='flex items-center justify-center p-3 pr-0 gap-[8px] hover:cursor-pointer'>
                <span>ENG</span>
                <ArrowIcon />
              </div> */}
              <div className='flex relative items-center justify-center p-3'>
                <Notification
                  count={
                    notificationCount.subscribers.filter((notify) => notify.status === 'unread')
                      .length
                  }
                />
              </div>
              {isUserMenuOpen && (
                <DropDownNav
                  avatarUrl={
                    ProfileData?.avatar ? getMediaUrl(ProfileData?.avatar) : '/defaultAvatar.png'
                  }
                  email={ProfileData?.email}
                  id={ProfileData?.id.toString()}
                  logOut={handleLogout}
                  setDropdownVisible={setUserMenuOpen}
                  className='absolute right-0 top-[60px] z-50'
                />
              )}
              <div className='size-10 rounded-[50%] bg-gray flex items-center justify-center overflow-hidden '>
                <img
                  className='w-full h-full object-cover'
                  src={
                    ProfileData?.avatar ? getMediaUrl(ProfileData?.avatar) : '/defaultAvatar.png'
                  }
                  alt={ProfileData?.username || 'avatar'}
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                />
              </div>
            </div>
          ) : (
            <>
              {' '}
              <div className='flex gap-6'>
                <Button
                  variant='simple'
                  onClick={() => {
                    const baseUrl =
                      process.env.NEXT_PUBLIC_AUTH_URL || 'https://auth.tyriantrade.com/';
                    push(`${baseUrl}stream`);
                  }}
                  className='h-11 w-[180px] rounded-lg border-[1px] border-moonlessNight'
                >
                  <span className='font-bold'>Log In</span>
                </Button>

                <Button
                  className={'h-11 w-[180px] font-bold'}
                  onClick={() => {
                    const baseUrl =
                      process.env.NEXT_PUBLIC_AUTH_URL || 'https://auth.tyriantrade.com/';
                    push(`${baseUrl}stream`);
                  }}
                >
                  <span className='font-bold'>Registration</span>
                </Button>
              </div>
            </>
          )}

          {/* <div className='w-[1px] h-11  bg-[linear-gradient(180deg,rgba(82,58,131,0)_0%,#523A83_50%,rgba(82,58,131,0)_100%)]' />

          <RightBarButton isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} /> */}
        </div>
        <div className='hidden max-small-desktop:flex items-center gap-4'>
          {!isOpenMobileMenu && (
            <button
              type='button'
              className='size-10 min-w-10 min-h-10 flex items-center justify-center border border-onyxGrey rounded-[50%]'
            >
              <IconSearch className='opacity-[0.48] size-4' />
            </button>
          )}

          <button
            type='button'
            className={clsx('py-2 size-10 min-w-10 min-h-10 ', {
              'flex flex-col justify-between px-[6px]': !isOpenMobileMenu,
              block: isOpenMobileMenu,
            })}
            onClick={() => setIsOpenMobileMenu((prev) => !prev)}
          >
            <span
              className={clsx(
                'block bg-white w-full h-[2px] rounded-sm transition-transform duration-300',
                {
                  'rotate-45': isOpenMobileMenu,
                },
              )}
            />

            {!isOpenMobileMenu && <span className='block bg-white w-full h-[2px] rounded-sm' />}
            <span
              className={clsx(
                'block bg-white w-full h-[2px] rounded-sm transition-transform duration-300',
                {
                  '-rotate-45 -mt-[2px]': isOpenMobileMenu,
                },
              )}
            />
          </button>

          <AnimatePresence>
            {isOpenMobileMenu && (
              <motion.div
                className='fixed left-0 top-[110px] z-[900] h-screen w-full bg-[#0C1014]'
                initial={{ translate: '100%', opacity: 0 }}
                animate={{ translate: 0, opacity: 1 }}
                exit={{ translate: '100%', opacity: 0 }}
              >
                <MobileNavbar
                  roles={user?.roles || []}
                  token={token}
                  onBecomeStreamer={onBecomeStreamer}
                  onLogout={handleLogout}
                  onLogin={handleLogin}
                  onMobileNavbarClose={onMobileNavbarClose}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {(modalType === 'becomeStreamer' ||
        modalType === 'startStream' ||
        (modalType === 'auth' && !user)) && (
        <ModalWrapper
          isOpen={!!modalType}
          onClose={() => setModalType(null)}
          {...(modalType ? modals[modalType] : {})}
        >
          {modalType && modals[modalType].children}
        </ModalWrapper>
      )}
    </>
  );
};

export default Header;
