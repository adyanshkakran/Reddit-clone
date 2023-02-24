import React from 'react';

type Props = {
  name: string;
  id: string;
  removeFollow: (followerId: string) => void;
};

export default function FollowPerson(props: Props) {
  return (
    <button
      type='button'
      className='flex items-center justify-between w-1/2 px-2 py-2 text-sm font-medium text-gray-700 -translate-x-1 rounded-lg hover:bg-gray-100'
      role='menuitem'
      onClick={() => props.removeFollow(props.id)}
    >
      <p>{props.name}</p>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='w-4 h-4'
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
    </button>
  );
}
