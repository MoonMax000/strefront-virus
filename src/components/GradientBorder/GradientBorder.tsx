import { FC, ReactNode } from 'react';
import { cn } from '@/utils/cn';
type TSise = 'sm' | 'md';
interface GradientBorderProps {
  className?: string;
  children: ReactNode;
  size?: TSise;
}

interface ISizeRange {
  start: string;
  end: string;
}

const deg: Record<TSise, ISizeRange> = {
  sm: { start: '170.22deg', end: '350.89deg' },
  md: { start: '176.22deg', end: '355.89deg' },
};

const GradientBorder: FC<GradientBorderProps> = ({ className, children, size = 'md' }) => {
  return (
    <div
      className={cn(
        'bg-transparent rounded-[12px] p-[2px]',
        `bg-[linear-gradient(176.22deg,#523A83_0.01%,rgba(82,58,131,0)_8.28%),linear-gradient(355.89deg,#523A83_0%,rgba(82,58,131,0)_8.04%)]`,
        className,
      )}
    >
      <div className='custom-bg-blur rounded-[12px]'>{children}</div>
    </div>
  );
};

export default GradientBorder;
