import { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react';
import { validationResult } from '../../../validations/globalValidation';
import { verifyConfirmedPasswordInputField } from '../../../validations/authValidation';
import { resetForgottenPasswordController } from '../../../controllers/authController';
import { useDispatch } from 'react-redux';

import Button from '../../UI/Button';
import FormContainer from '../../UI/FormContainer';
import { useParams } from 'react-router-dom';

type TokenStatus = 'checking' | 'valid' | 'invalid';

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
  const { token } = useParams();

  const [form, setForm] = useState<FormState>({
    newPassword: '',
    confirmedPassword: '',
  });

  const [errors, setErrors] = useState<ErrorState>({});

  const [isTokenValid, setIsTokenValid] = useState<TokenStatus>('checking');

  useEffect(() => {
    document.title = 'ReExpense | Reset Password'
  })

  useEffect(() => {
    const validate = () => {
      if (!token) {
        setIsTokenValid('invalid');
        return;
      }
    };
  }, [token]);

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
      confirmedPasswordResult: confirmedPasswordResult.error,
    };

    setErrors(newErrors);

    const isValid = passwordResult.valid && !confirmedPasswordResult.error;

    if (!isValid) return;

    try {
      resetForgottenPasswordController(dispatch, {
        newPassword: form.newPassword,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='border border-gray-600 w-[80%] rounded-[0.2rem]'>
        <div className='bg-[#090979] text-white p-2 pl-2 text-[1.2rem]'>
          <h1>Forgot Password</h1>
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
            autoComplete='email'
            aria-invalid={!!errors}
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
            name='confirmPassword'
            type='password'
            value={form.confirmedPassword}
            onChange={onChange}
            className='border rounded-[.2rem] mt-1 border-gray-600 p-2'
            autoComplete='email'
            aria-invalid={!!errors}
          />
          {errors.confirmedPassword && (
            <p className='text-red-600 text-sm' role='alert'>
              {errors.confirmedPassword}
            </p>
          )}
          <Button className='mt-4 w-[12%]' theme='primary' type={'submit'}>
            Submit request
          </Button>
        </FormContainer>
      </div>
    </div>
  );
}
