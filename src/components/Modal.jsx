import { useEffect } from 'react';

export default function Modal({
  title,
  message,
  isOpen,
  onClose,
  onConfirm,
  isDelete,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          onClick={(e) => {
            onClose();
          }}
          className='z-[99] fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40'
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className='bg-white py-4 px-6 rounded-lg w-[358px] sm:w-[400px] h-[190px]'
          >
            <div className='w-full flex flex-col items-center mt-4'>
              <p className='text-lg mb-4 font-bold'>{title}</p>
              <p className='mb-4 text-[#414040]'>{message}</p>
            </div>

            <div className='flex justify-end h-[72px] gap-[10px] pt-4'>
              {isDelete && (
                <button
                  onClick={onClose}
                  className='bg-[#CFCFCF] hover:bg-[#DEDEDE] text-white text-sm rounded w-[58px] h-[40px]'
                >
                  취소
                </button>
              )}
              <button
                onClick={onConfirm}
                className='bg-black hover:bg-[#414040] text-white text-sm rounded w-[58px] h-[40px]'
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
