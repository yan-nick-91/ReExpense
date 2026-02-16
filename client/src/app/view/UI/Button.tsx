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
};

const themeClasses: Record<NonNullable<Props['theme']>, string> = {
  primary: 'bg-[#090979] text-white hover:bg-[#2424ba] active:scale-95',
  info: 'bg-[#196090] text-white hover:bg-[#367dac] active:scale-95',
  success: 'bg-[#075b35] text-white hover:bg-[#067b47] active:scale-95',
  danger: 'bg-[#6b0508] text-white hover:bg-[#aa0e14] active:scale-95',
  warning: 'bg-[#d8ae22] text-black hover:bg-[#d8a122] active:scale-95',
  default: '',
};

export default function Button({
  className,
  children,
  theme = 'default',
  navigateTo,
  type,
  onClick,
}: Props) {
  const classes = clsx(
    'px-4 py-2 rounded-[0.2rem] cursor-pointer',
    themeClasses[theme],
    className,
  );

  if (navigateTo) {
    return (
      <NavLink
        className={theme === 'default' ? className : classes}
        to={`/${navigateTo!}`}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <button
      className={theme === 'default' ? className : classes}
      type={type ?? 'button'}
      onClick={(e) => onClick?.(e)}
    >
      {children}
    </button>
  );
}
