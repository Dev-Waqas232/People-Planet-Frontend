import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getUser } from '../features/user/userActions';

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const userId = JSON.parse(localStorage.getItem('user') as string);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser(userId._id));
  }, []);

  return (
    <div>
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD4qmuiXoOrmp-skck7b7JjHA8Ry4TZyPHkw&s"
          alt="cover photo"
        />
        {user?.firstName}
      </div>
    </div>
  );
}
