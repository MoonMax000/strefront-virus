'use client';

import { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import IconCross from '@/assets/icons/cross.svg';
import Notifications from '@/components/Notifications/Notifications';

interface FullScreenOverlayProps {
  isOpen: boolean;
  onClose?: () => void;
}

const FullScreenOverlay: FC<FullScreenOverlayProps> = ({ isOpen, onClose }) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.getElementById('portal-root'));
  }, []);

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
  }, [onClose]);

  if (!portalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='absolute top-[88px] h-fit min-h-screen left-0 right-0 bottom-0 bg-[#000000A3] backdrop-blur-[100px] z-50 flex justify-center '
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className='max-w-[1920px] w-full relative'>
            <Notifications />
            {onClose && (
              <button
                type='button'
                className='absolute top-12 right-36 size-6 hover:opacity-100 transition-opacity'
                onClick={onClose}
              >
                <IconCross />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalRoot,
  );
};

export default FullScreenOverlay;
