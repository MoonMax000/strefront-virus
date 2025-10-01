'use client';
import { ACCESS_TOKEN_COOKIE_NAME } from '@/components/Header/LoginModal';
import { AuthService } from '@/services/AuthService';
import { getCookie, setCookie } from '@/utils/cookie';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RefreshScreen = () => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['refreshToken'],
    mutationFn: () => AuthService.refresh(),
    onSuccess: (data) => {
      if (!data?.data.data.token) {
        router.push('./');
        return;
      }
      setCookie(ACCESS_TOKEN_COOKIE_NAME, data.data.data.token);
      router.push('./');
    },
    onError: () => {
      router.push('./');
    },
  });

  useEffect(() => {
    if (getCookie(ACCESS_TOKEN_COOKIE_NAME)) {
      mutate();
    } else {
      router.push('./');
    }
  }, [mutate, router]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='text-center'>
        <div className='inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4'></div>
        <p className='text-lg font-medium text-gray-700 mb-2'>Loading your data</p>
        <div className='flex justify-center space-x-1'>
          <div className='h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
          <div className='h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
          <div className='h-2 w-2 bg-blue-500 rounded-full animate-bounce'></div>
        </div>
      </div>
    </div>
  );
};

export default RefreshScreen;
