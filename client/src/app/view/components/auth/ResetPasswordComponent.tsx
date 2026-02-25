import { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react';
import { validationResult } from '../../../validations/globalValidation';
import { verifyConfirmedPasswordInputField } from '../../../validations/authValidation';
import {
  resetForgottenPasswordController,
  validateResetTokenController,
} from '../../../controllers/authController';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../UI/Button';
import FormContainer from '../../UI/FormContainer';
import { useNavigate, useParams } from 'react-router-dom';
import type { RootState } from '../../../store/store';

type FormState = {
  newPassword: string;
  confirmedPassword: string;
};

type ErrorState = {
  newPassword?: string;
  confirmedPassword?: string;
};

export default function ResetPasswordComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { resetTokenStatus, resetPasswordSuccess, loading } = useSelector(
    (state: RootState) => state.auth,
  );

  const [form, setForm] = useState<FormState>({
    newPassword: '',
    confirmedPassword: '',
  });

  const [errors, setErrors] = useState<ErrorState>({});

  useEffect(() => {
    document.title = 'ReExpense | Reset Password';
  });

  useEffect(() => {
    if (!token) return;
    validateResetTokenController(dispatch, { token });
  }, [token, dispatch]);

  useEffect(() => {
    if (!resetPasswordSuccess) return;

    const timer = setTimeout(() => {
      navigate('/login');
    }, 1000);
    return () => clearTimeout(timer);
  }, [resetPasswordSuccess, navigate]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwordResult = validationResult(
      form.newPassword,
      'Password is required',
    );
    const confirmedPasswordResult = verifyConfirmedPasswordInputField(
      form.newPassword,
      form.confirmedPassword,
      'Passwords do not match',
    );

    const newErrors = {
      newPassword: passwordResult.error,
      confirmedPassword: confirmedPasswordResult.error,
    };

    setErrors(newErrors);

    const isValid = passwordResult.valid && !confirmedPasswordResult.error;

    if (!isValid || !token) return;

    try {
      resetForgottenPasswordController(dispatch, {
        token,
        newPassword: form.newPassword,
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (resetTokenStatus === 'checking') {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p>Validating reset link...</p>
      </div>
    );
  }

  if (resetTokenStatus === 'invalid') {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='border border-gray-600 w-[80%] rounded-[0.2rem]'>
          <div className='bg-[#090979] text-white p-2 pl-2 text-[1.2rem]'>
            <h1>Error</h1>
          </div>
          <div className='p-4'>
            <p className='mb-2'>Reset link is invalid or expired.</p>
            <p className='mb-4'>
              Please request a new password reset by clicking the button below.
            </p>
            <Button navigateTo='/forgot/password' theme='primary'>
              Request reset
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='border border-gray-600 w-[80%] rounded-[0.2rem]'>
        <div className='bg-[#090979] text-white p-2 pl-2 text-[1.2rem]'>
          <h1 id='main-content'>Forgot Password</h1>
        </div>
        <FormContainer onSubmit={handleSubmit}>
          <label htmlFor='newPassword'>New Password</label>
          <input
            id='newPassword'
            name='newPassword'
            type='password'
            value={form.newPassword}
            onChange={onChange}
            className='border rounded-[.2rem] mt-1 border-gray-600 p-2'
            autoComplete='none'
            aria-invalid={!!errors.newPassword}
          />
          {errors.newPassword && (
            <p className='text-red-600 text-sm' role='alert'>
              {errors.newPassword}
            </p>
          )}
          <label htmlFor='confirmPassword' className='mt-2'>
            Confirm Password
          </label>
          <input
            id='confirmPassword'
            name='confirmedPassword'
            type='password'
            value={form.confirmedPassword}
            onChange={onChange}
            className='border rounded-[.2rem] mt-1 border-gray-600 p-2'
            autoComplete='none'
            aria-invalid={!!errors.confirmedPassword}
          />
          {errors.confirmedPassword && (
            <p className='text-red-600 text-sm' role='alert'>
              {errors.confirmedPassword}
            </p>
          )}
          {resetPasswordSuccess && (
            <p className='text-green-600' mb-4>
              Password successfully updated. Redirecting to login...
            </p>
          )}
          <Button
            className='mt-4 md:w-[15%]'
            theme='primary'
            type={'submit'}
            disabled={loading}
          >
            Submit request
          </Button>
        </FormContainer>
      </div>
    </div>
  );
}
