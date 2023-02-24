/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setLogin: any;
};

function RegisterForm(props: Props) {
  const navigate = useNavigate();
  function changeTab(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    props.setLogin('true');
  }

  function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const data = document.querySelector('#register');
    const formData = new FormData(data as HTMLFormElement);
    console.log(formData);
    for (const data of formData.values()) {
      if (!data) {
        alert('Fill all fields of the Form');
        return;
      }
    }
    if (formData.get('password') !== formData.get('password_confirmation')) {
      alert('Passwords do not match!');
      return;
    }

    axios
      .post('/api/signup', formData, {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          sessionStorage.setItem('token_greddit', res.data.token);
          sessionStorage.setItem('id_greddit', res.data.id);
          localStorage.removeItem('token_greddit');
          localStorage.removeItem('id_greddit');
          navigate('/home');
        }else if(res.status == 201){
          alert(res.data);
          navigate('/');
        }
      })
      .catch((err) => console.log('err' + err));
  }
  return (
    <main
      aria-label='Main'
      className='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6'
    >
      <div className='max-w-xl lg:max-w-3xl'>
        <div className='relative block -mt-16 lg:hidden'>
          <h1 className='mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl'>
            Welcome to Greddit!
          </h1>

          <p className='mt-4 leading-relaxed text-gray-500'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
            quibusdam aperiam voluptatum.
          </p>
        </div>

        <form id='register' className='grid grid-cols-6 gap-6 mt-8'>
          <div className='col-span-6 sm:col-span-3'>
            <label htmlFor='FirstName' className='block text-sm font-medium text-gray-700'>
              First Name
            </label>

            <input
              type='text'
              id='FirstName'
              name='first_name'
              className='w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
            />
          </div>

          <div className='col-span-6 sm:col-span-3'>
            <label htmlFor='LastName' className='block text-sm font-medium text-gray-700'>
              Last Name
            </label>

            <input
              type='text'
              id='LastName'
              name='last_name'
              className='w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
            />
          </div>

          <div className='col-span-6'>
            <label htmlFor='Username' className='block text-sm font-medium text-gray-700'>
              User Name
            </label>

            <input
              type='text'
              id='username'
              name='username'
              className='w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
            />
          </div>

          <div className='col-span-6'>
            <label htmlFor='DateOfBirth' className='block text-sm font-medium text-gray-700'>
              Date of Birth
            </label>

            <input
              type='date'
              id='dateofbirth'
              name='date_of_birth'
              className='w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
            />
          </div>

          <div className='col-span-6'>
            <label htmlFor='Email' className='block text-sm font-medium text-gray-700'>
              Email
            </label>

            <input
              type='email'
              id='Email'
              name='email'
              className='w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
            />
          </div>

          <div className='col-span-6'>
            <label htmlFor='Contact' className='block text-sm font-medium text-gray-700'>
              Contact Number
            </label>

            <input
              type='text'
              id='contact'
              name='contact'
              className='w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
            />
          </div>

          <div className='col-span-6 sm:col-span-3'>
            <label htmlFor='Password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>

            <input
              type='password'
              id='Password'
              name='password'
              className='w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
            />
          </div>

          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor='PasswordConfirmation'
              className='block text-sm font-medium text-gray-700'
            >
              Password Confirmation
            </label>

            <input
              type='password'
              id='PasswordConfirmation'
              name='password_confirmation'
              className='w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm'
            />
          </div>

          <div className='col-span-6'>
            <p className='text-sm text-gray-500'>
              By creating an account, you agree to our{' '}
              <a href='#' className='text-gray-700 underline'>
                terms and conditions
              </a>{' '}
              and{' '}
              <a href='#' className='text-gray-700 underline'>
                privacy policy
              </a>
              .
            </p>
          </div>

          <div className='col-span-6 sm:flex sm:items-center sm:gap-4'>
            <button
              type='submit'
              onSubmit={onSubmit}
              onClick={onSubmit}
              className='inline-block px-12 py-3 text-sm font-medium text-white transition bg-blue-600 border border-blue-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
            >
              Create an account
            </button>

            <p className='mt-4 text-sm text-gray-500 sm:mt-0'>
              Already have an account?{' '}
              <a href='#' onClick={changeTab} className='text-gray-700 underline'>
                Log in
              </a>
              .
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default RegisterForm;
