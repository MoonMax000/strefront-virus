'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import CrossIcon from '@/assets/icons/modals/icon-cross.svg';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import useMediaQuery from '@/utils/hooks/useMediaQuery';
import IconMobileLogo from '@/assets/icons/icon-mobile-logo.svg';

export interface ModalWrapperProps {
  onClose: () => void;
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  label?: ReactNode;
  labelValue?: ReactNode;
  className?: string;
  titleClassName?: string;
  withCloseIcon?: boolean;
  isClosable?: boolean;
}

const ModalWrapper: FC<ModalWrapperProps> = ({
  title,
  children,
  onClose,
  label,
  labelValue,
  className,
  titleClassName,
  isOpen,
  withCloseIcon = true,
  isClosable = true,
}) => {
  const isTablet = useMediaQuery('(max-width:824px)');
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.getElementById('portal-root'));
  }, []);

  useEffect(() => {
    const escFunction = (event: KeyboardEvent) => {
      if ((event.key === 'Esc' || event.key === 'Escape') && onClose && isClosable) {
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
          className='fixed w-full z-[100] bg-[#0C1014]/50 backdrop-blur-[24px] h-full max-w-[1920px] flex justify-center items-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.currentTarget === e.target && isClosable) {
              onClose();
            }
          }}
        >
          <div
            className={clsx(
              'flex flex-col p-6 bg-[#0C1014]/50 border border-regaliaPurple rounded-[24px] w-full max-w-[524px] relative mx-auto max-h-[80%] h-auto max-tablet:px-4 max-tablet:pt-[50px] max-tablet:max-h-full max-tablet:h-screen max-tablet:max-w-full max-tablet:w-screen',
              className,
            )}
          >
            <>
              {withCloseIcon && (
                <>
                  {!isTablet ? (
                    <button
                      type='button'
                      className='absolute right-[18.67px] top-[18.67px] pointer'
                      onClick={onClose}
                    >
                      <CrossIcon />
                    </button>
                  ) : (
                    <div className='flex items-center justify-between mb-[48px]'>
                      <IconMobileLogo />
                      <button
                        type='button'
                        className='py-2 size-10 min-w-10 min-h-10'
                        onClick={onClose}
                      >
                        <span className='block bg-white w-full h-[2px] rounded-sm rotate-45' />
                        <span className='block bg-white w-full h-[2px] rounded-sm -rotate-45 -mt-[2px]' />
                      </button>
                    </div>
                  )}
                </>
              )}

              <div>
                {title && (
                  <h2
                    className={clsx(
                      'text-[24px] text-text text-center mb-6 font-semibold max-tablet:text-[32px] max-tablet:leading-8',
                      titleClassName,
                    )}
                  >
                    {title}
                  </h2>
                )}

                {label && (
                  <p className='text-[14px] opacity-[48%] whitespace-pre-line leading-[16.8px]'>
                    {label}
                  </p>
                )}
                {labelValue && (
                  <div className='text-[14px] whitespace-pre-line leading-[16.8px]'>
                    {labelValue}
                  </div>
                )}
              </div>
            </>

            <div className='max-h-full overflow-auto scrollbar'>{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalRoot,
  );
};

export default ModalWrapper;
