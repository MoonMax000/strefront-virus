import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface ToggleProps {
  isActive: boolean;
  onChange: (isActive: boolean) => void;
  className?: string;
}

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

const Toggle: FC<ToggleProps> = ({ isActive, onChange, className }) => {
  return (
    <div
      className={clsx(
        'w-[54px] min-w-[54px] h-7 rounded-full flex items-center cursor-pointer p-[2px] transition-all',
        className,
        {
          'bg-green justify-end': isActive,
          'bg-[#E2E8F0] justify-start': !isActive,
        },
      )}
      onClick={() => {
        onChange(!isActive);
      }}
    >
      <motion.span
        className='bg-white rounded-full w-6 h-6 transition-all'
        layout
        transition={spring}
      />
    </div>
  );
};

export default Toggle;
