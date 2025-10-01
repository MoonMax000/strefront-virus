import { FC, useState } from 'react';
import { setCookie } from '@/utils/cookie';

import { ModalType, TLogin } from '../Header';

import PostIcon from '@/assets/icons/input/post.svg';
import KeyIcon from '@/assets/icons/input/key.svg';
import EyeIcon from '@/assets/icons/input/eye.svg';
import EyeCloseIcon from '@/assets/icons/input/closeEye.svg';
import { AuthService } from '@/services/AuthService';
import { REGULAR_EXPRESSIONS } from '@/constants/regular';
import { IValidationSchema, useForm } from '@/hooks/useForm';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import { useQueryClient } from '@tanstack/react-query';

const validation = {
  identity: [
    {
      check: (val) => !!val,
      message: 'Required field',
    },
    {
      check: (val) => REGULAR_EXPRESSIONS.email.test(val),
      message: 'Please enter a valid address',
    },
  ],
  password: [
    {
      check: (val) => !!val,
      message: 'Required field',
    },
  ],
} as IValidationSchema;

interface FormState {
  identity: string;
  password: string;
}

const initFormState: FormState = {
  identity: '',
  password: '',
};

const LoginModal: FC<{
  onModalChange: (type: TLogin) => void;
}> = ({ onModalChange }) => {
  const [shownPasword, setShownPassword] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const form = useForm<FormState>(
    async () => {
      try {
        const { data } = await AuthService.login(form.formData);
        setCookie('access-token', data.data.token);
        queryClient.invalidateQueries({ queryKey: ['getProfile'] });
        onModalChange(null);
      } catch (err: unknown) {
        if (
          err &&
          typeof err === 'object' &&
          'response' in err &&
          err.response &&
          typeof err.response === 'object' &&
          'status' in err.response &&
          err.response.status === 400 &&
          'data' in err.response
        ) {
          const serverErrors: Partial<Record<keyof FormState, string>> = {};
          const errorData = (err.response as { data: Record<string, string[]> }).data;

          Object.keys(errorData).forEach((key) => {
            serverErrors[key as keyof FormState] = errorData[key][0];
          });

          form.setExternalErrors(serverErrors);
        }
      }
    },
    validation,
    initFormState,
  );

  const toogleShown = () => {
    setShownPassword((prev) => !prev);
  };

  return (
    <form onSubmit={form.handleSubmit}>
      <div className='flex flex-col gap-6 mb-6 '>
        <TextInput
          beforeIcon={
            <div className='opacity-45 mr-2'>
              <PostIcon width={20} height={20} className='text-white ' />
            </div>
          }
          placeholder='Email'
          classes={{
            inputWrapper: 'min-h-11 border-0 bg-[#272A32] px-[10px]',
            inputRaf: 'bg-[#272A32]',
          }}
          onChange={(value) => form.handleChangeField('identity')(value)}
          value={form.formData['identity']}
          error={form.formData['identity']?.toString() && form.errors['identity']}
        />
        <div>
          <TextInput
            placeholder='Password'
            beforeIcon={
              <div className='opacity-45 mr-2'>
                <KeyIcon width={16} height={16} className='text-white ' />
              </div>
            }
            icon={
              <div className='opacity-45 ml-1' onClick={toogleShown}>
                {shownPasword ? (
                  <EyeCloseIcon width={24} height={24} className='text-white ' />
                ) : (
                  <EyeIcon width={24} height={24} className='text-white' />
                )}
              </div>
            }
            type={shownPasword ? 'text' : 'password'}
            classes={{
              inputWrapper: 'min-h-11 border-0 bg-[#272A32] px-[10px]',
              inputRaf: 'bg-[#272A32]',
            }}
            onChange={(value) => form.handleChangeField('password')(value)}
            value={form.formData['password']}
            error={form.formData['password']?.toString() && form.errors['password']}
          />
        </div>
      </div>
      <div className='flex  flex-col items-center justify-center w-full'>
        <Button className='mx-auto  min-h-10 w-full' type='submit' disabled={!form.isValid}>
          Log In
        </Button>
        <button
          type='button'
          className='text-sm font-bold text-purple mt-4  underline'
          onClick={() => onModalChange('recovery')}
        >
          Forgot your password?
        </button>
      </div>
    </form>
  );
};

export default LoginModal;
