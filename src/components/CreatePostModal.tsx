import { useAppSelector } from '../hooks';
import { CiImageOn } from 'react-icons/ci';
import { useState } from 'react';

type CreatePostModalProps = {
  closeModal: () => void;
};

export default function CreatePostModal({ closeModal }: CreatePostModalProps) {
  const loading = false;
  const { user } = useAppSelector((state) => state.user);
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setProfilePic(file);
  };

  const handleIconClick = () => {
    document.getElementById('fileInput')!.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={closeModal}
        className="fixed top-0 left-0 w-full h-screen bg-black opacity-70 z-40"
      />
      <div className="relative bg-white rounded-md shadow-lg z-50 w-[90%] lg:w-2/5 md:w-2/4 max-h-[90vh] overflow-y-auto">
        <form className="px-8 py-8">
          <h1 className="text-2xl font-primary font-semibold text-center text-primary">
            Create Post
          </h1>

          <div className="mt-4 flex flex-col">
            <textarea
              className="focus:outline-none text-xl"
              rows={7}
              name=""
              id=""
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
              disabled={loading}
              type="submit"
              className="bg-primary w-full text-white px-8 py-2 rounded-md"
            >
              {loading ? 'Please wait...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
