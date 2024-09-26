import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import Spinner from '../components/Spinner';
import {
  acceptRequest,
  cancelRequest,
  removeFriend,
} from '../features/friends/friendsActions';
import { toast } from 'react-toastify';
import { filterFriendRequestsReceived } from '../features/friends/friendsSlice';

export default function Friends() {
  const { loading, friendRequestsReceived, friendRequestsSent, friends } =
    useAppSelector((state) => state.friends);
  const dispatch = useAppDispatch();

  if (loading) {
    return <Spinner />;
  }

  if (
    friendRequestsReceived.length === 0 &&
    friends.length === 0 &&
    friendRequestsSent.length === 0
  ) {
    return (
      <div className="mt-8 px-8">
        <Link to="/" className="bg-primary px-3 py-2 rounded-md text-white">
          Go Back
        </Link>
        <p className="mt-4">Your friends list is empty.</p>
      </div>
    );
  }

  const cancelFriendRequest = (id: string) => {
    dispatch(cancelRequest(id));
  };

  const acceptFriendRequest = async (id: string) => {
    const response = await dispatch(acceptRequest(id));
    if (acceptRequest.fulfilled.match(response)) {
      toast.success('Request Accepted');
      dispatch(filterFriendRequestsReceived(id));
    }
  };

  return (
    <section className="w-full flex flex-col   items-center">
      <div className="md:w-1/2 w-full mt-8">
        {friendRequestsReceived.length > 0 && (
          <h2 className="font-primary text-xl font-semibold mb-2">
            Friend Requests
          </h2>
        )}
        <div className="">
          {friendRequestsReceived.length > 0 &&
            friendRequestsReceived.map((friend) => (
              <div
                className="flex flex-col bg-white mb-4 py-3 px-4"
                key={friend._id}
              >
                <div className="flex items-center gap-4">
                  <img
                    className="h-16 w-16 rounded-full transition-opacity duration-300 ease-in-out object-center "
                    src={
                      friend.profilePicture
                        ? `http://localhost:5000/uploads/${friend.profilePicture}`
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6YvRump6DC1zR3Bu5fz9358Gcgviuu5nag&s'
                    }
                    alt="Profile Picture"
                  />
                  <p
                    className="cursor-pointer"
                    //   onClick={() => handleProfileNavigation(friend._id!)}
                  >
                    {friend.firstName} {friend.lastName}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => cancelFriendRequest(friend._id!)}
                    className="bg-gray-200 w-full mt-4 py-2 rounded-md text-black"
                  >
                    Cancel Request
                  </button>
                  <button
                    onClick={() => acceptFriendRequest(friend._id!)}
                    className="bg-primary w-full mt-4 py-2 rounded-md text-white"
                  >
                    Accept Request
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="md:w-1/2 w-full">
        {friendRequestsSent.length > 0 && (
          <h2 className="font-primary text-xl font-semibold mb-2">
            Requests Sent
          </h2>
        )}
        <div>
          {friendRequestsSent.length > 0 &&
            friendRequestsSent.map((friend) => (
              <div
                className="flex flex-col bg-white mb-4 py-3 px-4"
                key={friend._id}
              >
                <div className="flex items-center gap-4">
                  <img
                    className="h-16 w-16 rounded-full transition-opacity duration-300 ease-in-out object-center "
                    src={
                      friend.profilePicture
                        ? `http://localhost:5000/uploads/${friend.profilePicture}`
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6YvRump6DC1zR3Bu5fz9358Gcgviuu5nag&s'
                    }
                    alt="Profile Picture"
                  />
                  <p
                    className="cursor-pointer"
                    //   onClick={() => handleProfileNavigation(friend._id!)}
                  >
                    {friend.firstName} {friend.lastName}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    // onClick={() => addFriend(friend._id!)}
                    className="bg-gray-200 w-full mt-4 py-2 rounded-md text-black"
                  >
                    Cancel Request
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="md:w-1/2 w-full">
        {friends.length > 0 && (
          <h2 className="font-primary text-xl font-semibold mb-2">
            Your Friends
          </h2>
        )}
        <div>
          {friends.length > 0 &&
            friends.map((friend) => (
              <div
                className="flex flex-col bg-white mb-4 py-3 px-4"
                key={friend._id}
              >
                <div className="flex items-center gap-4">
                  <img
                    className="h-16 w-16 rounded-full transition-opacity duration-300 ease-in-out object-center "
                    src={
                      friend.profilePicture
                        ? `http://localhost:5000/uploads/${friend.profilePicture}`
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6YvRump6DC1zR3Bu5fz9358Gcgviuu5nag&s'
                    }
                    alt="Profile Picture"
                  />
                  <p
                    className="cursor-pointer"
                    //   onClick={() => handleProfileNavigation(friend._id!)}
                  >
                    {friend.firstName} {friend.lastName}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => dispatch(removeFriend(friend._id!))}
                    className="bg-primary w-full mt-4 py-2 rounded-md text-white"
                  >
                    Remove Friend
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
