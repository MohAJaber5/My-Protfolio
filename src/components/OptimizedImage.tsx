import React, { useState, useCallback } from 'react';

interface OptimizedImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt = '',
  className = '',
  style = {},
  loading = 'lazy',
  priority = false
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
  }, []);

  // Generate WebP source if available
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/, '.webp');
  
  return (
    <picture className={className}>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        decoding="async"
        fetchpriority={priority ? 'high' : 'auto'}
      />
    </picture>
  );
};

export default OptimizedImage;