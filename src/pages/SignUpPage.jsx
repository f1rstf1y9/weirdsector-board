import { useState } from 'react';

import InputBox from '@components/InputBox';
import Button from '@components/Button';
import CheckBox from '@components/CheckBox';

export default function SignUpPage() {
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');
  const [nicknameErrMsg, setNicknameErrMsg] = useState('');

  return (
    <div className='w-full flex justify-center items-center py-[100px] sm:py-[200px]'>
      <div className='w-full w-[358px] sm:w-[384px] flex flex-col items-center'>
        <h1 className='font-bold text-[26px] sm:text-[32px]'>회원가입</h1>
        <div className='w-full flex flex-col gap-6 sm:gap-8 my-6 sm:my-[60px]'>
          <div className='w-full'>
            <p className='font-bold mb-2'>이메일</p>
            <InputBox
              type='email'
              isInvalid={false}
              errMsg={emailErrMsg}
            />{' '}
          </div>
          <div className='w-full flex flex-col gap-2'>
            <p className='font-bold mb-2'>비밀번호</p>
            <InputBox
              placeholder='8자 이상, 영문자, 숫자, 특수기호중 2가지 조합'
              type='password'
              isInvalid={false}
            />
            <InputBox
              placeholder='비밀번호를 다시 입력해주세요'
              type='password'
              isInvalid={false}
              errMsg={passwordErrMsg}
            />
          </div>
          <div className='w-full'>
            <p className='font-bold mb-2'>닉네임</p>
            <InputBox type='text' isInvalid={false} errMsg={nicknameErrMsg} />
          </div>
          <div className='flex items-center w-full h-[72px] sm:h-[75px] bg-[#F9F9F9] rounded-lg px-[24px]'>
            <CheckBox />
            <p className='text-sm sm:text-base ml-[10px]'>
              개인정보 처리방침 / 데이터 활용 동의{' '}
              <b className='font-normal text-[#9A9A9A]'>(필수)</b>
            </p>
          </div>
        </div>
        <Button width='w-[142px]' height='h-[48px]'>
          회원가입
        </Button>
      </div>
    </div>
  );
}
