import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { getUser } from '../features/user/userActions';
import UpdateProfileModal from '../components/UpdateProfileModal';
import ChangeProfilePicModal from '../components/ChangeProfilePicModal';
import UserProfile from '../components/UserProfile';
import UserOptions from '../components/UserOptions';
import { useSearchParams } from 'react-router-dom';
import PostList from '../components/PostsList';
import { getPosts } from '../features/posts/postActions';
import Spinner from '../components/Spinner';

export default function User() {
  const dispatch = useAppDispatch();
  const userId = JSON.parse(localStorage.getItem('user') as string);
  const { user } = useAppSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [profilePicModal, setProfilePicModal] = useState(false);
  const { posts, loading } = useAppSelector((state) => state.posts);

  const page = searchParams.get('page');
  let activePage;

  if (page === 'about') {
    activePage = 'About';
  } else if (page === 'friends') {
    activePage = 'Friends';
  } else if (page === 'settings') {
    activePage = 'Settings';
  } else {
    activePage = <PostList posts={posts} />;
  }

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
    dispatch(getPosts(userId._id));
  }, []);

  return (
    <>
      {modalOpen && <UpdateProfileModal closeModal={handleModalClose} />}
      {profilePicModal && (
        <ChangeProfilePicModal closeModal={handlePicModalClose} />
      )}
      <div className="px-8 md:flex gap-4 my-8">
        <UserProfile
          user={user!}
          openModal={handleModalOpen}
          openPicModal={handlePicModalOpen}
        />
        <div className="w-full">
          <UserOptions page={page!} />
          {loading ? <Spinner /> : activePage}
        </div>
      </div>
    </>
  );
}
