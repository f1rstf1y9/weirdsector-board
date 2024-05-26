import NotFound from '@assets/not-found.png';

export default function NotFoundPage() {
  return (
    <>
      <div className='w-full h-[500px] flex items-center justify-center'>
        <img src={NotFound} alt='' width='300px' />
      </div>
    </>
  );
}
