import { Link } from 'react-router-dom';
import { useAuthStore } from '@store/store.js';

export default function DashboardPage() {
  const { user } = useAuthStore();

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
