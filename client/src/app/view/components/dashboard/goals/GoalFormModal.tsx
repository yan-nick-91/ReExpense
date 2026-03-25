import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import {
  createGoalController,
  updateGoalController,
} from '../../../../controllers/goalController';
import {
  validationAboveZeroResult,
  validationStringResult,
} from '../../../../validations/globalValidation';

import type { UpdateGoal } from '../../../../types/goalTypes';
import Button from '../../../UI/Button';

type Props = {
  onClose: () => void;
  modalPurpose?: ModalPurpose;
  selectedSavingId: string;
  editGoal?: UpdateGoal;
};

type FormState = {
  title: string;
  description: string;
  price: string;
};

type UpdateFormState = FormState & {
  id?: string;
};

type ErrorState = {
  title?: string;
  description?: string;
  price?: string;
};

type ModalPurpose = 'create' | 'edit';

export default function GoalFormModal({
  onClose,
  modalPurpose = 'create',
  selectedSavingId,
  editGoal,
}: Props) {
  const dispatch = useDispatch();
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    price: '',
  });

  const [editForm, setEditForm] = useState<UpdateFormState>(
    modalPurpose === 'edit' && editGoal
      ? {
          id: editGoal.id,
          title: editGoal.title,
          description: editGoal.description,
          price: String(editGoal.targetAmount),
        }
      : { id: '', title: '', description: '', price: '' },
  );

  const [errors, setErrors] = useState<ErrorState>({});

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (modalPurpose === 'create') {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setEditForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submitGoalHandler = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const titleResult = validationStringResult(
      modalPurpose === 'create' ? form.title : editForm.title,
      'Title is required',
    );

    const priceResult = validationAboveZeroResult(
      modalPurpose === 'create' ? form.price : editForm.price,
      'Price is required',
    );

    const newErrors = {
      title: titleResult.error,
      price: priceResult.error,
    };

    setErrors(newErrors);

    const isValid = titleResult.valid && priceResult.valid;

    if (!isValid) return;

    const priceAsNumber: number =
      modalPurpose === 'create' ? +form.price : +editForm.price;
    try {
      if (modalPurpose === 'create') {
        createGoalController(dispatch, {
          savingId: selectedSavingId,
          title: form.title,
          description: form.description,
          targetAmount: priceAsNumber,
        });
      } else {
        updateGoalController(dispatch, {
          id: editGoal!.id,
          savingId: selectedSavingId,
          title: editForm.title,
          description: editForm.description,
          targetAmount: priceAsNumber,
        });
      }
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
        onSubmit={submitGoalHandler}
      >
        <h2 className='text-xl font-bold mb-4'>
          {modalPurpose === 'create' ? 'Add new goal' : 'Edit goal'}
        </h2>
        <div className='mb-8'>
          <div className='flex flex-col mb-4'>
            <label htmlFor='title' className='mb-2'>
              Title
            </label>
            <input
              id='title'
              name='title'
              type='text'
              value={modalPurpose === 'create' ? form.title : editForm.title}
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
              value={
                modalPurpose === 'create'
                  ? form.description
                  : editForm.description
              }
              onChange={onChange}
              className='border rounded-[.2rem] mt-1 border-gray-600 p-2'
              autoComplete='no'
            />
          </div>
          <div className='flex flex-col mb-4'>
            <label htmlFor='price' className='mb-2'>
              Price
            </label>
            <input
              id='price'
              name='price'
              type='number'
              value={modalPurpose === 'create' ? form.price : editForm.price}
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
            {modalPurpose === 'create' ? 'Submit new goal' : 'Edit goal'}
          </Button>
          <Button theme='primary' onClick={onClose}>
            Close form
          </Button>
        </div>
      </form>
    </section>
  );
}
