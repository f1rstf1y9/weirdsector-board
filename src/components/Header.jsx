import { Link } from 'react-router-dom';

import LoginButton from '@components/LoginButton.jsx';

export default function Header() {
  return (
    <>
      {/* viewport width 640px 이상 */}
      <nav class='hidden sm:px-[90px] 2xl:px-[400px] sm:flex justify-center items-center relative top-0 left-0 right-0 w-screen h-[88px] fill-white border-b border-[#E1E1E1]'>
        <div class='flex justify-between items-center w-full'>
          <div class='flex items-center '>
            <Link
              to='/'
              class='flex items-center h-[36px] text-2xl font-bold text-[#EE3918]'
            >
              Testsite
            </Link>
            <div class='flex text-lg ms-5 text-[#272727]'>
              <Link to='/' class='flex items-center px-[24px] h-[52px]'>
                게시판
              </Link>
              <Link to='dashboard' class='flex items-center px-[24px] h-[52px]'>
                대시보드
              </Link>
            </div>
          </div>
          <LoginButton />
        </div>
      </nav>
    </>
  );
}
