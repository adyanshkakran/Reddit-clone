import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setLogin: any;
};

function LoginForm(props: Props) {
  const navigate = useNavigate();

  function changeTab(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    props.setLogin('false');
  }

  function showError(error: string) {
    const p = document.getElementById('all-fields');
    if (p) {
      p.classList.remove('hidden');
      p.innerHTML = error;
    }
  }

  function onSubmit(event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = document.querySelector('#login');
    const formData = new FormData(data as HTMLFormElement);
    for (const data of formData.values()) {
      if (!data) {
        showError('Fill all fields of the form');
        return;
      }
    }
    document.getElementById('all-fields')?.classList.add('hidden');

    axios
      .post('/api/login', formData, {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
      .then((res) => {
        if (res.status == 200) {
          if (formData.get('keep_me_logged_in')) {
            localStorage.setItem('token_greddit', res.data.token);
            localStorage.setItem('id_greddit', res.data.id);
            sessionStorage.removeItem('token_greddit');
            sessionStorage.removeItem('id_greddit');
          } else {
            sessionStorage.setItem('token_greddit', res.data.token);
            sessionStorage.setItem('id_greddit', res.data.id);
            localStorage.removeItem('token_greddit');
            localStorage.removeItem('id_greddit');
          }
          navigate('/home');
        } else if (res.status == 201) {
          showError(res.data);
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
          <h1 className='mt-12 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl'>
            Welcome to Greddit!
          </h1>

          <p className='mt-4 leading-relaxed text-gray-500'>
            A place where you can connect with people and share your thoughts, memes and everything
            in between.
          </p>
        </div>

        <form id='login' className='grid grid-cols-6 gap-6 mt-8' onSubmit={onSubmit}>
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

          <div className='col-span-6 sm:flex sm:items-center sm:gap-4'>
            <input
              type='checkbox'
              className='mr-3 border-gray-300 rounded'
              name='keep_me_logged_in'
            />
            <p className='inline text-sm text-gray-700'>Keep me Logged in</p>
          </div>

          <p id='all-fields' className='hidden col-span-6 text-sm text-red-700'>
            Fill all fields of the form
          </p>

          <div className='col-span-6 sm:flex sm:items-center sm:gap-4'>
            <button
              type='submit'
              onClick={onSubmit}
              className='block px-12 py-3 text-sm font-medium text-white transition bg-blue-600 border border-blue-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
            >
              Log in
            </button>

            <p className='mt-4 text-sm text-gray-500 sm:mt-0'>
              No account?{' '}
              <a href='#' onClick={changeTab} className='text-gray-700 underline'>
                Sign up
              </a>
              .
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginForm;
