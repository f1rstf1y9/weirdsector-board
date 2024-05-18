import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useBoardValidation from '@hook/useBoardValidation';
import { useAuthStore } from '@store/store.js';
import { supabase } from '../../supabase';

import Button from '@components/Button.jsx';

function UpdatePostPage() {
  const navigate = useNavigate();
  const { board, postId } = useParams();
  const { user } = useAuthStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [hashtag, setHashtag] = useState('');

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select('*')
          .eq('post_id', postId)
          .select();

        if (postError || !postData[0] || postData.length === 0) {
          navigate(`/${board}`);
          return;
        }

        const post = postData[0];
        setTitle(post.title);
        setContent(post.content);

        const { data: hashtagsData, error: hashtagsError } = await supabase
          .from('post_hashtags')
          .select('hashtag_id')
          .eq('post_id', postId);

        if (hashtagsError) {
          throw hashtagsError;
        }

        const hashtagPromises = hashtagsData.map(async (hashtagRelation) => {
          const { data: hashtagData, error: hashtagError } = await supabase
            .from('hashtags')
            .select('hashtag')
            .eq('hashtag_id', hashtagRelation.hashtag_id)
            .select();

          if (hashtagError) {
            throw hashtagError;
          }

          return `#${hashtagData[0].hashtag}`;
        });

        const resolvedHashtags = await Promise.all(hashtagPromises);
        setHashtag(resolvedHashtags.join(' '));
      } catch (error) {
        console.error('Failed to fetch post data:', error);
      }
    };

    fetchPostData();
  }, [postId, navigate]);

  const handleSubmit = () => {};

  return (
    <>
      <div className='flex justify-center w-full'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col w-full sm:w-[1144px] items-center justify-center gap-[40px] my-[80px] sm:my-[100px]'
        >
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
                required
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
                required
              />
            </div>
            <div className='flex items-center'>
              <p className='w-[60px] sm:w-[140px] text-sm sm:text-xl font-bold mr-[20px]'>
                파일 첨부
              </p>
              <label
                htmlFor='attachment'
                className={`flex items-center justify-between flex-1 h-[55px] bg-white rounded border border-[#E1E1E1] px-5 py-4 flex gap-4 ${!file && 'cursor-pointer'}`}
              >
                <span>{file ? file.name : '파일 선택'}</span>
                <div
                  className='cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setFile(null);
                  }}
                >
                  {file && (
                    <svg
                      width='24px'
                      height='24px'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      style={{ pointerEvents: 'none' }}
                    >
                      <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                      <g
                        id='SVGRepo_tracerCarrier'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      ></g>
                      <g id='SVGRepo_iconCarrier'>
                        <g id='Menu / Close_MD'>
                          <path
                            id='Vector'
                            d='M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18'
                            stroke='#000000'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          ></path>
                        </g>
                      </g>
                    </svg>
                  )}
                </div>
              </label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type='file'
                id='attachment'
                className='hidden'
                disabled={file}
              />
            </div>
            <div className='flex gap-[20px] items-center'>
              <p className='w-[60px] sm:w-[140px] text-sm sm:text-xl font-bold'>
                해시태그
              </p>
              <input
                placeholder={`'#'으로 해시태그를 구분해주세요.`}
                value={hashtag}
                onChange={(e) => setHashtag(e.target.value)}
                type='text'
                className='h-[55px] flex-1 bg-white rounded border border-[#E1E1E1] focus:border-black focus:!border-black px-5 py-3.5 flex gap-4'
              />
            </div>
          </div>
          <Button width='w-[143px] sm:w-[162px]' height='h-[45px] sm:h-[48px]'>
            게시글 수정
          </Button>
        </form>
      </div>
    </>
  );
}

export default useBoardValidation(UpdatePostPage);
