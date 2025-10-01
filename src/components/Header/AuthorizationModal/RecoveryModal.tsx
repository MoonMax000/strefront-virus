import { FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import PostIcon from '@/assets/icons/input/post.svg';
import { AuthService } from '@/services/AuthService';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { TLogin } from '../Header';

interface FormState {
  email: string;
  password: string;
  confimPaswword: string;
}

type ModalSteps = 'sendMassage' | 'successNotification';

const RecoveryModal: FC<{
  onModalChange: (type: TLogin) => void;
}> = ({ onModalChange }) => {
  const [formState, setFormState] = useState<FormState>({} as FormState);
  const [step, setStep] = useState<ModalSteps>('sendMassage');

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['SendMessage'],
    mutationFn: async () => {
      const email = formState.email;

      try {
        const data = await AuthService.passwordReset(email);
        console.log(data);
        switch (data.status) {
          case 204:
            setStep('successNotification');
            break;
          case 400:
            alert('Please enter a valid email address.');
            break;
          default:
            alert('Please enter a valid email address.');
            break;
        }
      } catch (error) {
        console.log('Login failed:', error);
      }
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log('invalid CurrentPassword', error);
    },
  });
  const handleSendMessage = async () => {
    mutateAsync();
  };

  const stepData = {
    sendMassage: {
      notification: 'Password must be at least 8 characters long.',
      disabled: !formState.email,
      buttonValue: 'Send a letter',
      buttonAction: () => handleSendMessage(),
    },
    successNotification: {
      notification: 'An email with a link to the password reset form has been sent to your email.',
      disabled: false,
      buttonValue: 'Continue',
      buttonAction: () => onModalChange(null),
    },
  };

  return (
    <>
      <p className='mb-6 text-basic opacity-[48%]'>{stepData[step].notification}</p>
      <div>
        <div className='flex flex-col gap-4 mb-6'>
          {step === 'sendMassage' && (
            <TextInput
              beforeIcon={
                <div className='opacity-45 mr-2'>
                  <PostIcon width={20} height={20} className='text-white ' />
                </div>
              }
              placeholder='E-mail'
              classes={{
                inputWrapper: 'min-h-11 border-0 bg-[#272A32] px-[10px]',
                inputRaf: 'bg-[#272A32]',
              }}
              onChange={(value) => setFormState((prev) => ({ ...prev, email: value }))}
              value={formState.email}
            />
          )}
        </div>
        <Button
          className='mx-auto  min-h-10 w-full'
          type='submit'
          disabled={stepData[step].disabled || isPending}
          onClick={stepData[step].buttonAction}
        >
          {stepData[step].buttonValue}
        </Button>
      </div>
    </>
  );
};

export default RecoveryModal;
