import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/index.js';
import { useAuthStore } from '../store/store.js';

import LoginButton from '@components/LoginButton.jsx';
import Dropdown from '@components/Dropdown.jsx';
import MenuIcon from '@assets/icon-menu.svg';

export default function Header() {
  const { user } = useAuthStore();
  const { pathname } = useLocation();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  useEffect(() => {
    setIsSideBarOpen(false);
  }, [pathname]);

  return (
    <>
      {/* viewport width 640px 이상 */}
      <nav className='hidden sm:px-[90px] 2xl:px-[400px] sm:flex justify-center items-center w-screen h-[88px] bg-white border-b border-[#E1E1E1]'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center '>
            <Link
              to='/'
              className='flex items-center h-[36px] text-2xl font-bold text-[#EE3918]'
            >
              Testsite
            </Link>
            <div className='flex text-lg ms-5 text-[#272727]'>
              <Link to='/' className='flex items-center px-[24px] h-[52px]'>
                게시판
              </Link>
              <Link
                to='dashboard'
                className='flex items-center px-[24px] h-[52px]'
              >
                대시보드
              </Link>
            </div>
          </div>
          {user ? (
            <Dropdown
              anchor='bottom end'
              items={[
                {
                  content: '로그아웃',
                  onClick: () => supabase.auth.signOut(),
                },
              ]}
            >
              <p className='font-bold text-xl'>{user.nickname} 님</p>
            </Dropdown>
          ) : (
            <LoginButton />
          )}
        </div>
      </nav>

      {/* viewport width 640px 미만 */}
      <nav className='flex sm:hidden justify-center items-center w-screen h-[52px] bg-white border-b border-[#E1E1E1]'>
        <button onClick={toggleSideBar} className='absolute start-4'>
          <img src={MenuIcon} alt='메뉴 버튼' />
        </button>
        <Link
          to='/'
          className='flex items-center h-[36px] text-xl font-bold text-[#EE3918]'
        >
          Testsite
        </Link>
      </nav>

      {isSideBarOpen && (
        <>
          <div
            onClick={toggleSideBar}
            className='fixed top-0 left-0 z-10 w-screen h-screen bg-modalBg sm:hidden'
          ></div>
          <div className='fixed top-0 left-0 z-20 w-8/12 h-screen bg-white sm:hidden'>
            <div className='flex flex-col items-start p-10'>
              <div className='flex items-center h-[88px]'>
                {user ? (
                  <p className='font-bold text-xl'>{user.nickname} 님</p>
                ) : (
                  <LoginButton />
                )}
              </div>
              <Link to='/' className='flex items-center h-[70px] text-xl'>
                게시판
              </Link>
              <div
                onClick={() => {
                  showModal();
                  toggleSideBar();
                }}
                className='flex items-center h-[70px] text-xl cursor-pointer'
              >
                대시보드(모바일 불가)
              </div>
              {user && (
                <div
                  onClick={() => {
                    supabase.auth.signOut();
                    toggleSideBar();
                  }}
                  className='flex items-center h-[70px] text-xl text-slate-400 cursor-pointer'
                >
                  로그아웃
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
