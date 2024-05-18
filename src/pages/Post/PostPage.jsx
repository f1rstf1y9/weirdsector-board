import { useParams } from 'react-router-dom';
import useBoardValidation from '@hook/useBoardValidation';

import Dropdown from '@components/Dropdown.jsx';
import Button from '@components/Button.jsx';

function PostPage() {
  const { board } = useParams();

  return (
    <>
      <div className='w-full flex justify-center sm:text-[20px]'>
        <div className='w-full sm:w-[1144px] flex flex-col gap-[40px] my-[80px] sm:my-[100px]'>
          <div className='flex flex-col gap-[20px]'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-[16px] items-center'>
                <svg
                  width='9'
                  height='14'
                  viewBox='0 0 9 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M7.49984 1.16663L1.6665 6.99996L7.49984 12.8333'
                    stroke='black'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <h1 className='font-bold text-[26px] sm:text-[32px]'>
                  게시글 제목 1
                </h1>
              </div>
              <Dropdown
                anchor='bottom start'
                items={[
                  {
                    content: '수정',
                    onClick: () => {},
                  },
                  {
                    content: '삭제',
                    onClick: () => {},
                  },
                ]}
              >
                <svg
                  width='4'
                  className='h-[18px] sm:h-[24px]'
                  viewBox='0 0 4 26'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M0 2.96863C0 3.49906 0.210713 4.00777 0.585786 4.38284C0.960859 4.75791 1.46957 4.96863 2 4.96863C2.53043 4.96863 3.03914 4.75791 3.41421 4.38284C3.78929 4.00777 4 3.49906 4 2.96863C4 2.4382 3.78929 1.92949 3.41421 1.55441C3.03914 1.17934 2.53043 0.968628 2 0.968628C1.46957 0.968628 0.960859 1.17934 0.585786 1.55441C0.210713 1.92949 0 2.4382 0 2.96863ZM0 12.9686C0 13.4991 0.210713 14.0078 0.585786 14.3828C0.960859 14.7579 1.46957 14.9686 2 14.9686C2.53043 14.9686 3.03914 14.7579 3.41421 14.3828C3.78929 14.0078 4 13.4991 4 12.9686C4 12.4382 3.78929 11.9295 3.41421 11.5544C3.03914 11.1793 2.53043 10.9686 2 10.9686C1.46957 10.9686 0.960859 11.1793 0.585786 11.5544C0.210713 11.9295 0 12.4382 0 12.9686V12.9686ZM0 22.9686C0 23.4991 0.210713 24.0078 0.585786 24.3828C0.960859 24.7579 1.46957 24.9686 2 24.9686C2.53043 24.9686 3.03914 24.7579 3.41421 24.3828C3.78929 24.0078 4 23.4991 4 22.9686C4 22.4382 3.78929 21.9295 3.41421 21.5544C3.03914 21.1793 2.53043 20.9686 2 20.9686C1.46957 20.9686 0.960859 21.1793 0.585786 21.5544C0.210713 21.9295 0 22.4382 0 22.9686V22.9686Z'
                    fill='black'
                  />
                </svg>
              </Dropdown>
            </div>
            <div className='flex items-center gap-[10px] text-sm sm:text-base'>
              <p>나는 호빵맨</p>
              <div className='w-1 h-[18px] border-r border-r-[#E1E1E1]'></div>
              <p>1분전</p>
              <div className='w-1 h-[18px] border-r border-r-[#E1E1E1]'></div>
              <p>조회수 145,3223</p>
            </div>
          </div>

          <div>
            모든 국민의 재산권은 보장된다. 그 내용과 한계는 법률로 정한다.
            대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을 때에는
            국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다.
            비상계엄하의 군사재판은 군인·군무원의 범죄나 군사에 관한 간첩죄의
            경우와 초병·초소·유독음식물공급·포로에 관한 죄중 법률이 정한 경우에
            한하여 단심으로 할 수 있다. 다만, 사형을 선고한 경우에는 그러하지
            아니하다. 누구든지 체포 또는 구속의 이유와 변호인의 조력을 받을
            권리가 있음을 고지받지 아니하고는 체포 또는 구속을 당하지 아니한다.
            체포 또는 구속을 당한 자의 가족등 법률이 정하는 자에게는 그 이유와
            일시·장소가 지체없이 통지되어야 한다. 국회는 국민의
            보통·평등·직접·비밀선거에 의하여 선출된 국회의원으로 구성한다.
            국회의원은 현행범인인 경우를 제외하고는 회기중 국회의 동의없이 체포
            또는 구금되지 아니한다. 평화통일정책의 수립에 관한 대통령의 자문에
            응하기 위하여 민주평화통일자문회의를 둘 수 있다. 대법원에 대법관을
            둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수
            있다. 대법원은 법률에 저촉되지 아니하는 범위안에서 소송에 관한 절차,
            법원의 내부규율과 사무처리에 관한 규칙을 제정할 수 있다.
            저작자·발명가·과학기술자와 예술가의 권리는 법률로써 보호한다.
            국무총리는 대통령을 보좌하며, 행정에 관하여 대통령의 명을 받아
            행정각부를 통할한다. 대한민국의 주권은 국민에게 있고, 모든 권력은
            국민으로부터 나온다. 근로조건의 기준은 인간의 존엄성을 보장하도록
            법률로 정한다. 모든 국민은 근로의 의무를 진다. 국가는 근로의 의무의
            내용과 조건을 민주주의원칙에 따라 법률로 정한다. 대법원과 각급법원의
            조직은 법률로 정한다. 환경권의 내용과 행사에 관하여는 법률로 정한다.
            군사재판을 관할하기 위하여 특별법원으로서 군사법원을 둘 수 있다.
            헌법에 의하여 체결·공포된 조약과 일반적으로 승인된 국제법규는
            국내법과 같은 효력을 가진다. 국민의 자유와 권리는 헌법에 열거되지
            아니한 이유로 경시되지 아니한다. 이 헌법시행 당시의 대법원장과
            대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에
            의하여 임명된 것으로 본다.
          </div>

          <div className='flex gap-[20px]'>
            <p className='text-red'>첨부된 파일</p>
            <p className='font-bold'>파일이름.pdf</p>
          </div>

          <div className='flex gap-[8px] text-sm sm:text-base'>
            <div className='h-[32px] px-[20px] bg-[#EEEEEE] flex items-center justify-center rounded-full'>
              #유머
            </div>
            <div className='h-[32px] px-[20px] bg-[#EEEEEE] flex items-center justify-center rounded-full'>
              #유익함
            </div>
            <div className='h-[32px] px-[20px] bg-[#EEEEEE] flex items-center justify-center rounded-full'>
              #해시태그
            </div>
            <div className='h-[32px] px-[20px] bg-[#EEEEEE] flex items-center justify-center rounded-full'>
              #유머
            </div>
          </div>

          <div className='flex gap-[20px]'>
            <input
              required
              className='h-[55px] flex-1 bg-white rounded border border-[#E1E1E1] focus:border-black focus:!border-black px-5 py-3.5 flex gap-4'
            ></input>
            <Button width='w-[88px] sm:w-[142px]'>댓글 작성</Button>
          </div>

          <hr />
          <div className='flex flex-col gap-[16px]'>
            <div className='flex items-center justify-between'>
              <p className='text-lg sm:text-xl font-bold'>나는 호빵맨</p>
              <Dropdown
                anchor='bottom start'
                items={[
                  {
                    content: '수정',
                    onClick: () => {},
                  },
                  {
                    content: '삭제',
                    onClick: () => {},
                  },
                ]}
              >
                <svg
                  width='4'
                  className='h-[18px] sm:h-[24px]'
                  viewBox='0 0 4 26'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M0 2.96863C0 3.49906 0.210713 4.00777 0.585786 4.38284C0.960859 4.75791 1.46957 4.96863 2 4.96863C2.53043 4.96863 3.03914 4.75791 3.41421 4.38284C3.78929 4.00777 4 3.49906 4 2.96863C4 2.4382 3.78929 1.92949 3.41421 1.55441C3.03914 1.17934 2.53043 0.968628 2 0.968628C1.46957 0.968628 0.960859 1.17934 0.585786 1.55441C0.210713 1.92949 0 2.4382 0 2.96863ZM0 12.9686C0 13.4991 0.210713 14.0078 0.585786 14.3828C0.960859 14.7579 1.46957 14.9686 2 14.9686C2.53043 14.9686 3.03914 14.7579 3.41421 14.3828C3.78929 14.0078 4 13.4991 4 12.9686C4 12.4382 3.78929 11.9295 3.41421 11.5544C3.03914 11.1793 2.53043 10.9686 2 10.9686C1.46957 10.9686 0.960859 11.1793 0.585786 11.5544C0.210713 11.9295 0 12.4382 0 12.9686V12.9686ZM0 22.9686C0 23.4991 0.210713 24.0078 0.585786 24.3828C0.960859 24.7579 1.46957 24.9686 2 24.9686C2.53043 24.9686 3.03914 24.7579 3.41421 24.3828C3.78929 24.0078 4 23.4991 4 22.9686C4 22.4382 3.78929 21.9295 3.41421 21.5544C3.03914 21.1793 2.53043 20.9686 2 20.9686C1.46957 20.9686 0.960859 21.1793 0.585786 21.5544C0.210713 21.9295 0 22.4382 0 22.9686V22.9686Z'
                    fill='black'
                  />
                </svg>
              </Dropdown>
            </div>

            <p>댓글</p>
            <p className='text-sm sm:text-base text-[#B8B7B7]'>
              2023.07.19 11:53:50
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default useBoardValidation(PostPage);
