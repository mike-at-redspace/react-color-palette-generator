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
 * Generates a random hex color
 */
export function generateRandomHex(): string {
  const randomInt = Math.floor(Math.random() * 0xffffff);
  return '#' + randomInt.toString(16).padStart(6, '0');
}
