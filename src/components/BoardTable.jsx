import { Link } from 'react-router-dom';

export default function BoardTable({
  id,
  title,
  nickname,
  created_at,
  view_count,
  type,
}) {
  return (
    <>
      <li
        className={`w-full h-[45px] sm:h-[51px] border-b border-[#E1E1E1] bg-white hover:bg-[#F9F9F9] text-sm sm:text-base cursor-pointer ${type === 'head' && 'font-bold border-t-2 border-t-black hover:bg-white cursor-default'}`}
      >
        <Link to={`${id}`} className='w-full flex'>
          <div className='shrink-0 flex justify-center items-center w-[45px] sm:w-[62px] p-[12px]'>
            {id}
          </div>
          <div className='grow flex justify-center items-center overflow-hidden p-[12px]'>
            <p className='truncate'>{title}</p>
          </div>
          <div className='shrink-0 flex justify-center items-center w-[60px] sm:w-[80px] md:w-[120px] lg:w-[160px] p-[11px]'>
            <p className='truncate'>{nickname}</p>
          </div>
          <div className='shrink-0 hidden sm:flex justify-center items-center sm:w-[80px] md:w-[120px] lg:w-[160px] p-[12px]'>
            {created_at}
          </div>
          <div className='shrink-0 hidden sm:flex justify-center items-center sm:w-[80px] md:w-[120px] lg:w-[160px] p-[12px]'>
            {view_count}
          </div>
        </Link>
      </li>
    </>
  );
}
