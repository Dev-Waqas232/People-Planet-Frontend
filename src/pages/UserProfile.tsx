import { useEffect, useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';

import { useAppDispatch, useAppSelector } from '../hooks';
import { getUser } from '../features/user/userActions';
import UpdateProfileModal from '../components/UpdateProfileModal';

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const userId = JSON.parse(localStorage.getItem('user') as string);
  const { user } = useAppSelector((state) => state.user);

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    dispatch(getUser(userId._id));
  }, []);

  return (
    <>
      {modalOpen && <UpdateProfileModal closeModal={handleModalClose} />}
      <div className="px-8 md:flex">
        {/* User Profile */}
        <div className="md:w-4/12 w-full flex flex-col bg-white px-4 py-8 my-12 gap-6">
          <div className="flex justify-center items-center">
            <img
              className="w-4/6 rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6YvRump6DC1zR3Bu5fz9358Gcgviuu5nag&s"
              alt=""
            />
          </div>
          <div>
            <h2 className="text-2xl font-primary text-center">
              {' '}
              {user?.firstName} {user?.lastName}{' '}
            </h2>
            <p className="text-center">ADD BIO</p>
            <div className="mt-4">
              <p className="flex items-center gap-1">
                <FaRegCalendarAlt />
                <span>Born at {}</span>
              </p>
              <p className="flex items-center gap-1">
                <CiMail />
                <span>{user?.email}</span>
              </p>
            </div>

            <div className="flex justify-center items-center mt-4">
              <button
                className="font-primary bg-primary w-full px-2 py-2 rounded-md text-white"
                onClick={handleModalOpen}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
