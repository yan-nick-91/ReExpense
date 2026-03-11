import clsx from 'clsx';
import { useSkipLinks } from '../../hooks/skipLinkHooks';
import type { SkipLinkItem } from '../../context/SkipLinkContext';

const BASE_LINKS = [{ href: '#main-content', label: 'Go to main content' }];

export default function SkipLink() {
  const { pageLinks } = useSkipLinks();
  const links: SkipLinkItem[] = [...BASE_LINKS, ...pageLinks];

  return (
    <>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={clsx(`sr-only 
                focus:not-sr-only 
                focus:absolute 
                focus:left-4 
                focus:top-4 
                focus:z-50 
                focus:bg-[#090979] 
                focus:text-white
                focus:px-4
                focus:py-2
                focus:rounded
                focus:shadow-lg
                focus:outline-none
                transition-all
                duration-150`)}
        >
          {link.label}
        </a>
      ))}
    </>
  );
}
