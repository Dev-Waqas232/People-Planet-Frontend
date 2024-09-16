import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { suggestFriends } from '../features/friends/friendsActions';
import Spinner from './Spinner';

export default function ShowFriendsSuggestions() {
  const dispatch = useAppDispatch();
  const { loading, friendSuggestions } = useAppSelector(
    (state) => state.friends
  );

  useEffect(() => {
    dispatch(suggestFriends());
  }, []);

  const handleProfileNavigation = (id: string) => {};

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold font-primary">
        People You May Know
      </h2>
      {friendSuggestions.map((friend) => (
        <div className="flex flex-col bg-white mb-4 py-3 px-4" key={friend._id}>
          <div className="flex items-center gap-4">
            <img
              className="h-8 w-8 rounded-full transition-opacity duration-300 ease-in-out object-center "
              src={
                friend.profilePicture
                  ? `http://localhost:5000/uploads/${friend.profilePicture}`
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6YvRump6DC1zR3Bu5fz9358Gcgviuu5nag&s'
              }
              alt="Profile Picture"
            />
            <p
              className="cursor-pointer"
              onClick={() => handleProfileNavigation(friend._id!)}
            >
              {friend.firstName} {friend.lastName}
            </p>
          </div>
          <button className="bg-primary mt-4 py-2 rounded-md text-white">
            Add Friend
          </button>
        </div>
      ))}
    </div>
  );
}
