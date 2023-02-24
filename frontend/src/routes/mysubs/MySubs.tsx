import Navbar from '../../Components/Navbar';
import React from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import SubGreddit from './SubGreddit';
import CreateSub from './CreateSub';
import { SubGredditT } from '../../types/types';

function MySubs() {
  const token = localStorage.getItem('token_greddit') ?? sessionStorage.getItem('token_greddit');
  const navigate = useNavigate();
  const [createSubGreddit, setCreateSubGreddit] = React.useState(false);
  const [subs, setSubs] = React.useState([] as SubGredditT[]);

  React.useEffect(() => {
    const token = localStorage.getItem('token_greddit') ?? sessionStorage.getItem('token_greddit');
    if (!token) {
      navigate('/');
    }
    updateSubs();
  }, []);

  function updateSubs() {
    const id = localStorage.getItem('id_greddit') ?? sessionStorage.getItem('id_greddit');
    axios
      .post(
        '/api/sub/getSubs',
        { id },
        {
          headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${token}` },
        },
      )
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else {
          setSubs(res.data);
        }
      });
  }

  function deleteSub(subId: string) {
    const id = localStorage.getItem('id_greddit') ?? sessionStorage.getItem('id_greddit');

    axios
      .delete('/api/sub/deleteSub', {
        headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${token}` },
        data: { id, subId },
      })
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else {
          updateSubs();
        }
      });
  }

  return (
    <>
      {createSubGreddit && <CreateSub close={setCreateSubGreddit} updateSubs={updateSubs} />}
      <Navbar onSubReddits={false} />
      <div className='flex flex-col items-center w-full md:flex-row justify-evenly'>
        <div className='w-32'></div>
        <p className='my-12 text-3xl font-medium text-gray-800'>Your Sub-Greddits</p>
        <button
          className='flex items-center self-end justify-between h-10 px-5 py-3 mr-16 transition-colors bg-indigo-600 border border-indigo-600 rounded-lg group hover:bg-transparent focus:outline-none focus:ring'
          onClick={() => setCreateSubGreddit(true)}
        >
          <span className='font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500'>
            Create New
          </span>
        </button>
      </div>
      {subs.map((sub) => (
        <SubGreddit key={sub.name} sub={sub} deleteSub={deleteSub} />
      ))}
    </>
  );
}

export default MySubs;
