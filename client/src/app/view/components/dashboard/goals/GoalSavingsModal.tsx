// import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import Button from '../../../UI/Button';
import clsx from 'clsx';
// import { validationAboveZeroResult } from '../../../../validations/globalValidation';
// import { addSavingToGoalController } from '../../../../controllers/goalController';
// import { useDispatch } from 'react-redux';

type Props = {
//   goalId: string;
  onCloseModal: () => void;
};

export default function GoalSavingsModal({onCloseModal}: Props ) {
  // const dispatch = useDispatch();

  // const [savings, setSavings] = useState<string>('');
  // const [savingsError, setSavingsError] = useState<string>('');

  // const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSavings(e.target.value);
  // };

  // const addSavingToGoal = (e: SubmitEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const savingsResult = validationAboveZeroResult(
  //     savings,
  //     'Saving is required',
  //   );

  //   setSavingsError(savingsResult.error!);

  //   const isValid = savingsResult.valid;

  //   if (!isValid) return;

  //   const savingsAsNumber = +savings;

  //   try {
  //     addSavingToGoalController(dispatch, {
  //       id: goalId,
  //       savings: savingsAsNumber,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <section
      className={clsx(
        'fixed inset-0 flex items-center justify-center bg-[#1b1b1bbd] bg-opacity-50',
      )}
    >
      <div className='bg-white p-4 rounded-[0.2rem] shadow-lg w-200'>
        <div className='mb-4'>
          <h2>Add saving to goal</h2>
        </div>
        <div className='flex gap-6'>
          <form>
            {/* <div className='flex flex-col mb-4'>
              <label htmlFor='title' className='mb-2'>
                Savings
              </label>
              <input
                id='saving'
                name='savings'
                type='number'
                value={savings}
                onChange={onChange}
                className='border rounded-[.2rem] mt-1 border-gray-600 p-2'
                autoComplete='no'
                aria-invalid={!!savingsError}
              />
            </div>
            {savingsError && (
              <p className='text-red-600 text-sm' role='alert'>
                {savingsError}
              </p>
            )} */}
            <Button theme='primary' type='submit'>
              Add saving to goal
            </Button>
            <Button theme='primary' onClick={onCloseModal}>
              Close window
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
