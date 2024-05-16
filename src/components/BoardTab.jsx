import React from 'react';

export default function BoardTab({ children, isSelected, position }) {
  const positionStyles = {
    left: 'rounded-l text-left border-r border-[#E1E1E1]',
    center: 'rounded-none text-center border-r border-[#E1E1E1]',
    right: 'rounded-r text-right',
  };

  return (
    <>
      <div
        className={`w-[119px] sm:w-[127px] h-[37px] text-sm sm:rounded flex items-center justify-center cursor-pointer ${isSelected ? 'bg-red text-white' : 'bg-[#EEEEEE]'} ${positionStyles[position]}`}
      >
        {children}
      </div>
    </>
  );
}
