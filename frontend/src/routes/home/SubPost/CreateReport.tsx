import React from 'react';
import { PostT, UserT } from '../../../types/types';
import axios from 'axios';

type Props = {
  close: React.Dispatch<React.SetStateAction<PostT>>;
  post: PostT;
};

function CreateReport(props: Props) {
  const id = localStorage.getItem('id_greddit') || sessionStorage.getItem('id_greddit');
  const token = localStorage.getItem('token_greddit') || sessionStorage.getItem('token_greddit');

  function showError(error: string) {
    const p = document.getElementById('all-fields');
    if (p) {
      p.classList.remove('hidden');
      p.innerHTML = error;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    (document.getElementById('submit-CreateReport') as HTMLButtonElement).disabled = true;
    const form = document.querySelector('form') as HTMLFormElement;
    const data = new FormData(form);
    for (const d of data.values()) {
      if (!d) {
        showError('Give Reason for Reporting');
        return;
      }
    }
    document.getElementById('all-fields')?.classList.add('hidden');
    data.append('id', id as string);
    data.append('reportedUser', (props.post.postedBy as UserT)._id);
    data.append('postId', props.post._id);
    axios
      .post('/api/report/createReport', data, {
        headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status == 200) {
          props.close({} as PostT);
          alert('Report created successfully');
        } else if (res.status == 201) {
          showError(res.data);
        }
      });
  }
  return (
    <div className='absolute z-10 flex items-center w-full h-screen'>
      <div
        className='w-full p-8 m-4 bg-white rounded shadow-lg md:max-w-xl md:mx-auto'
        style={{ boxShadow: '0 0 0 max(100vh, 100vw) rgba(0, 0, 0, .5)' }}
      >
        <div className='flex justify-between'>
          <span className='block w-full mb-4 text-lg font-bold'>Create New Report</span>
          <div onClick={() => props.close({} as PostT)} className='cursor-pointer'>
            &times;
          </div>
        </div>
        <form className='mb-4' id='create-sub' onSubmit={handleSubmit}>
          <div className='mb-6 md:w-full'>
            <label htmlFor='reason' className='block mb-1 text-xs'>
              Reason
            </label>
            <textarea
              className='w-full p-2 border border-gray-300 rounded outline-none focus:shadow-outline'
              name='reason'
              placeholder='Reason'
              rows={4}
            ></textarea>
          </div>

          <p id='all-fields' className='hidden mb-6 font-semibold text-red-500 text-md'>
            Fill all fields of the form
          </p>

          <button
            type='submit'
            id='submit-CreateReport'
            onClick={handleSubmit}
            className='px-4 py-2 text-sm font-semibold text-white uppercase bg-green-500 rounded hover:bg-green-700'
          >
            Create Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateReport;
