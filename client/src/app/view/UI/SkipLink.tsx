import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import type { RootState } from '../../store/store';

export default function SkipLink() {
  const location = useLocation();
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const links = [
    {
      href: '#main-content',
      label: 'Go to main content',
    },
  ];

  if (isLoggedIn && location.pathname === '/') {
    links.push(
      {
        href: '#chart-section',
        label: 'Go to chart diagrams',
      },
      {
        href: '#transaction-section',
        label: 'Go to transactions',
      },
      { href: '#goals-section', label: 'Go to goals' },
      {
        href: '#activities-section',
        label: 'Go to activities',
      },
    );
  }

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
