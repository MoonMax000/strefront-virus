import clsx from 'clsx';
import { FC, ReactNode } from 'react';
interface StreamsCardGridProps {
  children: ReactNode;
  rows?: number;
  className?: string;
}

const StreamsCardGrid: FC<StreamsCardGridProps> = ({ children, rows = 1, className }) => {
  return (
    <div className={clsx(`grid grid-cols-4 grid-rows-${rows} gap-x-4 gap-y-8`, className)}>
      {children}
    </div>
  );
};

export default StreamsCardGrid;
