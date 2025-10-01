'use client';

import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface Toast {
  id: string;
  content: React.ReactNode;
}

let addToastHandler: ((toast: Toast) => void) | null = null;

export const useToast = () => {
  return (content: React.ReactNode) => {
    const id = crypto.randomUUID();
    addToastHandler?.({ id, content });
  };
};

const ToastPortal = () => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    setPortalRoot(document.getElementById('portal-root'));
  }, []);

  useEffect(() => console.log('portalRoot', portalRoot), [portalRoot]);

  addToastHandler = (toast: Toast) => {
    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 2000);
  };

  const handleRemove = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div className='fixed bottom-6 left-6 z-50 flex flex-col gap-3 max-w-[712px]'>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleRemove(toast.id)}
            className='cursor-pointer'
          >
            {toast.content}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    portalRoot,
  );
};

export default ToastPortal;
