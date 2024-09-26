import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { IoSettings } from 'react-icons/io5';
import { IoIosLogOut } from 'react-icons/io';

import { useAppDispatch } from '../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { removeUser } from '../features/user/userSlice';

export default function UserMenu() {
  const user = JSON.parse(localStorage.getItem('user') as string);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeUser());
    navigate('/auth/login');
  };

  return (
    <Menu>
      <MenuButton>
        <div className="w-9 h-9 rounded-full">
          <img
            className="object-fill object-center rounded-full w-9 h-9 "
            src={
              user?.profilePicture
                ? `https://people-planet.onrender.com/uploads/${user?.profilePicture}`
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6YvRump6DC1zR3Bu5fz9358Gcgviuu5nag&s'
            }
            alt=""
          />
        </div>
      </MenuButton>
      <MenuItems
        anchor="bottom start"
        className="bg-white flex flex-col justify-start items-start custom-shadow-top w-1/4 min-w-[250px] mt-4 space-y-2 px-4 py-4"
      >
        <h2 className="font-bold font-primary text-2xl px-2">
          {user?.firstName} {user?.lastName}
        </h2>
        <MenuItem>
          <Link
            to={`/user/${user?._id}?page=posts`}
            className=" data-[focus]:bg-gray-200 px-2 w-full rounded-md flex items-center gap-2 py-2"
          >
            <div className="w-6 h-6 rounded-full">
              <img
                className="object-fill object-center rounded-full w-6 h-6 "
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6YvRump6DC1zR3Bu5fz9358Gcgviuu5nag&s"
                alt=""
              />
            </div>
            View Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to="/settings"
            className=" data-[focus]:bg-gray-200 px-2 w-full rounded-md flex items-center gap-2 py-2"
          >
            <IoSettings />
            Settings
          </Link>
        </MenuItem>
        <MenuItem>
          <button
            onClick={handleLogout}
            className=" data-[focus]:bg-gray-200 px-2 w-full rounded-md flex items-center gap-2  py-2"
          >
            <IoIosLogOut />
            Logout
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
