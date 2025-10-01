import Button from '@/components/ui/Button';

const TwoFactorAuthentication = () => {
  return (
    <>
      <div className='flex flex-col gap-4 text-[14px] leading-5 opacity-40 font-semibold'>
        <p>Two-factor authentication (2FA) is an additional layer of security for your account.</p>

        <p>
          In addition to using your username and password to log in, you will need to enter a
          security code sent to you via text message.
        </p>

        <p>
          Once activated, you will be logged out of all other devices except this one for security
          reasons.
        </p>
      </div>

      <Button className='mx-auto h-11 max-w-[200px] min-w-[200px] mt-10'>Enable 2FA</Button>
    </>
  );
};

export default TwoFactorAuthentication;
