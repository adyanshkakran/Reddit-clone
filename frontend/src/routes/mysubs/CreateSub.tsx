import React from 'react';
import axios from 'axios';

type Props = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  updateSubs: () => void;
};

function CreateSub(props: Props) {
  const token = localStorage.getItem('token_greddit') || sessionStorage.getItem('token_greddit');
  // const navigate = useNavigate();

  function showError(error: string) {
    const p = document.getElementById('all-fields');
    if (p) {
      p.classList.remove('hidden');
      p.innerHTML = error;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    (document.getElementById('submit-CreateSub') as HTMLButtonElement).disabled = true;
    const id = localStorage.getItem('id_greddit') || sessionStorage.getItem('id_greddit');
    const form = document.querySelector('form') as HTMLFormElement;
    const data = new FormData(form);
    for (const d of data.values()) {
      if (!d) {
        showError('Fill all fields of the form');
        return;
      }
    }
    document.getElementById('all-fields')?.classList.add('hidden');
    const file = (document.getElementById('image') as HTMLInputElement).files?.item(0);
    console.log(file);
    data.delete('image');
    data.append('image', file as Blob);
    data.append('id', id as string);
    console.log(data);

    axios
      .post('/api/sub/createSub', data, {
        headers: {'Content-Type' : 'multipart/form-data',  'Authorization': `Bearer ${token}`}
      })
      .then((res) => {
        if (res.status == 200) {
          props.close(false);
          alert('Sub created successfully');
          props.updateSubs();
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
          <span className='block w-full mb-4 text-lg font-bold'>Create New Greddit</span>
          <div onClick={() => props.close(false)} className='cursor-pointer'>
            &times;
          </div>
        </div>
        <form className='mb-4' id='create-sub' onSubmit={handleSubmit}>
          <div className='mb-4 md:w-full'>
            <label htmlFor='name' className='block mb-1 text-xs'>
              Name
            </label>
            <input
              className='w-full p-2 border rounded outline-none focus:shadow-outline'
              name='name'
              placeholder='Name'
            ></input>
          </div>
          <div className='mb-6 md:w-full'>
            <label htmlFor='description' className='block mb-1 text-xs'>
              Description
            </label>
            <textarea
              className='w-full p-2 border border-gray-300 rounded outline-none focus:shadow-outline'
              name='description'
              placeholder='Description'
              rows={4}
            ></textarea>
          </div>
          <div className='mb-6 md:w-full'>
            <label htmlFor='tags' className='block mb-1 text-xs'>
              Tags (Comma Separated)
            </label>
            <input
              className='w-full p-2 border rounded outline-none focus:shadow-outline'
              name='tags'
              placeholder='Tag1, Tag2, ...'
            ></input>
          </div>
          <div className='mb-6 md:w-full'>
            <label htmlFor='keywords' className='block mb-1 text-xs'>
              Banned Keywords (Comma Separated)
            </label>
            <input
              className='w-full p-2 border rounded outline-none focus:shadow-outline'
              name='keywords'
              placeholder='Keyword1, Keyword2, ...'
            ></input>
          </div>
          <div className='mb-6'>
            <label htmlFor='image' className='block mb-2 text-xs font-medium'>
              Greddit Image
            </label>
            <input id='image' type='file' accept='image/*' name='image'></input>
          </div>

          <p id='all-fields' className='hidden mb-6 font-semibold text-red-500 text-md'>
            Fill all fields of the form
          </p>

          <button
            type='submit'
            id='submit-CreateSub'
            onClick={handleSubmit}
            className='px-4 py-2 text-sm font-semibold text-white uppercase bg-green-500 rounded hover:bg-green-700'
          >
            Create subGreddit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateSub;
