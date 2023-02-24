import React from 'react';
import { ReportT, PostT, UserT, SubGredditT } from '../../../types/types';

type Props = {
  user: UserT;
  report: ReportT;
  sub: SubGredditT;
  ignore: (reportId: string) => void;
  ban: (reportId: string, blocked: string, subId: string) => void;
  delete: (postId: string) => void;
};

function Report(props: Props) {
  const [time, setTime] = React.useState(-1);

  React.useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }else if(time == 0){
      props.ban(props.report._id, (props.report.reportedUser as UserT)._id, props.sub._id);
      alert('Banned');
    }
  }, [time]);

  return (
    <tr>
      <td className='px-4 py-2 font-medium text-gray-900 whitespace-nowrap'>{`${
        (props.report.reportedBy as UserT).Fname
      } ${(props.report.reportedBy as UserT).Lname}`}</td>
      <td className='px-4 py-2 text-gray-700 whitespace-nowrap'>{`${
        (props.report.reportedUser as UserT).Fname
      } ${(props.report.reportedUser as UserT).Lname}`}</td>
      <td className='px-4 py-2 text-gray-700 whitespace-nowrap'>{props.report.reason}</td>
      <td className='px-4 py-2 text-gray-700 whitespace-nowrap'>
        {(props.report.reportedPost as PostT).content}
      </td>
      <td className='px-4 py-2 whitespace-nowrap'>
        <button
          onClick={() => props.ignore(props.report._id)}
          className='inline-block px-4 py-2 mr-12 text-xs font-medium text-white bg-green-500 rounded hover:bg-green-600'
        >
          Ignore
        </button>
        <button
          onClick={() => props.delete((props.report.reportedPost as PostT)._id)}
          className='inline-block px-4 py-2 mr-12 text-xs font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700'
        >
          Delete Post
        </button>
        {time > 0 ? (
          <CancelTimer
            time={time}
            cancel={() => {
              setTime(-1);
            }}
          />
        ) : (props.report.reportedUser as UserT)._id != props.user._id ? (
          <button
            id='block-user'
            onClick={() => setTime(3)}
            className='inline-block px-4 py-2 mr-12 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700'
          >
            Block User
          </button>
        ) : (
          <button
            className='inline-block px-4 py-2 mr-12 text-xs font-medium text-white bg-red-300 rounded'
            disabled={true}
          >
            Block User
          </button>
        )}
      </td>
    </tr>
  );
}

function CancelTimer(props: { time: number; cancel: () => void }) {
  return (
    <button
      id='block-user'
      onClick={props.cancel}
      className='inline-block px-4 py-2 mr-12 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700'
    >
      Cancel in {props.time}
    </button>
  );
}

export default Report;
