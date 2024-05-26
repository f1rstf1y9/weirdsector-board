import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useBoardValidation from '@hook/useBoardValidation';
import { useAuthStore } from '@store/store.js';
import { supabase } from '../../supabase';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

import Comment from './Comment.jsx';
import Dropdown from '@components/Dropdown.jsx';
import Button from '@components/Button.jsx';
import Modal from '@components/Modal';
import KebabIcon from '@assets/icon-kebab.svg';
import PrevIcon from '@assets/icon-prev.svg';

function PostPage() {
  const navigate = useNavigate();
  const { board, postId } = useParams();
  const { user } = useAuthStore();

  const [postObj, setPostObj] = useState(null);
  const [hashtags, setHashtags] = useState([]);
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (postObj) {
      try {
        const { error: commentError } = await supabase.from('comments').insert([
          {
            user_id: user.id,
            user_nickname: user.nickname,
            created_at: new Date().toISOString(),
            content: comment,
            post_id: postObj.post_id,
          },
        ]);
        if (commentError) {
          throw commentError;
        }
        navigate(0);
      } catch (error) {
        console.error(error);
      }
    }
  };

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
          try {
            if (post.attachment) {
              const { data: attachmentData, error: attachmentError } =
                supabase.storage
                  .from('attachments')
                  .getPublicUrl(post.attachment, { download: true });

              if (attachmentError) {
                throw attachmentError;
              }

              setAttachmentUrl(attachmentData.publicUrl);
            }
          } catch (error) {
            console.error('Failed to fetch post data:', error);
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

  const fetchCommentsData = async () => {
    if (postObj) {
      try {
        const { data: commentData, error: commentError } = await supabase
          .from('comments')
          .select('*')
          .eq('post_id', postObj.post_id);
        if (commentError) {
          throw commentError;
        }
        setComments(commentData);
      } catch (error) {
        console.error('Failed to fetch comments data:', error);
      }
    }
  };

  useEffect(() => {
    fetchCommentsData();
  }, [postObj]);

  const formatTimestamp = (timestamp) => {
    const date = parseISO(timestamp);
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
  };

  const handlePostDelete = async () => {
    try {
      if (user && postObj && user.id === postObj.user_id) {
        const { error } = await supabase
          .from('posts')
          .delete()
          .eq('post_id', postId);
        if (error) {
          throw error;
        }
        navigate(`/${board}`);
      } else {
        console.error('You are not authorized to delete this post.');
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    } finally {
      setIsPostModalOpen(false);
    }
  };

  return (
    <>
      <div className='w-full flex justify-center sm:text-[20px]'>
        <div className='w-full sm:w-[1144px] flex flex-col gap-[40px] my-[80px] sm:my-[100px]'>
          <div className='flex flex-col gap-[20px]'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-[16px] items-center'>
                <Link to={`/${board}`}>
                  <img src={PrevIcon} alt='이전' />
                </Link>

                <h1 className='font-bold text-[26px] sm:text-[32px]'>
                  {postObj?.title}
                </h1>
              </div>
              <div>
                {user?.id === postObj?.user_id && (
                  <Dropdown
                    anchor='bottom end'
                    items={[
                      {
                        content: '수정',
                        onClick: () => {
                          navigate('update');
                        },
                      },
                      {
                        content: '삭제',
                        onClick: () => {
                          setIsPostModalOpen(true);
                        },
                      },
                    ]}
                  >
                    <img src={KebabIcon} alt='게시글 메뉴 보기' />
                  </Dropdown>
                )}
              </div>
            </div>
            <div className='flex items-center gap-[10px] text-sm sm:text-base'>
              <p>{postObj?.user_nickname}</p>
              <div className='w-1 h-[18px] border-r border-r-[#E1E1E1]'></div>
              <p>{postObj && formatTimestamp(postObj?.created_at)}</p>
              <div className='w-1 h-[18px] border-r border-r-[#E1E1E1]'></div>
              <p>조회수 {postObj?.view_counts}</p>
            </div>
          </div>

          <div className='whitespace-pre-wrap'>{postObj?.content}</div>

          {postObj?.attachment_name && (
            <div className='flex gap-[20px]'>
              <p className='text-red'>첨부된 파일</p>
              <Link
                href={attachmentUrl}
                className='font-bold'
                download={postObj?.attachment_name}
              >
                {postObj?.attachment_name}
              </Link>
            </div>
          )}

          {hashtags && (
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
          )}

          {user && (
            <form className='w-100 flex gap-[20px] '>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className='min-w-0 h-[55px] flex-1 shrink bg-white rounded border border-[#E1E1E1] focus:border-black focus:!border-black px-5 py-3.5 flex gap-4'
              ></input>
              <Button
                width='shrink-0 w-[88px] sm:w-[142px]'
                onClick={handleCommentSubmit}
              >
                댓글 작성
              </Button>
            </form>
          )}

          {comments.map((comment) => (
            <Comment
              key={comment.comment_id}
              comment={comment}
              user={user}
              setComments={setComments}
              formatTimestamp={formatTimestamp}
            ></Comment>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onConfirm={handlePostDelete}
        title='게시글 삭제'
        message='해당 게시글을 삭제하시겠습니까?'
        isDelete={true}
      />
    </>
  );
}

export default useBoardValidation(PostPage);
