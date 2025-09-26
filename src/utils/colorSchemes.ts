import type {
  HSLColor,
  ColorItem,
  ColorSchemes,
  ColorAdjustment,
  BaseColor,
} from '@/types';
import { clamp, mod } from './math';
import { parseColor, rgbToHsl, hslToHex } from './colorConversion';

/**
 * Adjusts HSL color values by the given deltas
 */
function adjustHsl(
  h: number,
  s: number,
  l: number,
  { dh = 0, ds = 0, dl = 0 }: ColorAdjustment = {}
): HSLColor {
  return {
    h: mod(h + dh, 360),
    s: clamp(s + ds, 0, 1),
    l: clamp(l + dl, 0, 1),
  };
}

/**
 * Converts HSL color to ColorItem with metadata
 */
function hslToColorItem(
  hsl: HSLColor,
  index: number,
  category: string
): ColorItem {
  const hex = hslToHex(hsl.h, hsl.s, hsl.l);
  return {
    hex,
    hsl,
    category,
    varName: `--color-${category}-${index + 1}`,
  };
}

/**
 * Creates a color scheme array from HSL adjustments
 */
function createScheme(
  baseH: number,
  baseS: number,
  baseL: number,
  adjustments: ColorAdjustment[],
  category: string
): ColorItem[] {
  return adjustments.map((adjustment, index) => {
    const adjustedHsl = adjustHsl(baseH, baseS, baseL, adjustment);
    return hslToColorItem(adjustedHsl, index, category);
  });
}

/**
 * Generates all color schemes from a base hex color
 */
export function generateColorSchemes(baseHex: string): ColorSchemes {
  const baseRgb = parseColor(baseHex);
  const { h, s, l } = rgbToHsl(baseRgb);

  // Define color scheme adjustments
  const complementary = createScheme(h, s, l, [{ dh: 180 }], 'complementary');

  const split = createScheme(
    h,
    s,
    l,
    [{ dh: 180 - 30 }, { dh: 180 + 30 }],
    'split'
  );

  const analogous = createScheme(
    h,
    s,
    l,
    [{ dh: -60 }, { dh: -30 }, { dh: 30 }, { dh: 60 }],
    'analogous'
  );

  const triadic = createScheme(h, s, l, [{ dh: -120 }, { dh: 120 }], 'triadic');

  const quadratic = createScheme(
    h,
    s,
    l,
    [{ dh: 90 }, { dh: 180 }, { dh: 270 }],
    'quadratic'
  );

  const monochromeAdjustments = [-0.22, -0.12, 0.12, 0.22].map((dl) => ({
    dl,
    ds: dl > 0 ? -0.05 : 0.05,
  }));
  const monochrome = createScheme(h, s, l, monochromeAdjustments, 'monochrome');

  const base: BaseColor = {
    hex: hslToHex(h, s, l),
    h,
    s,
    l,
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
