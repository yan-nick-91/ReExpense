import { useState, useEffect, type SubmitEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { resetSuccessPassword } from '../../../store/slice/authSlice';
import { validationStringResult } from '../../../validations/globalValidation';
import { verifyConfirmedPasswordInputField } from '../../../validations/authValidation';
import { updatePasswordController } from '../../../controllers/authController';

import Button from '../../UI/Button';

export default function SettingsComponent() {
  const dispatch = useDispatch();
  const updatePasswordSuccessful = useSelector(
    (state: RootState) => state.auth.success,
  );

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setNewConfirmPassword] = useState('');

  const [currentPasswordError, setCurrentPasswordError] = useState<
    string | undefined
  >(undefined);
  const [newPasswordError, setNewPasswordError] = useState<string | undefined>(
    undefined,
  );
  const [confirmedNewPasswordError, setConfirmedNewPasswordError] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    document.title = 'ReExpense | Settings'
  })

  useEffect(() => {
    if (!updatePasswordSuccessful) return;

    const timer = setTimeout(() => {
      dispatch(resetSuccessPassword());
    }, 3000);
    return () => clearTimeout(timer);
  }, [updatePasswordSuccessful, dispatch]);

  const submitPasswordUpdater = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentPasswordResult = validationStringResult(
      currentPassword,
      'Current password is required',
    );
    const newPasswordResult = validationStringResult(
      newPassword,
      'New password is required',
    );
    const confirmedNewPasswordResult = verifyConfirmedPasswordInputField(
      newPassword,
      confirmNewPassword,
      'Password do not match',
    );

    setCurrentPasswordError(currentPasswordResult.error);
    setNewPasswordError(newPasswordResult.error);
    setConfirmedNewPasswordError(confirmedNewPasswordResult.error);

    const isValid =
      currentPasswordResult.valid &&
      newPasswordResult.valid &&
      !confirmedNewPasswordResult.error;

    if (!isValid) return;

    try {
      updatePasswordController(dispatch, {
        currentPassword,
        newPassword,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section className='flex justify-center h-screen'>
        <h1 id='main-content' className='sr-only'>Setting form</h1>
        <div className='border border-gray-600 w-[80%]'>
          <form
            className='text-[1.2rem] w-[95%] m-auto'
            onSubmit={submitPasswordUpdater}
          >
            <div className='flex flex-col mt-2'>
              <h2 className='mt-4 mb-2'>Update password</h2>
              <div className='border border-b-gray-400 mb-4' />
              <label htmlFor='update-current-password' className='mb-2'>
                Current password
              </label>
              <input
                id='update-current-password'
                type='password'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className='border border-gray-600 rounded-[0.2rem] p-2'
                autoComplete='update-current-password'
                aria-invalid={!!currentPasswordError}
                aria-describedby={
                  currentPasswordError ? 'current-password-error' : undefined
                }
              />
              {currentPasswordError && (
                <p className='text-red-600 text-sm' role='alert'>
                  {currentPasswordError}
                </p>
              )}
            </div>
            <div className='flex flex-col mt-2'>
              <label htmlFor='new-password' className='mb-2'>
                New password
              </label>
              <input
                id='new-password'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='border border-gray-600 rounded-[0.2rem] p-2'
                autoComplete='new-password'
                aria-invalid={!!newPasswordError}
                aria-describedby={
                  newPasswordError ? 'new-password-error' : undefined
                }
              />
              {newPasswordError && (
                <p className='text-red-600 text-sm' role='alert'>
                  {newPasswordError}
                </p>
              )}
            </div>
            <div className='flex flex-col mt-2 mb-8'>
              <label htmlFor='confirm-new-password' className='mb-2'>
                Confirm new password
              </label>
              <input
                id='confirm-new-password'
                type='password'
                value={confirmNewPassword}
                onChange={(e) => setNewConfirmPassword(e.target.value)}
                className='border border-gray-600 rounded-[0.2rem] p-2'
                autoComplete='confirm-new-password'
                aria-invalid={!!confirmedNewPasswordError}
                aria-describedby={
                  confirmedNewPasswordError
                    ? 'confirmed-new-password-error'
                    : undefined
                }
              />
              {confirmedNewPasswordError && (
                <p className='text-red-600 text-sm' role='alert'>
                  {confirmedNewPasswordError}
                </p>
              )}
            </div>
            <div>
              {updatePasswordSuccessful && (
                <p className='text-green-600 mb-4'>
                  Successfully updated password
                </p>
              )}
            </div>
            <Button theme='primary' type={'submit'}>
              Confirm
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
