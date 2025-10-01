'use client';

import { useState } from 'react';
import clsx from 'clsx';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  value?: string;
  options: Option[];
  onChange?: (newValue: string) => void;
  placeholder?: string;
  error?: string;
}

export default function Select({
  label,
  value,
  options,
  onChange,
  placeholder,
  error,
}: SelectProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel = options.find((o) => o.value === value)?.label || placeholder;

  return (
    <div className='relative w-full'>
      {label && (
        <div className='flex justify-between mb-[9px]'>
          <span className='block text-primary opacity-55 text-[14px] font-semibold'>{label}</span>
        </div>
      )}

      <div
        className={clsx(
          'h-[48px] w-full flex items-center justify-between bg-[#0C101480] border border-gunpowder rounded-[8px] px-4 text-[14px] text-white cursor-pointer',
          { 'border-red-500': error },
        )}
        onClick={() => setOpen((p) => !p)}
      >
        <span className={clsx(!value && 'opacity-50')}>{selectedLabel}</span>
        <svg
          className={clsx('w-4 h-4 transition-transform', open ? 'rotate-180' : 'rotate-0')}
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
        </svg>
      </div>

      {open && (
        <div className='absolute z-10 mt-1 w-full bg-[#0C1014] border border-gunpowder rounded-[8px] shadow-lg max-h-60 overflow-auto'>
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
              className={clsx(
                'px-4 py-2 cursor-pointer hover:bg-[#1a1f2a]',
                value === opt.value && 'bg-[#1a1f2a]',
              )}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}

      {error && <div className='text-red text-xs mt-1'>{error}</div>}
    </div>
  );
}
