import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { FC, FormEvent, useState } from 'react';

interface FormState {
  value: string;
  error: string;
}

const ConfirmCode: FC<{ onNextStep: () => void }> = ({ onNextStep }) => {
  const [formState, setFormState] = useState<FormState>({} as FormState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // todo response

    onNextStep();
  };

  return (
    <form className='mt-8' onSubmit={handleSubmit}>
      <TextInput
        value={formState.value}
        onChange={(value) => setFormState((prev) => ({ ...prev, value }))}
        error={formState.error}
        type='number'
        label='Confirmation code'
        placeholder='Code'
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
        Подтвердить
      </Button>
    </form>
  );
};

export default ConfirmCode;
