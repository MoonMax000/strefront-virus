'use client';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import RecomendetionSubscribersLists from '@/components/Navbar/RecomendetionSubscribersLists/RecomendetionSubscribersLists';
import ToastNotification from '@/components/Notifications/ToastNotification';
import { RightMenu } from '@/components/RightMenu';
import ToastPortal from '@/components/ToastPortal/ToastPortal';

import { Suspense, useState } from 'react';

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  return (
    <div className='max-w-[1920px] mx-auto '>
      <div id='portal-root'></div>
      <Suspense fallback={<div>...Loading</div>}>
        <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </Suspense>

      <div
        className='flex justify-between flex-1 
       '
      >
        <div>
          <Navbar />
          {/* <RecomendetionSubscribersLists /> */}
        </div>

        <Suspense fallback={<div>...Loading</div>}>
          <div className='h-fit p-4 pt-0 flex-1  '>{children}</div>
        </Suspense>
        <RightMenu isCollapsed={isCollapsed} />
      </div>
      <Footer classNames='mt-60' />
      <ToastPortal />
      <ToastNotification />
    </div>
  );
}
