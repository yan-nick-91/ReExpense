import { useEffect, useState, type SubmitEvent, type ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import AuthContainer from '../../UI/FormContainer';
import { validationStringResult } from '../../../validations/globalValidation';
import { loginController } from '../../../controllers/authController';
import Button from '../../UI/Button';
import { NavLink, useNavigate } from 'react-router-dom';

type FormState = {
  email: string;
  password: string;
};

type ErrorState = {
  email?: string;
  password?: string;
};

export default function LoginComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<ErrorState>({});

  useEffect(() => {
    document.title = 'ReExpense | Login'
  })

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

    const emailResult = validationStringResult(form.email, 'Email is required');
    const passwordResult = validationStringResult(
      form.password,
      'Password is required',
    );

    const newErrors: ErrorState = {
      email: emailResult.error,
      password: passwordResult.error,
    };

    setErrors(newErrors);

    const isValid = emailResult.valid && passwordResult.valid;

    if (!isValid) return;

    try {
      loginController(dispatch, {
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
          <h1 id='main-content'>Login</h1>
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
          <Button className='mt-4 md:w-[15%]' theme='primary' type={'submit'}>
            Login
          </Button>
        </AuthContainer>
        <div className='my-6 pl-2'>
          <p>
            Not having an account yet? Navigate to{' '}
            <NavLink
              to={`/register`}
              className={'underline underline-offset-5'}
            >
              register page
            </NavLink>
          </p>
        </div>
        <div className='my-6 pl-2'>
          <p>
            Forgot password? Navigate to{' '}
            <NavLink
              to={`/forgot/password`}
              className={'underline underline-offset-5'}
            >
              forgot password page
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
