import { FaUserFriends, FaHome } from 'react-icons/fa';
import { MdGroups } from 'react-icons/md';

import { NavLink } from 'react-router-dom';
import NotificationMenu from './NotificationMenu';
import UserMenu from './UserMenu';

export default function Navbar() {
  return (
    <nav className="flex w-full justify-between items-center bg-white py-5 md:px-8 px-2">
      <div>
        <h2 className="text-primary text-2xl font-primary font-semibold">
          PeoplePlanet
        </h2>
      </div>
      <div className="flex md:gap-8 gap-4 items-center">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'text-primary' : '')}
        >
          <FaHome size={28} />
        </NavLink>
        <NavLink
          to="/friends"
          className={({ isActive }) => (isActive ? 'text-primary' : '')}
        >
          <FaUserFriends size={28} />
        </NavLink>
        <NavLink
          to="/groups"
          className={({ isActive }) =>
            isActive
              ? 'text-primary border-primary border-2 rounded-full'
              : 'border-2 border-black rounded-full'
          }
        >
          <MdGroups size={32} />
        </NavLink>
      </div>
      <div className="flex items-center md:gap-8 gap-4">
        <NotificationMenu />
        <UserMenu />
      </div>
    </nav>
  );
}
