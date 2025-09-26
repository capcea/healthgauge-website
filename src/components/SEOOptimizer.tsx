import React, { useEffect } from 'react';

interface SEOOptimizerProps {
  preloadImages?: string[];
  preloadFonts?: string[];
  criticalCSS?: string;
}

export const SEOOptimizer: React.FC<SEOOptimizerProps> = ({ 
  preloadImages = [], 
  preloadFonts = [],
  criticalCSS 
}) => {
  useEffect(() => {
    // Preload critical images
    preloadImages.forEach((imageSrc) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imageSrc;
      document.head.appendChild(link);
    });

    // Preload critical fonts
    preloadFonts.forEach((fontSrc) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.href = fontSrc;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Add critical CSS if provided
    if (criticalCSS) {
      const style = document.createElement('style');
      style.textContent = criticalCSS;
      document.head.appendChild(style);
    }

    // Optimize loading performance
    const optimizePerformance = () => {
      // Lazy load images
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));

      // Prefetch next page on hover
      const links = document.querySelectorAll('a[href^="/"]');
      links.forEach((link) => {
        link.addEventListener('mouseenter', () => {
          const href = link.getAttribute('href');
          if (href && !document.querySelector(`link[href="${href}"]`)) {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = href;
            document.head.appendChild(prefetchLink);
          }
        });
      });
    };

    // Run optimization after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizePerformance);
    } else {
      optimizePerformance();
    }

    // Cleanup
    return () => {
      document.removeEventListener('DOMContentLoaded', optimizePerformance);
    };
  }, [preloadImages, preloadFonts, criticalCSS]);

  return null;
};

// SEO-friendly image component
interface SEOImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

export const SEOImage: React.FC<SEOImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false
}) => {
  const imageProps = {
    src: priority ? src : undefined,
    'data-src': priority ? undefined : src,
    alt,
    width,
    height,
    className: `${className} ${!priority ? 'lazy' : ''}`,
    loading: priority ? 'eager' : loading,
    decoding: 'async' as const,
  };

  return <img {...imageProps} />;
};

// SEO-friendly link component
interface SEOLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
  external?: boolean;
}

export const SEOLink: React.FC<SEOLinkProps> = ({
  href,
  children,
  className = '',
  prefetch = false,
  external = false
}) => {
  const linkProps = {
    href,
    className,
    ...(external && {
      rel: 'noopener noreferrer',
      target: '_blank'
    }),
    ...(prefetch && {
      'data-prefetch': 'true'
    })
  };

  return <a {...linkProps}>{children}</a>;
};
