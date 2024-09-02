import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { IoIosNotifications } from 'react-icons/io';

export default function NotificationMenu() {
  return (
    <Menu>
      <MenuButton>
        <IoIosNotifications size={28} />
      </MenuButton>
      <MenuItems
        anchor="bottom start"
        className="bg-white custom-shadow-top w-1/4 min-w-[250px] mt-4 px-4 py-4"
      >
        <h2 className="font-bold font-primary text-2xl">Notifications</h2>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/settings">
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/support">
            Support
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/license">
            License
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
