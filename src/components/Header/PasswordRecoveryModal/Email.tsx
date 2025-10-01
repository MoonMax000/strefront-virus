import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { AuthService } from '@/services/AuthService';
import { useMutation } from '@tanstack/react-query';
import { FC, FormEvent, useState } from 'react';

interface EmailProps {
  onNextStep: (email: string) => void;
}

const Email: FC<EmailProps> = ({ onNextStep }) => {
  const [email, setEmail] = useState<string>('');
  const [error, setEror] = useState<string>('');

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['fillEmailRecoveryPassword'],
    mutationFn: (email: string) => AuthService.passwordReset(email),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !email.includes('@') || !email.includes('.')) {
      setEror('Некорректный формат E-mail');
      return;
    }

    try {
      await mutateAsync(email);
      onNextStep(email);
    } catch (err) {
      console.log('err');
      alert('Что-то пошло не так');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label='E-mail'
        placeholder='Введите e-mail'
        value={email}
        onChange={(value) => {
          setEmail(value);
          setEror('');
        }}
        classes={{
          input: '!bg-moonlessNight px-4 py-3',
          label: {
            classes: '!opacity-100 max-big-mobile:text-[16px] max-big-mobile:leading-[22px]',
          },
        }}
        error={error}
      />

      <Button
        className='mt-10 h-11 w-[180px] max-big-mobile:mx-auto'
        type='submit'
        disabled={!email || !!error || isPending}
      >
        Send code
      </Button>
    </form>
  );
};

export default Email;
