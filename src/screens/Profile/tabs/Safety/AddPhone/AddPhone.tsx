'use client';

import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { FC, FormEvent, useState } from 'react';

const AddPhone: FC<{ onNextStep: (phone: string) => void }> = ({ onNextStep }) => {
  const [value, setValue] = useState<string>('+7');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // todo response

    onNextStep(value);
  };

  return (
    <form onSubmit={handleSubmit} className='mt-8'>
      <TextInput
        value={value}
        onChange={(value) => setValue(value)}
        label='Phone number'
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
        disabled={!value}
      >
        Send code
      </Button>
    </form>
  );
};

export default AddPhone;
