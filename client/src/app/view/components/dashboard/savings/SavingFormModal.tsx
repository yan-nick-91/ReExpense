import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import Button from '../../../UI/Button';
import clsx from 'clsx';

type Props = {
  closeSavingModal: () => void;
};

type FormState = {
  nameOfSaving: string;
  initialAmount: string;
};

type ErrorState = {
  nameOfSaving?: string;
  initialAmount?: string;
};

export default function SavingFormModal({ closeSavingModal }: Props) {
  const [form, setForm] = useState<FormState>({
    nameOfSaving: '',
    initialAmount: '0.00',
  });

  const [error, setError] = useState<ErrorState>({});

  const handleKeyDownForNumOnly = (e: KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];

    const isNumber = /[0-9]$/.test(e.key);
    const isDot = e.key === '.';

    if (!isNumber && !isDot && !allowedKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }

    if (isDot && form.initialAmount.includes('.')) {
      e.preventDefault();
      return;
    }

    if ((isNumber || isDot) && form.initialAmount === '0.00') {
      e.preventDefault();

      setForm((prev) => ({
        ...prev,
        initialAmount: e.key,
      }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'initialAmount') {
      let cleanedValue = value
        .replace(/[^0-9.]/g, '')
        .replace(/(\..)\./g, '$1');

      if (cleanedValue.includes('.')) {
        const [integer, decimals] = cleanedValue.split('.');
        cleanedValue = integer + '.' + decimals.slice(0, 2);
      }

      if (cleanedValue.startsWith('.')) {
        cleanedValue = cleanedValue.slice(1);
      }

      setForm((prev) => ({
        ...prev,
        initialAmount: cleanedValue,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const submitHandler = (e: SubmitEvent<HTMLFormElement>) => {
  //   e.preventDefault()

  // }

  return (
    <section
      className={clsx(
        'fixed inset-0 flex items-center justify-center bg-[#1b1b1bbd] bg-opacity-50',
      )}
    >
      <form className='bg-white p-4 rounded-[0.2rem] shadow-lg w-200'>
        <div>
          <h2 className='text-xl font-bold mb-4'>Create new saving</h2>
          <div className='flex flex-col mb-4'>
            <label htmlFor='name-of-saving' className='mb-2'>
              Name of saving
            </label>
            <input
              className='border border-gray-600 rounded-[0.2rem] w-[70%] p-2'
              id='name-of-saving'
              name='nameOfSaving'
              type='text'
              value={form.nameOfSaving}
              onChange={handleChange}
            />
          </div>
          {error && (
            <p className='text-red-600 text-sm' role='alert'>
              {error.nameOfSaving}
            </p>
          )}
          <div className='flex flex-col mb-4'>
            <label htmlFor='initial-amount' className='mb-2'>
              Initial amount
            </label>
            <input
              className='border border-gray-600 rounded-[0.2rem] w-[70%] p-2'
              id='initial-amount'
              name='initialAmount'
              type='text'
              value={form.initialAmount}
              onChange={handleChange}
              onKeyDown={handleKeyDownForNumOnly}
            />
          </div>
          {error && (
            <p className='text-red-600 text-sm' role='alert'>
              {error.initialAmount}
            </p>
          )}
          <div className='flex gap-4'>
            <Button theme='primary'>Create saving</Button>
            <Button theme='primary' onClick={closeSavingModal}>
              Close form
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
