export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export interface LCHColor {
  l: number; // Lightness (0-100)
  c: number; // Chroma (0-~150)
  h: number; // Hue (0-360)
}

export interface ColorItem {
  hex: string;
  lch: LCHColor;
  category: string;
  varName: string;
}

export interface BaseColor {
  hex: string;
  l: number;
  c: number;
  h: number;
}

export interface ColorSchemes {
  base: BaseColor;
  complementary: ColorItem[];
  split: ColorItem[];
  monochrome: ColorItem[];
  analogous: ColorItem[];
  triadic: ColorItem[];
  quadratic: ColorItem[];
}

export type ColorSchemeType = keyof Omit<ColorSchemes, 'base'> | 'all';

export interface ColorAdjustment {
  dh?: number;
  dc?: number;
  dl?: number;
}

export interface GridItem {
  hex: string;
  lch: LCHColor;
  category: string;
  varName: string;
}
