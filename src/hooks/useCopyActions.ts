import { useCallback } from 'react';
import type { GridItem } from '@/types';
import { copyToClipboard } from '@/utils';

export function useCopyActions(
  gridItems: GridItem[],
  baseColor: string,
  showToast: (message: string) => void
) {
  const copyHexValues = useCallback(async () => {
    const hexValues = gridItems.map((item) => item.hex);
    const success = await copyToClipboard(hexValues.join(', '));
    if (success) {
      showToast('HEX Values Copied ✔');
    }
  }, [gridItems, showToast]);

  const copyCssVariables = useCallback(async () => {
    const lines = [':root {', `  --color-base: ${baseColor};`];

    gridItems.slice(1).forEach((item, index) => {
      const varName = `--color-${String(index + 1).padStart(2, '0')}`;
      lines.push(`  ${varName}: ${item.hex};`);
    });

    lines.push('}');

    const success = await copyToClipboard(lines.join('\n'));
    if (success) {
      showToast('CSS Variables Copied ✔');
    }
  }, [gridItems, baseColor, showToast]);

  const copySingleColor = useCallback(
    async (hex: string) => {
      const success = await copyToClipboard(hex);
      if (success) {
        showToast(`${hex} Copied ✔`);
      }
    },
    [showToast]
  );

  return {
    copyHexValues,
    copyCssVariables,
    copySingleColor,
  };
}
