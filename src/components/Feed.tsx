import { useState } from 'react';
import CreatePost from './CreatePost';
import CreatePostModal from './CreatePostModal';

export default function Feed() {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      {openModal && <CreatePostModal closeModal={handleModalClose} />}
      <CreatePost onClick={handleModalOpen} />
    </div>
  );
}
