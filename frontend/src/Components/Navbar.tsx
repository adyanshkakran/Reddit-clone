import React from 'react';
import { useNavigate } from 'react-router';

type Props = {
  onSubReddits: boolean;
};

function Navbar(props: Props) {
  const navigate = useNavigate();
  return (
    <header aria-label='Site Header' className='shadow-md'>
      <div className='flex h-16 max-w-screen items-center justify-between px-4'>
        <div className='flex w-0 flex-1 lg:hidden'>
          <button className='rounded-full bg-gray-100 p-2 text-gray-600' type='button'>
            Sign out
          </button>
        </div>

        <a href='' className='text-black text-xl'>
          Greddit
        </a>
        <nav
          aria-label='Site Nav'
          className='hidden items-center justify-center gap-8 text-sm font-medium lg:flex lg:w-0 lg:flex-1'
        >
          <a
            className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
            href=''
          >
            Home
          </a>
          <a
            className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
            href=''
          >
            Profile
          </a>
          <a
            className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
            href=''
          >
            My Sub-Greddits
          </a>
          {props.onSubReddits && (
            <>
              <a
                className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100 px-4'
                href=''
              >
                Users
              </a>
              <a
                className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
                href=''
              >
                Join Requests
              </a>
              <a
                className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100 px-4'
                href=''
              >
                Statistics
              </a>
              <a
                className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
                href=''
              >
                Reported
              </a>
            </>
          )}
        </nav>

        <div className='hidden items-center gap-4 lg:flex'>
          <button
            onClick={() => {
              localStorage.removeItem('token_greddit');
              navigate('/?login=true');
            }}
            className='rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white'
          >
            Sign out
          </button>
        </div>
      </div>

      <div className='border-t border-gray-100 lg:hidden'>
        <nav className='flex items-center justify-center flex-wrap overflow-x-auto p-4 text-sm font-medium'>
          <a
            className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100 pr-4'
            href=''
          >
            Home
          </a>
          <a
            className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100 p-1'
            href=''
          >
            Profile
          </a>
          <a
            className='pl-4 text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
            href=''
          >
            My Sub-Greddits
          </a>
          {props.onSubReddits && (
            <>
              <a
                className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100 px-4'
                href=''
              >
                Users
              </a>
              <a
                className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
                href=''
              >
                Join Requests
              </a>
              <a
                className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100 px-4'
                href=''
              >
                Statistics
              </a>
              <a
                className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
                href=''
              >
                Reported
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
