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

  function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
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
      .post('https://reddit-clone-backend.onrender.com/api/login', formData, {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem('token_greddit', res.data.token);
          navigate('/profile');
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
        <div className='relative -mt-16 block lg:hidden'>
          <h1 className='mt-12 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl'>
            Welcome to Greddit!
          </h1>

          <p className='mt-4 leading-relaxed text-gray-500'>
            A place where you can connect with people and share your thoughts, memes and everything
            in between.
          </p>
        </div>

        <form id='login' className='mt-8 grid grid-cols-6 gap-6'>
          <div className='col-span-6'>
            <label htmlFor='Email' className='block text-sm font-medium text-gray-700'>
              Email
            </label>

            {/* REMEMBER TO CHANGE THIS TO EMAIL */}
            <input
              type='text'
              id='Email'
              name='email'
              className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm'
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
              className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm'
            />
          </div>

          <p id='all-fields' className='hidden col-span-6 text-red-700 text-sm'>
            Fill all fields of the form
          </p>

          <div className='col-span-6 sm:flex sm:items-center sm:gap-4'>
            <button
              type='submit'
              onSubmit={onSubmit}
              onClick={onSubmit}
              className='block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
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
