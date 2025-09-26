import React, { useEffect, useRef } from 'react';

type AdSlotProps = {
  slotId: string;
  className?: string;
};

export const AdSlot: React.FC<AdSlotProps> = ({ slotId, className }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;
    try {
      // @ts-expect-error: Google ads global
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.warn('AdSense not initialized', error);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-0000000000000000"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
        ref={adRef}
      />
    </div>
  );
};
