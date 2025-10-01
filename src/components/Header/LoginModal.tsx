'use client';

import Button from '../ui/Button';
import EyeIcon from '@/assets/icons/fields/icon-eye.svg';
import TextInput from '../ui/TextInput';
import { FC, FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '@/services/AuthService';

export const ACCESS_TOKEN_COOKIE_NAME = 'access-token';

interface FormState {
  login: string;
  password: string;
}

interface LoginModalProps {
  handleSuccessSubmit: (token: string) => void;
  handleGoToRegistration: () => void;
  handleOpenRecoveryPasswordModal: () => void;
}

const LoginModal: FC<LoginModalProps> = ({
  handleSuccessSubmit,
  handleGoToRegistration,
  handleOpenRecoveryPasswordModal,
}) => {
  const [formState, setFormState] = useState<FormState>({} as FormState);
  const [loginError, setLoginError] = useState<string>('');
  const [shown, setShown] = useState<boolean>(false);

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: { identity: string; password: string }) => AuthService.login(body),
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formState.login.length === 0 || formState.password.length === 0) {
      setLoginError('Не все обязательные поля заполнены');
      return;
    }

    try {
      const { data } = await mutateAsync({
        identity: formState.login,
        password: formState.password,
      });

      handleSuccessSubmit(data.data.token);
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleInputChange = (value: string, key: 'login' | 'password') => {
    setFormState((prev) => ({ ...prev, [key]: value }));
    setLoginError('');
  };

  return (
    <form className='flex flex-col' onSubmit={onSubmit}>
      {loginError && <h2 className='mb-4 text-red'>{loginError}</h2>}

      <TextInput
        value={formState.login}
        onChange={(value) => handleInputChange(value, 'login')}
        type='text'
        label='Имя пользователя'
        classes={{
          root: 'mb-6',
          inputRaf:
            'bg-moonlessNight pr-[18px] pb-[14px] pl-[16px] pt-[11px] text-[14px] !rounded-r-none',
          label: {
            classes: 'opacity-[1] text-[15px] max-tablet:text-[16px] max-tablet:leading-[22px]',
            bold: 'font-medium',
          },
        }}
      />
      <TextInput
        value={formState.password}
        onChange={(value) => handleInputChange(value, 'password')}
        label='Password'
        type={shown ? 'text' : 'password'}
        classes={{
          root: 'mb-2 pt-[11px] ',
          inputRaf: 'bg-moonlessNight pr-[18px] pb-[14px] pl-[16px] pt-[11px] rounded-r-none',
          label: {
            classes: 'opacity-[1] text-[15px] max-tablet:text-[16px] max-tablet:leading-[22px]',
            bold: 'font-medium',
          },
        }}
        icon={
          <button
            type='button'
            onClick={() => setShown((prev) => !prev)}
            className='bg-moonlessNight pt-[11px] pb-[14px] px-4'
          >
            <EyeIcon />
          </button>
        }
      />
      <Button
        variant='simple'
        className='px-0 underline mb-10 font-medium w-max'
        onClick={handleOpenRecoveryPasswordModal}
      >
        Forgot your password?
      </Button>
      <Button
        className='py-[15px] px-[69px] mb-4 w-max max-tablet:mx-auto'
        type='submit'
        disabled={!formState.login || !formState.password || isPending}
      >
        Log In
      </Button>
      <div
        className='flex text-sm font-semibold gap-1 max-tablet:justify-center'
        role='button'
        onClick={handleGoToRegistration}
      >
        <span className='text-webGray'>Don't have an account?</span>
        <span className='underline font-medium'>Register</span>
      </div>
    </form>
  );
};

export default LoginModal;
