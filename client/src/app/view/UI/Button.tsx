import type { ReactNode, MouseEvent } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router';

type Props = {
  className?: string;
  children: ReactNode;
  theme?: 'default' | 'info' | 'success' | 'danger' | 'warning' | 'primary';
  navigateTo?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  ariaLabel?: string;
};

const themeClasses: Record<NonNullable<Props['theme']>, string> = {
  primary:
    'bg-[#090979] text-white hover:bg-[#2424ba] active:scale-95 focus:outline-offset-2 focus:outline-[#2424ba] focus:bg[#2424ba]',
  info: 'bg-[#196090] text-white hover:bg-[#367dac] active:scale-95 focus:outline-offset-2 focus:outline-[#367dac] focus:bg-[#367dac]',
  success:
    'bg-[#075b35] text-white hover:bg-[#067b47] active:scale-95 focus:outline-offset-2 focus:outline-[#067b47] focus:bg-[#067b47]',
  danger:
    'bg-[#98070c] text-white hover:bg-[#aa0e14] active:scale-95 focus:outline-offset-2 focus:outline-[#aa0e14] focus:bg-[#aa0e14]',
  warning:
    'bg-[#d8ae22] text-black hover:bg-[#d8a122] active:scale-95 focus:outline-offset-2 focus:outline-[#d8a122] focus:bg-[#d8a122]',
  default: 'focus:border focus:border-gray-600',
};

export default function Button({
  className,
  children,
  theme = 'default',
  navigateTo,
  type,
  onClick,
  disabled = false,
  ariaLabel,
}: Props) {
  const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';

  const baseClasses = clsx(
    'px-4 py-2 rounded-[0.2rem] cursor-pointer border-white-800',
    themeClasses[theme],
    {
      [disabledClasses]: disabled,
      'cursor-point': !disabled,
    },
    className,
  );

  if (navigateTo) {
    return (
      <NavLink
        className={theme === 'default' ? className : baseClasses}
        to={`${navigateTo!}`}
        {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <button
      className={theme === 'default' ? className : baseClasses}
      type={type ?? 'button'}
      onClick={(e) => onClick?.(e)}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
    >
      {children}
    </button>
  );
}
