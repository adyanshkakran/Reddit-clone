import React from 'react';
import Navbar from '../../Components/Navbar';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { UserT, PostT } from '../../types/types';
import SavedPost from './SavedPost';

function SavedPosts() {
  const token = localStorage.getItem('token_greddit') ?? sessionStorage.getItem('token_greddit');
  const id = localStorage.getItem('id_greddit') ?? sessionStorage.getItem('id_greddit');
  const navigate = useNavigate();
  const [user, setUser] = React.useState({} as UserT);
  const [savedPosts, setSavedPosts] = React.useState([] as PostT[]);

  React.useEffect(() => {
    if (!token) {
      navigate('/');
    }
    updateUser();
  }, []);

  React.useEffect(() => {
    if (!token) {
      navigate('/');
    }
    updatePosts();
  }, []);

  function updateUser() {
    axios
      .post(
        '/api/user/getUser',
        { id },
        {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else {
          setUser(res.data);
        }
      });
  }

  function updatePosts() {
    axios
      .get('/api/user/getSavedPosts/' + id, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else {
          console.log(res.data);
          setSavedPosts(res.data);
        }
      });
  }

  function getKeywords(subId: string) {
    let keywords: string[] = [];
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
        if (res.status == 201) alert(res.data);
        else keywords = res.data.bannedKeywords;
      });
    return keywords;
  }

  return (
    <>
      <Navbar onSubReddits={false} />
      {savedPosts.length == 0 ? (
        <div className='w-full my-12 text-2xl text-center'>No saved posts yet</div>
      ) : (
        <>
          <div className='my-12 text-3xl text-center'>
            Saved Posts of {`${user.Fname} ${user.Lname}`}
          </div>
          <br />
          {savedPosts.map((post) => (
            <div key={post._id} className='mb-6'>
              <SavedPost
                post={post}
                user={user}
                updatePosts={updatePosts}
                updateUser={updateUser}
                bannedKeywords={getKeywords(post.greddit)}
              />
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default SavedPosts;
