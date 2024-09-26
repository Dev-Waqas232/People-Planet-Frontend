import { useEffect, useState } from 'react';
import CreatePost from './CreatePost';
import CreatePostModal from './CreatePostModal';
import PostList from './PostsList';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getPosts } from '../features/posts/postActions';
import Spinner from './Spinner';
import { fetchFriends } from '../features/friends/friendsActions';

export default function Feed() {
  const [openModal, setOpenModal] = useState(false);
  const { posts, loading } = useAppSelector((state) => state.posts);

  const location = useLocation();
  const dispatch = useAppDispatch();

  console.log(loading);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(getPosts());
      dispatch(fetchFriends());
    }
  }, [location, dispatch]);

  return (
    <div>
      {openModal && <CreatePostModal closeModal={handleModalClose} />}
      <CreatePost onClick={handleModalOpen} />
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <PostList posts={posts} />
        </div>
      )}
    </div>
  );
}
