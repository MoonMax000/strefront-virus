import clsx from 'clsx';
import { FC } from 'react';

interface TextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label?: string;
  labelClassName?: string;
  error?: string;
}

const Textarea: FC<TextareaProps> = ({ className, label, labelClassName, error, ...rest }) => {
  return (
    <div className='w-full'>
      {label && (
        <p className={clsx('text-[15px] leading-5 font-bold mb-2', labelClassName)}>{label}</p>
      )}
      <textarea
        className={clsx(
          'min-h-[80px] rounded-lg p-3 placeholder:text-webGray text-[14px] leading-[19px] font-semibold w-full bg-[#0C101480] border border-gunpowder',
          className,
        )}
        {...rest}
      ></textarea>
      {error && <p className='text-red text-xs mt-1'>{error}</p>}
    </div>
  );
};

export default Textarea;
