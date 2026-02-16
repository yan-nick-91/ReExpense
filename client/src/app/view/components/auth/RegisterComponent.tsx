import { useEffect, useState, type SubmitEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import { registerController } from '../../../controllers/authController';

import AuthContainer from '../../UI/FormContainer';
import Button from '../../UI/Button';
import {
  validationResult,
  verifyConfirmPasswordInputField,
} from '../../../validations/authValidation';
import { NavLink, useNavigate } from 'react-router-dom';

export default function RegisterComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('clicked');

    const emailResult = validationResult(email, 'Email is required');
    const passwordResult = validationResult(password, 'Password is required');
    const confirmPasswordResult = verifyConfirmPasswordInputField(
      password,
      confirmPassword,
      'Passwords do not match',
    );

    setEmailError(emailResult.error);
    setPasswordError(passwordResult.error);
    setConfirmPasswordError(confirmPasswordResult.error!);

    const isValid =
      emailResult.valid && passwordResult.valid && !confirmPasswordResult.error;

    if (!isValid) return;

    try {
      await registerController(dispatch, { email, password });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='border border-gray-600 w-[80%] rounded-[0.2rem]'>
        <div className='bg-[#090979] text-white p-2 pl-2 text-[1.2rem]'>
          <h1>Register</h1>
        </div>
        <AuthContainer onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border rounded-[.2rem] mt-1 border-gray-600 p-2'
            autoComplete='email'
            aria-invalid={!!emailError}
            aria-describedby={emailError ? 'email-error' : undefined}
          />
          {emailError && (
            <p className='text-red-600 text-sm' role='alert'>
              {emailError}
            </p>
          )}
          <label htmlFor='password' className='mt-2'>
            Password
          </label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border rounded-[.2rem] mt-1 border-gray-600 p-2'
            autoComplete='no'
            aria-invalid={!!passwordError}
            aria-describedby={passwordError ? 'password-error' : undefined}
          />
          {passwordError && (
            <p className='text-red-600 text-sm' role='alert'>
              {passwordError}
            </p>
          )}
          <label htmlFor='confirm password' className='mt-2'>
            Confirm Password
          </label>
          <input
            id='confirm password'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='border rounded-[.2rem] mt-1 border-gray-600 p-2'
            autoComplete='no'
            aria-invalid={!!confirmPasswordError}
            aria-describedby={
              confirmPasswordError ? 'confirm-error' : undefined
            }
          />
          {confirmPasswordError && (
            <p className='text-red-600 text-sm' role='alert'>
              {confirmPasswordError}
            </p>
          )}

          <Button className='mt-4 w-[12%]' theme='primary' type={'submit'}>
            Register
          </Button>
        </AuthContainer>
        <div className='my-6 pl-2'>
          <p>
            Not an account yet? Navigate to{' '}
            <NavLink
              to={`/login`}
              className={'underline underline-offset-5'}
            >
              login page
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
