import classNames from 'classnames';
import DatePickerProvider, {
  Header,
  WeekDays,
  DaySlots,
} from 'headless-react-datepicker';

import 'headless-react-datepicker/dist/styles.css';

import PrevIcon from '@assets/icon-prev_arrow.svg';
import NextIcon from '@assets/icon-next_arrow.svg';
import { useEffect } from 'react';

export default function DateRangePicker() {
  useEffect(() => {
    const observer = new MutationObserver(addYear);
    const config = { childList: true, subtree: true };

    const targetNode = document.querySelector('.date-picker-container');
    if (targetNode) {
      observer.observe(targetNode, config);
    }

    addYear();

    return () => {
      observer.disconnect();
    };
  }, []);

  const addYear = () => {
    document.querySelectorAll('.add-year').forEach((elem) => {
      elem.text = elem.value + '년';
    });
  };

  const dayRenderer = (args) => {
    const {
      date,
      isSelectable,
      isDisabled,
      isInSelectedRange,
      isStartOfRange,
      isEndOfRange,
      isInWeekend,
      isSelected,
      handleClickSlot,
    } = args;

    function isSameDay(date1, date2) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    }

    const isToday = isSameDay(new Date(date), new Date());

    const dayOfWeek = new Date(date).getDay();
    const isSunday = dayOfWeek === 0;
    const isSaturday = dayOfWeek === 6;

    const enUSFormattedDay = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
    }).format(date);

    let background = 'transparent';
    if (isStartOfRange) {
      background = 'linear-gradient(to right, transparent 50%, #FFF1D1 50%)';
    } else if (isEndOfRange) {
      background = 'linear-gradient(to left, transparent 50%, #FFF1D1 50%)';
    }

    const slotClassName = classNames(
      'flex justify-center items-center h-[28px] ',
      {
        'w-full': !isSelected && isInSelectedRange,
        'w-[28px] ': isSelected || !isInSelectedRange,
        'font-bold': isToday,
        'font-medium': !isToday,
        'text-[#E1E1E1] pointer-events-none': isDisabled,
        'text-white bg-[#FFB300]': isSelected,
        'bg-[#FFF1D1]': isInSelectedRange && !isSelected,
        'text-[#FFA115]': isToday && !isSelected,
        'text-[#272727]': !isToday && !isSelected && !isDisabled,
        'cursor-pointer': isSelectable,
        'rounded-l': isSunday,
        'rounded-r': isSaturday,
        rounded: isSelected,
      }
    );

    return (
      <div
        className={`flex items-center justify-center my-[3px] relative`}
        style={{
          background: background,
        }}
      >
        <div className={slotClassName} onClick={() => handleClickSlot(date)}>
          {enUSFormattedDay}
        </div>
      </div>
    );
  };

  return (
    <div className='w-[268px] text-sm font-suit bg-white rounded-[8px] mx-auto shadow-calendar border border-[#EEEEEE]'>
      <div className='px-[21px] pt-[5.6px]'>
        <div>
          <DatePickerProvider
            calendar='gregory'
            config={{
              dayFormat: 'numeric',
              locale: 'ko-KR',
              otherDaysSelectable: false,
              showOtherDays: true,
              weekStartsOn: 'sunday',
              weekdayFormat: 'narrow',
              maxDate: Date.now(),
            }}
            isRange
            onChange={function Ya() {}}
          >
            <div className='py-[10.4px]'>
              <Header
                yearSelectClassName='add-year order-first font-bold text-base'
                yearOptionClassName='add-year order-first font-bold text-base'
                monthSelectClassName='-order-1 font-bold text-base mr-[30px]'
                leftIcon={
                  <div className='flex items-center justify-center w-[28.8px] h-[28.8px] rounded-[4.8px] bg-[#F9F9F9] order-[3]'>
                    <img src={PrevIcon}></img>
                  </div>
                }
                rightIcon={
                  <div className='flex items-center justify-center w-[28.8px] h-[28.8px] rounded-[4.8px] bg-[#F9F9F9] order-[4]'>
                    <img src={NextIcon}></img>
                  </div>
                }
              />
            </div>
            <WeekDays className='font-pretendard font-medium h-[28.8px]' />
            <DaySlots className='relative' dayRenderer={dayRenderer} />
          </DatePickerProvider>
        </div>
      </div>
      <div className='px-[20px] py-[16px] border-t border-[#EEEEEE]'>
        <p className='text-xs text-[#999999] font-semibold mb-[8px]'>
          빠른 선택
        </p>
        <div className='flex gap-[2px] font-pretendard'>
          <div className='text-xs border border-[#EEEEEE] px-[8px] rounded-[12px] cursor-pointer'>
            최근 1주일
          </div>
          <div className='text-xs border border-[#EEEEEE] px-[8px] rounded-[12px] cursor-pointer'>
            최근 30일
          </div>
        </div>
      </div>
    </div>
  );
}
