import Navbar from '../../Components/Navbar';
import Icon from '../../assets/user-icon.jpg';
import Loading from '../../Components/Loading';
import React from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Profile() {
  const [editable, setEditable] = React.useState(false);
  const [followers, setFollowers] = React.useState(false);
  const [following, setFollowing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token_greddit');
    if (!token) {
      navigate('/');
    }
    axios
      .post(
        'http://localhost:3000/api/checkLogin',
        { token },
        {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        },
      )
      .then((res) => {
        if (res.status == 201) {
          navigate('/');
        } else {
          setLoading(false);
        }
      })
      .catch((err) => console.log('err' + err));
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar onSubReddits={false} />
          <div className='hero mx-16 md:mx-64 my-12 flex items-center justify-center flex-col md:flex-row'>
            <img
              className='mr-8 h-32 w-32 rounded-full bg-black hover:opacity-60 inline'
              src={Icon}
            ></img>
            <div className='flex-1 pt-12 mb-6 md:mb-0'>
              <p className='text-2xl text-gray-800 inline'>My Profile</p>
              <p className='text-sm text-gray-600'>Update your photo and personal details</p>
            </div>
            {editable ? (
              <>
                <button
                  className='bg-white  text-gray-700 font-bold py-2 px-6 rounded-lg inline mr-4 shadow-lg mb-4 md:mb-0'
                  onClick={() => setEditable(false)}
                >
                  Cancel
                </button>
                <button
                  className='bg-gray-700  text-white font-bold py-2 px-6 rounded-lg inline'
                  onClick={() => setEditable(false)}
                >
                  Save
                </button>
              </>
            ) : (
              <button
                className='bg-gray-700  text-white font-bold py-2 px-6 rounded-lg inline'
                onClick={() => setEditable(true)}
              >
                Edit
              </button>
            )}
          </div>
          <br />
          <div className='flex'>
            <div>
              <div className='mx-16 md:mx-64'>
                <p className='text-gray-700 text-2xl inline mr-6'>Username</p>
                <input
                  type='text'
                  disabled={!editable}
                  className='rounded-lg border-gray-500 border-opacity-50 w-full disabled:bg-white disabled:border-none disabled:text-xl disabled:w-full'
                  defaultValue='adyanshk'
                />
              </div>
              <br />
              <div className='mx-16 md:mx-64'>
                <p className='text-gray-700 text-2xl inline mr-6'>First Name</p>
                <input
                  type='text'
                  disabled={!editable}
                  className='rounded-lg border-gray-500 border-opacity-50 w-full disabled:bg-white disabled:border-none disabled:text-xl disabled:w-full'
                  defaultValue='Adyansh'
                />
              </div>
              <br />
              <div className='mx-16 md:mx-64'>
                <p className='text-gray-700 text-2xl inline mr-6'>Last Name</p>
                <input
                  type='text'
                  disabled={!editable}
                  className='rounded-lg border-gray-500 border-opacity-50 w-full disabled:bg-white disabled:border-none disabled:text-xl disabled:w-full'
                  defaultValue='Kakran'
                />
              </div>
              <br />
              <div className='mx-16 md:mx-64'>
                <p className='text-gray-700 text-2xl inline mr-6'>Email</p>
                <input
                  type='text'
                  disabled={!editable}
                  className='rounded-lg border-gray-500 border-opacity-50 w-full disabled:bg-white disabled:border-none disabled:text-xl disabled:w-full'
                  defaultValue='adyanshkakran@gmail.com'
                />
              </div>
              <br />
              <div className='mx-16 md:mx-64'>
                <p className='text-gray-700 text-2xl inline mr-6'>Contact Number</p>
                <input
                  type='text'
                  disabled={!editable}
                  className='rounded-lg border-gray-500 border-opacity-50 w-full disabled:bg-white disabled:border-none disabled:text-xl disabled:w-full'
                  defaultValue='8218515487'
                />
              </div>
              <br />
              <div className='mx-16 md:mx-64'>
                <p className='text-gray-700 text-2xl inline mr-6'>Date of Birth</p>
                <input
                  type='date'
                  disabled={!editable}
                  className='rounded-lg border-gray-500 border-opacity-50 w-full disabled:bg-white disabled:border-none disabled:text-xl disabled:w-full'
                  defaultValue='2003-09-02'
                />
              </div>
              <br />
              <br />
              <p className='mx-16 md:mx-64 text-sm text-gray-600'>
                If you want to change password, enter current and new password.
              </p>
              <br />
              <div className='mx-16 md:mx-64'>
                <p className='text-gray-700 text-2xl inline mr-6'>Current Password</p>
                <input
                  type='password'
                  disabled={!editable}
                  className='rounded-lg border-gray-500 border-opacity-50 w-full disabled:bg-white disabled:border-none disabled:text-xl disabled:w-full'
                  defaultValue=''
                />
              </div>
              <br />
              <div className='mx-16 md:mx-64'>
                <p className='text-gray-700 text-2xl inline mr-6'>New Password</p>
                <input
                  type='password'
                  disabled={!editable}
                  className='rounded-lg border-gray-500 border-opacity-50 w-full disabled:bg-white disabled:border-none disabled:text-xl disabled:w-full'
                  defaultValue=''
                />
              </div>
            </div>
            <div className='inline-flex h-10 rounded-md border bg-white mr-96'>
              <button
                onClick={() => {
                  setFollowers((prev) => !prev);
                }}
                className='rounded-l-md px-4 py-1 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-700'
              >
                Followers
              </button>

              <div className='relative'>
                <button
                  type='button'
                  onClick={() => {
                    setFollowers((prev) => !prev);
                  }}
                  className='inline-flex h-10 items-center justify-center rounded-r-md border-l border-gray-100 px-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700'
                >
                  <span className='sr-only'>Menu</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>

                {followers && (
                  <div
                    className='absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md border border-gray-100 bg-white shadow-lg'
                    role='menu'
                  >
                    <div className='p-2'>
                      <button
                        className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50'
                        role='menuitem'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                        Follower 1
                      </button>

                      <button
                        className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50'
                        role='menuitem'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                        Follower 2
                      </button>

                      <button
                        className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50'
                        role='menuitem'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                        Follower 3
                      </button>

                      <button
                        className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50'
                        role='menuitem'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                        Follower 4
                      </button>

                      <button
                        className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50'
                        role='menuitem'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                        Follower 5
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='inline-flex h-10 rounded-md border bg-white'>
              <button
                onClick={() => {
                  setFollowing((prev) => !prev);
                }}
                className='rounded-l-md px-4 py-1 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-700'
              >
                Following
              </button>

              <div className='relative'>
                <button
                  type='button'
                  onClick={() => {
                    setFollowing((prev) => !prev);
                  }}
                  className='inline-flex h-10 items-center justify-center rounded-r-md border-l border-gray-100 px-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700'
                >
                  <span className='sr-only'>Menu</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>

                {following && (
                  <div
                    className='absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md border border-gray-100 bg-white shadow-lg'
                    role='menu'
                  >
                    <div className='p-2'>
                      <button
                        className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50'
                        role='menuitem'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                        Follower 1
                      </button>

                      <button
                        className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50'
                        role='menuitem'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                        Follower 2
                      </button>

                      <button
                        className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50'
                        role='menuitem'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                        Follower 3
                      </button>

                      <button
                        className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50'
                        role='menuitem'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                        Follower 4
                      </button>

                      <button
                        className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50'
                        role='menuitem'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                        Follower 5
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
