import { useState, useCallback, useMemo } from 'react';
import type { ColorSchemeType, GridItem, LCHColor } from '@/types';
import {
  generateColorSchemes,
  getUniqueColors,
  generateRandomLch,
} from '@/utils';
import { parseColor, rgbToLch } from '@/utils/colorConversion';

export function useColorPalette(initialColor: LCHColor | string = '#007bff') {
  // Convert initial color to LCH if it's a string
  const initialLch =
    typeof initialColor === 'string'
      ? rgbToLch(parseColor(initialColor))
      : initialColor;

  const [baseColor, setBaseColor] = useState<LCHColor>(initialLch);
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
          lch: {
            l: colorSchemes.base.l,
            c: colorSchemes.base.c,
            h: colorSchemes.base.h,
          },
          category: 'base',
          varName: '--color-base',
        },
        ...uniqueColors.map((color, index) => ({
          hex: color.hex,
          lch: color.lch,
          category: color.category,
          varName: `--color-${String(index + 1).padStart(2, '0')}`,
        })),
      ];
    }

    const schemeColors = colorSchemes[activeScheme] || [];
    return [
      {
        hex: colorSchemes.base.hex,
        lch: {
          l: colorSchemes.base.l,
          c: colorSchemes.base.c,
          h: colorSchemes.base.h,
        },
        category: 'base',
        varName: '--color-base',
      },
      ...schemeColors.map((color, index) => ({
        hex: color.hex,
        lch: color.lch,
        category: color.category,
        varName: `--color-${String(index + 1).padStart(2, '0')}`,
      })),
    ].slice(0, 12);
  }, [colorSchemes, activeScheme]);

  const generateRandomColor = useCallback(() => {
    const newColor = generateRandomLch();
    setBaseColor(newColor);
    return newColor;
  }, []);

  const updateBaseColor = useCallback((color: LCHColor) => {
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
