import { SubGredditT, UserT } from '../../types/types';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useForceUpdate from '../../Hooks/useForceUpdate';

type Props = {
  sub: SubGredditT;
  user: UserT;
  leaveSub: (id: string) => void;
};

function subGreddit(props: Props) {
  const token = localStorage.getItem('token_greddit') ?? sessionStorage.getItem('token_greddit');
  const forceUpdate = useForceUpdate();

  function sendRequest(e: React.MouseEvent<HTMLButtonElement>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    e.target.disabled = true;
    axios
      .post(
        '/api/sub/sendRequest',
        { subId: props.sub._id, id: props.user._id },
        {
          headers: {
            'Content-Type': 'application/json',
            
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        alert(res.data);
      });
    forceUpdate();
  }

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

            {props.user.greddits.includes(props.sub._id) ? (
              <button
                type='button'
                className='absolute bottom-0 right-0 px-4 py-2 font-semibold text-white bg-blue-400 rounded'
                disabled={true}
              >
                Moderator
              </button>
            ) : props.sub.bannedUsers.includes(props.user._id) ? (
              <button
                type='button'
                className='absolute bottom-0 right-0 px-4 py-2 font-semibold text-white bg-red-400 rounded'
                disabled={true}
              >
                Blocked
              </button>
            ) :
             props.sub.followers.includes(props.user._id) ? (
              <LeaveButton sub={props.sub} user={props.user} leaveSub={props.leaveSub} />
            ) : props.sub.joinRequests.includes(props.user._id) ? (
              <button
                type='button'
                disabled={true}
                className='absolute bottom-0 right-0 px-4 py-2 font-semibold text-white bg-blue-400 rounded'
              >
                Pending Request
              </button>
            ) : (
              <button
                type='button'
                className='absolute bottom-0 right-0 px-4 py-2 font-semibold text-white bg-blue-600 rounded'
                onClick={sendRequest}
              >
                Send Join Request
              </button>
            )}
            <h3 className='mt-4 text-lg sm:text-xl'>
              <Link to={`/home/${props.sub._id}`} className='hover:underline'>
                <p className='inline font-bold'>g/</p>
                {props.sub.name}
              </Link>
            </h3>

            <p className='mt-1 text-sm text-gray-700'>{props.sub.description}</p>

            <div className='mt-4 flex sm:items-center gap-2 flex-wrap'>
              {props.sub.tags.map((tag) => {
                return (
                  <p key={uuidv4()} className='px-4 py-2 mt-2 text-sm bg-green-400 rounded sm:mt-0'>
                    {tag}
                  </p>
                );
              })}
            </div>
            <div className='mt-4 flex sm:items-center gap-2 flex-wrap'>
              {props.sub.bannedKeywords.map((keyword) => {
                return (
                  <p key={uuidv4()} className='px-4 py-2 mt-2 text-sm bg-red-400 rounded sm:mt-0'>
                    {keyword}
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

function LeaveButton(props: Props) {
  const [leave, setLeave] = React.useState(false);
  return leave ? (
    <button
      type='button'
      className='absolute bottom-0 right-0 px-4 py-2 font-semibold text-white bg-red-600 rounded'
      onClick={() => props.leaveSub(props.sub._id)}
    >
      ARE YOU SURE?
    </button>
  ) : (
    <button
      type='button'
      className='absolute bottom-0 right-0 px-4 py-2 font-semibold text-white bg-red-600 rounded'
      onClick={() => setLeave(true)}
    >
      Leave
    </button>
  );
}

export default subGreddit;
