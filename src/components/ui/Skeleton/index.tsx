import { cn } from '@/utils/cn';
import { FC } from 'react';

const Skeleton: FC<{ className?: string }> = ({ className = '' }) => {
  return <div role='status' className={cn('animate-pulse bg-gray rounded-md', className)} />;
};

export default Skeleton;
