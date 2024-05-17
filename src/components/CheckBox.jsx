import { Checkbox } from '@headlessui/react';

export default function CheckBox({ onChange, isChecked }) {
  return (
    <Checkbox
      checked={isChecked}
      onChange={onChange}
      className='group block w-6 h-6 rounded-[5px] border bg-[#F9F9F9] border-[#E1E1E1] data-[checked]:bg-black data-[checked]:border-none flex justify-center items-center'
    >
      <svg
        className='stroke-white opacity-0 group-data-[checked]:opacity-100'
        xmlns='http://www.w3.org/2000/svg'
        width='12'
        height='9'
        viewBox='0 0 12 9'
        fill='none'
      >
        <path
          d='M10.334 0.999349L3.66731 7.66602L1.00065 4.99935'
          stroke='white'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </Checkbox>
  );
}
