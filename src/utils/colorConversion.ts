import type { RGBColor, HSLColor } from '@/types';
import { clamp, mod } from './math';

/**
 * Parses a color string (hex, rgb, rgba, hsl, hsla) and returns RGB values
 */
export function parseColor(input: string): RGBColor {
  const s = String(input || '').trim();

  // Try hex format first
  let match = s.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (match) {
    let hex = match[1];
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    }
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  }

  // Try rgb/rgba format
  match = s.match(/^rgba?\(([^)]+)\)$/i);
  if (match) {
    const parts = match[1]
      .split(/[,/ ]+/)
      .map((p) => p.trim())
      .filter(Boolean);
    const [r, g, b] = parts;
    const parseValue = (v: string): number =>
      v.endsWith('%')
        ? Math.round(parseFloat(v) * 2.55)
        : Math.round(parseFloat(v));
    return {
      r: parseValue(r),
      g: parseValue(g),
      b: parseValue(b),
    };
  }

  // Try hsl/hsla format
  match = s.match(/^hsla?\(([^)]+)\)$/i);
  if (match) {
    const parts = match[1]
      .split(/[,/ ]+/)
      .map((p) => p.trim())
      .filter(Boolean);
    const [h, sPct, lPct] = parts;
    const hValue = parseFloat(h);
    const sValue = parseFloat(sPct) / (sPct.endsWith('%') ? 100 : 1);
    const lValue = parseFloat(lPct) / (lPct.endsWith('%') ? 100 : 1);
    return hslToRgb(hValue, sValue, lValue);
  }

  // Default fallback color
  return { r: 26, g: 164, b: 255 };
}

/**
 * Converts RGB values to hex string
 */
export function rgbToHex({ r, g, b }: RGBColor): string {
  const toHex = (value: number): string =>
    Math.round(clamp(value, 0, 255))
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Converts RGB values to HSL
 */
export function rgbToHsl({ r, g, b }: RGBColor): HSLColor {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
    h *= 60;
  }

  return { h, s, l };
}

/**
 * Converts HSL values to RGB
 */
export function hslToRgb(h: number, s: number, l: number): RGBColor {
  h = mod(h, 360) / 360;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Converts HSL values to hex string
 */
export function hslToHex(h: number, s: number, l: number): string {
  return rgbToHex(hslToRgb(h, s, l));
}

/**
 * Determines the ideal text color (black or white) for a given background color
 */
export function getIdealTextColor(hex: string): string {
  const { r, g, b } = parseColor(hex);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#0f172a' : '#FFFFFF';
}
