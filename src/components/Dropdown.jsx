import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';

export default function Dropdown({ children, anchor, items }) {
  return (
    <Menu>
      <MenuButton>{children}</MenuButton>
      <Transition
        enter='transition ease-out duration-75'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='transition ease-in duration-100'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <MenuItems
          anchor={anchor}
          className='z-[60] py-1 rounded-[3px] shadow-dd mt-[15px]'
        >
          {items.map((item, index) => (
            <MenuItem key={index}>
              <p
                className='block bg-white hover:bg-[#F9F9F9] w-[120px] h-[37px] py-[5px] px-4'
                onClick={item.onClick}
              >
                {item.content}
              </p>
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
