import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import type { ColorSchemeType, LCHColor } from '@/types';
import { lchToHex } from '@/utils';
import styles from './TabSelector.module.css';

interface TabSelectorProps {
  activeScheme: ColorSchemeType;
  onSchemeChange: (_scheme: ColorSchemeType) => void;
  baseColor: LCHColor;
}

const schemes: Array<{ key: ColorSchemeType; label: string }> = [
  { key: 'complementary', label: 'Complementary' },
  { key: 'split', label: 'Split complementary' },
  { key: 'monochrome', label: 'Monochrome' },
  { key: 'analogous', label: 'Analogous' },
  { key: 'triadic', label: 'Triadic' },
  { key: 'quadratic', label: 'Quadratic' },
];

export const TabSelector: React.FC<TabSelectorProps> = ({
  activeScheme,
  onSchemeChange,
  baseColor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<SVGSVGElement>(null);
  const activeIndex = schemes.findIndex(scheme => scheme.key === activeScheme);

  useEffect(() => {
    if (!containerRef.current || !pillRef.current || !maskRef.current) return;

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const container = containerRef.current;
      const pill = pillRef.current;
      const mask = maskRef.current;
      const labels = container?.querySelectorAll('label');
      const baseColorHex = lchToHex(baseColor.l, baseColor.c, baseColor.h);

      if (activeIndex >= 0 && labels && labels[activeIndex]) {
        const activeLabel = labels[activeIndex];
        const { left, width, top, height } = activeLabel.getBoundingClientRect();
        const containerRect = container?.getBoundingClientRect();
        
        if (containerRect) {
          const x = left - containerRect.left;
          const y = top - containerRect.top;
          const w = width;
          const h = height;

          // Animate the pill
          gsap.to(pill, {
            x,
            y,
            width: w,
            height: h,
            backgroundColor: baseColorHex,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          });

          // Animate the mask
          const maskRect = mask?.querySelector('rect');
          if (maskRect) {
            gsap.to(maskRect, {
              x,
              y,
              width: w,
              height: h,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      }
    }, 10);

    return () => clearTimeout(timeoutId);
  }, [activeIndex, baseColor]);

  const handleSchemeChange = (scheme: ColorSchemeType) => {
    onSchemeChange(scheme);
  };

  return (
    <div className={styles.container}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Color Schemes</legend>
        <div className={styles.fields} ref={containerRef}>
          <div className={styles.pill} ref={pillRef}></div>
          <svg className={styles.mask} ref={maskRef} xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="0" height="0" fill="currentColor" />
          </svg>
          {schemes.map(({ key, label }) => {
            const isActive = activeScheme === key;
            const textColor = isActive ? '#fff' : undefined;
            
            return (
              <label
                key={key}
                className={styles.label}
                onClick={() => handleSchemeChange(key)}
                style={isActive ? { color: textColor } : undefined}
              >
                <input
                  type="radio"
                  name="colorScheme"
                  value={key}
                  checked={activeScheme === key}
                  onChange={() => handleSchemeChange(key)}
                  className={styles.radio}
                />
                {label}
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
};
