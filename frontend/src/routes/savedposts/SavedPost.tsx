import React from 'react';
import { UserT, PostT } from '../../types/types';
import Comment from '../../Components/Comment';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

type Props = {
  post: PostT;
  user: UserT;
  bannedKeywords: string[];
  updatePosts: () => void;
  updateUser: () => void;
};

function SavedPost(props: Props) {
  const token = localStorage.getItem('token_greddit') ?? sessionStorage.getItem('token_greddit');
  const id = localStorage.getItem('id_greddit') ?? sessionStorage.getItem('id_greddit');
  const [showComments, setShowComments] = React.useState(false);

  function addComment() {
    const content = (document.getElementById('comment') as HTMLInputElement)?.value;
    axios
      .post(
        '/api/post/comment',
        { postId: props.post._id, id, content },
        {
          headers: {
            'Content-Type': 'application/json',

            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else {
          props.updatePosts();
        }
      });
    (document.getElementById('comment') as HTMLInputElement).value = '';
  }

  function upvote() {
    axios
      .post(
        '/api/post/upvote',
        { postId: props.post._id, id },
        {
          headers: {
            'Content-Type': 'application/json',

            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else {
          props.updatePosts();
        }
      });
  }
  function downvote() {
    axios
      .post(
        '/api/post/downvote',
        { postId: props.post._id, id },
        {
          headers: {
            'Content-Type': 'application/json',

            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else {
          props.updatePosts();
        }
      });
  }

  function save(saveOrNot: boolean) {
    axios
      .post(
        '/api/post/save',
        { postId: props.post._id, id, saveOrNot },
        {
          headers: {
            'Content-Type': 'application/json',

            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else {
          props.updatePosts();
        }
      });
  }

  function follow(followOrNot: boolean) {
    axios
      .post(
        '/api/user/follow',
        {
          id: (props.post.postedBy as UserT)._id,
          followerId: id,
          followOrNot,
        },
        {
          headers: {
            'Content-Type': 'application/json',

            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else {
          props.updateUser();
        }
      });
  }

  function filterContent(content: string) {
    const bannedRegex = new RegExp(props.bannedKeywords.join('|'), 'i');
    const filteredContent = [];
    const words = content.split(' ');
    for (const word of words) {
      const filteredWord = word.replace(bannedRegex, (match) => '*'.repeat(match.length));
      filteredContent.push(filteredWord);
    }
    return filteredContent.join(' ');
  }

  return (
    <>
      <article className='mx-6 bg-white border-2 border-gray-100 rounded-xl md:mx-80'>
        <div className='flex items-start p-6'>
          <a href='#' className='block shrink-0'>
            <img
              alt='Speaker'
              src={(props.post.postedBy as UserT).picture}
              className='object-cover rounded-lg h-14 w-14'
            />
          </a>

          <div className='w-full ml-4'>
            <div className='flex items-start justify-between'>
              <div>
                <div className='font-medium sm:text-lg'>{filterContent(props.post.title)}</div>

                <p className='text-sm text-gray-700 line-clamp-2'>
                  {filterContent(props.post.content)}
                </p>
              </div>
            </div>

            <div className='mt-2 sm:flex sm:items-center sm:gap-2'>
              <div
                className='flex items-center text-gray-500 cursor-pointer'
                onClick={() => setShowComments((prev) => !prev)}
              >
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
                    d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'
                  />
                </svg>
                <p className='ml-1 text-xs hover:underline'>
                  {props.post.comments.length} comments
                </p>
              </div>

              <span className='hidden sm:block' aria-hidden='true'>
                &middot;
              </span>

              <div className='text-xs text-gray-500'>
                Posted by{' '}
                {props.user._id == (props.post.postedBy as UserT)._id ? (
                  <button className='hover:underline'>You</button>
                ) : (props.post.postedBy as UserT)._id == '63f73f533f851bc154c33ea9' ? (
                  <button className='pointer-events-none hover:underline'>Blocked User</button>
                ) : props.user.following.includes((props.post.postedBy as UserT)._id) ? (
                  <button className='hover:underline' onClick={() => follow(false)}>
                    {(props.post.postedBy as UserT).Fname} (Click to Unfollow)
                  </button>
                ) : (
                  <button className='hover:underline' onClick={() => follow(true)}>
                    {(props.post.postedBy as UserT).Fname} (Click to Follow)
                  </button>
                )}
              </div>

              <span className='hidden sm:block' aria-hidden='true'>
                &middot;
              </span>

              {props.post.upvotes.includes(
                localStorage.getItem('id_greddit') ??
                  (sessionStorage.getItem('id_greddit') as string),
              ) ? (
                <button className='px-2 bg-green-500 rounded' onClick={upvote}>
                  <strong>
                    <strong>&uarr;</strong>
                  </strong>
                </button>
              ) : (
                <button className='px-2 bg-green-300 rounded' onClick={upvote}>
                  &uarr;
                </button>
              )}
              <p className='text-xs'>{props.post.upvotes.length}</p>

              <span className='hidden sm:block' aria-hidden='true'>
                &middot;
              </span>

              {props.post.downvotes.includes(
                localStorage.getItem('id_greddit') ??
                  (sessionStorage.getItem('id_greddit') as string),
              ) ? (
                <button className='px-2 bg-red-500 rounded' onClick={downvote}>
                  <strong>
                    <strong>&darr;</strong>
                  </strong>
                </button>
              ) : (
                <button className='px-2 bg-red-300 rounded' onClick={downvote}>
                  &darr;
                </button>
              )}
              <p className='text-xs'>{props.post.downvotes.length}</p>

              <button
                className='px-4 py-2 ml-auto font-bold text-gray-700 rounded hover:bg-lime-500 bg-lime-400'
                onClick={() => save(false)}
              >
                Unsave Post
              </button>
            </div>
          </div>
        </div>
        {showComments && (
          <>
            {props.post.comments.map((comment) => (
              <Comment key={uuidv4()} comment={comment} />
            ))}
            <div className='mx-6 mb-6'>
              <input
                type='text'
                className='w-1/2 mr-6 border border-gray-300 rounded'
                placeholder='Comment Here'
                name='comment'
                id='comment'
              ></input>
              <button
                onClick={addComment}
                className='px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600'
              >
                Add Comment
              </button>
            </div>
          </>
        )}
      </article>
    </>
  );
}

export default SavedPost;
