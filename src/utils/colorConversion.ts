import type { RGBColor, HSLColor, LCHColor } from '@/types';
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
 * Converts RGB values to LCH (Lightness, Chroma, Hue)
 * Uses the sRGB to Lab conversion via XYZ color space
 */
export function rgbToLch({ r, g, b }: RGBColor): LCHColor {
  // Normalize RGB values to 0-1 range
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  // Convert sRGB to linear RGB
  const linearR =
    rNorm <= 0.04045 ? rNorm / 12.92 : Math.pow((rNorm + 0.055) / 1.055, 2.4);
  const linearG =
    gNorm <= 0.04045 ? gNorm / 12.92 : Math.pow((gNorm + 0.055) / 1.055, 2.4);
  const linearB =
    bNorm <= 0.04045 ? bNorm / 12.92 : Math.pow((bNorm + 0.055) / 1.055, 2.4);

  // Convert to XYZ using sRGB matrix
  const x = linearR * 0.4124564 + linearG * 0.3575761 + linearB * 0.1804375;
  const y = linearR * 0.2126729 + linearG * 0.7151522 + linearB * 0.072175;
  const z = linearR * 0.0193339 + linearG * 0.119192 + linearB * 0.9503041;

  // Convert XYZ to Lab using D65 illuminant
  const xn = x / 0.95047;
  const yn = y / 1.0;
  const zn = z / 1.08883;

  const fx = xn > 0.008856 ? Math.pow(xn, 1 / 3) : 7.787 * xn + 16 / 116;
  const fy = yn > 0.008856 ? Math.pow(yn, 1 / 3) : 7.787 * yn + 16 / 116;
  const fz = zn > 0.008856 ? Math.pow(zn, 1 / 3) : 7.787 * zn + 16 / 116;

  const l = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const labB = 200 * (fy - fz);

  // Convert Lab to LCH
  const c = Math.sqrt(a * a + labB * labB);
  let h = Math.atan2(labB, a) * (180 / Math.PI);
  if (h < 0) h += 360;

  return {
    l: Math.round(l * 100) / 100,
    c: Math.round(c * 100) / 100,
    h: Math.round(h * 100) / 100,
  };
}

/**
 * Converts LCH values to RGB
 */
export function lchToRgb({ l, c, h }: LCHColor): RGBColor {
  // Convert LCH to Lab
  const labA = c * Math.cos((h * Math.PI) / 180);
  const labB = c * Math.sin((h * Math.PI) / 180);

  // Convert Lab to XYZ
  const fy = (l + 16) / 116;
  const fx = labA / 500 + fy;
  const fz = fy - labB / 200;

  const x =
    (fx > 0.206897 ? Math.pow(fx, 3) : (fx - 16 / 116) / 7.787) * 0.95047;
  const y = (fy > 0.206897 ? Math.pow(fy, 3) : (fy - 16 / 116) / 7.787) * 1.0;
  const z =
    (fz > 0.206897 ? Math.pow(fz, 3) : (fz - 16 / 116) / 7.787) * 1.08883;

  // Convert XYZ to linear RGB
  const linearR = x * 3.2404542 + y * -1.5371385 + z * -0.4985314;
  const linearG = x * -0.969266 + y * 1.8760108 + z * 0.041556;
  const linearB = x * 0.0556434 + y * -0.2040259 + z * 1.0572252;

  // Convert linear RGB to sRGB
  const r =
    linearR <= 0.0031308
      ? 12.92 * linearR
      : 1.055 * Math.pow(linearR, 1 / 2.4) - 0.055;
  const g =
    linearG <= 0.0031308
      ? 12.92 * linearG
      : 1.055 * Math.pow(linearG, 1 / 2.4) - 0.055;
  const b =
    linearB <= 0.0031308
      ? 12.92 * linearB
      : 1.055 * Math.pow(linearB, 1 / 2.4) - 0.055;

  return {
    r: Math.round(clamp(r * 255, 0, 255)),
    g: Math.round(clamp(g * 255, 0, 255)),
    b: Math.round(clamp(b * 255, 0, 255)),
  };
}

/**
 * Converts LCH values to hex string
 */
export function lchToHex(l: number, c: number, h: number): string {
  return rgbToHex(lchToRgb({ l, c, h }));
}

/**
 * Determines the ideal text color (black or white) for a given background color
 */
export function getIdealTextColor(hex: string): string {
  const { r, g, b } = parseColor(hex);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#0f172a' : '#FFFFFF';
}
