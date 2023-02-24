import Navbar from '../../Components/Navbar';
import Loading from '../../Components/Loading';
import React from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import FollowPerson from './FollowPerson';
import { UserT } from '../../types/types';

function Profile() {
  const token = localStorage.getItem('token_greddit') ?? sessionStorage.getItem('token_greddit');
  const [editable, setEditable] = React.useState(false);
  const [showFollowers, setShowFollowers] = React.useState(false);
  const [showFollowing, setShowFollowing] = React.useState(false);
  const [follow, setFollow] = React.useState({
    followers: [] as UserT[],
    following: [] as UserT[],
  });
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState({} as UserT);
  const navigate = useNavigate();

  function formattedDate(d: Date): string {
    return [d.getFullYear(), d.getMonth() + 1, d.getDate()]
      .map((n) => (n < 10 ? `0${n}` : `${n}`))
      .join('-');
  }

  React.useEffect(() => {
    const id = localStorage.getItem('id_greddit') ?? sessionStorage.getItem('id_greddit');
    if (!token) {
      navigate('/');
    }
    axios
      .post(
        '/api/user/getUser',
        { id },
        {
          headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${token}` },
        },
      )
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else {
          setUser(res.data);
          setLoading(false);
        }
      });
  }, []);

  React.useEffect(() => {
    updateFollowers();
  }, [user]);

  function updateFollowers() {
    const id = localStorage.getItem('id_greddit') ?? sessionStorage.getItem('id_greddit') ?? '';
    axios
      .post(
        '/api/user/getFollow',
        { id },
        {
          headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${token}` },
        },
      )
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else {
          setFollow({ followers: res.data.followers, following: res.data.following });
        }
      });
  }

  function removeFollower(followerId: string) {
    const id = localStorage.getItem('id_greddit') ?? sessionStorage.getItem('id_greddit') ?? '';

    axios
      .post(
        '/api/user/removeFollower',
        { id, followerId },
        {
          headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${token}` },
        },
      )
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else {
          updateFollowers();
        }
      });
  }
  function removeFollow(followerId: string) {
    const id = localStorage.getItem('id_greddit') ?? sessionStorage.getItem('id_greddit') ?? '';
    axios
      .post('/api/user/follow', { id: followerId, followerId: id, followOrNot: false }, {
        headers: {'Content-Type' : 'application/json',  'Authorization': `Bearer ${token}`}
      })
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else {
          updateFollowers();
        }
      });
  }

  function handleSubmit() {
    const id = localStorage.getItem('id_greddit') ?? sessionStorage.getItem('id_greddit') ?? '';
    const data = document.querySelector('#profile');
    const formData = new FormData(data as HTMLFormElement);
    if (formData.get('password')) {
      if (!formData.get('new_password')) {
        alert('Please enter a new password');
        return;
      }
      axios
        .post(
          '/api/user/updatePassword',
          { id, password: formData.get('password'), newPassword: formData.get('new_password') },
          {
            headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${token}` },
          },
        )
        .then((res) => {
          alert(res.data);
        });
    }
    formData.append('id', id);
    formData.delete('password');
    formData.delete('new_password');
    axios
      .post('/api/user/updateUser', formData, {
        headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${token}` },
      })
      .then((res) => {
        alert(res.data);
        if (res.status == 200) setUser(formData as unknown as UserT);
        setEditable(false);
      });
  }

  function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const id = localStorage.getItem('id_greddit') ?? sessionStorage.getItem('id_greddit') ?? '';
    const file = e.target.files?.item(0);
    const data = new FormData();
    data.append('picture', file as Blob);
    data.append('id', id);
    console.log('Form data is ', data);
    axios
      .post('/api/user/updatePicture', data, {
        headers: { 'Content-Type': 'multipart/form-data',  'Authorization': `Bearer ${token}` },
      })
      .then((res) => {
        alert(res.data);
        if (res.status == 200)
          setUser((prev) => ({ ...prev, picture: data.get('picture') } as UserT));
      });
  }

  function cancelEdit() {
    (document.querySelector('input[name="username"]') as HTMLInputElement).value = user.username;
    (document.querySelector('input[name="Fname"]') as HTMLInputElement).value = user.Fname;
    (document.querySelector('input[name="Lname"]') as HTMLInputElement).value = user.Lname;
    (document.querySelector('input[name="email"]') as HTMLInputElement).value = user.email;
    (document.querySelector('input[name="contact"]') as HTMLInputElement).value = user.contact;
    (document.querySelector('input[name="date_of_birth"]') as HTMLInputElement).value =
      formattedDate(new Date(user.date_of_birth));
    setEditable(false);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar onSubReddits={false} />
          <div className='flex flex-col items-center justify-center my-12 ml-16 hero md:ml-64 md:flex-row'>
            <input
              type='file'
              accept='image/*'
              id='image-input'
              className='hidden'
              name='picture'
              onChange={uploadImage}
            ></input>
            <img
              className='inline w-32 h-32 mr-8 bg-black rounded-full cursor-pointer hover:opacity-60'
              src={user.picture}
              onClick={() => document.getElementById('image-input')?.click()}
            ></img>
            <div className='flex-1 pt-12 mb-6 md:mb-0'>
              <p className='inline text-2xl text-gray-800'>My Profile</p>
              <p className='text-sm text-gray-600'>Update your photo and personal details</p>
            </div>
            {editable ? (
              <>
                <button
                  className='inline px-6 py-2 mb-4 mr-4 font-bold text-gray-700 bg-white rounded-lg shadow-lg md:mb-0'
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
                <button
                  className='inline px-6 py-2 mr-48 font-bold text-white bg-gray-700 rounded-lg'
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </>
            ) : (
              <button
                className='inline px-6 py-2 mr-48 font-bold text-white bg-gray-700 rounded-lg'
                onClick={() => setEditable(true)}
              >
                Edit
              </button>
            )}
          </div>
          <br />
          <form className='flex' id='profile'>
            <div className='w-1/2'>
              <div className='ml-16 md:ml-64'>
                <p className='inline mr-6 text-2xl text-gray-700'>Username</p>
                <input
                  type='text'
                  name='username'
                  disabled={!editable}
                  className='w-full border-gray-500 border-opacity-50 rounded-lg disabled:bg-white disabled:border-none disabled:text-xl disabled:w-full'
                  defaultValue={user.username}
                />
              </div>
              <br />
              <div className='ml-16 md:ml-64'>
                <p className='inline mr-6 text-2xl text-gray-700'>First Name</p>
                <input
                  type='text'
                  name='Fname'
                  disabled={!editable}
                  className='w-full border-gray-500 border-opacity-50 rounded-lg disabled:bg-white disabled:border-none disabled:text-xl disabled:w-full'
                  defaultValue={user.Fname}
                />
              </div>
              <br />
              <div className='ml-16 md:ml-64'>
                <p className='inline mr-6 text-2xl text-gray-700'>Last Name</p>
                <input
                  type='text'
                  name='Lname'
                  disabled={!editable}
                  className='w-full border-gray-500 border-opacity-50 rounded-lg disabled:bg-white disabled:border-none disabled:text-xl disabled:w-full'
                  defaultValue={user.Lname}
                />
              </div>
              <br />
              <div className='ml-16 md:ml-64'>
                <p className='inline mr-6 text-2xl text-gray-700'>Email</p>
                <input
                  type='text'
                  name='email'
                  disabled={!editable}
                  className='w-full border-gray-500 border-opacity-50 rounded-lg disabled:bg-white disabled:border-none disabled:text-xl disabled:w-full'
                  defaultValue={user.email}
                />
              </div>
              <br />
              <div className='ml-16 md:ml-64'>
                <p className='inline mr-6 text-2xl text-gray-700'>Contact Number</p>
                <input
                  type='text'
                  name='contact'
                  disabled={!editable}
                  className='w-full border-gray-500 border-opacity-50 rounded-lg disabled:bg-white disabled:border-none disabled:text-xl disabled:w-full'
                  defaultValue={user.contact}
                />
              </div>
              <br />
              <div className='ml-16 md:ml-64'>
                <p className='inline mr-6 text-2xl text-gray-700'>Date of Birth</p>
                <input
                  type='date'
                  name='date_of_birth'
                  disabled={!editable}
                  className='w-full border-gray-500 border-opacity-50 rounded-lg disabled:bg-white disabled:border-none disabled:text-xl disabled:w-full'
                  defaultValue={formattedDate(new Date(user.date_of_birth))}
                />
              </div>
              <br />
              <br />
              {editable && (
                <>
                  <p className='ml-16 text-sm text-gray-600 md:ml-64'>
                    If you want to change password, enter current and new password.
                  </p>
                  <br />
                  <div className='ml-16 md:ml-64'>
                    <p className='inline mr-6 text-2xl text-gray-700'>Current Password</p>
                    <input
                      type='password'
                      name='password'
                      disabled={!editable}
                      className='w-full border-gray-500 border-opacity-50 rounded-lg disabled:bg-white disabled:border-none disabled:text-xl disabled:w-full'
                      defaultValue=''
                    />
                  </div>
                  <br />
                  <div className='ml-16 md:ml-64'>
                    <p className='inline mr-6 text-2xl text-gray-700'>New Password</p>
                    <input
                      type='password'
                      name='new_password'
                      disabled={!editable}
                      className='w-full mb-12 border-gray-500 border-opacity-50 rounded-lg disabled:bg-white disabled:border-none disabled:text-xl disabled:w-full'
                      defaultValue=''
                    />
                  </div>
                </>
              )}
            </div>
            <div className='ml-4'>
              <div
                className='py-1 mr-64 border-gray-400 cursor-pointer border-y'
                onClick={() => {
                  setShowFollowers((prev) => !prev);
                }}
              >
                <p className='inline mr-48 text-xl font-semibold text-gray-500'>Followers</p>
                <p className='inline text-xl font-semibold text-gray-500'>
                  {follow.followers.length}
                </p>
              </div>
              {showFollowers &&
                follow.followers.map((follower) => {
                  return (
                    <FollowPerson
                      key={follower._id}
                      id={follower._id}
                      name={`${follower.Fname} ${follower.Lname}`}
                      removeFollow={removeFollower}
                    />
                  );
                })}
            </div>
            <div className='ml-4'>
              <div
                className='py-1 mr-64 border-gray-400 cursor-pointer border-y'
                onClick={() => {
                  setShowFollowing((prev) => !prev);
                }}
              >
                <p className='inline mr-48 text-xl font-semibold text-gray-500'>Following</p>
                <p className='inline text-xl font-semibold text-gray-500'>
                  {follow.following.length}
                </p>
              </div>
              {showFollowing &&
                follow.following.map((follow) => {
                  return (
                    <FollowPerson
                      key={follow._id}
                      id={follow._id}
                      name={`${follow.Fname} ${follow.Lname}`}
                      removeFollow={removeFollow}
                    />
                  );
                })}
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default Profile;
