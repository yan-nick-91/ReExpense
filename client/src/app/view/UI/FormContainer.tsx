import type { ReactNode, SubmitEvent } from 'react';

type Props = {
  children?: ReactNode;
  onSubmit?: (e: SubmitEvent<HTMLFormElement>) => void;
  className?: string;
};

export default function FormContainer({
  children,
  onSubmit,
  className,
}: Props) {
  return (
    <form
      className={!className ? `p-2 flex flex-col ${className}` : className}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
