import { BsThreeDots } from 'react-icons/bs';
import { FaRegThumbsUp } from 'react-icons/fa6';
import { FaRegComment } from 'react-icons/fa';

import { Post } from '../api/types';

const formatDate = (date: Date) => {
  const newDate = new Date(date);

  const formattedDate = newDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
  });

  const formattedTime = newDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return `${formattedDate}, at ${formattedTime}`;
};

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-4 flex flex-col mt-4">
      {posts.map((post) => (
        <div key={post._id} className="px-4 py-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                className="h-12 w-12 rounded-full transition-opacity duration-300 ease-in-out object-center border-2"
                src={
                  post.createdBy.profilePicture
                    ? `https://people-planet.onrender.com/uploads/${post.createdBy.profilePicture}`
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6YvRump6DC1zR3Bu5fz9358Gcgviuu5nag&s'
                }
                alt="Profile Picture"
              />
              <div>
                <p>
                  {post.createdBy.firstName} {post.createdBy.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </div>
            <div className="me-6">
              <button>
                <BsThreeDots size={24} />
              </button>
            </div>
          </div>
          <div className="mt-4 text-[15px] ">
            <p>{post.content}</p>
            <img
              src={`https://people-planet.onrender.com/uploads/${post.image}`}
              alt=""
              className="py-4 px-5 w-full object-cover"
            />
          </div>
          <div className="flex justify-between">
            <button className="flex gap-1 items-center">
              <FaRegThumbsUp size={24} /> <span>{post.likes.length}</span>
            </button>
            <button className="flex gap-1 items-center">
              <span>{post.comments.length}</span> <FaRegComment size={24} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
