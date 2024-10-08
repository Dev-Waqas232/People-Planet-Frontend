import { useAppDispatch, useAppSelector } from '../hooks';
import { CiImageOn } from 'react-icons/ci';
import { FormEvent, useState } from 'react';
import { createPost } from '../features/posts/postActions';

type CreatePostModalProps = {
  closeModal: () => void;
};

export default function CreatePostModal({ closeModal }: CreatePostModalProps) {
  const { loading } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);
  const [postImage, setPostImage] = useState<File | null>(null);
  const [content, setContent] = useState('');
  const dispatch = useAppDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setPostImage(file);
  };

  const handleIconClick = () => {
    document.getElementById('fileInput')!.click();
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    if (user?._id) {
      formData.append('createdBy', user._id);
    }
    if (postImage) {
      console.log(postImage);
      formData.append('image', postImage);
    }

    dispatch(createPost(formData));
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={closeModal}
        className="fixed top-0 left-0 w-full h-screen bg-black opacity-70 z-40"
      />
      <div className="relative bg-white rounded-md shadow-lg z-50 w-[90%] lg:w-2/5 md:w-2/4 max-h-[90vh] overflow-y-auto">
        <form
          className="px-8 py-8"
          onSubmit={handleFormSubmit}
          encType="multipart/form-data"
        >
          <h1 className="text-2xl font-primary font-semibold text-center text-primary">
            Create Post
          </h1>

          <div className="mt-4 flex flex-col">
            <textarea
              className={`focus:outline-none ${
                content.length > 100 ? 'text-base' : 'text-xl'
              }`}
              rows={7}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`  What's on your mind, ${user?.firstName} ?`}
            ></textarea>
          </div>
          <div className="flex mt-8 bg-gray-200 py-3 px-4 items-center justify-between">
            <div className="">
              <p>Add image to your post</p>
            </div>
            <div>
              <input
                id="fileInput"
                className="hidden"
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e)}
              />
              <button
                type="button"
                onClick={handleIconClick}
                className="upload-icon-button"
              >
                <CiImageOn size={24} />
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center mt-4">
            <button
              disabled={loading || content.length <= 0}
              type="submit"
              className="bg-primary disabled:bg-gray-300 w-full text-white px-8 py-2 rounded-md"
            >
              {loading ? 'Please wait...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
