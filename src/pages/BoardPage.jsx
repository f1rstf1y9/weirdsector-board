import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useBoardValidation from '@hook/useBoardValidation';

import BoardTable from '@components/BoardTable';
import BoardTab from '@components/BoardTab';
import BoardPagination from '@components/BoardPagination';
import Button from '@components/Button';

function BoardPage() {
  const { board } = useParams();

  const navigate = useNavigate();

  return (
    <>
      <div className='w-full flex flex-col items-center'>
        <div className='flex flex-col items-center mt-[80px] sm:mt-[100px] mb-[80px]'>
          <p className='text-base sm:text-xl text-red font-bold mb-2'>board</p>
          <h1 className='text-[26px] sm:text-[32px] font-bold'>자유게시판</h1>
        </div>
        <div className='flex flex-col items-center w-full mb-[80px] sm:mb-[100px]'>
          <div className='flex mb-[40px] sm:gap-3'>
            <BoardTab isSelected={true} position='left'>
              자유 게시판
            </BoardTab>
            <BoardTab isSelected={false} position='center'>
              질문 게시판
            </BoardTab>
            <BoardTab isSelected={false} position='right'>
              기타 게시판
            </BoardTab>
          </div>
          <ul className='mb-[20px] w-full'>
            {' '}
            <BoardTable
              id='No'
              title='제목'
              nickname='글쓴이'
              created_at='작성시간'
              view_count='조회수'
              type='head'
            />
            <BoardTable
              id='1'
              title='국가유공자·상이군경 및 전몰군경의 유가족은 법률이 정하는 바에 의하여 우선적으로 근로의 기회를 부여받는다.'
              nickname='홍길동'
              created_at='2020.01.29'
              view_count='124'
            />
          </ul>
          <div className='w-full flex items-start justify-center relative h-[106px] lg:h-[48px]'>
            <BoardPagination totalPages={13} />
            <div className='absolute bottom-0 lg:top-0 right-0'>
              <Button
                width='w-[127px]'
                height='h-[48px]'
                onClick={() => navigate('create-post')}
              >
                글쓰기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default useBoardValidation(BoardPage);
