import { ButtonHTMLAttributes, DetailedHTMLProps, FC, MouseEvent, ReactNode } from 'react';
import clsx from 'clsx';
import Spinner from '../Loaders/Spinner';

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'text-[14px] font-medium text-text bg-purple',
  simple: 'text-[14px] font-medium',
  dark: 'text-[14px] font-medium bg-moonlessNight',
  transparent: 'border border-purple bg-transparent text-purple',
  red: 'border border-darkRed text-red bg-transparent',
  dark_transparent: 'custom-bg-blur border-[#181B22] border-[1px]',
};

interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabledEvents?: boolean;
  icon?: ReactNode;
  variant?: 'primary' | 'simple' | 'dark' | 'transparent' | 'red' | 'dark_transparent';
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled,
  disabledEvents,
  icon,
  isLoading,
  variant = 'primary',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      className={clsx(
        variants[variant],
        'group flex items-center gap-2 rounded-lg justify-center active:opacity-45 cursor-pointer ',
        {
          'pointer-events-none': disabledEvents,
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}
      onClick={onClick}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {children}
          {icon}
        </>
      )}
    </button>
  );
};

export default Button;
