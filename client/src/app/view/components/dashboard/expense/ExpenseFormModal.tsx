import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import Button from '../../../UI/Button';
import ExpenseInputComponent from './ExpenseInputComponent';
import { validationResult } from '../../../../validations/globalValidation';
import clsx from 'clsx';

type ExpenseType = 'income' | 'outcome';

type Props = {
  expenseType: ExpenseType;
  onClose: () => void;
}

type FormState = {
  amountInCurrency: string;
  category: string;
};

type ErrorState = {
  amountInCurrency?: string;
  category?: string;
};

export default function ExpenseFormModal({ expenseType, onClose }: Props) {
  const [form, setForm] = useState<FormState>({
    amountInCurrency: '',
    category: '',
  });

  const [errors, setErrors] = useState<ErrorState>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitExpenseHandler = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amountInCurrencyResult = validationResult(
      form.amountInCurrency,
      'Amount for currency is required',
    );
    const categoryResult = validationResult(
      form.category,
      'Category is required',
    );

    const newErrors: ErrorState = {
      amountInCurrency: amountInCurrencyResult.error,
      category: categoryResult.error,
    };

    setErrors(newErrors);

    const isValid = amountInCurrencyResult.valid && categoryResult.valid;

    if (!isValid) return;
    console.log(form);
  };

  return (
    <section
      className={clsx(
        'fixed inset-0 flex items-center justify-center bg-[#1b1b1bbd] bg-opacity-50',
      )}
    >
      <form
        className='bg-white p-4 rounded-[0.2rem] shadow-lg w-200'
        onSubmit={submitExpenseHandler}
      >
        <h2 className='text-xl font-bold mb-4'>
          Add {`${expenseType === 'income' ? 'income' : 'outcome'}`}
        </h2>
        <div className='mb-8'>
          <ExpenseInputComponent
            labelId='amountInCurrency'
            labelText={`Amount in currency`}
            name='amountInCurrency'
            type='number'
            value={form.amountInCurrency}
            onChange={handleChange}
          />
          {errors.amountInCurrency && (
            <p className='text-red-600 text-sm' role='alert'>
              {errors.amountInCurrency}
            </p>
          )}
          <ExpenseInputComponent
            labelId='category'
            labelText='Category'
            name='category'
            type='text'
            value={form.category}
            onChange={handleChange}
          />
          {errors.category && (
            <p className='text-red-600 text-sm' role='alert'>
              {errors.category}
            </p>
          )}
        </div>
        <div className='flex gap-4'>
          <Button theme='primary' type='submit'>
            Submit Expense
          </Button>
          <Button theme='primary' onClick={onClose}>
            Close Form
          </Button>
        </div>
      </form>
    </section>
  );
}
