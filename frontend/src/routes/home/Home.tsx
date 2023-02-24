import React from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import Fuse from 'fuse.js';
import { UserT, SubGredditT } from '../../types/types';
import { useNavigate } from 'react-router';
import SubGreddit from './SubGreddit';

enum FilterType {
  Joined,
  AlphabeticI,
  AlphabeticD,
  FollowersI,
  FollowersD,
  DateI,
  DateD,
}

function Home() {
  const navigate = useNavigate();
  const [subs, setSubs] = React.useState<SubGredditT[]>([]);
  const [allSubs, setAllSubs] = React.useState<SubGredditT[]>([]);
  const [user, setUser] = React.useState<UserT>({} as UserT);
  const [filter, setFilter] = React.useState<FilterType>(FilterType.Joined);
  const [tags, setTags] = React.useState<string>('');
  const [search, setSearch] = React.useState<string>('');
  const token = localStorage.getItem('token_greddit') ?? sessionStorage.getItem('token_greddit');
  // const [search, setSearch] = React.useState('');
  const fuse = new Fuse(allSubs, {
    keys: ['name', 'description'],
  });

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

  function updateSubs() {
    const id = localStorage.getItem('id_greddit') ?? sessionStorage.getItem('id_greddit');
    let subGreddits: SubGredditT[] = [];
    let user: UserT = {} as UserT;
    axios
      .get('/api/sub/getSubs', {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else {
          subGreddits = res.data;
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
                user = res.data;
                let sortedSubs: SubGredditT[] = [];
                switch(filter){
                  case FilterType.Joined:
                    subGreddits.forEach((sub) => {
                      if (user.greddits.includes(sub._id)) {
                        sortedSubs.push(sub);
                      }
                    });
                    subGreddits.forEach((sub) => {
                      if (!user.greddits.includes(sub._id)) {
                        sortedSubs.push(sub);
                      }
                    });
                    break;
                  case FilterType.AlphabeticI:
                    sortedSubs = [...subGreddits]
                    sortedSubs.sort((a, b) => a.name.localeCompare(b.name))
                    break;
                  case FilterType.AlphabeticD:
                    sortedSubs = [...subGreddits]
                    sortedSubs.sort((a, b) => b.name.localeCompare(a.name))
                    break;
                  case FilterType.FollowersI:
                    sortedSubs = [...subGreddits]
                    sortedSubs.sort((a, b) => a.followers.length - b.followers.length)
                    break;
                  case FilterType.FollowersD:
                    sortedSubs = [...subGreddits]
                    sortedSubs.sort((a, b) => b.followers.length - a.followers.length)
                    break;
                  case FilterType.DateI:
                    sortedSubs = [...subGreddits]
                    sortedSubs.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
                    break;
                  case FilterType.DateD:
                    sortedSubs = [...subGreddits]
                    sortedSubs.sort((a, b) => b.createdAt > a.createdAt ? 1 : -1)
                    break;
                }
                setAllSubs(sortedSubs);
                setSubs(sortedSubs);
              }
            });
        }
      });
  }

  React.useEffect(() => {
    updateSubs();
  }, [filter])

  function leaveSub(subId: string) {
    const id = localStorage.getItem('id_greddit') ?? sessionStorage.getItem('id_greddit');
    axios
      .post(
        '/api/sub/leaveSub',
        { id, subId },
        {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        if (res.status == 201) {
          alert(res.data);
        } else {
          updateSubs();
        }
      });
  }

  React.useEffect(() => {
    const Tags = tags.split(',').map((tag) => tag.trim());
    if (search) {
      const results = fuse.search(search);
      let newSubs = allSubs.filter((sub) => {
        let match = false;
        results.forEach((result) => {
          if (result.item.name == sub.name) match = true;
        });
        return match;
      });
      if (tags) {
        newSubs = newSubs.filter((sub) => {
          let match = false;
          sub.tags.forEach((tag) => {
            if (Tags.includes(tag)) match = true;
          });
          return match;
        });
        setSubs(newSubs);
      } else setSubs(newSubs);
    } else if (tags) {
      const newSubs = allSubs.filter((sub) => {
        let match = false;
        sub.tags.forEach((tag) => {
          if (Tags.includes(tag)) match = true;
        });
        return match;
      });
      setSubs(newSubs);
    } else setSubs(allSubs);
  }, [tags, search]);

  return (
    <>
      <Navbar onSubReddits={false} />
      <div className='mx-6 mt-12 md:mx-40 lg:mx-80'>
        <SearchBar search={setSearch} placeholder={'Search'} tags={false} />
      </div>
      <div className='flex flex-col items-center mx-6 mt-12 sm:justify-around md:mx-48 lg:mx-96 sm:flex-row'>
        <SearchBar search={setTags} placeholder={'Enter Tags(Comma Separated)'} tags={true} />
        <Filter setFilter={setFilter} />
      </div>
      {subs.map((sub) => (
        <SubGreddit key={sub._id} user={user} sub={sub} leaveSub={leaveSub} />
      ))}
    </>
  );
}

