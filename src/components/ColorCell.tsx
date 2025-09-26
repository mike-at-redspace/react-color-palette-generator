import React from 'react';
import type { GridItem } from '@/types';
import { getIdealTextColor } from '@/utils';
import styles from './ColorCell.module.css';

interface ColorCellProps {
  item: GridItem;
  onCopy: (hex: string) => void;
}

export const ColorCell: React.FC<ColorCellProps> = ({ item, onCopy }) => {
  const textColor = getIdealTextColor(item.hex);
  const buttonBgColor =
    textColor === '#FFFFFF' ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.4)';
  const buttonTextColor = textColor === '#FFFFFF' ? '#fff' : '#0f172a';

  const handleCopy = () => {
    onCopy(item.hex);
  };

  return (
    <div
      className={styles.cell}
      style={{
        backgroundColor: item.hex,
        color: textColor,
      }}
    >
      <div className={styles.code} style={{ color: textColor }}>
        {item.hex}
      </div>
      <div className={styles.var} style={{ color: textColor }}>
        {item.varName}
      </div>
      <button
        className={styles.copyButton}
        style={{
          backgroundColor: buttonBgColor,
          color: buttonTextColor,
        }}
        onClick={handleCopy}
      >
        Copy
      </button>
    </div>
  );
};
