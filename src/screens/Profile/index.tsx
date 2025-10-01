'use client';
import { useSearchParams } from 'next/navigation';
import { ReactNode, useMemo } from 'react';
import Settings from './tabs/Settings';
import Notifications from './tabs/Notifications';
import Safety from './tabs/Safety';
import Broadcast from './tabs/Broadcast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Tabs from '@/components/Tabs';
import { TabModel } from '@/components/Tabs/Tab';
import { ACCESS_TOKEN_COOKIE_NAME } from '@/components/Header/LoginModal';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/services/UserService';
import MySubscribers from '@/screens/Profile/tabs/MySubscribers';
import { getCookie } from '@/utils/cookie';

const tabs = [
  { name: 'Profile', key: '' },
  { name: 'Notifications', key: 'notifications' },
  { name: 'Security', key: 'safety' },
  { name: 'Streaming', key: 'broadcast' },
  { name: 'Followers', key: 'my_subscribers' },
] as const;

type TabKeys = (typeof tabs)[number]['key'];

const Profile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || tabs[0].key;

  if (!getCookie(ACCESS_TOKEN_COOKIE_NAME)) {
    router.push('/home');
    return <></>;
  }

  const { data } = useQuery({
    queryKey: ['getProfile'],
    queryFn: UserService.getProfile,
  });

  const tabComponents = useMemo((): Record<TabKeys, ReactNode> => {
    return {
      '': <Settings />,
      notifications: <Notifications />,
      safety: <Safety email={data?.data?.email ?? ''} />,
      broadcast: <Broadcast />,
      my_subscribers: <MySubscribers />,
    };
  }, [data?.data.email]);

  return (
    <>
      <h1 className='text-[40px] leading-[56px] font-semibold mb-4 max-tablet:text-[32px] max-tablet:leading-8'>
        Settings
      </h1>

      <div className='max-w-[90vw] overflow-hidden mb-6'>
        <Tabs
          tabs={tabs as unknown as TabModel[]}
          activeTabKey={tab}
          className='overflow-x-auto whitespace-nowrap scrollbar-small pb-3'
          onClick={(currentTab) => {
            router.push(currentTab.key !== '' ? `/profile?tab=${currentTab.key}` : '/profile');
          }}
          tabClassName='data-[active=true]:!text-purple [&>div]:data-[active=true]:!bg-purple'
        />
      </div>

      <div
        className={`${tab === 'my_subscribers' ? '' : 'max-w-[70%] max-tablet:max-w-full max-tablet:pb-[110px]'}`}
      >
        {tabComponents[tab as TabKeys] || tabComponents['']}
      </div>
    </>
  );
};

export default Profile;
