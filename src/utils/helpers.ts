/**
 * Copies text to clipboard using the modern Clipboard API
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Generates a random LCH color with reasonable ranges
 */
export function generateRandomLch(): { l: number; c: number; h: number } {
  return {
    l: Math.random() * 80 + 20, // Lightness: 20-100
    c: Math.random() * 100 + 20, // Chroma: 20-120
    h: Math.random() * 360, // Hue: 0-360
  };
}
