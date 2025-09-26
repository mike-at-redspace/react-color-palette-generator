import type {
  LCHColor,
  ColorItem,
  ColorSchemes,
  ColorAdjustment,
  BaseColor,
} from '@/types';
import { clamp, mod } from './math';
import { lchToHex } from './colorConversion';

/**
 * Adjusts LCH color values by the given deltas
 */
function adjustLch(
  l: number,
  c: number,
  h: number,
  { dl = 0, dc = 0, dh = 0 }: ColorAdjustment = {}
): LCHColor {
  return {
    l: clamp(l + dl, 0, 100),
    c: clamp(c + dc, 0, 150),
    h: mod(h + dh, 360),
  };
}

/**
 * Converts LCH color to ColorItem with metadata
 */
function lchToColorItem(
  lch: LCHColor,
  index: number,
  category: string
): ColorItem {
  const hex = lchToHex(lch.l, lch.c, lch.h);
  return {
    hex,
    lch,
    category,
    varName: `--color-${category}-${index + 1}`,
  };
}

/**
 * Creates a color scheme array from LCH adjustments
 */
function createScheme(
  baseL: number,
  baseC: number,
  baseH: number,
  adjustments: ColorAdjustment[],
  category: string
): ColorItem[] {
  return adjustments.map((adjustment, index) => {
    const adjustedLch = adjustLch(baseL, baseC, baseH, adjustment);
    return lchToColorItem(adjustedLch, index, category);
  });
}

/**
 * Generates all color schemes from a base LCH color
 */
export function generateColorSchemes(baseLch: LCHColor): ColorSchemes {
  const { l, c, h } = baseLch;

  // Define color scheme adjustments
  const complementary = createScheme(l, c, h, [{ dh: 180 }], 'complementary');

  const split = createScheme(
    l,
    c,
    h,
    [{ dh: 180 - 30 }, { dh: 180 + 30 }],
    'split'
  );

  const analogous = createScheme(
    l,
    c,
    h,
    [{ dh: -60 }, { dh: -30 }, { dh: 30 }, { dh: 60 }],
    'analogous'
  );

  const triadic = createScheme(l, c, h, [{ dh: -120 }, { dh: 120 }], 'triadic');

  const quadratic = createScheme(
    l,
    c,
    h,
    [{ dh: 90 }, { dh: 180 }, { dh: 270 }],
    'quadratic'
  );

  const monochromeAdjustments = [-22, -12, 12, 22].map((dl) => ({
    dl,
    dc: dl > 0 ? -5 : 5,
  }));
  const monochrome = createScheme(l, c, h, monochromeAdjustments, 'monochrome');

  const base: BaseColor = {
    hex: lchToHex(l, c, h),
    l,
    c,
    h,
  };

  return {
    base,
    complementary,
    split,
    monochrome,
    analogous,
    triadic,
    quadratic,
  };
}

/**
 * Gets unique colors from all schemes up to a specified limit
 */
export function getUniqueColors(
  schemes: ColorSchemes,
  limit = 12
): ColorItem[] {
  const allColors = [
    ...schemes.complementary,
    ...schemes.split,
    ...schemes.analogous,
    ...schemes.triadic,
    ...schemes.quadratic,
    ...schemes.monochrome,
  ];

  const seen = new Set<string>();
  const uniqueColors: ColorItem[] = [];

  for (const color of allColors) {
    const key = color.hex.toUpperCase();
    if (!seen.has(key) && uniqueColors.length < limit) {
      seen.add(key);
      uniqueColors.push(color);
    }
  }

  return uniqueColors;
}
