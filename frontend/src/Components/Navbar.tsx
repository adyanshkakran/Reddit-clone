import React from 'react';
import { useNavigate } from 'react-router';
import useKeyPress from '../Hooks/useKeyPress';

type Props = {
  onSubReddits: boolean;
};

function Navbar(props: Props) {
  const navigate = useNavigate();
  useKeyPress(['u', 'j', 's', 'r'], keyPressed);

  function keyPressed(key: string) {
    if(!props.onSubReddits) return;
    if (key === 'u') {
      navigate('./../users');
    } else if (key === 'j') {
      navigate('./../requests');
    } else if (key === 's') {
      navigate('./../stats');
    } else if (key === 'r') {
      navigate('./../reports');
    }
  }
  return (
    <header aria-label='Site Header' className='shadow-md'>
      <div className='flex items-center justify-between h-16 px-4 max-w-screen'>
        <div className='flex flex-1 w-0 lg:hidden'>
          <button
            className='px-5 py-2 text-sm font-medium text-white transition-colors bg-indigo-600 border border-indigo-600 rounded-lg group hover:bg-transparent focus:outline-none focus:ring'
            type='button'
          >
            Sign out
          </button>
        </div>

        <a href='' className='text-xl text-black'>
          Greddit
        </a>
        <nav
          aria-label='Site Nav'
          className='items-center justify-center hidden gap-8 text-sm font-medium lg:flex lg:w-0 lg:flex-1'
        >
          <a
            className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
            href='/home'
          >
            Home
          </a>
          <a
            className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
            href='/mysubs'
          >
            My Sub-Greddits
          </a>
          <a
            className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
            href='/profile'
          >
            Profile
          </a>
          <a
            className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
            href='/saved'
          >
            Saved Posts
          </a>
          {props.onSubReddits && (
            <>
              <a
                className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-3/5 before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100 px-4'
                href='users'
              >
                Users
              </a>
              <a
                className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
                href='requests'
              >
                Join Requests
              </a>
              <a
                className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-3/4 before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100 px-4'
                href='stats'
              >
                Statistics
              </a>
              <a
                className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
                href='reports'
              >
                Reported
              </a>
            </>
          )}
        </nav>

        <div className='items-center hidden gap-4 lg:flex'>
          <button
            onClick={() => {
              localStorage.removeItem('token_greddit');
              navigate('/?login=true');
            }}
            className='px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700'
          >
            Sign out
          </button>
        </div>
      </div>

      <div className='border-t border-gray-100 lg:hidden'>
        <nav className='flex flex-wrap items-center justify-center p-4 overflow-x-auto text-sm font-medium'>
          <a
            className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100 pr-4'
            href='/home'
          >
            Home
          </a>
          <a
            className='pl-4 text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
            href='/mysubs'
          >
            My Sub-Greddits
          </a>
          <a
            className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100 p-1'
            href='/profile'
          >
            Profile
          </a>
          <a
            className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
            href='/saved'
          >
            Saved Posts
          </a>
          {props.onSubReddits && (
            <>
              <a
                className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100 px-4'
                href='users'
              >
                Users
              </a>
              <a
                className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
                href='requests'
              >
                Join Requests
              </a>
              <a
                className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100 px-4'
                href='stats'
              >
                Statistics
              </a>
              <a
                className='text-gray-900 relative before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-600 before:transition hover:before:scale-100'
                href='reports'
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
