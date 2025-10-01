import { FC, useState } from 'react';
import Button from '../ui/Button';
import Radio from '../ui/Radio';
import Toggle from '../ui/Toggle';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UserService } from '@/services/UserService';
import copy from 'copy-to-clipboard';

const KeyAnnStreamSettings: FC = () => {
  const [formState, setFormState] = useState<{
    duration: 'low' | 'default';
    protectionOfDisconnection: boolean;
  }>({
    duration: 'default',
    protectionOfDisconnection: true,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: UserService.getKey,
    onSuccess: (key) => {
      localStorage.setItem('userKey', key.data.key);
    },
  });

  return (
    <>
      {' '}
      <div className='flex items-center gap-4 border-b border-onyxGrey p-4'>
        <p className='text-[15px] leading-5 font-medium min-w-[115px]'>Primary Stream Key</p>
        <input
          value={localStorage.getItem('userKey') || ''}
          onChange={() => null}
          type='password'
          className='bg-moonlessNight w-full px-4 py-[14px] rounded-lg h-11 text-webGray'
        />
        <Button
          variant='transparent'
          className='w-[180px] min-w-[180px] h-11'
          onClick={() => copy(localStorage.getItem('userKey') || '')}
        >
          Copy
        </Button>
        <Button
          className='w-[180px] min-w-[180px] h-11'
          onClick={() => mutate()}
          disabled={isPending}
        >
          Generate New Key
        </Button>
      </div>
      <div className='flex items-center gap-2 border-b border-onyxGrey p-4 justify-between'>
        <div className='max-w-[70%]'>
          <p className='text-[15px] leading-5 font-medium mb-3'>Connection for Windows:</p>
          <div className='flex  gap-[31px] mb-4'>
            <div className='flex gap-3'>
              <p className='text-[15px] leading-5 font-bold'>Server:</p>
              <p className='text-[15px] leading-5 font-medium text-webGray'>
                http://media.k8s.tyriantrade.com/whip
              </p>
            </div>
            <div className='flex gap-3'>
              {/* <p className='text-[15px] leading-5 font-bold'>Служба:</p>
              <p className='text-[15px] leading-5 font-medium text-webGray'>WHIP</p> */}
            </div>
          </div>
          <p className='text-[15px] leading-5 font-medium mb-3'>Connection for MacOS:</p>
          <div className='flex  gap-[31px] mb-4'>
            <div className='flex gap-3'>
              <p className='text-[15px] leading-5 font-bold'>Server:</p>
              <p className='text-[15px] leading-5 font-medium text-webGray'>
                https://media.k8s.tyriantrade.com/whip
              </p>
            </div>
            <div className='flex gap-3'>
              {/* <p className='text-[15px] leading-5 font-bold'>Служба:</p>
              <p className='text-[15px] leading-5 font-medium opacity-45'>WHIP</p> */}
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-2  p-4 justify-between'>
        <div className='max-w-[70%]'>
          <p className='text-[15px] leading-5 font-bold'>Disconnect Protection</p>
          <p className='text-[15px] leading-5 font-medium opacity-45'>
            Improve viewer experience during connection issues. If your main stream gets
            interrupted, a placeholder image will be shown for up to 90 seconds while you fix the
            issue and reconnect. Note: A reliable encoder is required for this feature to work.
          </p>
        </div>

        <Toggle
          isActive={formState.protectionOfDisconnection}
          onChange={(isActive) =>
            setFormState((prev) => ({ ...prev, protectionOfDisconnection: isActive }))
          }
        />
      </div>
      {/* <div className='flex flex-col gap-4 p-4'>
        <p className='text-[15px] leading-5 font-bold'>Режим задержки</p>
        <Radio
          isActive={formState.duration === 'low'}
          label='Низкая задержка: подходит для тех, кто взаимодействует со зрителями в реальном времени'
          onChange={() => setFormState((prev) => ({ ...prev, duration: 'low' }))}
        />
        <Radio
          isActive={formState.duration === 'default'}
          label='Обычная задержка: подходит для тех, кто не взаимодействует со зрителями в реальном времени'
          onChange={() => setFormState((prev) => ({ ...prev, duration: 'default' }))}
        />
      </div> */}
    </>
  );
};

export default KeyAnnStreamSettings;
