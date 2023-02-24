import React from 'react';
import { useParams, useNavigate } from 'react-router';
import Navbar from '../../../Components/Navbar';
import axios from 'axios';
import { UserT, SubGredditT, PostT } from '../../../types/types';
import Post from './Post';
import CreatePost from './CreatePost';
import CreateReport from './CreateReport';

function SubPost() {
  const { subId } = useParams();
  const token = localStorage.getItem('token_greddit') ?? sessionStorage.getItem('token_greddit');
  const navigate = useNavigate();
  const [user, setUser] = React.useState<UserT>({} as UserT);
  const [sub, setSub] = React.useState<SubGredditT>({} as SubGredditT);
  const [createPost, setCreatePost] = React.useState(false);
  const [posts, setPosts] = React.useState<PostT[]>([]);
  const [reportForm, setReportForm] = React.useState<PostT>({} as PostT);

  React.useEffect(() => {
    if (!token) {
      navigate('/');
    }
    updateUser();
  }, []);

  React.useEffect(() => {
    axios
      .post(
        '/api/sub/getSub',
        { subId },
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
          setSub(res.data);
          updatePosts();
        }
      });
  }, []);

  function updateUser() {
    const id = localStorage.getItem('id_greddit') ?? sessionStorage.getItem('id_greddit');

    axios
      .post(
        '/api/user/getUser',
        { id },
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
          navigate('/');
        } else {
          console.log(res.data);
          setUser(res.data);
        }
      });
  }

  function updatePosts() {
    axios
      .get(`/api/post/getPostsBySub/${subId}`, {
        headers: {
          'Content-Type': 'application/json',
          
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else {
          setPosts(res.data);
        }
      });
  }

  return (
    <>
    {JSON.stringify(reportForm).length != 2 && <CreateReport close={setReportForm} post={reportForm}/>}
      {createPost && (
        <CreatePost
          close={setCreatePost}
          updatePosts={updatePosts}
          subId={subId as string}
          bannedKeywords={sub.bannedKeywords}
        />
      )}
      <Navbar onSubReddits={false} />
      <div className='flex flex-col items-center justify-center my-12 ml-3 hero md:ml-64 md:flex-row'>
        <img
          className='inline w-32 h-32 mr-8 bg-black rounded-full hover:opacity-60'
          src={sub.picture}
        ></img>
        <div className='flex flex-col items-center flex-1 pt-12 mb-6 md:mb-0 md:block'>
          <div className='inline mb-6 text-2xl text-gray-800 md:mb-0'>
            <div className='inline font-bold'>g/</div>
            {sub.name}
          </div>
          <div className='text-sm text-gray-600'>{sub.description}</div>
        </div>
        {sub.followers?.includes(user._id) && (
          <button
            className='inline px-6 py-2 mr-48 font-bold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600'
            onClick={() => setCreatePost(true)}
          >
            Create New Post
          </button>
        )}
      </div>
      {posts.map((post) => (
        <div key={post._id} className='mb-6'>
          <Post
            post={post}
            user={user}
            updatePosts={updatePosts}
            updateUser={updateUser}
            bannedKeywords={sub.bannedKeywords}
            setReportForm={setReportForm}
          />
        </div>
      ))}
    </>
  );
}

export default SubPost;
