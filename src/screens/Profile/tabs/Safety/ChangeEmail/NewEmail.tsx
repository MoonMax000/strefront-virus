import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { FC, FormEvent, useState } from 'react';

interface FormState {
  value: string;
  error: string;
}

const NewEmail: FC<{ onNextStep: (email: string) => void }> = ({ onNextStep }) => {
  const [formState, setFormState] = useState<FormState>({} as FormState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.value.includes('@') || !formState.value.includes('.')) {
      setFormState((prev) => ({ ...prev, error: 'Некорректный формат E-mail' }));
      return;
    }

    // todo response
    onNextStep(formState.value);
  };

  return (
    <form className='mt-8' onSubmit={handleSubmit}>
      <TextInput
        value={formState.value}
        onChange={(value) => {
          setFormState({ value, error: '' });
        }}
        label='Enter new email'
        error={formState.error}
        placeholder='Email'
        classes={{
          inputRaf:
            'bg-moonlessNight pr-[18px] pb-[14px] pl-[16px] pt-[11px] text-[14px] !rounded-r-none',
          label: {
            classes: 'opacity-[1] text-[15px] max-tablet:text-[16px] max-tablet:leading-[22px]',
            bold: 'font-medium',
          },
        }}
      />

      <Button
        className='min-w-[200px] max-w-[200px] h-11 mx-auto mt-[48px]'
        type='submit'
        disabled={!formState.value}
      >
        Send code
      </Button>
    </form>
  );
};

export default NewEmail;
