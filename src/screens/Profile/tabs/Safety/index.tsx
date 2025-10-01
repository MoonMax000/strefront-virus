'use client';
import Paper from '@/components/Paper';
import Button from '@/components/ui/Button';
import IconEye from '@/assets/icons/fields/icon-eye.svg';
import clsx from 'clsx';
import useMediaQuery from '@/utils/hooks/useMediaQuery';
import IconChevronRight from '@/assets/icons/chevron-right.svg';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import ModalWrapper from '@/components/Modals/ModalWrapper';
import { ModalWrapperProps } from '@/components/Modals/ModalWrapper/ModalWrapper';
import TwoFactorAuthentication from './TwoFactorAuthentication';
import ChangePassword from './ChangePassword';
import NewEmail from './ChangeEmail/NewEmail';
import ConfirmCode from './ChangeEmail/ConfirmCode';
import AddPhone from './AddPhone/AddPhone';
import ConfirmPhoneCode from './AddPhone/ConfirmCode';

const itemClassName =
  'flex items-center justify-between gap-4 border-b border-onyxGrey p-4 max-tablet:border-none max-tablet:p-0';

type ModalKeys = 'password' | 'email' | 'phone' | '2fa';

type AddFieldSteps = 'newField' | 'confirmCode' | 'success';

interface AddFormState {
  value: string;
  step: AddFieldSteps;
}