function SearchBar(props: {
  search: (search: string) => void;
  placeholder: string;
  tags: boolean;
}) {
  return (
    <form className={'flex items-center' + (props.tags ? ' w-full md:w-96 mb-12 sm:mb-0' : '')}>
      <label htmlFor='simple-search' className='sr-only'>
        Search
      </label>
      <div className='relative w-full'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <svg
            aria-hidden='true'
            className='w-5 h-5 text-gray-500 dark:text-gray-400'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            ></path>
          </svg>
        </div>
        <input
          onChange={(e) => props.search(e.target.value)}
          type='text'
          id='simple-search'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder={props.placeholder}
          required
        ></input>
      </div>
    </form>
  );
}

function Filter(props: { setFilter: React.Dispatch<FilterType> }) {
  const [menu, setMenu] = React.useState(false);

  return (
    <div className='relative'>
      <div className='inline-flex items-center overflow-hidden bg-white border divide-x divide-gray-100 rounded-md'>
        <button
          type='button'
          onClick={() => setMenu((prev) => !prev)}
          className='px-4 py-2 text-sm leading-none text-gray-600 hover:bg-gray-50 hover:text-gray-700'
        >
          Sorting Criteria
        </button>

        <button
          className='h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700'
          onClick={() => setMenu((prev) => !prev)}
        >
          <span className='sr-only'>Menu</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-4 h-4'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>

      {menu && (
        <div
          className='absolute right-0 z-10 w-56 mt-2 bg-white border border-gray-100 divide-y divide-gray-100 rounded-md shadow-lg'
          role='menu'
        >
          <button
            onClick={() => props.setFilter(FilterType.Joined)}
            className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'
            role='menuitem'
          >
            Default
          </button>
          <div className='p-2'>
            <strong className='block p-2 text-xs font-medium text-gray-400 uppercase'>
              Alphabetic
            </strong>

            <button
              onClick={() => props.setFilter(FilterType.AlphabeticI)}
              className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'
              role='menuitem'
            >
              Increasing
            </button>
            <button
              onClick={() => props.setFilter(FilterType.AlphabeticD)}
              className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'
              role='menuitem'
            >
              Decreasing
            </button>
          </div>

          <div className='p-2'>
            <strong className='block p-2 text-xs font-medium text-gray-400 uppercase'>
              Followers
            </strong>

            <button
              onClick={() => props.setFilter(FilterType.FollowersI)}
              className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'
              role='menuitem'
            >
              Increasing
            </button>
            <button
              onClick={() => props.setFilter(FilterType.FollowersD)}
              className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'
              role='menuitem'
            >
              Decreasing
            </button>
          </div>

          <div className='p-2'>
            <strong className='block p-2 text-xs font-medium text-gray-400 uppercase'>
              Creation Date
            </strong>

            <button
              onClick={() => props.setFilter(FilterType.DateI)}
              className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'
              role='menuitem'
            >
              Increasing
            </button>
            <button
              onClick={() => props.setFilter(FilterType.DateD)}
              className='block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700'
              role='menuitem'
            >
              Decreasing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
