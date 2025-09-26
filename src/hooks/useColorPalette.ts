import { useState, useCallback, useMemo } from 'react';
import type { ColorSchemeType, GridItem } from '@/types';
import {
  generateColorSchemes,
  getUniqueColors,
  generateRandomHex,
} from '@/utils';

export function useColorPalette(initialColor = '#007bff') {
  const [baseColor, setBaseColor] = useState(initialColor);
  const [activeScheme, setActiveScheme] = useState<ColorSchemeType>('split');

  // Generate color schemes whenever base color changes
  const colorSchemes = useMemo(
    () => generateColorSchemes(baseColor),
    [baseColor]
  );

  // Get grid items based on active scheme
  const gridItems = useMemo((): GridItem[] => {
    if (activeScheme === 'all') {
      const uniqueColors = getUniqueColors(colorSchemes, 12);
      return [
        {
          hex: colorSchemes.base.hex,
          category: 'base',
          varName: '--color-base',
        },
        ...uniqueColors.map((color, index) => ({
          hex: color.hex,
          category: color.category,
          varName: `--color-${String(index + 1).padStart(2, '0')}`,
        })),
      ];
    }

    const schemeColors = colorSchemes[activeScheme] || [];
    return [
      {
        hex: colorSchemes.base.hex,
        category: 'base',
        varName: '--color-base',
      },
      ...schemeColors.map((color, index) => ({
        hex: color.hex,
        category: color.category,
        varName: `--color-${String(index + 1).padStart(2, '0')}`,
      })),
    ].slice(0, 12);
  }, [colorSchemes, activeScheme]);

  const generateRandomColor = useCallback(() => {
    const newColor = generateRandomHex();
    setBaseColor(newColor);
    return newColor;
  }, []);

  const updateBaseColor = useCallback((color: string) => {
    setBaseColor(color);
  }, []);

  const setScheme = useCallback((scheme: ColorSchemeType) => {
    setActiveScheme(scheme);
  }, []);

  return {
    baseColor,
    activeScheme,
    colorSchemes,
    gridItems,
    updateBaseColor,
    generateRandomColor,
    setScheme,
  };
}
