import TextInput from '@/components/ui/TextInput';
import { FC, useState } from 'react';
import EyeIcon from '@/assets/icons/fields/icon-eye.svg';
import Button from '@/components/ui/Button';

interface NewPasswordProps {
  onNextStep: (password: string) => void;
}

interface FormState {
  password: string;
  repeatPassword: string;
  shownPassword: boolean;
  shownRepeatPassword: boolean;
}

const NewPassword: FC<NewPasswordProps> = ({ onNextStep }) => {
  const [formState, setFormState] = useState<FormState>({} as FormState);

  return (
    <>
      <TextInput
        value={formState.password}
        onChange={(value) => setFormState((prev) => ({ ...prev, password: value }))}
        label='Новый пароль'
        placeholder='Enter password'
        type={formState.shownPassword ? 'text' : 'password'}
        classes={{
          input: '!bg-moonlessNight px-4 py-3 !rounded-r-none',
          label: {
            classes: '!opacity-100 max-big-mobile:text-[16px] max-big-mobile:leading-[22px]',
          },
        }}
        icon={
          <button
            type='button'
            onClick={() => {
              setFormState((prev) => ({ ...prev, shownPassword: !prev.shownPassword }));
            }}
            className='bg-moonlessNight pt-[11px] pb-[14px] px-4'
          >
            <EyeIcon />
          </button>
        }
      />
      <TextInput
        value={formState.repeatPassword}
        onChange={(value) => setFormState((prev) => ({ ...prev, repeatPassword: value }))}
        label='Repeat password'
        placeholder='Enter password'
        type={formState.shownRepeatPassword ? 'text' : 'password'}
        classes={{
          root: 'mt-6',
          input: '!bg-moonlessNight px-4 py-3 !rounded-r-none',
          label: {
            classes: '!opacity-100 max-big-mobile:text-[16px] max-big-mobile:leading-[22px]',
          },
        }}
        icon={
          <button
            type='button'
            onClick={() => {
              setFormState((prev) => ({ ...prev, shownRepeatPassword: !prev.shownRepeatPassword }));
            }}
            className='bg-moonlessNight pt-[11px] pb-[14px] px-4'
          >
            <EyeIcon />
          </button>
        }
      />

      <Button
        className='mt-10 h-11 w-[180px] max-big-mobile:mx-auto'
        disabled={!formState.password || !formState.repeatPassword}
        onClick={() => {
          if (formState.password !== formState.repeatPassword) {
            return alert('The passwords do not match');
          }
          onNextStep(formState.password);
        }}
      >
        Change password
      </Button>
    </>
  );
};

export default NewPassword;
