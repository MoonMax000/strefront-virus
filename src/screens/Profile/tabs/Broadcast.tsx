'use client';
import BecomeStreamer from '@/components/BecomeStreamer';
import KeyAnnStreamSettings from '@/components/KeyAnnStreamSettings';
import Paper from '@/components/Paper';
import Button from '@/components/ui/Button';
import { ProfileResponse, UserService } from '@/services/UserService';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

const Broadcast = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const profileData = queryClient.getQueryData<AxiosResponse<ProfileResponse>>(['getProfile']);

  return profileData?.data?.roles && profileData?.data?.roles.indexOf('streamer') !== -1 ? (
    <>
      <p className='text-[19px] font-semibold'>Stream Key & Settings</p>
      <Paper className='mt-4 mb-[48px] !p-0'>
        <KeyAnnStreamSettings />
      </Paper>
      <Button
        className='h-11 w-[240px]'
        onClick={() => router.push(`/video/${profileData?.data.id}`)}
      >
        Start Streaming
      </Button>
    </>
  ) : (
    <>
      <p className='mb-[10px] text-lg/6 font-semibold'>Become a Streamer</p>

      <Paper className='max-tablet:p-0 max-tablet:bg-transparent'>
        <BecomeStreamer />
      </Paper>
    </>
  );
};

export default Broadcast;
