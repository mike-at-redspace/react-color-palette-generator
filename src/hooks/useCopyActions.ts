import { useCallback } from 'react';
import type { GridItem } from '@/types';
import { copyToClipboard } from '@/utils';

export function useCopyActions(
  gridItems: GridItem[],
  baseColor: string,
  showToast: (message: string) => void
) {
  const copyLchValues = useCallback(async () => {
    const lchValues = gridItems.map(
      (item) =>
        `LCH(${item.lch.l.toFixed(0)}, ${item.lch.c.toFixed(0)}, ${item.lch.h.toFixed(0)})`
    );
    const success = await copyToClipboard(lchValues.join(', '));
    if (success) {
      showToast('LCH Values Copied ✔');
    }
  }, [gridItems, showToast]);

  const copyCssVariables = useCallback(async () => {
    const lines = [
      ':root {',
      `  --color-base: LCH(${gridItems[0].lch.l.toFixed(0)}, ${gridItems[0].lch.c.toFixed(0)}, ${gridItems[0].lch.h.toFixed(0)});`,
    ];

    gridItems.slice(1).forEach((item, index) => {
      const varName = `--color-${String(index + 1).padStart(2, '0')}`;
      lines.push(
        `  ${varName}: LCH(${item.lch.l.toFixed(0)}, ${item.lch.c.toFixed(0)}, ${item.lch.h.toFixed(0)});`
      );
    });

    lines.push('}');

    const success = await copyToClipboard(lines.join('\n'));
    if (success) {
      showToast('CSS Variables Copied ✔');
    }
  }, [gridItems, showToast]);

  const copySingleColor = useCallback(
    async (lchString: string) => {
      const success = await copyToClipboard(lchString);
      if (success) {
        showToast(`${lchString} Copied ✔`);
      }
    },
    [showToast]
  );

  return {
    copyLchValues,
    copyCssVariables,
    copySingleColor,
  };
}
