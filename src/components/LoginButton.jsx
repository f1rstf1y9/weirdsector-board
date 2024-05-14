import { Link } from 'react-router-dom';

export default function LoginButton() {
  return (
    <>
      <Link to='login' class='px-10 py-3 border border-[#E1E1E1] rounded'>
        <span class='text-lg text-[#272727]'>로그인</span>
      </Link>
    </>
  );
}
