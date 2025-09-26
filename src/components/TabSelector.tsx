import React from 'react';
import clsx from 'clsx';
import type { ColorSchemeType, LCHColor } from '@/types';
import { getIdealTextColor, lchToHex } from '@/utils';
import styles from './TabSelector.module.css';

interface TabSelectorProps {
  activeScheme: ColorSchemeType;
  onSchemeChange: (scheme: ColorSchemeType) => void;
  baseColor: LCHColor;
}

const schemes: Array<{ key: ColorSchemeType; label: string }> = [
  { key: 'complementary', label: 'Complementary' },
  { key: 'split', label: 'Split complementary' },
  { key: 'monochrome', label: 'Monochrome' },
  { key: 'analogous', label: 'Analogous' },
  { key: 'triadic', label: 'Triadic' },
  { key: 'quadratic', label: 'Quadratic' },
];

export const TabSelector: React.FC<TabSelectorProps> = ({
  activeScheme,
  onSchemeChange,
  baseColor,
}) => {
  // Convert LCH to hex for background color and text color calculation
  const baseColorHex = lchToHex(baseColor.l, baseColor.c, baseColor.h);

  return (
    <div className={styles.tabs}>
      {schemes.map(({ key, label }) => {
        const isActive = activeScheme === key;
        const backgroundColor = isActive ? baseColorHex : undefined;
        const color = isActive ? getIdealTextColor(baseColorHex) : undefined;

        return (
          <button
            key={key}
            className={clsx(styles.tab, { [styles.active]: isActive })}
            style={{ backgroundColor, color }}
            onClick={() => onSchemeChange(key)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
