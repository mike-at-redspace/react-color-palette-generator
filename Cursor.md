# Color Palette Generator

A React-based interactive tool for generating beautiful color palettes from any base color. Built with TypeScript, Vite, and modern React patterns.

## Overview

- **Purpose**: Generate color harmony schemes (complementary, split, triadic, analogous, etc.) from a base color
- **Tech Stack**: React 18, TypeScript, Vite, CSS Modules
- **Features**: Color picker, random color generation, multiple harmony schemes, copy functionality (HEX/CSS)

## Key Components

- `App.tsx` - Main application component with color controls
- `useColorPalette.ts` - Core hook managing color state and scheme generation
- `colorSchemes.ts` - Color theory algorithms for harmony generation
- `ColorPalette.tsx` - Visual grid display of generated colors
- `TabSelector.tsx` - Scheme type selection (split, triadic, etc.)

## Architecture

- **Hooks**: Custom hooks for color logic, toast notifications, and copy actions
- **Utils**: Color conversion (RGB/HSL/HEX), mathematical helpers, scheme generation
- **Types**: Strong TypeScript definitions for color data structures
- **Styling**: CSS Modules for component-scoped styles

## Development

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
npm run lint     # ESLint check
npm run format   # Prettier formatting
```

## Color Schemes

Supports 6 harmony types:

- **Complementary**: Opposite colors (180°)
- **Split**: Adjacent to complementary (±30°)
- **Triadic**: 120° apart
- **Analogous**: Adjacent hues (±30°, ±60°)
- **Quadratic**: 90° intervals
- **Monochrome**: Lightness variations

## Copy Features

- Individual color HEX codes
- All colors as HEX values
- CSS custom properties format
