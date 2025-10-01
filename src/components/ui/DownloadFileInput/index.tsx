import clsx from 'clsx';
import { FC } from 'react';

interface DownloadFileInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  variant?: 'default' | 'button';
}

const DownloadFileInput: FC<DownloadFileInputProps> = ({ className, children, ...rest }) => {
  return (
    <label className={clsx('w-full cursor-pointer', className)}>
      <input type='file' className='w-0 h-0 hidden' {...rest} />

      {children}
    </label>
  );
};

export default DownloadFileInput;