const Safety: FC<{ email: string }> = ({ email }) => {
  const [modalType, setModalType] = useState<ModalKeys | null>(null);
  const [emailState, setEmailState] = useState<AddFormState>({ step: 'newField', value: email });
  const [phoneState, setPhoneState] = useState<AddFormState>({ step: 'newField', value: '' });
  const isTablet = useMediaQuery('(max-width:824px)');

  useEffect(() => {
    setEmailState((prev) => ({ ...prev, value: email }));
  }, [email]);

  const emailSteps = useMemo((): Record<
    AddFieldSteps,
    { labelPrefix: string; component: ReactNode }
  > => {
    return {
      newField: {
        labelPrefix: 'Your current email address',
        component: (
          <NewEmail
            onNextStep={(email: string) => {
              setEmailState({
                value: email,
                step: 'confirmCode',
              });
            }}
          />
        ),
      },
      confirmCode: {
        labelPrefix: 'A confirmation code has been sent to your email.',
        component: (
          <ConfirmCode
            onNextStep={() => {
              setEmailState((prev) => ({ ...prev, step: 'success' }));
            }}
          />
        ),
      },
      success: {
        labelPrefix: 'Your new email address',
        component: <></>,
      },
    };
  }, [emailState.value]);

  const phoneSteps = useMemo((): Record<
    AddFieldSteps,
    { labelPrefix: ReactNode; component: ReactNode }
  > => {
    return {
      newField: {
        labelPrefix: `Enter the mobile phone number for a device you trust. We will send you a security code via SMS to verify your phone.`,
        component: (
          <AddPhone
            onNextStep={(phone: string) =>
              setPhoneState((prev) => ({ ...prev, step: 'confirmCode', value: phone }))
            }
          />
        ),
      },
      confirmCode: {
        labelPrefix: (
          <>
            The confirmation code has been sent to the phone number{' '}
            <span className='text-white'>+7 (ХХХ) ХХХ-ХХ-ХХ</span>
          </>
        ),
        component: (
          <ConfirmPhoneCode
            onNextStep={() => setPhoneState((prev) => ({ ...prev, step: 'success' }))}
            phone={phoneState.value}
          />
        ),
      },
      success: {
        labelPrefix: (
          <>
            Number <span className='text-white'>+7 (ХХХ) ХХХ-ХХ-ХХ</span> was linked to your account
          </>
        ),
        component: <></>,
      },
    };
  }, []);

  const modals = useMemo((): Record<ModalKeys, Omit<ModalWrapperProps, 'isOpen' | 'onClose'>> => {
    return {
      password: {
        children: <ChangePassword />,
        title: 'Change password',
        label: 'The new password must not match any previously used passwords.',
      },
      email: {
        children: emailSteps[emailState.step].component,
        title: 'Change email',
        labelValue: (
          <>
            <span className='opacity-[48%]'>{emailSteps[emailState.step].labelPrefix}:</span>{' '}
            <span className='opacity-100'>{emailState.value}</span>
          </>
        ),
      },
      phone: {
        children: phoneSteps[phoneState.step].component,
        title: 'Adding a number',
        labelValue: <p className='text-webGray'>{phoneSteps[phoneState.step].labelPrefix}</p>,
      },
      '2fa': {
        children: <TwoFactorAuthentication />,
        title: 'Two-Factor Authentication',
      },
    };
  }, [emailSteps, emailState.value, emailState.step, phoneSteps, phoneState.step]);

  return (
    <>
      <p className='text-[19px] font-semibold max-tablet:hidden'>Security</p>

      <Paper className='mt-4 !p-0 max-tablet:!bg-transparent max-tablet:flex max-tablet:flex-col max-tablet:gap-8'>
        <div
          className={itemClassName}
          role={isTablet ? 'button' : 'none'}
          onClick={() => setModalType('password')}
        >
          <div className='flex flex-col gap-1 text-white max-tablet:max-w-full max-tablet:gap-2'>
            <p className='text-[15px] leading-5 font-bold max-tablet:text-lg/6'>Password</p>
            <p className='text-[15px] leading-5 font-medium opacity-45'>
              Increase your account security by choosing a stronger password
            </p>
          </div>
          {!isTablet ? (
            <Button
              variant='dark'
              className='!text-base leading-[21px] py-[10px] h-10 min-w-[180px]'
            >
              Change Password
            </Button>
          ) : (
            <IconChevronRight className='opacity-20 min-w-5' />
          )}
        </div>
        <div
          className={itemClassName}
          role={isTablet ? 'button' : 'none'}
          onClick={() => setModalType('email')}
        >
          <div className='flex flex-col gap-1 text-white max-tablet:max-w-full max-tablet:gap-2'>
            <div className='flex items-center gap-3'>
              <p className='text-[15px] leading-5 font-bold max-tablet:text-lg/6'>
                E-mail: email@gmail.com
              </p>
              <button type='button'>
                <IconEye />
              </button>
            </div>

            <p className='text-[15px] leading-5 font-medium opacity-45'>
              You can update your email address
            </p>
          </div>
          {!isTablet ? (
            <Button
              variant='dark'
              className='!text-base leading-[21px] py-[10px] h-10 min-w-[180px]'
            >
              Change Email
            </Button>
          ) : (
            <IconChevronRight className='opacity-20 min-w-5' />
          )}
        </div>
        <div
          className={itemClassName}
          role={isTablet ? 'button' : 'none'}
          onClick={() => setModalType('phone')}
        >
          <div className='flex flex-col gap-1 text-white max-tablet:max-w-full max-tablet:gap-2'>
            <p className='text-[15px] leading-5 font-bold max-tablet:text-lg/6'>Phone Number:</p>
            {/* <p className='text-[15px] leading-5 font-medium opacity-45 hidden max-tablet:block'>
              Добавить номер
            </p> */}
          </div>
          {!isTablet ? (
            <Button className='!text-base leading-[21px] py-[10px] h-10 min-w-[180px]'>Add</Button>
          ) : (
            <IconChevronRight className='opacity-20 min-w-5' />
          )}
        </div>
        <div
          className={clsx(itemClassName, 'border-none')}
          role={isTablet ? 'button' : 'none'}
          onClick={() => setModalType('2fa')}
        >
          <div className='flex flex-col gap-1 text-white max-w-[60%] max-tablet:max-w-full max-tablet:gap-2'>
            <p className='text-[15px] leading-5 font-bold max-tablet:text-lg/6'>
              Two-Factor Authentication
            </p>
            <p className='text-[15px] leading-5 font-medium opacity-45'>
              Requiring a code sent to your phone in addition to your password adds an extra layer
              of security when logging in
            </p>
          </div>
          {!isTablet ? (
            <Button className='!text-base leading-[21px] py-[10px] h-10 min-w-[180px]'>
              Enable
            </Button>
          ) : (
            <IconChevronRight className='opacity-20 min-w-5' />
          )}
        </div>
      </Paper>

      <ModalWrapper
        isOpen={!!modalType}
        onClose={() => {
          setModalType(null);
          if (modalType === 'email') {
            setEmailState({ step: 'newField', value: email });
          }
          if (modalType === 'phone') {
            setPhoneState({ step: 'newField', value: '' });
          }
        }}
        {...(modalType ? modals[modalType] : {})}
      >
        {modalType && modals[modalType].children}
      </ModalWrapper>
    </>
  );
};

export default Safety;
