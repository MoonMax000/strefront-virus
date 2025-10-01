import clsx from 'clsx';
import { FC } from 'react';

interface RadioProps {
  wrapperClassName?: string;
  className?: string;
  isActive: boolean;
  onChange?: (isActive: boolean) => void;
  label?: string;
  labelClassName?: string;
}

const Radio: FC<RadioProps> = ({
  isActive,
  className,
  label,
  labelClassName,
  onChange,
  wrapperClassName,
}) => {
  return (
    <div
      className={clsx('flex items-center gap-4 max-w-max', wrapperClassName)}
      role='button'
      onClick={() => onChange?.(!isActive)}
    >
      <div
        className={clsx(
          className,
          'size-6 min-w-6 min-h-6 rounded-[50%] p-1 border transition-colors flex justify-center items-center',
          {
            'border-onyxGrey': !isActive,
            'border-green': isActive,
          },
        )}
      >
        {isActive && (
          <span className='size-4 bg-green block rounded-[50%] animate-ascene min-w-4 min-h-4' />
        )}
      </div>
      {label && <p className={clsx(labelClassName, 'text-[16px] leading-5')}>{label}</p>}
    </div>
  );
};

export default Radio;
