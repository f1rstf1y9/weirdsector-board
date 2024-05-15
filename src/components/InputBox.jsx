import { useState } from 'react';

import EyeIcon from '@assets/icon-eye.svg';
import EyeOffIcon from '@assets/icon-eyeoff.svg';
import ErrorIcon from '@assets/icon-error.svg';

export default function InputBox({
  type,
  placeholder,
  _onChange,
  isInvalid,
  errMsg,
}) {
  const [currentType, setCurrentType] = useState(type);
  const [currentIsInvalid, setCurrentIsInvalid] = useState(isInvalid);

  const toggleType = () => {
    setCurrentType(currentType == 'password' ? 'text' : 'password');
  };

  return (
    <>
      <div
        className={`w-full h-[55px] bg-white rounded border ${currentIsInvalid ? 'border-error' : 'border-[#E1E1E1]'} focus-within:border-black px-6 py-3.5 flex gap-4 `}
      >
        <input
          type={currentType}
          placeholder={placeholder}
          onFocus={() => {
            if (currentIsInvalid) setCurrentIsInvalid(false);
          }}
          onChange={_onChange}
          className={`h-[27px] text-sm sm:text-base placeholder-[#808080] ${type === 'password' ? 'w-[calc(100%-30px)]' : 'w-full'}`}
        />
        {type == 'password' && (
          <img
            src={currentType == 'password' ? EyeIcon : EyeOffIcon}
            alt='비밀번호 보이기/숨기기'
            className='cursor-pointer w-6'
            onClick={toggleType}
          ></img>
        )}
      </div>

      {currentIsInvalid && (
        <div className='flex gap-1 items-center mt-1 text-error text-sm'>
          <img src={ErrorIcon} alt='에러' />
          <p>{errMsg}</p>
        </div>
      )}
    </>
  );
}
