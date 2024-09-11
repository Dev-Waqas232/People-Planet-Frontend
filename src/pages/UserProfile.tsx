import { useEffect, useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';

import { useAppDispatch, useAppSelector } from '../hooks';
import { getUser } from '../features/user/userActions';
import UpdateProfileModal from '../components/UpdateProfileModal';
import { IoMdCamera } from 'react-icons/io';
import ChangeProfilePicModal from '../components/ChangeProfilePicModal';

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const userId = JSON.parse(localStorage.getItem('user') as string);
  const { user } = useAppSelector((state) => state.user);

  const [modalOpen, setModalOpen] = useState(false);
  const [profilePicModal, setProfilePicModal] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handlePicModalOpen = () => {
    setProfilePicModal(true);
  };

  const handlePicModalClose = () => {
    setProfilePicModal(false);
  };

  useEffect(() => {
    dispatch(getUser(userId._id));
  }, []);

  const formatDate = (date: Date | undefined) => {
    const newDate = new Date(date!);
    const formattedDate = newDate?.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    console.log(formattedDate);
    return formattedDate;
  };

  return (
    <>
      {modalOpen && <UpdateProfileModal closeModal={handleModalClose} />}
      {profilePicModal && (
        <ChangeProfilePicModal closeModal={handlePicModalClose} />
      )}
      <div className="px-8 md:flex">
        {/* User Profile */}
        <div className="lg:w-1/4 md:w-2/6 w-full flex flex-col bg-white px-4 py-8 my-12 gap-6">
          <div className="relative flex justify-center items-center">
            <img
              className="h-40 w-40 rounded-full transition-opacity duration-300 ease-in-out border-2 object-center "
              src={
                user?.profilePicture
                  ? `http://localhost:5000/uploads/${user.profilePicture}`
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6YvRump6DC1zR3Bu5fz9358Gcgviuu5nag&s'
              }
              alt="Profile Picture"
            />
            <div
              className="absolute flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 rounded-full h-40 w-40 h-full cursor-pointer"
              onClick={handlePicModalOpen}
            >
              <IoMdCamera className="text-4xl text-white" />
            </div>
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
                <span>Born at {formatDate(user?.dob)}</span>
              </p>
              <p className="flex items-center gap-1">
                <CiMail />
                <span className="flex-shrink truncate">{user?.email}</span>
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
