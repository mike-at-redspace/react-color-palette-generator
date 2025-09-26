import React from 'react';
import type { GridItem } from '@/types';
import { getIdealTextColor } from '@/utils';
import styles from './ColorCell.module.css';

interface ColorCellProps {
  item: GridItem;
  onCopy: (_lchString: string) => void;
}

export const ColorCell: React.FC<ColorCellProps> = ({ item, onCopy }) => {
  const textColor = getIdealTextColor(item.hex);
  const buttonBgColor =
    textColor === '#FFFFFF' ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.4)';
  const buttonTextColor = textColor === '#FFFFFF' ? '#fff' : '#0f172a';

  const handleCopy = () => {
    onCopy(
      `LCH(${item.lch.l.toFixed(0)}, ${item.lch.c.toFixed(0)}, ${item.lch.h.toFixed(0)})`
    );
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
        LCH({item.lch.l.toFixed(0)}, {item.lch.c.toFixed(0)},{' '}
        {item.lch.h.toFixed(0)})
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
