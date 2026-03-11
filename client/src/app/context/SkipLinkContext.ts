import { createContext } from "react";

export type SkipLinkItem = { href: string; label: string };

export type SkipLinkContextType = {
  registerLinks: (key: string, links: SkipLinkItem[]) => void;
  unregisterLinks: (key: string) => void;
  pageLinks: SkipLinkItem[];
};

export const SkipLinksContext = createContext<SkipLinkContextType>({
  registerLinks: () => {},
  unregisterLinks: () => {},
  pageLinks: [],
});
