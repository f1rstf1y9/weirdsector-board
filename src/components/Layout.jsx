import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

export default function Layout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='fixed top-0 left-0 right-0 z-50'>
        <Header />
      </div>
      <div className='flex-grow px-4 sm:px-[78px] 2xl:px-[388px] mt-[52px] sm:mt-[88px]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
