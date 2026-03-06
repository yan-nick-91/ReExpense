import clsx from 'clsx';
import Button from '../../../UI/Button';
import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import {
  validationAboveZeroResult,
  validationStringResult,
} from '../../../../validations/globalValidation';
import { createGoalController } from '../../../../controllers/goalController';
import { useDispatch } from 'react-redux';

type Props = {
  onClose: () => void;
  
};

type FormState = {
  title: string;
  description: string;
  price: string;
};

type ErrorState = {
  title?: string;
  description?: string;
  price?: string;
};

export default function GoalFormModal({ onClose }: Props) {
  const dispatch = useDispatch();
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    price: '',
  });

  const [errors, setErrors] = useState<ErrorState>({});

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitGoalHandler = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const titleResult = validationStringResult(form.title, 'Title is required');

    const priceResult = validationAboveZeroResult(
      form.price,
      'Price is required',
    );

    const newErrors = {
      title: titleResult.error,
      price: priceResult.error,
    };

    setErrors(newErrors);

    const isValid = titleResult.valid && priceResult.valid;

    if (!isValid) return;

    const priceAsNumber: number = +form.price;

    try {
      createGoalController(dispatch, {
        title: form.title,
        description: form.description,
        price: priceAsNumber,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <section
        className={clsx(
          'fixed inset-0 flex items-center justify-center bg-[#1b1b1bbd] bg-opacity-50',
        )}
      >
        <form
          className='bg-white p-4 rounded-[0.2rem] shadow-lg w-200'
          onSubmit={submitGoalHandler}
        >
          <h2 className='text-xl font-bold mb-4'>Add new goal</h2>
          <div className='mb-8'>
            <div className='flex flex-col mb-4'>
              <label htmlFor='title' className='mb-2'>
                Title
              </label>
              <input
                id='title'
                name='title'
                type='text'
                value={form.title}
                onChange={onChange}
                className='border rounded-[.2rem] mt-1 border-gray-600 p-2'
                autoComplete='no'
                aria-invalid={!!errors.title}
              />
            </div>
            {errors.title && (
              <p className='text-red-600 text-sm' role='alert'>
                {errors.title}
              </p>
            )}
            <div className='flex flex-col mb-4'>
              <label htmlFor='description' className='mb-2'>
                Description
              </label>
              <input
                id='description'
                name='description'
                type='description'
                value={form.description}
                onChange={onChange}
                className='border rounded-[.2rem] mt-1 border-gray-600 p-2'
                autoComplete='no'
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label htmlFor='price' className='mb-2'>Price</label>
              <input
                id='price'
                name='price'
                type='number'
                value={form.price}
                onChange={onChange}
                className='border rounded-[.2rem] mt-1 border-gray-600 p-2'
                autoComplete='no'
                aria-invalid={!!errors.price}
              />
            </div>
            {errors.price && (
              <p className='text-red-600 text-sm' role='alert'>
                {errors.price}
              </p>
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
    </div>
  );
}
