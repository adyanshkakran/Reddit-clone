import React from 'react';
import { UserT } from '../types/types';

type Props = {
  comment: {
    content: string;
    commentedBy: UserT;
  };
};

function Comment(props: Props) {
  return (
    <div className='mx-6 mb-2'>
      <img
        src={props.comment.commentedBy.picture}
        alt={props.comment.commentedBy.username}
        className='inline w-16 rounded-full'
      />
      <div className='inline'>
        <p className='inline ml-2 font-bold'>{`${props.comment.commentedBy.Fname} ${props.comment.commentedBy.Lname}`}</p>
        <p className='inline text-gray-400'> - {props.comment.content}</p>
      </div>
    </div>
  );
}

export default Comment;
