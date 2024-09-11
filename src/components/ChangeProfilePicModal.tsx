import { Formik, Form } from 'formik';
import { useAppDispatch } from '../hooks';
import { useState } from 'react';
import * as Yup from 'yup';
import { changleProfilePic } from '../features/user/userActions';
import { useParams } from 'react-router-dom';

type ChangeProfilePicModalProps = {
  closeModal: () => void;
};

const ProfilePicSchema = Yup.object().shape({
  profilePic: Yup.mixed().required('A profile picture is required'),
});

export default function ChangeProfilePicModal({
  closeModal,
}: ChangeProfilePicModalProps) {
  const dispatch = useAppDispatch();
  const [profilePic, setProfilePic] = useState<File | null>(null);
  let { profileId } = useParams();

  if (!profileId) profileId = '';

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    setProfilePic(file);
    setFieldValue('profilePic', file);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    if (profilePic) {
      formData.append('image', profilePic);
    }

    dispatch(changleProfilePic({ formData, profileId }));
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={closeModal}
        className="fixed top-0 left-0 w-full h-screen bg-black opacity-70 z-40"
      />
      <div className="relative bg-white rounded-md shadow-lg z-50 w-[90%] lg:w-2/5 md:w-2/4 max-h-[90vh] overflow-y-auto py-12 px-8">
        <Formik
          initialValues={{
            profilePic: null,
          }}
          validationSchema={ProfilePicSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form encType="multipart/form-data">
              <div>
                <label htmlFor="profilePic">Profile Picture</label>
                <input
                  id="profilePic"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                />
                {errors.profilePic && touched.profilePic && (
                  <div>{errors.profilePic}</div>
                )}
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  className="font-primary bg-primary w-full px-2 py-2 rounded-md text-white"
                >
                  Update Profile Picture
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-300 rounded-md px-2 py-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
