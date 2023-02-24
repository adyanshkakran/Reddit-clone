import React from 'react';
import { UserT } from '../../../types/types';

type Props = {
  user: UserT;
  approveJoin: (userId: string) => void;
  denyJoin: (userId: string) => void;
};

function Request(props: Props) {
	function formattedDate(d: Date): string {
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
      .map((n) => (n < 10 ? `0${n}` : `${n}`))
      .join('-');
  }

  return (
    <tr>
      <td className='px-4 py-2 font-medium text-gray-900 whitespace-nowrap'>{`${props.user.Fname} ${props.user.Lname}`}</td>
      <td className='px-4 py-2 text-gray-700 whitespace-nowrap'>{formattedDate(new Date(props.user.date_of_birth))}</td>
      <td className='px-4 py-2 text-gray-700 whitespace-nowrap'>{props.user.email}</td>
      <td className='px-4 py-2 text-gray-700 whitespace-nowrap'>{props.user.contact}</td>
      <td className='px-4 py-2 whitespace-nowrap'>
        <button
          onClick={() => props.approveJoin(props.user._id)}
          className='inline-block px-4 py-2 mr-12 text-xs font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700'
        >
          Approve Request
        </button>
        <button
          onClick={() => props.denyJoin(props.user._id)}
          className='inline-block px-4 py-2 mr-12 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700'
        >
          Deny Request
        </button>
      </td>
    </tr>
  );
}

export default Request;