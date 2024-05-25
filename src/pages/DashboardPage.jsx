import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@store/store.js';
import toast from 'react-hot-toast';
import {
  fetchPostsBetweenDates,
  fetchHashtagsForPosts,
  fetchHashtags,
  countPostsByDate,
  countPostsByDateAndBoard,
} from '../utils/fetchDashboardData.js';

import LineChart from '../components/LineChart';
import BarChart from '@components/BarChart';
import StackedBarChart from '@components/StackedBarChart';
import Modal from '@components/Modal';
import DateRangePicker from '@components/DateRangePicker';
import CalendarIcon from '@assets/icon-calendar.svg';
import ChevronDownIcon from '@assets/icon-chevron_down.svg';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const calendarRef = useRef(null);
  const calendarButtonRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [postCountsByDate, setPostCountsByDate] = useState(null);
  const [postCountsByDateAndBoard, setPostCountsByDateAndBoard] =
    useState(null);
  const [hashtagCounts, setHashtagCounts] = useState(null);

  const formattedDate = (date) => {
    return new Date(date)
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\.\s/g, '/')
      .replace(/\./g, '');
  };

  useEffect(() => {
    if (window.innerWidth < 640) {
      setIsModalOpen(true);
    }
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsModalOpen(true);
      } else {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        !calendarButtonRef.current.contains(event.target)
      ) {
        setIsShowCalendar(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedDate && selectedDate.length === 2) {
        try {
          const posts = await fetchPostsBetweenDates(
            selectedDate[0],
            selectedDate[1]
          );

          const postCountsByDateRes = countPostsByDate(
            posts,
            selectedDate[0],
            selectedDate[1]
          );
          setPostCountsByDate(postCountsByDateRes);

          const postIds = posts.map((post) => post.post_id);
          const hashtagIds = await fetchHashtagsForPosts(postIds);
          const hashtags = await fetchHashtags(hashtagIds);

          setHashtagCounts(hashtags);

          const postCountsByDateAndBoardRes = countPostsByDateAndBoard(
            posts,
            selectedDate[0],
            selectedDate[1]
          );
          setPostCountsByDateAndBoard(postCountsByDateAndBoardRes);
        } catch (error) {
          toast.error(
            '데이터를 불러오는 중에 오류가 발생했습니다. 다시 시도해주세요.'
          );
          console.error('Error fetching posts:', error.message);
        }
      }
    };

    fetchData();
  }, [selectedDate]);

  return (
    <>
      <nav className='fixed top-0 left-0 w-[280px] h-screen bg-color-white border-r border-[#E1E1E1]'>
        <div className='w-full flex flex-col mt-[40px] pl-[40px]'>
          <div className='flex items-center h-[76px] text-2xl font-bold text-[#EE3918]'>
            <Link to='/'>Testsite</Link>
          </div>
          <div className='flex items-center h-[76px] text-xl'>
            <Link to='#'>테스트 대시보드</Link>
          </div>

          <div className='flex items-center h-[76px] text-xl text-[#EE3918]'>
            <Link to='/dashboard'>기본 대시보드</Link>
          </div>
        </div>
      </nav>
      <div className='flex flex-col ml-[280px] min-h-screen'>
        <div className='flex items-center justify-between h-[50px] py-[10px] px-[20px] border-b border-[#E1E1E1]'>
          <p className='text-[#272727] font-bold text-xl'>기본 대시보드</p>
          <p>{user && `${user.nickname} 님`}</p>
        </div>
        <div className='flex flex-col flex-1 w-full h-full px-[40px] py-[20px] overflow-auto'>
          <div className='relative mb-[20px]'>
            <div
              ref={calendarButtonRef}
              onClick={() => setIsShowCalendar(!isShowCalendar)}
              className='flex items-center justify-between w-[268px] h-[32px] px-[16px] border border-[#EEEEEE] rounded-[8px] shadow-calendar cursor-pointer'
            >
              <div className='flex items-center gap-[8px]'>
                <img src={CalendarIcon} alt='' />
                <p className='text-sm font-suit font-medium'>
                  {selectedDate && selectedDate.length === 2
                    ? `${formattedDate(selectedDate[0])} - ${formattedDate(selectedDate[1])}`
                    : '날짜 선택'}
                </p>
              </div>
              <img src={ChevronDownIcon} alt='' />
            </div>
            {isShowCalendar && (
              <div ref={calendarRef} className='absolute top-[32px] z-10'>
                <DateRangePicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
            )}
          </div>
          <div className='lg:flex-1 grid gap-[20px] lg:grid-cols-2 items-stretch h-full'>
            {postCountsByDate && postCountsByDateAndBoard && hashtagCounts && (
              <>
                <div className='rounded border border-[#E1E1E1] min-h-[438px] lg:min-h-0 px-[28px] py-[20px] flex flex-col gap-[20px]'>
                  <p className='font-bold'>날짜별 게시글 등록 수</p>
                  <div className='w-full flex justify-end items-center gap-[12px]'>
                    <div className='bg-[#F58A91] w-[16px] h-[16px] rounded-full'></div>
                    <p className='text-xs font-medium'>게시글 등록수</p>
                  </div>
                  <div className='w-full flex-1'>
                    <LineChart data={postCountsByDate} />
                  </div>
                </div>
                <div className='rounded border border-[#E1E1E1] min-h-[438px] lg:min-h-0 px-[28px] py-[20px] flex flex-col gap-[20px]'>
                  <p className='font-bold'>해시태그별 게시글 등록 수</p>
                  <div className='w-full flex justify-end items-center gap-[12px]'>
                    <div className='bg-[#F58A91] w-[16px] h-[16px] rounded-full'></div>
                    <p className='text-xs font-medium'>게시글 등록수</p>
                  </div>
                  <div className='w-full flex-1'>
                    <BarChart data={hashtagCounts} />
                  </div>
                </div>
                <div className='rounded border border-[#E1E1E1] min-h-[438px] lg:min-h-0 px-[28px] py-[20px] flex flex-col gap-[20px]'>
                  <p className='font-bold'>게시판별 게시글 등록 수</p>
                  <div className='w-full flex justify-end items-center gap-[20px]'>
                    <div className='flex justify-end items-center gap-[12px]'>
                      <div className='bg-[#F58A91] w-[16px] h-[16px] rounded-full'></div>
                      <p className='text-xs font-medium'>자유게시판</p>
                    </div>
                    <div className='flex justify-end items-center gap-[12px]'>
                      <div className='bg-[#8AB2FF] w-[16px] h-[16px] rounded-full'></div>
                      <p className='text-xs font-medium'>질문게시판</p>
                    </div>
                    <div className='flex justify-end items-center gap-[12px]'>
                      <div className='bg-[#BFF2CB] w-[16px] h-[16px] rounded-full'></div>
                      <p className='text-xs font-medium'>기타게시판</p>
                    </div>
                  </div>
                  <div className='w-full flex-1'>
                    <StackedBarChart data={postCountsByDateAndBoard} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-white z-80'></div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          navigate('/');
        }}
        onConfirm={() => {
          setIsModalOpen(false);
          navigate('/');
        }}
        title='모바일에서 사용이 불가합니다.'
        message={`대시보드는 모바일에서 사용이 불가하므로
    PC 환경에서 접속해주세요. 감사합니다.`}
        isDelete={false}
      />
    </>
  );
}
