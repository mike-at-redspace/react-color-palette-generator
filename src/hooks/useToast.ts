import { useState, useCallback } from 'react';

interface ToastState {
  message: string;
  isVisible: boolean;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    isVisible: false,
  });

  const showToast = useCallback((message: string, duration = 1400) => {
    setToast({ message, isVisible: true });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, duration);
  }, []);

  return { toast, showToast };
}
