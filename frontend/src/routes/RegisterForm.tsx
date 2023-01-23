type Props = {
  setLogin: (login: boolean) => void;
};

function RegisterForm(props: Props) {
  function submitForm(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('register-form') as HTMLFormElement);
    console.log(formData);
  }
  function changeTab(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    props.setLogin(true);
  }
  return (
    <form id="register-form" className='mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl'>
      <div className='w-[114%]' style={{ translate: '-6% 0' }}>
        <button className='bg-indigo-300 w-1/2 p-2 mb-2 text-white rounded-tl' onClick={changeTab}>
          Login
        </button>
        <button className='bg-indigo-600 w-1/2 p-2 mb-2 text-white rounded-tr'>Register</button>
      </div>

      <div className='columns-2'>
        <div>
          <label htmlFor='first-name' className='text-sm font-medium'>
            First Name
          </label>

          <input
            type='text'
            id='first-name'
            className='w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm'
            placeholder='Enter First Name'
          />
        </div>
        <div>
          <label htmlFor='last-name' className='text-sm font-medium'>
            Last Name
          </label>

          <input
            type='text'
            id='last-name'
            className='w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm'
            placeholder='Enter Last Name'
          />
        </div>
      </div>

      <div>
        <label htmlFor='email' className='text-sm font-medium'>
          Email
        </label>

        <div className='relative mt-1'>
          <input
            type='email'
            id='email'
            className='w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm'
            placeholder='Enter email'
          />

          <span className='absolute inset-y-0 right-4 inline-flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label htmlFor='username' className='text-sm font-medium'>
          Username
        </label>

        <input
          type='text'
          id='username'
          className='w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm'
          placeholder='Enter Username'
        />
      </div>

      <div>
        <label htmlFor='contact-number' className='text-sm font-medium'>
          Contact Number
        </label>

        <input
          type='text'
          id='contact-number'
          className='w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm'
          placeholder='Enter Contact Number (With Country Code)'
        />
      </div>
      <div className='columns-2'>
        <div>
          <label htmlFor='password' className='text-sm font-medium'>
            Password
          </label>

          <div className='relative mt-1'>
            <input
              type='password'
              id='password'
              className='w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm'
              placeholder='Enter password'
            />

            <span className='absolute inset-y-0 right-4 inline-flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor='confirm-password' className='text-sm font-medium'>
            Confirm Password
          </label>

          <div className='relative mt-1'>
            <input
              type='password'
              id='confirm-password'
              className='w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm'
              placeholder='Enter password again'
            />

            <span className='absolute inset-y-0 right-4 inline-flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div>
        <p className='text-sm text-gray-500'>
          By creating an account, you agree to our&nbsp;
          <a href='#' className='text-gray-700 underline'>
            terms and conditions
          </a>
          &nbsp;and&nbsp;
          <a href='#' className='text-gray-700 underline'>
            privacy policy
          </a>
          .
        </p>
      </div>

      <button
        type='submit'
        className='block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white'
        onClick={submitForm}
      >
        Create Account
      </button>
    </form>
  );
}

export default RegisterForm;
