'use client';

import clsx from 'clsx';
import { InputHTMLAttributes, KeyboardEventHandler, ReactNode } from 'react';

interface IClasses {
  root?: string;
  inputWrapper?: string;
  input?: string;
  inputRaf?: string;
  label?: { classes: string; bold?: string };
  error?: string;
}

interface IProps {
  label?: string;
  value?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];
  onChange?: (newValue: string) => void;
  onFocus?: (newValue?: string) => void;
  onBlur?: (newValue?: string) => void;
  type?: React.HTMLInputTypeAttribute;
  classes?: IClasses;
  error?: string;
  placeholder?: string;
  readOnly?: boolean;
  info?: React.ReactNode;
  multiline?: boolean;
  mask?: string;
  icon?: ReactNode;
  beforeIcon?: ReactNode;
  iconPosition?: 'right' | 'left';
  maskChar?: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

const TextInput: React.FC<IProps> = ({
  onChange,
  onFocus,
  onBlur,
  value = '',
  label,
  type = 'text',
  classes = {},
  error,
  placeholder,
  readOnly,
  info,
  multiline,
  mask,
  maskChar,
  icon,
  iconPosition = 'right',
  inputMode,
  onKeyDown,
  beforeIcon,
}) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    onChange?.(e.currentTarget.value);
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    onFocus?.(e.currentTarget.value);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    onBlur?.(e.currentTarget.value);
  };
  return (
    <div className={clsx('relative block w-full', classes.root)}>
      {(label || info) && (
        <div className='flex justify-between mb-[9px]'>
          {label && (
            <span
              className={clsx(
                'block text-primary opacity-55 text-[14px] ',
                classes.label?.classes,
                classes.label?.bold,
                {
                  'font-semibold': !classes.label?.bold,
                },
              )}
            >
              {label}
            </span>
          )}
          {info}
        </div>
      )}
      <div
        className={clsx(
          'w-full h-[48px] rounded-lg border-[#1F20381A] autofill:bg-white transition-all duration-300 overflow-hidden',
        )}
      >
        {multiline ? (
          <textarea
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={clsx(
              'w-full bg-white text-primary text-[14px] leading-[18px] font-medium border-[#1F20381A] border min-h-[48px] rounded-lg outline-none px-4',
              classes.input,
            )}
            disabled={readOnly}
            rows={4}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        ) : (
          <div
            className={clsx(
              'h-full w-full flex bg-[#0C101480] border border-gunpowder rounded-[8px]',
              classes.inputWrapper,
              {
                'items-center': icon || beforeIcon,
              },
            )}
          >
            {iconPosition === 'left' && icon}
            {beforeIcon && beforeIcon}
            <input
              value={value || ''}
              onChange={handleChange}
              onKeyDown={(event) => onKeyDown?.(event)}
              type={type}
              placeholder={placeholder}
              className={clsx(
                'outline-none h-full w-full',
                {
                  'w-full bg-white text-primary focus:placeholder:opacity-0 autofill:bg-white  text-[14px] leading-[18px] font-medium h-full rounded-lg outline-none ':
                    !classes.inputRaf,
                },
                classes.inputRaf,
                classes.input,
              )}
              disabled={readOnly}
              onFocus={handleFocus}
              onBlur={handleBlur}
              inputMode={inputMode}
            />
            {iconPosition === 'right' && icon}
          </div>
        )}
      </div>

      {error ? <div className={clsx(classes.error, 'text-red text-xs mt-1')}>{error}</div> : null}
    </div>
  );
};

export default TextInput;
