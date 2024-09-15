import { FaRegCalendarAlt } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';
import { IoMdCamera } from 'react-icons/io';
import { User } from '../api/types';

const formatDate = (date: Date | undefined) => {
  const newDate = new Date(date!);
  const formattedDate = newDate?.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return formattedDate;
};

type UserProfileProps = {
  user: User;
  openPicModal: () => void;
  openModal: () => void;
};

export default function UserProfile({
  openModal,
  openPicModal,
  user,
}: UserProfileProps) {
  return (
    <div className="lg:w-1/4 md:w-2/6 w-full flex flex-col bg-white px-4 py-8  gap-6">
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
          className="absolute flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 rounded-full h-40 w-40 cursor-pointer"
          onClick={openPicModal}
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
            onClick={openModal}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
