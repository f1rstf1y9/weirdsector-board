import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <div className='relative bg-white w-full h-[356px] sm-[330px] border-t border-[#E1E1E1] pt-[40px] sm:pt-[60px] px-4 sm:px-0'>
        <div className='flex flex-col sm:flex-row sm:justify-between gap-5 sm:gap-0 sm:px-20 2xl:px-[390px]'>
          <div>
            <p className='text-base font-bold'>개발자 테스트용</p>
          </div>
          <div className='text-sm flex flex-col gap-1'>
            <p>대표 홍길동 ㅣ 사업자 등록 번호 123-4567-890</p>
            <p>서울특별시 가가동 나나로 111-2 8층</p>
            <p>통신 판매업 신고 제 2014-서울홍홍홍 0291호</p>
          </div>
          <div className='text-sm flex flex-col gap-1'>
            <p>고객지원 111-2345</p>
            <p>이메일 help@gmail.com</p>
            <p>평일 09:00 - 17:00 토,일 공휴일 휴무</p>
          </div>
        </div>
        <div className='absolute bottom-0 h-[90px] sm:h-[98px] w-[calc(100%-32px)] sm:w-full text-center text-[#B8B7B7] border-t border-[#EEEEEE]'>
          <div className='text-[10px] mt-5 sm:mt-6 font-semibold'>
            <Link to='#' className='mr-2'>
              이용약관
            </Link>
            <Link to='#'>개인정보처리방침</Link>
          </div>
          <p className='text-xs pt-1'>
            Copyrightⓒ2023 Data nugget All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
