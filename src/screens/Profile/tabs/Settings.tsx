'use client';
import Paper from '@/components/Paper';
import Button from '@/components/ui/Button';
import avatar from '@/assets/mockAvatars/userAvatar.png';
import DownloadFileInput from '@/components/ui/DownloadFileInput';
import { ChangeEvent, useEffect, useState } from 'react';
import IconEdit from '@/assets/icons/edit.svg';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  patchUserData as PatchUserDataType,
  ProfileResponse,
  UserService,
} from '@/services/UserService';
import { AxiosResponse } from 'axios';
import { usernameRegex } from '@/constants/validation';
import useMediaQuery from '@/utils/hooks/useMediaQuery';

interface FormState {
  banner?: string;
  avatar?: string;
}

const allowedFileFormats = ['png', 'jpeg', 'gif'];

const MAX_FILE_SIZE = 10485760;

const Settings: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({} as FormState);
  const [userName, setUserName] = useState<string>('');
  const [userDescription, setUserDescription] = useState<string>('');
  const [donationLink, seDonationLink] = useState<string>('');
  const isTablet = useMediaQuery('(max-width:824px)');

  const queryClient = useQueryClient();

  const profileData = queryClient.getQueryData<AxiosResponse<ProfileResponse>>(['getProfile']);

  useEffect(() => {
    if (profileData?.data) {
      setUserName(profileData.data.username || '');
      setUserDescription(profileData.data.description || '');
      setFormState({
        avatar: profileData.data.avatar_url,
        banner: profileData.data.cover_url,
      });
      seDonationLink(profileData.data.donation_url);
    }
  }, [profileData]);

  const { mutateAsync: uploadAvatar } = useMutation({
    mutationFn: (file: File) => UserService.changeAvatar(file),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['getProfile'] });
    // },
  });

  const { mutateAsync: uploadBanner } = useMutation({
    mutationFn: (file: File) => UserService.changeBanner(file),
  });

  const { mutateAsync: patchUserData } = useMutation({
    mutationFn: (userData: PatchUserDataType) => UserService.patchProfile(userData),
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, fileKey: 'avatar' | 'banner') => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formatIsAllowed = allowedFileFormats.some((format) => file.type.includes(format));
    if (!formatIsAllowed) {
      alert('Неразрешённый формат файла');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('Слишком большой файл');
      return;
    }

    const url = URL.createObjectURL(file);
    setFormState((prev) => ({ ...prev, [fileKey]: url }));

    if (fileKey === 'avatar') {
      uploadAvatar(file);
    } else if (fileKey === 'banner') {
      uploadBanner(file);
    }
  };

  const handleNameBlur = () => {
    if (userName) {
      patchUserData({ username: userName });
    }
  };

  const handleDescriptionBlur = () => {
    if (userDescription) {
      patchUserData({ description: userDescription });
    }
  };

  const handleDonation = (event: ChangeEvent<HTMLInputElement>) => {
    seDonationLink(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (usernameRegex.test(value)) {
      setUserName(value);
    }
  };

  const avatarImage = (
    <img src={formState.avatar || avatar.src} alt='avatar' className='object-cover w-full h-full' />
  );

  const bannerImage = (
    <img src={formState.banner || avatar.src} alt='banner' className='object-cover w-full h-full' />
  );

  return (
    <section className='flex flex-col gap-6 max-tablet:gap-8'>
      <div>
        <p className='text-[19px] font-semibold'>Profile Picture</p>
        <Paper className='mt-4'>
          <div className='flex items-center gap-4 justify-between max-w-[80%]'>
            {!isTablet ? (
              <div className='size-[128px] rounded-[50%] min-w-[128px] min-h-[128px] overflow-hidden'>
                {avatarImage}
              </div>
            ) : (
              <DownloadFileInput
                className='size-[64px] max-w-[64px] max-h-[64px] relative group rounded-[50%] overflow-hidden'
                accept='.jpeg,.png,.gif'
                onChange={(event) => handleFileChange(event, 'avatar')}
              >
                <div className='absolute w-full h-full top-0 left-0 flex items-center justify-center group-hover:opacity-100 opacity-0 transition-opacity rounded-[50%] bg-[#0C1014A3]'>
                  <IconEdit />
                </div>
                {avatarImage}
              </DownloadFileInput>
            )}

            <div className='flex flex-col gap-6 items-center justify-center'>
              {!isTablet && (
                <DownloadFileInput
                  className='!w-[240px] bg-purple rounded-lg py-[15px] text-center text-sm leading-[14px] font-bold'
                  accept='.jpeg,.png,.gif'
                  onChange={(event) => handleFileChange(event, 'avatar')}
                >
                  Update Image
                </DownloadFileInput>
              )}

              <p className='text-[15px] leading-5 font-medium opacity-45 text-center max-tablet:text-left'>
                Supported formats: JPEG, PNG or GIF. Max.size: 10 МБ.
              </p>
            </div>
          </div>
        </Paper>
      </div>
      <div>
        <p className='text-lg/6 font-semibold'>Profile Banner</p>
        <Paper className='mt-4'>
          <div className='flex items-center gap-4 justify-between max-w-[80%]'>
            {!isTablet ? (
              <div className='w-[128px] h-[128px] rounded-[50%] min-w-[128px] min-h-[128px] overflow-hidden'>
                {bannerImage}
              </div>
            ) : (
              <DownloadFileInput
                className='size-[64px] max-w-[64px] max-h-[64px] relative group rounded-[50%] overflow-hidden'
                accept='.jpeg,.png,.gif'
                onChange={(event) => handleFileChange(event, 'banner')}
              >
                <div className='absolute w-full h-full top-0 left-0 flex items-center justify-center group-hover:opacity-100 opacity-0 transition-opacity rounded-[50%] bg-[#0C1014A3]'>
                  <IconEdit />
                </div>
                {bannerImage}
              </DownloadFileInput>
            )}

            <div className='flex flex-col gap-6 items-center justify-center'>
              {!isTablet && (
                <DownloadFileInput
                  className='!w-[240px] bg-purple rounded-lg py-[15px] text-center text-sm leading-[14px] font-bold'
                  accept='.jpeg,.png,.gif'
                  onChange={(event) => handleFileChange(event, 'banner')}
                >
                  Upload Banner
                </DownloadFileInput>
              )}

              <p className='text-[15px] leading-5 font-medium opacity-45 text-center max-tablet:text-left'>
                Supported formats: JPEG, PNG or GIF. Max.size: 10 МБ.
              </p>
            </div>
          </div>
        </Paper>
      </div>
      <div>
        <p className='text-lg/6 font-semibold max-tablet:hidden'>Profile Settings</p>
        <Paper className='mt-4 !p-0 flex flex-col max-tablet:!bg-transparent max-tablet:gap-8'>
          <div className='flex flex-col gap-2 border-b border-onyxGrey p-4 max-tablet:p-0 max-tablet:border-none'>
            <p className='text-[15px] leading-5 font-bold max-tablet:text-lg/6'>Username</p>
            <div className='max-w-[60%] w-full bg-moonlessNight flex items-center rounded-lg max-tablet:max-w-full'>
              <input
                placeholder='Username'
                className='w-full px-3 py-[10px] h-11 bg-transparent border-r border-onyxGrey max-tablet:border-none'
                value={userName}
                onChange={(event) => handleNameChange(event)}
                onBlur={handleNameBlur}
              />
              <button type='button' className='flex items-center justify-center h-11 w-10 min-w-10'>
                <IconEdit className='opacity-[0.48] max-tablet:opacity-100' />
              </button>
            </div>
            <p className='text-[15px] leading-5 font-bold opacity-45'>
              You can update your username
            </p>
          </div>
          <div className='flex flex-col gap-2 p-4 max-tablet:p-0'>
            <p className='text-[15px] leading-5 font-bold max-tablet:text-lg/6'>About Me</p>
            <textarea
              placeholder='About Me'
              className='bg-moonlessNight rounded-lg p-4 outline-none max-h-[200px] resize-none min-h-[120px]'
              value={userDescription}
              onChange={(event) => setUserDescription(event.target.value)}
              onBlur={handleDescriptionBlur}
            />
            <p className='text-[15px] leading-5 font-bold opacity-45'>
              Your channel description must be on more than 300 characters long
            </p>
          </div>
        </Paper>
      </div>

      <div>
        <p className='text-lg/6 font-semibold'>Connect Donation Alerts</p>
        <Paper className='mt-[10px] flex items-center justify-between gap-4 max-tablet:!bg-transparent max-tablet:px-0 max-tablet:flex-col max-tablet:gap-[48px]'>
          {/* <div className='flex flex-col gap-1 text-white max-w-[60%]'>
            <p className='text-[15px] leading-5 font-bold'>Донаты от подписчиков</p>
            <p className='text-[15px] leading-5 font-medium opacity-45'>
              Получайте поощрения от ваших зрителей
            </p>
          </div> */}
          <input
            value={donationLink}
            placeholder='Enter link'
            onChange={handleDonation}
            type='password'
            className='bg-moonlessNight w-full px-4 py-[14px] rounded-lg h-11 '
          />
          <Button
            className='!text-base leading-[21px] py-[10px] min-w-[180px]'
            onClick={() => patchUserData({ donation_url: donationLink })}
          >
            Connect
          </Button>
        </Paper>
      </div>
      <Button
        onClick={() => window.location.reload()}
        className='!text-base leading-[21px] py-[10px] max-w-[180px] float-right'
      >
        Save
      </Button>
    </section>
  );
};

export default Settings;
