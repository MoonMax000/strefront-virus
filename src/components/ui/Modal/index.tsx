'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import IconCrossCirlce from '@/assets/icons/cross-circle.svg';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalWrapperProps {
  onClose?: () => void;
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  label?: ReactNode;
  labelValue?: string;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

const ModalWrapper: FC<ModalWrapperProps> = ({
  title,
  children,
  onClose,
  label,
  labelValue,
  className,
  titleClassName,
  contentClassName,
  isOpen,
}) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.getElementById('portal-root'));
  }, []);

  console.log('Modal isOpen:', isOpen);

  useEffect(() => {
    const escFunction = (event: KeyboardEvent) => {
      if ((event.key === 'Esc' || event.key === 'Escape') && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  if (!portalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed w-full z-50 backdrop-blur-md h-full flex justify-center items-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.currentTarget === e.target && onClose) {
              onClose();
            }
          }}
        >
          <div
            className={clsx(
              ' bg-[#181A20] w-full max-w-[754px] relative mx-auto rounded-xl flex flex-col max-h-[80%] h-auto',
              className,
            )}
          >
            {onClose && (
              <button
                type='button'
                className='absolute right-6 top-6 size-6 z-30 opacity-[48%]'
                onClick={onClose}
              >
                <IconCrossCirlce />
              </button>
            )}
            <div>
              {title && (
                <h2 className={clsx('text-[24px] text-text mb-8 font-semibold', titleClassName)}>
                  {title}
                </h2>
              )}

              {label && (
                <p className='text-[14px] opacity-[48%] whitespace-pre-line leading-[16.8px]'>
                  {label}
                </p>
              )}
              {labelValue && (
                <p className='text-[14px] whitespace-pre-line leading-[16.8px]'>{labelValue}</p>
              )}
            </div>

            <div className={clsx('max-h-full overflow-auto pr-2 scrollbar', contentClassName)}>
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalRoot,
  );
};

export default ModalWrapper;
