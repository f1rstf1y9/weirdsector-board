import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useBoardValidation from '@hook/useBoardValidation';
import { useAuthStore } from '@store/store.js';
import { supabase } from '../../supabase';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

import Dropdown from '@components/Dropdown.jsx';
import Button from '@components/Button.jsx';

function PostPage() {
  const navigate = useNavigate();
  const { board, postId } = useParams();
  const { user } = useAuthStore();

  const [postObj, setPostObj] = useState(null);
  const [hashtags, setHashtags] = useState([]);
  const [attachmentUrl, setAttachmentUrl] = useState('');

  useEffect(() => {
    let isMounted = true;

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

        if (isMounted) {
          setPostObj(post);

          await supabase
            .from('posts')
            .update({ view_counts: post.view_counts + 1 })
            .eq('post_id', postId);

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

            return hashtagData[0].hashtag;
          });

          const resolvedHashtags = await Promise.all(hashtagPromises);
          setHashtags(resolvedHashtags);

          if (post.attachment) {
            const { data: attachmentData, error: attachmentError } =
              supabase.storage
                .from('attachments')
                .getPublicUrl(post.attachment, { download: true });

            if (attachmentError) {
              throw attachmentError;
            }

            setAttachmentUrl(attachmentData.publicUrl);
          } else {
            console.error('Attachment is undefined or empty.');
          }
        }
      } catch (error) {
        console.error('Failed to fetch post data:', error);
      }
    };

    fetchPostData();

    return () => {
      isMounted = false;
    };
  }, [postId, navigate]);

  const formatTimestamp = (timestamp) => {
    const date = parseISO(timestamp);
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
  };

  return (
    <>
      <div className='w-full flex justify-center sm:text-[20px]'>
        <div className='w-full sm:w-[1144px] flex flex-col gap-[40px] my-[80px] sm:my-[100px]'>
          <div className='flex flex-col gap-[20px]'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-[16px] items-center'>
                <Link to={`/${board}`}>
                  <svg
                    width='9'
                    height='14'
                    viewBox='0 0 9 14'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M7.49984 1.16663L1.6665 6.99996L7.49984 12.8333'
                      stroke='black'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Link>

                <h1 className='font-bold text-[26px] sm:text-[32px]'>
                  {postObj?.title}
                </h1>
              </div>
              <Dropdown
                anchor='bottom start'
                items={[
                  {
                    content: '수정',
                    onClick: () => {},
                  },
                  {
                    content: '삭제',
                    onClick: () => {},
                  },
                ]}
              >
                <svg
                  width='4'
                  className='h-[18px] sm:h-[24px]'
                  viewBox='0 0 4 26'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M0 2.96863C0 3.49906 0.210713 4.00777 0.585786 4.38284C0.960859 4.75791 1.46957 4.96863 2 4.96863C2.53043 4.96863 3.03914 4.75791 3.41421 4.38284C3.78929 4.00777 4 3.49906 4 2.96863C4 2.4382 3.78929 1.92949 3.41421 1.55441C3.03914 1.17934 2.53043 0.968628 2 0.968628C1.46957 0.968628 0.960859 1.17934 0.585786 1.55441C0.210713 1.92949 0 2.4382 0 2.96863ZM0 12.9686C0 13.4991 0.210713 14.0078 0.585786 14.3828C0.960859 14.7579 1.46957 14.9686 2 14.9686C2.53043 14.9686 3.03914 14.7579 3.41421 14.3828C3.78929 14.0078 4 13.4991 4 12.9686C4 12.4382 3.78929 11.9295 3.41421 11.5544C3.03914 11.1793 2.53043 10.9686 2 10.9686C1.46957 10.9686 0.960859 11.1793 0.585786 11.5544C0.210713 11.9295 0 12.4382 0 12.9686V12.9686ZM0 22.9686C0 23.4991 0.210713 24.0078 0.585786 24.3828C0.960859 24.7579 1.46957 24.9686 2 24.9686C2.53043 24.9686 3.03914 24.7579 3.41421 24.3828C3.78929 24.0078 4 23.4991 4 22.9686C4 22.4382 3.78929 21.9295 3.41421 21.5544C3.03914 21.1793 2.53043 20.9686 2 20.9686C1.46957 20.9686 0.960859 21.1793 0.585786 21.5544C0.210713 21.9295 0 22.4382 0 22.9686V22.9686Z'
                    fill='black'
                  />
                </svg>
              </Dropdown>
            </div>
            <div className='flex items-center gap-[10px] text-sm sm:text-base'>
              <p>{postObj?.user_nickname}</p>
              <div className='w-1 h-[18px] border-r border-r-[#E1E1E1]'></div>
              <p>{postObj && formatTimestamp(postObj?.created_at)}</p>
              <div className='w-1 h-[18px] border-r border-r-[#E1E1E1]'></div>
              <p>조회수 {postObj?.view_counts}</p>
            </div>
          </div>

          <div>{postObj?.content}</div>

          <div className='flex gap-[20px]'>
            <p className='text-red'>첨부된 파일</p>
            <a
              href={attachmentUrl}
              className='font-bold'
              download={postObj?.attachment_name}
            >
              {postObj?.attachment_name}
            </a>
          </div>

          <div className='flex gap-[8px] text-sm sm:text-base'>
            {hashtags.map((hashtag, idx) => {
              return (
                <div
                  key={idx}
                  className='h-[32px] px-[20px] bg-[#EEEEEE] flex items-center justify-center rounded-full'
                >
                  #{hashtag}
                </div>
              );
            })}
          </div>

          <div className='flex gap-[20px]'>
            <input
              required
              className='h-[55px] flex-1 bg-white rounded border border-[#E1E1E1] focus:border-black focus:!border-black px-5 py-3.5 flex gap-4'
            ></input>
            <Button width='w-[88px] sm:w-[142px]'>댓글 작성</Button>
          </div>

          <hr />
          <div className='flex flex-col gap-[16px]'>
            <div className='flex items-center justify-between'>
              <p className='text-lg sm:text-xl font-bold'>나는 호빵맨</p>
              <Dropdown
                anchor='bottom start'
                items={[
                  {
                    content: '수정',
                    onClick: () => {},
                  },
                  {
                    content: '삭제',
                    onClick: () => {},
                  },
                ]}
              >
                <svg
                  width='4'
                  className='h-[18px] sm:h-[24px]'
                  viewBox='0 0 4 26'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M0 2.96863C0 3.49906 0.210713 4.00777 0.585786 4.38284C0.960859 4.75791 1.46957 4.96863 2 4.96863C2.53043 4.96863 3.03914 4.75791 3.41421 4.38284C3.78929 4.00777 4 3.49906 4 2.96863C4 2.4382 3.78929 1.92949 3.41421 1.55441C3.03914 1.17934 2.53043 0.968628 2 0.968628C1.46957 0.968628 0.960859 1.17934 0.585786 1.55441C0.210713 1.92949 0 2.4382 0 2.96863ZM0 12.9686C0 13.4991 0.210713 14.0078 0.585786 14.3828C0.960859 14.7579 1.46957 14.9686 2 14.9686C2.53043 14.9686 3.03914 14.7579 3.41421 14.3828C3.78929 14.0078 4 13.4991 4 12.9686C4 12.4382 3.78929 11.9295 3.41421 11.5544C3.03914 11.1793 2.53043 10.9686 2 10.9686C1.46957 10.9686 0.960859 11.1793 0.585786 11.5544C0.210713 11.9295 0 12.4382 0 12.9686V12.9686ZM0 22.9686C0 23.4991 0.210713 24.0078 0.585786 24.3828C0.960859 24.7579 1.46957 24.9686 2 24.9686C2.53043 24.9686 3.03914 24.7579 3.41421 24.3828C3.78929 24.0078 4 23.4991 4 22.9686C4 22.4382 3.78929 21.9295 3.41421 21.5544C3.03914 21.1793 2.53043 20.9686 2 20.9686C1.46957 20.9686 0.960859 21.1793 0.585786 21.5544C0.210713 21.9295 0 22.4382 0 22.9686V22.9686Z'
                    fill='black'
                  />
                </svg>
              </Dropdown>
            </div>

            <p>댓글</p>
            <p className='text-sm sm:text-base text-[#B8B7B7]'>
              2023.07.19 11:53:50
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default useBoardValidation(PostPage);
