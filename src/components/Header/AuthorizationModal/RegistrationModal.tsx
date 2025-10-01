import { FC, useState } from 'react';
import PostIcon from '@/assets/icons/input/post.svg';
import KeyIcon from '@/assets/icons/input/key.svg';
import EyeIcon from '@/assets/icons/input/eye.svg';
import EyeCloseIcon from '@/assets/icons/input/closeEye.svg';
import { REGULAR_EXPRESSIONS } from '@/constants/regular';
import { IValidationSchema, useForm } from '@/hooks/useForm';
import { AuthService } from '@/services/AuthService';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import { TLogin } from '../Header';

const validation = {
  login: [
    {
      check: (val) => !!val,
      message: 'Required field',
    },
    {
      check: (val) => val.length >= 3,
      message: 'Login must contain at least 3 characters',
    },
  ],
  email: [
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
    {
      check: (val) => val.length >= 8,
      message: 'Password must be at least 8 characters long',
    },
  ],
  confirmPassword: [
    {
      check: (val) => !!val,
      message: 'Required field',
    },
    {
      check: (val, formData) => val === formData.password,
      message: 'The passwords do not match',
    },
  ],
} as IValidationSchema;

interface FormState {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initFormState: FormState = {
  login: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegistrationModal: FC<{
  onModalChange: (type: TLogin) => void;
}> = ({ onModalChange }) => {
  const [isShownPasswords, setIsShownPasswords] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({ password: false, confirmPassword: false });

  const toogleShown = (key: 'password' | 'confirmPassword'): void => {
    setIsShownPasswords((prev) => {
      return { ...prev, [key]: !prev[key] };
    });
  };
  const form = useForm<FormState>(
    async () => {
      try {
        const { data } = await AuthService.registation({
          username: form.formData.login,
          email: form.formData.email,
          password: form.formData.password,
          confirmPassword: form.formData.confirmPassword,
        });
        onModalChange('login');
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

  return (
    <form onSubmit={form.handleSubmit}>
      <div className='flex flex-col gap-6 mb-6'>
        <TextInput
          classes={{
            inputWrapper: 'min-h-11 border-0 bg-[#272A32] px-[10px]',
            inputRaf: 'bg-[#272A32]',
          }}
          placeholder='Имя'
          onChange={(value) => form.handleChangeField('login')(value)}
          value={form.formData.login}
          error={form.formData.login && form.errors.login}
        />
        <TextInput
          beforeIcon={
            <div className='opacity-45 mr-2'>
              <PostIcon width={20} height={20} className='text-white' />
            </div>
          }
          classes={{
            inputWrapper: 'min-h-11 border-0 bg-[#272A32] px-[10px]',
            inputRaf: 'bg-[#272A32]',
          }}
          placeholder='Email'
          onChange={(value) => form.handleChangeField('email')(value)}
          value={form.formData.email}
          error={form.formData.email && form.errors.email}
        />
        <TextInput
          placeholder='Password'
          beforeIcon={
            <div className='opacity-45 mr-2'>
              <KeyIcon width={16} height={16} className='text-white ' />
            </div>
          }
          icon={
            <div className='opacity-45 ml-1' onClick={() => toogleShown('password')}>
              {isShownPasswords.password ? (
                <EyeCloseIcon width={24} height={24} className='text-white ' />
              ) : (
                <EyeIcon width={24} height={24} className='text-white' />
              )}
            </div>
          }
          type={isShownPasswords.password ? 'text' : 'password'}
          onChange={(value) => form.handleChangeField('password')(value)}
          value={form.formData.password}
          error={form.formData.password && form.errors.password}
          classes={{
            inputWrapper: 'min-h-11 border-0 bg-[#272A32] px-[10px]',
            inputRaf: 'bg-[#272A32]',
          }}
        />
        <TextInput
          placeholder='Repeat password'
          beforeIcon={
            <div className='opacity-45 mr-2'>
              <KeyIcon width={16} height={16} className='text-white ' />
            </div>
          }
          icon={
            <div className='opacity-45 ml-1' onClick={() => toogleShown('confirmPassword')}>
              {isShownPasswords.confirmPassword ? (
                <EyeCloseIcon width={24} height={24} className='text-white ' />
              ) : (
                <EyeIcon width={24} height={24} className='text-white' />
              )}
            </div>
          }
          type={isShownPasswords.confirmPassword ? 'text' : 'password'}
          onChange={(value) => form.handleChangeField('confirmPassword')(value)}
          value={form.formData.confirmPassword}
          error={form.formData.confirmPassword && form.errors.confirmPassword}
          classes={{
            inputWrapper: 'min-h-11 border-0 bg-[#272A32] px-[10px]',
            inputRaf: 'bg-[#272A32]',
          }}
        />
      </div>
      <div className='flex items-center justify-center w-full'>
        <Button className='mx-auto  min-h-10 w-full' type='submit' disabled={!form.isValid}>
          Create an account
        </Button>
      </div>
    </form>
  );
};

export default RegistrationModal;
