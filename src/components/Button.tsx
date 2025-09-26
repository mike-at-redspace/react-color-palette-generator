import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <button className={`${styles.button} ${className || ''}`} onClick={onClick}>
      {children}
    </button>
  );
};

export const RandomButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <button
      className={`${styles.button} ${styles.randomButton}`}
      onClick={onClick}
      aria-label="Generate random color"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 4l3 3l-3 3" />
        <path d="M18 20l3 -3l-3 -3" />
        <path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5" />
        <path d="M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3" />
      </svg>
    </button>
  );
};
