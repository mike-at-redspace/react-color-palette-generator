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

export interface ColorItem {
  hex: string;
  hsl: HSLColor;
  category: string;
  varName: string;
}

export interface BaseColor {
  hex: string;
  h: number;
  s: number;
  l: number;
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
  ds?: number;
  dl?: number;
}

export interface GridItem {
  hex: string;
  category: string;
  varName: string;
}
