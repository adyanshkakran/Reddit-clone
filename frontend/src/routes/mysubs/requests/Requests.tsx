import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Navbar from '../../../Components/Navbar';
import { UserT, SubGredditT } from '../../../types/types';
import Request from './request';

function Requests() {
  const params = useParams();
  const navigate = useNavigate();
  const [sub, setSub] = useState({} as SubGredditT);
  const [requests, setRequests] = useState([] as UserT[]);
  const token = localStorage.getItem('token_greddit') ?? sessionStorage.getItem('token_greddit');

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
    getRequests();
  }, []);

  function getRequests() {
    const id = localStorage.getItem('id_greddit') ?? sessionStorage.getItem('id_greddit');
    axios
      .post(
        '/api/sub/getRequests',
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
          setRequests(res.data);
        }
      });
  }

  function approveJoin(userId: string) {
    axios
      .post(
        '/api/sub/acceptRequest',
        { userId, subId: params.id },
        {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        alert(res.data);
        getRequests();
      });
  }

  function denyJoin(userId: string) {
    axios
      .post(
        '/api/sub/denyRequest',
        { userId, subId: params.id },
        {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        alert(res.data);
        getRequests();
      });
  }

  return (
    <>
      <Navbar onSubReddits={true} />
      <div className='mx-6 mt-12 lg:mx-80'>
        <div className='mb-4 text-2xl'>
          Join Requests of <div className='inline font-bold'>g/</div>
          {sub.name}
        </div>

        {requests.length == 0 ? (
          <div className='w-full text-xl text-center text-gray-500'>No requests yet</div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full text-sm break-all divide-y-2 divide-gray-200'>
              <thead>
                <tr>
                  <th className='px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap'>
                    Name
                  </th>
                  <th className='px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap'>
                    Date of Birth
                  </th>
                  <th className='px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap'>
                    Email Address
                  </th>
                  <th className='px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap'>
                    Contact Number
                  </th>
                  <th className='px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap'>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200'>
                {requests.map((user) => (
                  <Request
                    key={user._id}
                    user={user}
                    approveJoin={approveJoin}
                    denyJoin={denyJoin}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Requests;
