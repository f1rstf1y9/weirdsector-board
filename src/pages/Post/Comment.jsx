import { useState } from 'react';
import { supabase } from '../../supabase';

import Dropdown from '@components/Dropdown.jsx';
import Button from '@components/Button.jsx';
import Modal from '@components/Modal';
import CloseIcon from '@assets/icon-close.svg';
import KebabIcon from '@assets/icon-kebab.svg';

export default function Comment({
  comment,
  user,
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
                <img src={KebabIcon} alt='댓글 메뉴 보기' />
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
              <img src={CloseIcon} alt='댓글 수정 취소' />
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
