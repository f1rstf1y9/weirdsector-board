import { useEffect, useState } from 'react';
import { Pagination } from 'react-headless-pagination';

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
          <svg
            width='20'
            height='21'
            viewBox='0 0 20 21'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12.5003 4.66675L6.66699 10.5001L12.5003 16.3334'
              stroke='black'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
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
          <svg
            width='20'
            height='21'
            viewBox='0 0 20 21'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6.66667 16.3333L12.5 10.4999L6.66667 4.66659'
              stroke='black'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Pagination.NextButton>
      </Pagination>
    </>
  );
}
