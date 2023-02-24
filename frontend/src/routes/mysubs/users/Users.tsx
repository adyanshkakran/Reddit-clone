import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Navbar from '../../../Components/Navbar';
import { UserT, SubGredditT } from '../../../types/types';
import User from './User';

function Users() {
  const token = localStorage.getItem('token_greddit') ?? sessionStorage.getItem('token_greddit');
  const params = useParams();
  const navigate = useNavigate();
  const [sub, setSub] = useState({} as SubGredditT);
  const [users, setUsers] = useState({ followers: [] as UserT[], bannedUsers: [] as UserT[] });

  React.useEffect(() => {
    const id = localStorage.getItem('id_greddit') ?? sessionStorage.getItem('id_greddit');
    if (!token || !id) {
      navigate('/');
    }
    axios
      .post(
        '/api/sub/checkSubOwner',
        { id, subId: params.id },
        {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
          navigate('/mysubs');
        } else {
          setSub(res.data);
        }
      });
  }, []);

  React.useEffect(() => {
    const id = localStorage.getItem('id_greddit') ?? sessionStorage.getItem('id_greddit');
    axios
      .post(
        '/api/sub/getFollowersAndBlocked',
        { id, subId: params.id },
        {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
          navigate('/mysubs');
        } else {
          setUsers(res.data);
        }
      });
  }, []);

  return (
    <>
      <Navbar onSubReddits={true} />
      <div className='mx-6 mt-12 md:mx-80'>
        <div className='mb-4 text-2xl'>
          Followers of <div className='inline font-bold '>g/</div>
          {sub.name}
        </div>

        <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
          <>
            {users.followers.map((follower) => (
              <User key={follower._id} user={follower} />
            ))}
          </>
        </ul>

        {users.bannedUsers.length == 0 ? (
          <div className='w-full text-xl text-gray-500'>No blocked users yet</div>
        ) : (
          <>
            <div className='mt-12 mb-4 text-2xl'>
              Blocked Users of <div className='inline font-bold '>g/</div>
              {sub.name}
            </div>

            <ul className='max-w-lg divide-y divide-gray-200 dark:divide-gray-700'>
              <>
                {users.bannedUsers.map((ban) => (
                  <User key={ban._id} user={ban} />
                ))}
              </>
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default Users;
