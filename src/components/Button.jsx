import React from 'react';

export default function Button({ children, onClick, width, height }) {
  return (
    <button
      onClick={onClick}
      className={`bg-black hover:bg-[#414040] text-white text-sm sm:text-lg rounded ${width ? `${width}` : 'w-full'} ${height ? `${height}` : 'h-[52px]'}`}
    >
      {children}
    </button>
  );
}
