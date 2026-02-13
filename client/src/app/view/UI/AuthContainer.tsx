import type { ReactNode, SubmitEvent } from 'react';

type Props = {
  children?: ReactNode;
  onSubmit?: (e: SubmitEvent<HTMLFormElement>) => void;
};

export default function AuthContainer({
  children,
  onSubmit,
}: Props) {
  return (
    <form className='p-2 flex flex-col' onSubmit={onSubmit}>
      {children}
    </form>
  );
}
