import { useContext, useEffect } from 'react';
import {
  SkipLinksContext,
  type SkipLinkItem,
} from '../context/SkipLinkContext';

export function useSkipLinks() {
  return useContext(SkipLinksContext);
}

export const useRegisterSkipLinks = (key: string, links: SkipLinkItem[]) => {
  const { registerLinks, unregisterLinks } = useSkipLinks();

  useEffect(() => {
    registerLinks(key, links);
    return () => unregisterLinks(key);
  }, [key, links, registerLinks, unregisterLinks]);
};
