import React from 'react';
import { UserT } from '../../../types/types';

type Props = {
  user: UserT;
};

function User(props: Props) {
  return (
    <li className='pb-3 sm:pb-4'>
      <div className='flex items-center space-x-4'>
        <div className='flex-shrink-0'>
          <img
            className='w-8 h-8 rounded-full'
            src={props.user.picture ? props.user.picture : 'https://i.imgur.com/6VBx3io.png'}
            alt='image'
          ></img>
        </div>
        <div className='flex-1 min-w-0'>
          <p className='text-sm font-medium text-gray-900 truncate md:text-lg dark:text-white'>
            {`${props.user.Fname} ${props.user.Lname}`}
          </p>
          <p className='text-sm text-gray-500 truncate md:text-lg dark:text-gray-400'>
            {props.user.email}
          </p>
        </div>
      </div>
    </li>
  );
}

export default User;