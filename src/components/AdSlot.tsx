import React, { useEffect, useRef } from 'react';

type AdProvider = 'adsense' | 'media.net' | 'amazon' | 'custom';

type AdSlotProps = {
  slotId: string;
  className?: string;
  provider?: AdProvider;
  clientId?: string;
  format?: string;
  responsive?: boolean;
  customProps?: Record<string, string>;
};

export const AdSlot: React.FC<AdSlotProps> = ({ 
  slotId, 
  className, 
  provider = 'adsense',
  clientId = 'ca-pub-0000000000000000',
  format = 'auto',
  responsive = true,
  customProps = {}
}) => {
  const adRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!adRef.current) return;
    
    try {
      switch (provider) {
        case 'adsense':
          // @ts-expect-error: Google ads global
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          break;
        case 'media.net':
          // @ts-expect-error: Media.net global
          (window._mndq = window._mndq || []).push({});
          break;
        case 'amazon':
          // @ts-expect-error: Amazon A9 global
          (window.apstag = window.apstag || {});
          break;
        case 'custom':
          // Custom ad provider logic here
          console.log('Custom ad provider initialized');
          break;
        default:
          console.warn(`Unknown ad provider: ${provider}`);
      }
    } catch (error) {
      console.warn(`${provider} not initialized`, error);
    }
  }, [provider]);

  const renderAdElement = () => {
    switch (provider) {
      case 'adsense':
        return (
          <ins
            className="adsbygoogle block"
            style={{ display: 'block' }}
            data-ad-client={clientId}
            data-ad-slot={slotId}
            data-ad-format={format}
            data-full-width-responsive={responsive.toString()}
            ref={adRef as any}
          />
        );
      
      case 'media.net':
        return (
          <div
            id={`mndq-${slotId}`}
            className="block"
            style={{ display: 'block' }}
            data-cid={clientId}
            data-zone={slotId}
            ref={adRef as any}
          />
        );
      
      case 'amazon':
        return (
          <div
            id={`amzn-${slotId}`}
            className="block"
            style={{ display: 'block' }}
            data-amzn-asin={slotId}
            ref={adRef as any}
          />
        );
      
      case 'custom':
        return (
          <div
            id={`custom-${slotId}`}
            className="block"
            style={{ display: 'block' }}
            {...customProps}
            ref={adRef as any}
          />
        );
      
      default:
        return <div>Unsupported ad provider</div>;
    }
  };

  return (
    <div className={className}>
      {renderAdElement()}
    </div>
  );
};
