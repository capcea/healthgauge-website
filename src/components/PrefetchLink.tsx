import React, { useCallback } from 'react';
import { Link, LinkProps } from 'react-router-dom';

type PrefetchLinkProps = LinkProps & {
  prefetch?: () => void;
};

export const PrefetchLink: React.FC<PrefetchLinkProps> = ({ prefetch, onMouseEnter, onFocus, ...props }) => {
  const handlePrefetch = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>) => {
      if (prefetch) prefetch();
      if (event.type === 'mouseenter' && onMouseEnter) onMouseEnter(event as React.MouseEvent<HTMLAnchorElement>);
      if (event.type === 'focus' && onFocus) onFocus(event as React.FocusEvent<HTMLAnchorElement>);
    },
    [prefetch, onFocus, onMouseEnter],
  );

  return <Link {...props} onMouseEnter={handlePrefetch} onFocus={handlePrefetch} />;
};
