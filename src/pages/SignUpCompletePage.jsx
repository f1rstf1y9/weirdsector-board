import Button from '@components/Button';
import CheckIcon from '@assets/icon-check.svg';

export default function SignUpCompletePage() {
  return (
    <>
      <div className='flex flex-col items-center my-[100px] sm:my-[200px]'>
        <div className='flex flex-col items-center gap-4 sm:gap-2 mb-[24px] sm:mb-[80px]'>
          <img src={CheckIcon} alt='회원가입 완료' className='w-[40px]' />
          <p className='font-bold text-xl sm:text-2xl'>
            회원가입이 완료되었습니다.
          </p>
          <p className='text-base sm:text-xl text-[#808080]'>축하드려요!</p>
        </div>
        <Button width='w-[142px]' height='h-[48px]'>
          로그인
        </Button>
      </div>
    </>
  );
}
