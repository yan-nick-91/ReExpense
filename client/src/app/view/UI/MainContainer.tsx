import clsx from 'clsx';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  headerText?: ReactNode;
  theme?: string;
  width?: string
};

const themeClasses: Record<NonNullable<Props['theme']>, string> = {
  primary: 'bg-[#090979] text-white',
  info: 'bg-[#196090] text-white',
  success: 'bg-[#075b35] text-white',
  danger: 'bg-[#6b0508] text-white',
  warning: 'bg-[#d8ae22] text-black',
  default: '',
};


export default function MainContainer({
  children,
  className,
  headerText,
  theme = 'primary',
}: Props) {
  const classes = clsx(
    'px-4 py-2 rounded-[0.2rem] cursor-pointer',
    themeClasses[theme],
    className,
  );

  return (
      <section>
        <div
          className={clsx(`${className ? className : `bg-[${classes}] text-white p-2 pl-2 text-[1.2rem]`} 
          ${!headerText && 'h-10'}`)}
        >
          {headerText}
        </div>
        {children}
      </section>
  );
}
