import { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react';
import Button from '../../../UI/Button';
import TransactionInputComponent from './TransactionInputComponent';
import {
  validationAboveZeroResult,
  validationStringResult,
} from '../../../../validations/globalValidation';
import clsx from 'clsx';
import { createTransactionController } from '../../../../controllers/transactionController';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../store/store';
import { resetSuccessCreate } from '../../../../store/slice/transactionSlice';

type TransactionType = 'income' | 'expense';

type Props = {
  transactionType: TransactionType;
  selectedSavingId: string;
  onClose: () => void;
};

type FormState = {
  amount: string;
  category: string;
};

type ErrorState = {
  amount?: string;
  category?: string;
};

export default function TransactionFormModal({
  transactionType,
  selectedSavingId,
  onClose,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const createTransactionSuccessful = useSelector(
    (state: RootState) => state.transaction.success,
  );

  const [form, setForm] = useState<FormState>({
    amount: '',
    category: '',
  });

  const [errors, setErrors] = useState<ErrorState>({});

  useEffect(() => {
    if (!createTransactionSuccessful) return;

    const timer = setTimeout(() => {
      dispatch(resetSuccessCreate());
    }, 3000);
    return () => clearTimeout(timer);
  }, [createTransactionSuccessful, dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amountResult = validationAboveZeroResult(
      form.amount,
      'Amount for currency is required',
    );
    const categoryResult = validationStringResult(
      form.category,
      'Category is required',
    );

    const newErrors: ErrorState = {
      amount: amountResult.error,
      category: categoryResult.error,
    };

    setErrors(newErrors);

    const isValid = amountResult.valid && categoryResult.valid;

    if (!isValid) return;

    const amountAsNumber: number = +form.amount;

    try {
      await createTransactionController(dispatch, {
        savingId: selectedSavingId,
        amount: amountAsNumber,
        category: form.category,
        type: transactionType,
      });
      setForm({
        amount: '',
        category: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section
      className={clsx(
        'fixed inset-0 flex items-center justify-center bg-[#1b1b1bbd] bg-opacity-50',
      )}
    >
      <form
        className='bg-white p-4 rounded-[0.2rem] shadow-lg w-200'
        onSubmit={submitHandler}
      >
        <h2 className='text-xl font-bold mb-4'>
          Add {`${transactionType === 'income' ? 'income' : 'expense'}`}
        </h2>
        <div className='mb-8'>
          <TransactionInputComponent
            labelId='amount'
            labelText='Amount'
            name='amount'
            type='number'
            value={form.amount}
            onChange={handleChange}
          />
          {errors.amount && (
            <p className='text-red-600 text-sm' role='alert'>
              {errors.amount}
            </p>
          )}
          <TransactionInputComponent
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
        <div>
          {createTransactionSuccessful && (
            <p className='text-green-600 mb-4'>Transaction created</p>
          )}
        </div>
        <div className='flex gap-4'>
          <Button theme='primary' type='submit'>
            Submit Transaction
          </Button>
          <Button theme='primary' onClick={onClose}>
            Close Form
          </Button>
        </div>
      </form>
    </section>
  );
}
