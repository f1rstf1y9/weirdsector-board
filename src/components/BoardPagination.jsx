import { useEffect, useState } from 'react';
import { Pagination } from 'react-headless-pagination';

import PrevIcon from '@assets/icon-prev.svg';
import NextIcon from '@assets/icon-next.svg';

export default function BoardPagination({
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  const [siblingCount, setSiblingCount] = useState(4);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 640) {
        setSiblingCount(2);
      } else {
        setSiblingCount(4);
      }
    });
  }, [window.innerWidth]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Pagination
        totalPages={totalPages}
        edgePageCount={1}
        currentPage={currentPage}
        middlePagesSiblingCount={siblingCount}
        setCurrentPage={handlePageChange}
        className='flex'
        truncableText='...'
        truncableClassName=''
      >
        <Pagination.PrevButton className='cursor-pointer'>
          <img src={PrevIcon} alt='이전' />
        </Pagination.PrevButton>

        <nav className='flex justify-center text-sm px-[24px]'>
          <ul className='flex items-center gap-4'>
            <Pagination.PageButton
              activeClassName='text-red'
              inactiveClassName=''
              className='cursor-pointer'
            />
          </ul>
        </nav>

        <Pagination.NextButton className='cursor-pointer'>
          <img src={NextIcon} alt='다음' />
        </Pagination.NextButton>
      </Pagination>
    </>
  );
}
