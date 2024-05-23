import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@store/store.js';

import DateRangePicker from '@components/DateRangePicker';
import CalendarIcon from '@assets/icon-calendar.svg';
import ChevronDownIcon from '@assets/icon-chevron_down.svg';

export default function DashboardPage() {
  const { user } = useAuthStore();

  const calendarRef = useRef(null);
  const calendarButtonRef = useRef(null);
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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
          <p>기본 대시보드</p>
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
            <div className='rounded border border-[#E1E1E1] min-h-[438px] lg:min-h-0'></div>
            <div className='rounded border border-[#E1E1E1] min-h-[438px] lg:min-h-0'></div>
            <div className='rounded border border-[#E1E1E1] min-h-[438px] lg:min-h-0'></div>
          </div>
        </div>
      </div>
    </>
  );
}
