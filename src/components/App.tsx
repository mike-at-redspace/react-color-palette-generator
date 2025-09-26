import React from 'react';
import { useColorPalette, useToast, useCopyActions } from '@/hooks';
import { ColorInput } from './ColorInput';
import { RandomButton, Button } from './Button';
import { TabSelector } from './TabSelector';
import { ColorPalette } from './ColorPalette';
import { Toast } from './Toast';
import styles from './App.module.css';

export const App: React.FC = () => {
  const {
    baseColor,
    activeScheme,
    gridItems,
    updateBaseColor,
    generateRandomColor,
    setScheme,
  } = useColorPalette('#007bff');

  const { toast, showToast } = useToast();

  const { copyLchValues, copyCssVariables, copySingleColor } = useCopyActions(
    gridItems,
    baseColor,
    showToast
  );

  return (
    <div>
      <ColorPalette gridItems={gridItems} onCopyColor={copySingleColor} />

      <div
        className={styles.overlay}
        role="region"
        aria-label="Color generation controls"
      >
        <div className={styles.title}>Color Palette Generator</div>
        <div className={styles.subtitle}>
          This tool generates beautiful color palettes from any base color. Use
          the Random button or pick a color with the selector, then explore
          different harmony schemes.{' '}
          <a
            href="https://en.wikipedia.org/wiki/Color_scheme"
            target="_blank"
            rel="noopener"
          >
            Learn More
          </a>
        </div>

        <div className={styles.row} style={{ alignItems: 'center' }}>
          <ColorInput value={baseColor} onChange={updateBaseColor} />
          <RandomButton onClick={generateRandomColor} />
          <div className={styles.controlsRight}>
            <Button onClick={copyCssVariables}>Copy CSS</Button>
            <Button onClick={copyLchValues}>Copy LCH</Button>
          </div>
        </div>

        <div className={styles.row}>
          <TabSelector
            activeScheme={activeScheme}
            onSchemeChange={setScheme}
            baseColor={baseColor}
          />
        </div>
      </div>

      <Toast message={toast.message} isVisible={toast.isVisible} />
    </div>
  );
};
