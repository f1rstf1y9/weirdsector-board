import { useState } from 'react';

import Button from '@components/Button.jsx';

export default function UpdatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <>
      <div className='flex justify-center w-full'>
        <div className='flex flex-col w-full sm:w-[1144px] items-center justify-center gap-[40px] my-[80px] sm:my-[100px]'>
          <h1 className='text-center text-[26px] sm:text-[32px] font-bold'>
            게시글 수정
          </h1>
          <div className='flex flex-col w-full gap-[20px]'>
            <div className='flex gap-[20px] items-center'>
              <p className='w-[60px] sm:w-[140px] text-sm sm:text-xl font-bold'>
                제목
              </p>
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type='text'
                className='h-[55px] flex-1 bg-white rounded border border-[#E1E1E1] focus:border-black focus:!border-black px-5 py-3.5 flex gap-4'
              />
            </div>
            <div className='flex gap-[20px] items-start'>
              <p className='flex items-center w-[60px] sm:w-[140px] h-[48px] text-sm sm:text-xl font-bold'>
                내용
              </p>
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                className='flex-1 min-h-80 bg-white rounded border border-[#E1E1E1] focus:border-black px-5 py-4 flex gap-4'
              />
            </div>
            <div className='flex items-center'>
              <p className='w-[60px] sm:w-[140px] text-sm sm:text-xl font-bold mr-[20px]'>
                파일 첨부
              </p>
              <label
                htmlFor='attachment'
                className='flex-1 h-[55px] bg-white rounded border border-[#E1E1E1] px-5 py-4 flex gap-4 cursor-pointer'
              >
                파일 선택
              </label>
              <input type='file' id='attachment' className='w-0 flex-0' />
            </div>
            <div className='flex gap-[20px] items-center'>
              <p className='w-[60px] sm:w-[140px] text-sm sm:text-xl font-bold'>
                해시태그
              </p>
              <input
                type='text'
                className='h-[55px] flex-1 bg-white rounded border border-[#E1E1E1] focus:border-black focus:!border-black px-5 py-3.5 flex gap-4'
              />
            </div>
          </div>
          <Button width='w-[143px] sm:w-[162px]' height='h-[45px] sm:h-[48px]'>
            게시글 수정
          </Button>
        </div>
      </div>
    </>
  );
}
