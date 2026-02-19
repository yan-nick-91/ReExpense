import { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import { registerController } from '../../../controllers/authController';

import AuthContainer from '../../UI/FormContainer';
import Button from '../../UI/Button';
import {
  validationResult
} from '../../../validations/globalValidation';
import { NavLink, useNavigate } from 'react-router-dom';
import { verifyConfirmedPasswordInputField } from '../../../validations/authValidation';

type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
};

type ErrorState = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function RegisterComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<ErrorState>({});

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('clicked');

    const emailResult = validationResult(form.email, 'Email is required');
    const passwordResult = validationResult(form.password, 'Password is required');
    const confirmPasswordResult = verifyConfirmedPasswordInputField(
      form.password,
      form.confirmPassword,
      'Passwords do not match',
    );

    const newErrors: ErrorState = {
      email: emailResult.error,
      password: passwordResult.error,
      confirmPassword: confirmPasswordResult.error || undefined,
    };

    setErrors(newErrors);

    const isValid =
      emailResult.valid && passwordResult.valid && !confirmPasswordResult.error;

    if (!isValid) return;

    try {
      registerController(dispatch, {
        email: form.email,
        password: form.password,
      });
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
            name='email'
            type='email'
            value={form.email}
            onChange={onChange}
            className='border rounded-[.2rem] mt-1 border-gray-600 p-2'
            autoComplete='email'
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className='text-red-600 text-sm' role='alert'>
              {errors.email}
            </p>
          )}
          <label htmlFor='password' className='mt-2'>
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            value={form.password}
            onChange={onChange}
            className='border rounded-[.2rem] mt-1 border-gray-600 p-2'
            autoComplete='no'
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className='text-red-600 text-sm' role='alert'>
              {errors.password}
            </p>
          )}
          <label htmlFor='confirmPassword' className='mt-2'>
            Confirm Password
          </label>
          <input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            value={form.confirmPassword}
            onChange={onChange}
            className='border rounded-[.2rem] mt-1 border-gray-600 p-2'
            autoComplete='no'
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className='text-red-600 text-sm' role='alert'>
              {errors.confirmPassword}
            </p>
          )}

          <Button className='mt-4 w-[12%]' theme='primary' type={'submit'}>
            Register
          </Button>
        </AuthContainer>
        <div className='my-6 pl-2'>
          <p>
            Not an account yet? Navigate to{' '}
            <NavLink to={`/login`} className={'underline underline-offset-5'}>
              login page
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
