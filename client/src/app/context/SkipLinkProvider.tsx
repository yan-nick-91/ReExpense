import { useCallback, useState, type ReactNode } from 'react';
import { SkipLinksContext, type SkipLinkItem } from './SkipLinkContext';

type Props = { children: ReactNode };

export default function SkipLinkProvider({ children }: Props) {
  const [linkMap, setLinkMap] = useState<Record<string, SkipLinkItem[]>>({});

  const registerLinks = useCallback((key: string, links: SkipLinkItem[]) => {
    setLinkMap((prev) => ({ ...prev, [key]: links }));
  }, []);

  const unregisterLinks = useCallback((key: string) => {
    setLinkMap((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const pageLinks: SkipLinkItem[] = Object.values(linkMap).flat();

  return (
    <SkipLinksContext.Provider
      value={{ registerLinks, unregisterLinks, pageLinks }}
    >
      {children}
    </SkipLinksContext.Provider>
  );
}
