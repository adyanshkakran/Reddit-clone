import React from 'react';
import axios from 'axios';

type Props = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  updatePosts: () => void;
  subId: string;
  bannedKeywords: string[];
};

function CreateSub(props: Props) {
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
    (document.getElementById('submit-CreatePost') as HTMLButtonElement).disabled = true;
    const id = localStorage.getItem('id_greddit') || sessionStorage.getItem('id_greddit');
    const form = document.querySelector('form') as HTMLFormElement;
    const data = new FormData(form);
    for (const d of data.values()) {
      if (!d) {
        showError('Fill all fields of the form');
        return;
      }
    }
    const bannedRegex = new RegExp(props.bannedKeywords.join('|'), 'gi');
    if(data.get('title')?.toString().match(bannedRegex)) {
      showError('Title contains banned keywords');
      return;
    }
    if(data.get('content')?.toString().match(bannedRegex)) {
      alert('Content contains banned keywords');
    }
    document.getElementById('all-fields')?.classList.add('hidden');
    data.append('id', id as string);
    data.append('subId', props.subId);

    axios
      .post('/api/post/createPost', data, {
        headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status == 200) {
          props.close(false);
          alert('Post created successfully');
          props.updatePosts();
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
          <span className='block w-full mb-4 text-lg font-bold'>Create New Post</span>
          <div onClick={() => props.close(false)} className='cursor-pointer'>
            &times;
          </div>
        </div>
        <form className='mb-4' id='create-sub' onSubmit={handleSubmit}>
          <div className='mb-4 md:w-full'>
            <label htmlFor='title' className='block mb-1 text-xs'>
              Title
            </label>
            <input
              className='w-full p-2 border rounded outline-none focus:shadow-outline'
              name='title'
              placeholder='Title'
            ></input>
          </div>
          <div className='mb-6 md:w-full'>
            <label htmlFor='content' className='block mb-1 text-xs'>
              Content
            </label>
            <textarea
              className='w-full p-2 border border-gray-300 rounded outline-none focus:shadow-outline'
              name='content'
              placeholder='Content'
              rows={4}
            ></textarea>
          </div>

          <p id='all-fields' className='hidden mb-6 font-semibold text-red-500 text-md'>
            Fill all fields of the form
          </p>

          <button
            type='submit'
            id='submit-CreatePost'
            onClick={handleSubmit}
            className='px-4 py-2 text-sm font-semibold text-white uppercase bg-green-500 rounded hover:bg-green-700'
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateSub;
