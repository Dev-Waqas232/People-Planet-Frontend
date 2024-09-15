import { useNavigate } from 'react-router-dom';

export default function UserOptions({ page }: { page: string }) {
  const navigate = useNavigate();

  console.log(page);

  const handleNavigate = (to: string) => {
    navigate(`?page=${to}`);
  };

  return (
    <nav className="w-full">
      <ul className="list-none flex w-full justify-between px-6 bg-white py-4 items-center">
        <li
          className={`cursor-pointer ${page === 'posts' ? 'text-primary' : ''}`}
          onClick={() => handleNavigate('posts')}
        >
          Posts
        </li>
        <li
          className={`cursor-pointer ${
            page === 'friends' ? 'text-primary' : ''
          }`}
          onClick={() => handleNavigate('friends')}
        >
          Friends
        </li>
        <li
          className={`cursor-pointer ${page === 'about' ? 'text-primary' : ''}`}
          onClick={() => handleNavigate('about')}
        >
          About
        </li>
        <li
          className={`cursor-pointer ${
            page === 'settings' ? 'text-primary' : ''
          }`}
          onClick={() => handleNavigate('settings')}
        >
          Settings
        </li>
      </ul>
    </nav>
  );
}
