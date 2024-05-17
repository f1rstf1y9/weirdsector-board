import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { useAuthStore } from '../store/store.js';

import InputBox from '@components/InputBox';
import Button from '@components/Button';

export default function LoginPage() {
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error(error);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-full flex justify-center items-center py-[100px] sm:py-[200px]'>
      <form
        onSubmit={loginHandler}
        className='w-full w-[358px] sm:w-[384px] flex flex-col items-center'
      >
        <h1 className='font-bold text-[26px] sm:text-[32px]'>로그인</h1>
        <div className='w-full flex flex-col gap-2 mt-6 sm:mt-8 mb-4'>
          <InputBox
            value={email}
            _onChange={(e) => setEmail(e.target.value)}
            placeholder='이메일 주소'
            type='email'
            isInvalid={false}
            err={emailErr}
            setErr={setEmailErr}
            autocomplete='username'
          />
          <InputBox
            value={password}
            _onChange={(e) => setPassword(e.target.value)}
            placeholder='비밀번호 입력'
            type='password'
            isInvalid={false}
            err={passwordErr}
            setErr={setPasswordErr}
            autocomplete='current-password'
          />
        </div>
        <Button>로그인</Button>
        <div className='flex gap-4 mt-8 text-sm'>
          <Link to='#' className='text-[#808080]'>
            아이디 찾기
          </Link>
          <div className='border-s-[#808080] border-s-[1.2px] height-[17px]'></div>
          <Link to='#' className='text-[#808080]'>
            비밀번호 찾기
          </Link>
          <div className='border-s-[#808080] border-s-[1.2px] height-[17px]'></div>
          <Link to='/signup'>회원가입</Link>
        </div>
      </form>
    </div>
  );
}
