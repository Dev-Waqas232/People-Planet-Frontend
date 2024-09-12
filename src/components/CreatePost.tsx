import { useAppSelector } from '../hooks';

export default function CreatePost() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="bg-white px-4 py-3">
      <div className="flex gap-4">
        <div>
          <img
            className="h-12 w-12 rounded-full transition-opacity duration-300 ease-in-out object-center "
            src={
              user?.profilePicture
                ? `http://localhost:5000/uploads/${user.profilePicture}`
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6YvRump6DC1zR3Bu5fz9358Gcgviuu5nag&s'
            }
            alt="Profile Picture"
          />
        </div>
        <div className="bg-gray-200  w-[90%] rounded-full cursor-pointer flex px-6 items-center">
          <p className="text-gray-600">What's on your mind ?</p>
        </div>
      </div>
    </div>
  );
}
