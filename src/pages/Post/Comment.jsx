import { useState } from 'react';
import { supabase } from '../../supabase';

import Dropdown from '@components/Dropdown.jsx';
import Button from '@components/Button.jsx';
import Modal from '@components/Modal';

export default function Comment({
  comment,
  user,
  comments,
  setComments,
  formatTimestamp,
}) {
  const [updatedComment, setUpdatedComment] = useState(comment.content);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isCommentUpdating, setIsCommentUpdating] = useState(false);

  const handleCommentDelete = async () => {
    try {
      if (user.id === comment.user_id) {
        const { error } = await supabase
          .from('comments')
          .delete()
          .eq('comment_id', comment.comment_id);
        if (error) {
          throw error;
        }
        setComments((prevComments) =>
          prevComments.filter((c) => c.comment_id !== comment.comment_id)
        );
      } else {
        console.error('You are not authorized to delete this comment.');
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
    } finally {
      setIsCommentModalOpen(false);
    }
  };

  const handleUpdatedCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.id === comment.user_id) {
        const { data, error: commentError } = await supabase
          .from('comments')
          .update({
            content: updatedComment,
          })
          .eq('comment_id', comment.comment_id);
        if (commentError) {
          throw commentError;
        } else {
          console.log('Comment updated successfully:', data);
          setComments((prevComments) =>
            prevComments.map((c) =>
              c.comment_id === comment.comment_id
                ? { ...c, content: updatedComment }
                : c
            )
          );
          setIsCommentUpdating(false);
        }
      } else {
        console.error('You are not authorized to update this comment.');
      }
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  };

  return (
    <>
      <hr />
      <div className='flex flex-col gap-[16px]'>
        <div className='flex items-center justify-between'>
          <p className='text-lg sm:text-xl font-bold'>
            {comment.user_nickname}
          </p>
          <div>
            {comment.user_id === user?.id && !isCommentUpdating && (
              <Dropdown
                anchor='bottom end'
                items={[
                  {
                    content: '수정',
                    onClick: () => {
                      setIsCommentUpdating(true);
                    },
                  },
                  {
                    content: '삭제',
                    onClick: () => {
                      setIsCommentModalOpen(true);
                    },
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
            )}
          </div>
        </div>
        {isCommentUpdating ? (
          <form className='w-100 flex gap-[20px] '>
            <input
              value={updatedComment}
              onChange={(e) => setUpdatedComment(e.target.value)}
              required
              className='min-w-0 h-[55px] flex-1 shrink bg-white rounded border border-[#E1E1E1] focus:border-black focus:!border-black px-5 py-3.5 flex gap-4'
            ></input>
            <Button
              width='shrink-0 w-[88px]'
              onClick={handleUpdatedCommentSubmit}
            >
              수정
            </Button>
            <button
              width='shrink-0 w-[44px]'
              onClick={() => {
                setUpdatedComment(comment.content);
                setIsCommentUpdating(false);
              }}
            >
              <svg
                width='24px'
                height='24px'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                style={{ pointerEvents: 'none' }}
              >
                <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
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
            </button>
          </form>
        ) : (
          <>
            <p>{comment.content}</p>
            <p className='text-sm sm:text-base text-[#B8B7B7]'>
              {formatTimestamp(comment.created_at)}
            </p>
          </>
        )}
      </div>
      <Modal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        onConfirm={handleCommentDelete}
        title='댓글 삭제'
        message='해당 댓글을 삭제하시겠습니까?'
        isDelete={true}
      />
    </>
  );
}
