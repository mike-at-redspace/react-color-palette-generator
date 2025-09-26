import React from 'react';
import clsx from 'clsx';
import styles from './Toast.module.css';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  return (
    <div
      className={clsx(styles.toast, { [styles.show]: isVisible })}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
};
