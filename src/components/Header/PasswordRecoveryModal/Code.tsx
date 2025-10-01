import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { AuthService } from '@/services/AuthService';
import { useMutation } from '@tanstack/react-query';
import { FC, FormEvent, useState } from 'react';

interface CodeProps {
  onNextStep: (code: string) => void;
  token: string;
}

const Code: FC<CodeProps> = ({ onNextStep, token }) => {
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['recoveryPasswordCode'],
    mutationFn: () => AuthService.passwordResetConfirm({ code, token }),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await mutateAsync();
      onNextStep(code);
    } catch (err) {
      setError('Неверный код');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label='Confirmation code'
        placeholder='Введите код подтверждения'
        value={code}
        onChange={(value) => {
          setCode(value);
          setError('');
        }}
        type='number'
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
        disabled={!code || !!error || isPending}
        type='submit'
      >
        Подтвердить
      </Button>
    </form>
  );
};

export default Code;
