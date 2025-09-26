import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import type { LCHColor } from '@/types';
import { lchToHex, rgbToLch, parseColor } from '@/utils/colorConversion';
import styles from './ColorInput.module.css';

interface ColorInputProps {
  value: LCHColor;
  onChange: (value: LCHColor) => void;
}

export const ColorInput: React.FC<ColorInputProps> = ({
  value: colorValue,
  onChange,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Convert LCH to hex for display and picker
  const hexValue = lchToHex(colorValue.l, colorValue.c, colorValue.h);

  const handleColorChange = (hexColor: string) => {
    // Convert hex back to LCH
    const rgb = parseColor(hexColor);
    const lch = rgbToLch(rgb);
    onChange(lch);
  };

  const togglePicker = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
      }
    };

    if (isPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPickerOpen]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.inputWrap}>
        <div
          className={styles.colorSwatch}
          style={{ backgroundColor: hexValue }}
          onClick={togglePicker}
          aria-label="Color picker"
          role="button"
          tabIndex={0}
        />
        <div className={styles.lchDisplay}>
          <span className={styles.lchLabel}>LCH</span>
          <span className={styles.lchValues}>
            {Math.round(colorValue.l)} {Math.round(colorValue.c)}{' '}
            {Math.round(colorValue.h)}°
          </span>
        </div>
      </div>

      {isPickerOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setIsPickerOpen(false)}
          />
          <div className={styles.pickerContainer}>
            <HexColorPicker color={hexValue} onChange={handleColorChange} />
          </div>
        </>
      )}
    </div>
  );
};
