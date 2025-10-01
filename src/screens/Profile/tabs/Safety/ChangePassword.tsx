import { FormEvent, useState } from 'react';
import EyeIcon from '@/assets/icons/fields/icon-eye.svg';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';

interface FormState {
  password: string;
  newPassword: string;
  repeatNewPassword: string;
}

interface PasswordShownState {
  password: boolean;
  newPassword: boolean;
  repeatNewPassword: boolean;
}

const ChangePassword = () => {
  const [formState, setFormState] = useState<FormState>({} as FormState);
  const [error, setError] = useState<FormState>({} as FormState);
  const [passwordShown, setPasswordShown] = useState<PasswordShownState>({} as PasswordShownState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.password || !formState.newPassword || !formState.repeatNewPassword) {
      return setError({
        password: 'A required field is not filled in',
        newPassword: 'A required field is not filled in',
        repeatNewPassword: 'A required field is not filled in',
      });
    }

    if (formState.newPassword !== formState.repeatNewPassword) {
      return setError((prev) => ({ ...prev, repeatNewPassword: 'The passwords do not match' }));
    }

    // todo response
  };

  const handleInputChange = (value: string, key: keyof FormState) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
    setError({} as FormState);
  };

  return (
    <>
      <form className='mt-8 mb-[48px] flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <TextInput
            value={formState.password}
            onChange={(value) => handleInputChange(value, 'password')}
            label='Password'
            placeholder='Password'
            error={error.password}
            type={passwordShown.password ? 'text' : 'password'}
            classes={{
              root: 'pt-[11px] ',
              inputRaf: 'bg-moonlessNight pr-[18px] pb-[14px] pl-[16px] pt-[11px] rounded-r-none',
              label: {
                classes: 'opacity-[1] text-[15px] max-tablet:text-[16px] max-tablet:leading-[22px]',
                bold: 'font-medium',
              },
            }}
            icon={
              <button
                type='button'
                onClick={() => setPasswordShown((prev) => ({ ...prev, password: !prev.password }))}
                className='bg-moonlessNight pt-[11px] pb-[14px] px-4'
              >
                <EyeIcon />
              </button>
            }
          />
          <Button variant='simple' className='px-0 underline mt-2 font-medium w-max'>
            Forgot your password?
          </Button>
        </div>
        <TextInput
          value={formState.newPassword}
          onChange={(value) => handleInputChange(value, 'newPassword')}
          label='New password'
          error={error.newPassword}
          placeholder='New password'
          type={passwordShown.newPassword ? 'text' : 'password'}
          classes={{
            root: 'pt-[11px] ',
            inputRaf: 'bg-moonlessNight pr-[18px] pb-[14px] pl-[16px] pt-[11px] rounded-r-none',
            label: {
              classes: 'opacity-[1] text-[15px] max-tablet:text-[16px] max-tablet:leading-[22px]',
              bold: 'font-medium',
            },
          }}
          icon={
            <button
              type='button'
              onClick={() =>
                setPasswordShown((prev) => ({ ...prev, newPassword: !prev.newPassword }))
              }
              className='bg-moonlessNight pt-[11px] pb-[14px] px-4'
            >
              <EyeIcon />
            </button>
          }
        />
        <TextInput
          value={formState.repeatNewPassword}
          onChange={(value) => handleInputChange(value, 'repeatNewPassword')}
          label='Repeat new password'
          error={error.repeatNewPassword}
          placeholder='Repeat new password'
          type={passwordShown.repeatNewPassword ? 'text' : 'password'}
          classes={{
            root: 'pt-[11px] ',
            inputRaf: 'bg-moonlessNight pr-[18px] pb-[14px] pl-[16px] pt-[11px] rounded-r-none',
            label: {
              classes: 'opacity-[1] text-[15px] max-tablet:text-[16px] max-tablet:leading-[22px]',
              bold: 'font-medium',
            },
          }}
          icon={
            <button
              type='button'
              onClick={() =>
                setPasswordShown((prev) => ({
                  ...prev,
                  repeatNewPassword: !prev.repeatNewPassword,
                }))
              }
              className='bg-moonlessNight pt-[11px] pb-[14px] px-4'
            >
              <EyeIcon />
            </button>
          }
        />

        <Button
          className='min-w-[200px] max-w-[200px] h-11 mx-auto mt-8'
          type='submit'
          disabled={
            !formState.password ||
            !formState.newPassword ||
            !formState.repeatNewPassword ||
            Object.keys(error).length > 0
          }
        >
          Change password
        </Button>
      </form>
    </>
  );
};

export default ChangePassword;
