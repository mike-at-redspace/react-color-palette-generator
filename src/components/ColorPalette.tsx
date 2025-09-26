import React, { useEffect } from 'react';
import type { GridItem } from '@/types';
import { ColorCell } from './ColorCell';
import styles from './App.module.css';

interface ColorPaletteProps {
  gridItems: GridItem[];
  onCopyColor: (hex: string) => void;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  gridItems,
  onCopyColor,
}) => {
  // Apply CSS variables for background colors
  useEffect(() => {
    const root = document.documentElement;

    gridItems.forEach((item, index) => {
      if (item.varName === '--color-base') {
        root.style.setProperty('--color-base', item.hex);
      } else {
        const varName = `--color-${String(index).padStart(2, '0')}`;
        root.style.setProperty(varName, item.hex);
      }
    });
  }, [gridItems]);

  const gridStyle = {
    gridTemplateColumns: `repeat(${gridItems.length}, 1fr)`,
    gridTemplateRows: '1fr',
  };

  return (
    <>
      {/* Background strip */}
      <div className={styles.backgroundStrip}>
        {gridItems.length > 0 && (
          <>
            <div style={{ backgroundColor: gridItems[0]?.hex }} />
            <div
              style={{ backgroundColor: gridItems[gridItems.length - 1]?.hex }}
            />
          </>
        )}
      </div>

      {/* Background grid */}
      <div className={styles.backgroundGrid} style={gridStyle}>
        {gridItems.map((item, index) => (
          <ColorCell
            key={`${item.hex}-${index}`}
            item={item}
            onCopy={onCopyColor}
          />
        ))}
      </div>
    </>
  );
};
