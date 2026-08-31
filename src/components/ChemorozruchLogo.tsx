import React from 'react';

export type ChemorozruchLogoVariant = 'horizontal' | 'official' | 'stacked' | 'mark';

interface ChemorozruchLogoProps {
  variant?: ChemorozruchLogoVariant;
  className?: string;
  alt?: string;
  iconOnly?: boolean; // backwards compatibility
  priority?: boolean;
}

/**
 * ChemorozruchLogo
 * 
 * Uses ONLY the exact official CHEMOROZRUCH brand assets supplied:
 * Logo: https://i.postimg.cc/pdzX4Png/1.png (/brand/chemorozruch-logo.png)
 * Favicon / Mark: https://i.postimg.cc/JhZ4vRBf/2.png (/brand/chemorozruch-favicon.png)
 * 
 * Preserves exact proportions, colors, typography, and transparency.
 */
export const ChemorozruchLogo: React.FC<ChemorozruchLogoProps> = ({
  variant = 'horizontal',
  className = 'h-full w-auto max-h-full object-contain',
  alt = 'CHEMOROZRUCH',
  iconOnly = false,
  priority = true,
}) => {
  const selectedVariant: ChemorozruchLogoVariant = iconOnly
    ? 'mark'
    : (variant as ChemorozruchLogoVariant);

  if (selectedVariant === 'mark') {
    return (
      <img
        src="/brand/chemorozruch-favicon.png"
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={`object-contain select-none pointer-events-none ${className}`}
      />
    );
  }

  // Exact Official Logo Lockup (from https://i.postimg.cc/pdzX4Png/1.png)
  return (
    <img
      src="/brand/chemorozruch-logo.png"
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={`object-contain select-none pointer-events-none ${className}`}
    />
  );
};

export default ChemorozruchLogo;
