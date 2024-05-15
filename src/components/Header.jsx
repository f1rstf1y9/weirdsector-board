import { Link } from 'react-router-dom';
import { useState } from 'react';

import LoginButton from '@components/LoginButton.jsx';
import MenuIcon from '@assets/icon-menu.svg';

export default function Header() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <>
      {/* viewport width 640px 이상 */}
      <nav class='hidden sm:px-[90px] 2xl:px-[400px] sm:flex justify-center items-center w-screen h-[88px] bg-white border-b border-[#E1E1E1]'>
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

      {/* viewport width 640px 미만 */}
      <nav class='flex sm:hidden justify-center items-center w-screen h-[52px] bg-white border-b border-[#E1E1E1]'>
        <button onClick={toggleSideBar} class='absolute start-4'>
          <img src={MenuIcon} alt='메뉴 버튼' />
        </button>
        <Link
          to='/'
          class='flex items-center h-[36px] text-xl font-bold text-[#EE3918]'
        >
          Testsite
        </Link>
      </nav>

      {isSideBarOpen && (
        <>
          <div
            onClick={toggleSideBar}
            class='fixed top-0 left-0 z-10 w-screen h-screen bg-modalBg sm:hidden'
          ></div>
          <div class='fixed top-0 left-0 z-20 w-8/12 h-screen bg-white sm:hidden'>
            <div class='flex flex-col items-start p-10'>
              <div class='flex items-center h-[88px]'>
                <LoginButton />
              </div>
              <Link to='/' class='flex items-center h-[70px] text-xl'>
                게시판
              </Link>
              <button
                onClick={() => {
                  showModal();
                  toggleSideBar();
                }}
                class='flex items-center h-[70px] text-xl'
              >
                대시보드(모바일 불가)
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
