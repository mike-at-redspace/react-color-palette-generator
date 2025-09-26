import React, { ChangeEvent } from 'react';
import styles from './ColorInput.module.css';

interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorInput: React.FC<ColorInputProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.inputWrap}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={handleChange}
        aria-label="Base color input"
      />
    </div>
  );
};
