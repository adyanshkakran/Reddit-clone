import '../App.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useQueryState } from '../Hooks/useQueryState';

function Login() {
  const [login, setLogin] = useQueryState('login');

  return (
    <section className='bg-white'>
      <div className='lg:grid lg:min-h-screen lg:grid-cols-12'>
        <section className='relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6'>
          <img
            alt='Night'
            src='./src/assets/login-pic.jpg'
            className='absolute inset-0 h-full w-full object-cover opacity-80'
          />

          <div className='hidden lg:relative lg:block lg:p-12'>
            <h2 className='mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl'>
              Welcome to Greddit!
            </h2>

            <p className='mt-4 leading-relaxed text-white/90'>
              A place where you can connect with people and share your thoughts, memes and
              everything in between.
            </p>
          </div>
        </section>

        {login != 'false' ? <LoginForm setLogin={setLogin} /> : <RegisterForm setLogin={setLogin} />}
      </div>
    </section>
  );
}

export default Login;
