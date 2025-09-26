# Color Palette Generator

[![Netlify Status](https://api.netlify.com/api/v1/badges/7215283d-67a0-47e6-9f12-b18562027770/deploy-status)](https://app.netlify.com/projects/classy-torte-e3f4f7/deploys)

A React reimagined version of the original [Color Palette Generator](https://codepen.io/alexandrevacassin/pen/pvjGNYJ) by alexandrevacassin.

An interactive tool to generate beautiful color palettes from any base color. Pick a color using the visual color picker or randomize one, then explore complementary, split, triadic, and other harmony schemes. Copy HEX codes or full CSS variables instantly.

## Features

- **Visual Color Picker**: Interactive color picker powered by [react-colorful](https://omgovich.github.io/react-colorful/)
- **Multiple Color Schemes**: Generate complementary, split, triadic, analogous, quadratic, and monochrome palettes
- **Copy Functionality**: Copy individual colors, all colors as HEX values, or CSS custom properties
- **Random Color Generation**: Generate random colors for inspiration
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Third-Party Libraries

- **[react-colorful](https://omgovich.github.io/react-colorful/)**: A tiny color picker component for React applications
- **[clsx](https://github.com/lukeed/clsx)**: A tiny utility for constructing className strings conditionally
- **[Vite](https://vitejs.dev/)**: Next generation frontend tooling for fast development and building
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript development

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **CSS Modules** for component styling
- **ESLint & Prettier** for code quality

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

## Color Schemes

The app generates 6 different color harmony types:

- **Complementary**: Colors opposite on the color wheel (180°)
- **Split**: Colors adjacent to the complementary color (±30°)
- **Triadic**: Colors 120° apart on the color wheel
- **Analogous**: Colors adjacent to the base color (±30°, ±60°)
- **Quadratic**: Colors 90° intervals apart
- **Monochrome**: Variations in lightness of the same hue
