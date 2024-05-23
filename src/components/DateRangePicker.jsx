import React, { useEffect, useCallback } from 'react';
import classNames from 'classnames';
import DatePickerProvider, {
  Header,
  WeekDays,
  DaySlots,
} from 'headless-react-datepicker';

import 'headless-react-datepicker/dist/styles.css';

import PrevIcon from '@assets/icon-prev_arrow.svg';
import NextIcon from '@assets/icon-next_arrow.svg';

function DateRangePicker({ selectedDate, setSelectedDate }) {
  const areDatesEqual = (dates1, dates2) => {
    if (!dates1 || !dates2) return false;
    if (dates1.length !== dates2.length) return false;
    for (let i = 0; i < dates1.length; i++) {
      if (dates1[i] !== dates2[i]) return false;
    }
    return true;
  };

  const handleQuickSelect = (days) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days + 1);
    const dates = [startDate, endDate];
    if (dates && !areDatesEqual(dates, selectedDate)) {
      setSelectedDate(dates);
    }
  };

  const addYear = useCallback(() => {
    document.querySelectorAll('.add-year').forEach((elem) => {
      elem.text = `${elem.value}년`;
    });
  }, []);

  useEffect(() => {
    addYear();
    const observer = new MutationObserver(addYear);
    const config = { childList: true, subtree: true };
    const targetNode = document.querySelector('.date-picker-container');
    if (targetNode) {
      observer.observe(targetNode, config);
    }
    return () => {
      observer.disconnect();
    };
  }, [addYear]);

  const dayRenderer = (args) => {
    const { date, isSelectable, isDisabled, handleClickSlot } = args;
    let { isInSelectedRange, isStartOfRange, isEndOfRange, isSelected } = args;

    const isToday = date.toDateString() === new Date().toDateString();
    if (selectedDate && selectedDate.length === 2) {
      isInSelectedRange = date >= selectedDate[0] && date <= selectedDate[1];
      isStartOfRange = date.toDateString() === selectedDate[0].toDateString();
      isEndOfRange = date.toDateString() === selectedDate[1].toDateString();
      isSelected = isStartOfRange || isEndOfRange;
    }

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
        key={date}
        className={`flex items-center justify-center my-[3px] relative`}
        style={{ background: background }}
      >
        <div
          className={slotClassName}
          onClick={() => {
            let newSelectedDate;
            if (
              !selectedDate ||
              selectedDate.length === 2 ||
              date < selectedDate[0]
            ) {
              newSelectedDate = [date];
            } else if (selectedDate.length === 1 && date > selectedDate[0]) {
              newSelectedDate = [selectedDate[0], date];
            }
            setSelectedDate(newSelectedDate);
            handleClickSlot(date);
          }}
        >
          {enUSFormattedDay}
        </div>
      </div>
    );
  };

  return (
    <div className='date-picker-container w-[268px] text-sm font-suit bg-white rounded-[8px] mx-auto shadow-calendar border border-[#EEEEEE]'>
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
          >
            <div className='py-[10.4px]'>
              <Header
                yearSelectClassName='add-year order-first font-bold text-base'
                yearOptionClassName='add-year order-first font-bold text-base'
                monthSelectClassName='-order-1 font-bold text-base mr-[30px]'
                leftIcon={
                  <div className='flex items-center justify-center w-[28.8px] h-[28.8px] rounded-[4.8px] bg-[#F9F9F9] order-[3]'>
                    <img src={PrevIcon} alt='Previous'></img>
                  </div>
                }
                rightIcon={
                  <div className='flex items-center justify-center w-[28.8px] h-[28.8px] rounded-[4.8px] bg-[#F9F9F9] order-[4]'>
                    <img src={NextIcon} alt='Next'></img>
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
          <div
            onClick={() => handleQuickSelect(7)}
            className='text-xs border border-[#EEEEEE] px-[8px] rounded-[12px] cursor-pointer'
          >
            최근 1주일
          </div>
          <div
            onClick={() => handleQuickSelect(30)}
            className='text-xs border border-[#EEEEEE] px-[8px] rounded-[12px] cursor-pointer'
          >
            최근 30일
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(DateRangePicker);
