import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Navbar from '../../../Components/Navbar';
import { UserT, ReportT, SubGredditT } from '../../../types/types';
import Report from './report';

function Requests() {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({} as UserT);
  const [sub, setSub] = useState({} as SubGredditT);
  const [reports, setReports] = useState([] as ReportT[]);
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
          headers: {
            'Content-Type': 'application/json',

            Authorization: `Bearer ${token}`,
          },
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
  }, []);

  React.useEffect(() => {
    getReports();
  }, []);

  function getReports() {
    const id = localStorage.getItem('id_greddit') ?? sessionStorage.getItem('id_greddit');
    axios
      .post(
        '/api/report/getReports',
        { id, subId: params.id },
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
          navigate('/mysubs');
        } else {
          setReports(res.data);
        }
      });
  }

  function ignore(reportId: string) {
    axios
      .get(`/api/report/delete/${reportId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else {
          getReports();
        }
      });
  }
  function deletePost(postId: string) {
    axios
      .get(`/api/post/delete/${postId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else getReports();
      });
  }
  function block(reportId: string, blocked: string, subId: string) {
    axios
      .post(
        '/api/sub/blockUser',
        { id: blocked, subId },
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
          ignore(reportId);
        }
      });
  }

  return (
    <>
      <Navbar onSubReddits={true} />
      <div className='mx-6 mt-12 lg:mx-80'>
        <div className='mb-4 text-2xl'>
          Reports of <div className='inline font-bold'>g/</div>
          {sub.name}
        </div>
        {reports.length == 0 ? (
          <div className='text-xl text-center w-full text-gray-500'>No reports yet</div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full text-sm break-all divide-y-2 divide-gray-200'>
              <thead>
                <tr>
                  <th className='px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap'>
                    Reporter
                  </th>
                  <th className='px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap'>
                    Reported
                  </th>
                  <th className='px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap'>
                    Concern
                  </th>
                  <th className='px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap'>
                    Text Content
                  </th>
                  <th className='px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap'>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200'>
                {reports.map((report) => (
                  <Report
                    key={report._id}
                    user={user}
                    report={report}
                    ignore={ignore}
                    delete={deletePost}
                    ban={block}
                    sub={sub}
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
