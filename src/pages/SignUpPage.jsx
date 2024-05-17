import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

import InputBox from '@components/InputBox';
import Button from '@components/Button';
import CheckBox from '@components/CheckBox';
import ErrorIcon from '@assets/icon-error.svg';

export default function SignUpPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [isChecked, setIsChecked] = useState('');

  const [emailErr, setEmailErr] = useState('');
  const [pwdErr, setPwdErr] = useState('');
  const [pwdCheckErr, setPwdCheckErr] = useState('');
  const [nicknameErr, setNicknameErr] = useState('');
  const [checkErr, setCheckErr] = useState('');

  useEffect(() => {
    if (checkErr) {
      setCheckErr('');
    }
  }, [isChecked]);

  const signUpHandler = async (e) => {
    e.preventDefault();

    const validatePassword = () => {
      if (password.length < 8) {
        return false;
      }
      const regexes = [/[A-Za-z]/g, /[0-9]/g, /[^A-Za-z0-9]/g];
      let matchCount = 0;
      for (let regex of regexes) {
        if (password.match(regex)) {
          matchCount++;
        }
      }
      if (matchCount < 2) {
        return false;
      }
      return true;
    };

    const validateForm = () => {
      let isValid = true;

      if (!validatePassword(password)) {
        setPwdErr(
          '영어, 숫자, 특수기호 중 2가지 이상 포함해 8자 이상이어야 합니다.'
        );
        isValid = false;
      } else {
        setPwdErr('');
      }

      if (password != passwordCheck) {
        setPwdCheckErr('비밀번호가 일치하지 않습니다.');
        isValid = false;
      } else {
        setPwdCheckErr('');
      }

      if (!isChecked) {
        setCheckErr('개인정보 처리방침 / 데이터 활용 동의에 체크해주세요.');
        isValid = false;
      } else {
        setCheckErr('');
      }

      return isValid;
    };

    if (!validateForm()) {
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname: nickname,
          },
        },
      });

      if (error) {
        const apiError = String(error).split('\n')[0];
        if (apiError === 'AuthApiError: User already registered') {
          setEmailErr('이미 가입된 이메일입니다.');
        }
      } else {
        navigate('/signup-complete');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-full flex justify-center items-center py-[100px] sm:py-[200px]'>
      <form
        onSubmit={signUpHandler}
        className='w-full w-[358px] sm:w-[384px] flex flex-col items-center'
      >
        <h1 className='font-bold text-[26px] sm:text-[32px]'>회원가입</h1>
        <div className='w-full flex flex-col gap-6 sm:gap-8 my-6 sm:my-[60px]'>
          <div className='w-full'>
            <p className='font-bold mb-2'>이메일</p>
            <InputBox
              value={email}
              type='email'
              _onChange={(e) => setEmail(e.target.value)}
              autocomplete='username'
              err={emailErr}
              setErr={setEmailErr}
            />
          </div>
          <div className='w-full flex flex-col gap-2'>
            <p className='font-bold mb-2'>비밀번호</p>
            <InputBox
              value={password}
              placeholder='8자 이상, 영문자, 숫자, 특수기호중 2가지 조합'
              type='password'
              _onChange={(e) => setPassword(e.target.value)}
              autocomplete='new-password'
              err={pwdErr}
              setErr={setPwdErr}
            />
            <InputBox
              value={passwordCheck}
              placeholder='비밀번호를 다시 입력해주세요'
              type='password'
              _onChange={(e) => setPasswordCheck(e.target.value)}
              autocomplete='new-password'
              err={pwdCheckErr}
              setErr={setPwdCheckErr}
            />
          </div>
          <div className='w-full'>
            <p className='font-bold mb-2'>닉네임</p>
            <InputBox
              value={nickname}
              type='text'
              _onChange={(e) => setNickname(e.target.value)}
              err={nicknameErr}
              setErr={setNicknameErr}
            />
          </div>
          <div>
            <div className='flex items-center w-full h-[72px] sm:h-[75px] bg-[#F9F9F9] rounded-lg px-[24px]'>
              <CheckBox
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <p className='text-sm sm:text-base ml-[10px]'>
                개인정보 처리방침 / 데이터 활용 동의{' '}
                <b className='font-normal text-[#9A9A9A]'>(필수)</b>
              </p>
            </div>
            {checkErr && (
              <div className='flex gap-1 items-center mt-1 text-error text-sm'>
                <img src={ErrorIcon} alt='에러' />
                <p>{checkErr}</p>
              </div>
            )}
          </div>
        </div>
        <Button width='w-[142px]' height='h-[48px]'>
          회원가입
        </Button>
      </form>
    </div>
  );
}
