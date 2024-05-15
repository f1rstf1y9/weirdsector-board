import { useState } from 'react';
import { Link } from 'react-router-dom';

import InputBox from '@components/InputBox';
import Button from '@components/Button';

export default function LoginPage() {
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');

  return (
    <div className='w-full flex justify-center items-center py-[100px] sm:py-[200px]'>
      <div className='w-full sm:w-[358px] sm:w-[384px] flex flex-col items-center'>
        <h1 className='font-bold text-[26px] sm:text-[32px]'>로그인</h1>
        <div className='w-full flex flex-col gap-2 mt-6 sm:mt-8 mb-4'>
          <InputBox
            placeholder='이메일 주소'
            type='email'
            isInvalid={false}
            errMsg={emailErrMsg}
          />
          <InputBox
            placeholder='비밀번호 입력'
            type='password'
            isInvalid={false}
            errMsg={passwordErrMsg}
          />
        </div>
        <Button children='로그인' />
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
      </div>
    </div>
  );
}
