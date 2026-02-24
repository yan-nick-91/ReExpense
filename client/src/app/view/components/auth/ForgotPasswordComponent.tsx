import { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react';
import { validationResult } from '../../../validations/globalValidation';
import { forgotPasswordController } from '../../../controllers/authController';
import { useDispatch } from 'react-redux';

import Button from '../../UI/Button';
import FormContainer from '../../UI/FormContainer';

export default function ForgotPasswordComponent() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'ReExpense | Forgot Password';
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailResult = validationResult(email, 'Email is required');
    const newError = emailResult.error!;

    setError(newError);

    const isValid = emailResult.valid;

    if (!isValid) return;

    try {
      forgotPasswordController(dispatch, { email });
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
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            value={email}
            onChange={onChange}
            className='border rounded-[.2rem] mt-1 border-gray-600 p-2'
            autoComplete='email'
            aria-invalid={!!error}
          />
          {error && (
            <p className='text-red-600 text-sm' role='alert'>
              {error}
            </p>
          )}
          <Button className='mt-4 md:w-[15%]' theme='primary' type={'submit'}>
            Submit request
          </Button>
        </FormContainer>
      </div>
    </div>
  );
}
