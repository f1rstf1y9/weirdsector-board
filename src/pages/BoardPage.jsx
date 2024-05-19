import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useBoardValidation from '@hook/useBoardValidation';
import { useAuthStore } from '@store/store.js';
import { supabase } from '../supabase';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

import BoardTable from '@components/BoardTable';
import BoardTab from '@components/BoardTab';
import BoardPagination from '@components/BoardPagination';
import Button from '@components/Button';

function BoardPage() {
  const { board } = useParams();
  const { user } = useAuthStore();

  const navigate = useNavigate();

  const [totalPages, setTotalPages] = useState(0);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 10;

  useEffect(() => {
    setCurrentPage(0);
    const fetchTotalPostsCount = async () => {
      const { count, error } = await supabase
        .from('posts')
        .select('count', { count: 'exact' })
        .eq('board', board);
      if (error) {
        console.error('Error fetching total posts count:', error.message);
      } else {
        const totalPostsCount = count ?? 0;
        const calculatedTotalPages = Math.ceil(totalPostsCount / postsPerPage);
        setTotalPages(calculatedTotalPages);
      }
    };

    fetchTotalPostsCount();
  }, [board]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .eq('board', board)
        .order('created_at', { ascending: false })
        .range(
          currentPage * postsPerPage,
          (currentPage + 1) * postsPerPage - 1
        );

      if (error) {
        console.error('Error fetching posts:', error.message);
      } else {
        setDisplayedPosts(posts);
      }
    };

    fetchPosts();
  }, [board, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatTimestamp = (timestamp) => {
    const date = parseISO(timestamp);
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
  };

  return (
    <>
      <div className='w-full flex flex-col items-center'>
        <div className='flex flex-col items-center mt-[80px] sm:mt-[100px] mb-[80px]'>
          <p className='text-base sm:text-xl text-red font-bold mb-2'>board</p>
          <h1 className='text-[26px] sm:text-[32px] font-bold'>
            {board === 'free'
              ? '자유 게시판'
              : board === 'qna'
                ? '질문 게시판'
                : '기타 게시판'}
          </h1>
        </div>
        <div className='flex flex-col items-center w-full mb-[80px] sm:mb-[100px]'>
          <div className='flex mb-[40px] sm:gap-3'>
            <BoardTab isSelected={board === 'free'} position='left' path='free'>
              자유 게시판
            </BoardTab>
            <BoardTab isSelected={board === 'qna'} position='center' path='qna'>
              질문 게시판
            </BoardTab>
            <BoardTab isSelected={board === 'etc'} position='right' path='etc'>
              기타 게시판
            </BoardTab>
          </div>
          <ul className='mb-[20px] w-full'>
            <BoardTable
              id='No'
              title='제목'
              nickname='글쓴이'
              created_at='작성시간'
              view_count='조회수'
              type='head'
            />
            {displayedPosts.map((post) => (
              <BoardTable
                key={post.post_id}
                id={post.post_id}
                title={post.title}
                nickname={post.user_nickname}
                created_at={formatTimestamp(post.created_at)}
                view_count={post.view_counts}
              />
            ))}
          </ul>
          <div className='w-full flex items-start justify-center relative h-[106px] lg:h-[48px]'>
            <BoardPagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
            />
            <div className='absolute bottom-0 lg:top-0 right-0'>
              {user && (
                <Button
                  width='w-[127px]'
                  height='h-[48px]'
                  onClick={() => navigate('create-post')}
                >
                  글쓰기
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default useBoardValidation(BoardPage);
