import type { ReactNode } from 'react';
import Button from '../../UI/Button';
interface Props {
  children: ReactNode;
  formHeaderText: 'Income' | 'Outcome';
  onClose: () => void;
}

export default function ExpenseFormModal({ children, formHeaderText, onClose }: Props) {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-[#1b1b1bbd] bg-opacity-50'>
      <form className='bg-white p-4 rounded-[0.2rem] shadow-lg w-200'>
        <h2 className='text-xl font-bold mb-4'>Add {formHeaderText}</h2>
        <section className='mb-8'>{children}</section>
        <Button theme='primary' onClick={onClose}>
          Close Form
        </Button>
      </form>
    </div>
  );
}
