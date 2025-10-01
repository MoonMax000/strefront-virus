import { FC, FormEvent, useState } from 'react';
import TextInput from '../ui/TextInput';
import EyeIcon from '@/assets/icons/fields/icon-eye.svg';
import Button from '../ui/Button';
import { useMutation } from '@tanstack/react-query';
import { AuthService, RegistrationBody } from '@/services/AuthService';

interface PasswordShownState {
  passwordShown: boolean;
  repeatPasswordShown: boolean;
}

interface FormState {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

interface RegistrationProps {
  handleGoToLogin: () => void;
  handleSuccessSubmit: (token: string) => void;
}

const RegistrationModal: FC<RegistrationProps> = ({ handleGoToLogin, handleSuccessSubmit }) => {
  const [formState, setFormState] = useState<FormState>({} as FormState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [passwordShownState, setPasswordShownState] = useState<PasswordShownState>(
    {} as PasswordShownState,
  );

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['registration'],
    mutationFn: (body: RegistrationBody) => AuthService.registation(body),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errorsCount = 0;
    if (!formState.username) {
      errorsCount += 1;
      setErrors((prev) => ({ ...prev, username: 'Не заполнено обязательное поле' }));
    }
    if (!formState.email) {
      errorsCount += 1;
      setErrors((prev) => ({ ...prev, username: 'Не заполнено обязательное поле' }));
    }
    if (!formState.password) {
      errorsCount += 1;
      setErrors((prev) => ({ ...prev, password: 'Не заполнено обязательное поле' }));
    }
    if (!formState.repeatPassword) {
      errorsCount += 1;
      setErrors((prev) => ({ ...prev, repeatPassword: 'Не заполнено обязательное поле' }));
    }

    if (!formState.email.includes('@') || !formState.email.includes('.')) {
      errorsCount += 1;
      setErrors((prev) => ({ ...prev, email: 'Некорректный формат E-mail' }));
    }

    if (formState.password !== formState.repeatPassword) {
      errorsCount += 1;
      setErrors((prev) => ({ ...prev, repeatPassword: 'The passwords do not match' }));
    }

    if (errorsCount > 0) {
      return;
    }

    try {
      const { data } = await mutateAsync({
        confirmPassword: formState.repeatPassword,
        ...formState,
      });

      handleSuccessSubmit(data.data.token);
    } catch (err) {
      console.log('err', err);
      alert('Что-то пошло не так');
    }
  };

  const handleInputChange = (value: string, key: keyof FormState) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-6'>
        <div>
          <TextInput
            value={formState.username}
            onChange={(value) => handleInputChange(value, 'username')}
            type='text'
            label='Имя пользователя'
            classes={{
              inputRaf:
                'bg-moonlessNight pr-[18px] pb-[14px] pl-[16px] pt-[11px] text-[14px] !rounded-r-none',
              label: {
                classes: 'opacity-[1] text-[15px] max-tablet:text-[16px] max-tablet:leading-[22px]',
                bold: 'font-medium',
              },
            }}
            error={errors.username}
          />
          <p className='text-sm font-semibold opacity-40 mt-2'>
            Под этим именем вас будут знать пользователи платформы. Вы сможете сменить его в любой
            момент.
          </p>
        </div>

        <TextInput
          value={formState.email}
          onChange={(value) => handleInputChange(value, 'email')}
          type='text'
          label='E-mail'
          classes={{
            inputRaf:
              'bg-moonlessNight pr-[18px] pb-[14px] pl-[16px] pt-[11px] text-[14px] !rounded-r-none',
            label: {
              classes: 'opacity-[1] text-[15px] max-tablet:text-[16px] max-tablet:leading-[22px]',
              bold: 'font-medium',
            },
          }}
          error={errors.email}
        />

        <TextInput
          value={formState.password}
          onChange={(value) => handleInputChange(value, 'password')}
          label='Password'
          type={passwordShownState.passwordShown ? 'text' : 'password'}
          classes={{
            inputRaf: 'bg-moonlessNight pr-[18px] pb-[14px] pl-[16px] pt-[11px] rounded-r-none',
            label: {
              classes: 'opacity-[1] text-[15px] max-tablet:text-[16px] max-tablet:leading-[22px]',
              bold: 'font-medium',
            },
          }}
          icon={
            <button
              type='button'
              onClick={() => {
                setPasswordShownState((prev) => ({ ...prev, passwordShown: !prev.passwordShown }));
              }}
              className='bg-moonlessNight pt-[11px] pb-[14px] px-4'
            >
              <EyeIcon />
            </button>
          }
          error={errors.password}
        />

        <TextInput
          value={formState.repeatPassword}
          onChange={(value) => handleInputChange(value, 'repeatPassword')}
          label='Repeat password'
          type={passwordShownState.repeatPasswordShown ? 'text' : 'password'}
          classes={{
            inputRaf: 'bg-moonlessNight pr-[18px] pb-[14px] pl-[16px] pt-[11px] rounded-r-none',
            label: {
              classes: 'opacity-[1] text-[15px] max-tablet:text-[16px] max-tablet:leading-[22px]',
              bold: 'font-medium',
            },
          }}
          icon={
            <button
              type='button'
              onClick={() => {
                setPasswordShownState((prev) => ({
                  ...prev,
                  repeatPasswordShown: !prev.repeatPasswordShown,
                }));
              }}
              className='bg-moonlessNight pt-[11px] pb-[14px] px-4'
            >
              <EyeIcon />
            </button>
          }
          error={errors.repeatPassword}
        />
      </div>
      <Button
        className='py-[10px] mt-10 mb-4 w-[240px] h-11 max-tablet:mx-auto'
        type='submit'
        disabled={
          !formState.username ||
          !formState.password ||
          !formState.email ||
          !formState.repeatPassword ||
          Object.values(errors).filter((error) => typeof error === 'string').length > 0 ||
          isPending
        }
      >
        Register
      </Button>
      <div
        className='flex text-sm font-semibold gap-1 max-tablet:justify-center'
        role='button'
        onClick={handleGoToLogin}
      >
        <span className='text-[#828282]'>У вас уже есть учётная запись?</span>
        <span className='underline font-medium'>Log In</span>
      </div>
    </form>
  );
};

export default RegistrationModal;
