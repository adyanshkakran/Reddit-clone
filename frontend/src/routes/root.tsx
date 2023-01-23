import '../App.css';
import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
// import Picture from './assets/login-pic.jpg'

function Login() {
  const [login, setLogin] = React.useState(true);

  return (
    <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-lg'>
        <h1 className='text-center text-2xl font-bold text-indigo-600 sm:text-3xl'>
          Welcome to Greddit!
        </h1>

        <p className='mx-auto mt-4 max-w-md text-center text-gray-500'>
          A place where you connect with people and share your thoughts, memes and everything in
          between.
        </p>

        {login ? <LoginForm setLogin={setLogin} /> : <RegisterForm setLogin={setLogin} />}
      </div>
    </div>
  );
}

export default Login;
