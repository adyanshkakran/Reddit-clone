import { SubGredditT } from '../../types/types';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

type Props = {
  sub: SubGredditT;
  deleteSub: (id: string) => void;
};

function subGreddit(props: Props) {
  const [del, setDel] = React.useState(false);

  return (
    <>
      <article className='p-6 mx-12 my-12 bg-white xl:mx-96 rounded-xl ring ring-indigo-50 sm:p-8'>
        <div className='flex items-start'>
          <img
            className='hidden sm:block sm:h-20 sm:w-20 sm:rounded-full'
            aria-hidden='true'
            src={props.sub.picture}
            alt={props.sub.picture}
          ></img>

          <div className='relative w-full sm:ml-8'>
            <div className='absolute top-0 right-0 font-light'>
              {props.sub.followers.length}{' '}
              {props.sub.followers.length == 1 ? 'Follower\n' : 'Followers\n'}
              <br />
              {props.sub.posts.length} {props.sub.posts.length == 1 ? 'Post' : 'Posts'}
            </div>

            {
              del ?
              <button
                type='button'
                className='absolute bottom-0 right-0 px-4 py-2 font-semibold text-white bg-red-600 rounded'
                onClick={() => props.deleteSub(props.sub._id)}
              >
                ARE YOU SURE?
              </button> :
              <button
                type='button'
                className='absolute bottom-0 right-0 px-4 py-2 font-semibold text-white bg-red-600 rounded'
                onClick={() => setDel(true)}
              >
                Delete
              </button>
            }
            <h3 className='mt-4 text-lg sm:text-xl'>
              <Link to={`/mysubs/${props.sub._id}/users`} className='hover:underline'>
                <p className='inline font-bold'>g/</p>
                {props.sub.name}
              </Link>
            </h3>

            <p className='mt-1 text-sm text-gray-700'>{props.sub.description}</p>

            <div className='mt-4 sm:flex sm:items-center sm:gap-2'>
              {props.sub.tags.map((tag) => {
                return (
                  <p
                    key={uuidv4()}
                    className='px-4 py-2 mt-2 text-sm bg-green-400 rounded sm:mt-0'
                  >
                    { tag }
                  </p>
                );
              })}
            </div>
            <div className='mt-4 sm:flex sm:items-center sm:gap-2'>
              {props.sub.bannedKeywords.map((keyword) => {
                return (
                  <p
                    key={uuidv4()}
                    className='px-4 py-2 mt-2 text-sm bg-red-400 rounded sm:mt-0'
                  >
                    { keyword }
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default subGreddit;
