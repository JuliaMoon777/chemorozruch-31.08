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
 * Official CHEMOROZRUCH Brand Logo Component.
 * Uses the exact official brand emblem and wordmark vectors / assets with preserved aspect ratio,
 * high-DPI sharpness, transparent background, and responsive scaling.
 */
export const ChemorozruchLogo: React.FC<ChemorozruchLogoProps> = ({
  variant = 'horizontal',
  className = 'h-8 sm:h-9 lg:h-10 w-auto',
  alt = 'CHEMOROZRUCH',
  iconOnly = false,
  priority = true,
}) => {
  const selectedVariant: ChemorozruchLogoVariant = iconOnly
    ? 'mark'
    : variant === 'stacked'
    ? 'official'
    : (variant as ChemorozruchLogoVariant);

  if (selectedVariant === 'mark') {
    return (
      <img
        src="/images/chemorozruch-logo-mark.svg"
        alt={alt}
        width={640}
        height={640}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={`object-contain select-none pointer-events-none ${className}`}
      />
    );
  }

  if (selectedVariant === 'official') {
    return (
      <img
        src="/images/chemorozruch-logo-official.svg"
        alt={alt}
        width={1900}
        height={1200}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={`object-contain select-none pointer-events-none ${className}`}
      />
    );
  }

  // Default: Horizontal Lockup (Emblem + CHEMOROZRUCH Wordmark)
  return (
    <img
      src="/images/chemorozruch-logo-horizontal.svg"
      alt={alt}
      width={2600}
      height={640}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={`object-contain select-none pointer-events-none ${className}`}
    />
  );
};

export default ChemorozruchLogo;
