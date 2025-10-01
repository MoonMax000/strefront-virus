import { FormEvent, useState } from 'react';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';
import TextInput from '../ui/TextInput';
import { BecomeStreamerBody, UserService } from '@/services/UserService';
import { useMutation } from '@tanstack/react-query';
import ModalWrapper from '../Modals/ModalWrapper';
import IconMobileLogo from '@/assets/icons/icon-mobile-logo.svg';

interface FormState {
  email: string;
  description: string;
}

const BecomeStreamer = () => {
  const [formState, setFormState] = useState<FormState>({} as FormState);
  const [errors, setErrors] = useState<FormState>({} as FormState);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false);

  const { mutateAsync: becomeStreamerMutate, isPending } = useMutation({
    mutationFn: (body: BecomeStreamerBody) => UserService.becomeStreamer(body),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let errorsCount = 0;

    if (!formState.email) {
      errorsCount += 1;
      setErrors((prev) => ({ ...prev, email: 'Не заполнено обязательное поле' }));
    }

    if (!formState.description) {
      errorsCount += 1;
      setErrors((prev) => ({ ...prev, description: 'Не заполнено обязательное поле' }));
    }

    if (!formState.email.includes('@') || !formState.email.includes('.')) {
      errorsCount += 1;
      setErrors((prev) => ({ ...prev, email: 'Некорректный формат E-mail' }));
    }

    if (errorsCount > 0) {
      return;
    }

    try {
      const { data } = await becomeStreamerMutate({
        additional_text: formState.description,
        email: formState.email,
      });
      if (data) {
        setIsOpenSuccessModal(true);
      }
    } catch (err) {
      alert('Что то пошло не так');
    }
  };

  const handleChange = (value: string, key: keyof FormState) => {
    setErrors({} as FormState);

    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          label='Email'
          placeholder='Enter Your Email'
          classes={{
            root: 'mb-6',
            input: '!bg-moonlessNight p-3',
            label: {
              classes:
                '!text-[15px] !leading-5 !font-bold !text-white !opacity-100 max-tablet:hidden',
            },
          }}
          onChange={(value) => handleChange(value, 'email')}
          value={formState.email}
          error={errors.email}
        />
        <Textarea
          value={formState.description}
          label='Additional Text'
          placeholder='A few word about yourself'
          onChange={(event) => {
            if (event.target.value.length < 300) {
              handleChange(event.target.value, 'description');
            }
          }}
          labelClassName='max-tablet:hidden'
          error={errors.description}
        />
        <span className='mt-2 text-[14px] leading-5 font-semibold opacity-40 float-right'>
          {formState.description?.length || 0}/300
        </span>

        <Button
          type='submit'
          className='h-11 w-[180px] mt-10 mx-auto'
          disabled={
            !formState.email ||
            !formState.description ||
            Object.keys(errors).length > 0 ||
            isPending
          }
          isLoading={isPending}
        >
          Submit
        </Button>
      </form>

      <ModalWrapper
        isOpen={isOpenSuccessModal}
        onClose={() => setIsOpenSuccessModal(false)}
        className='max-tablet:px-4 max-tablet:pt-[50px] max-tablet:max-h-full max-tablet:h-screen'
        title='Заявка отправлена'
      >
        <p className='text-[14px] leading-5 font-semibold'>
          <span className='opacity-45'>The answer will be sent to your email address.</span>&nbsp;
          <span className='opacity-100'>example@gmail.com</span>
        </p>
      </ModalWrapper>
    </>
  );
};

export default BecomeStreamer;
