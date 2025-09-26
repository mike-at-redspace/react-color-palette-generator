import React from 'react';
import clsx from 'clsx';
import type { ColorSchemeType } from '@/types';
import { getIdealTextColor } from '@/utils';
import styles from './TabSelector.module.css';

interface TabSelectorProps {
  activeScheme: ColorSchemeType;
  onSchemeChange: (scheme: ColorSchemeType) => void;
  baseColor: string;
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
  return (
    <div className={styles.tabs}>
      {schemes.map(({ key, label }) => {
        const isActive = activeScheme === key;
        const backgroundColor = isActive ? baseColor : undefined;
        const color = isActive ? getIdealTextColor(baseColor) : undefined;

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
