import * as Yup from 'yup';
import { Form, Field, Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateUser } from '../features/user/userActions';
import { User } from '../api/types';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type UpdateProfileModalProps = {
  closeModal: () => void;
};

export default function UpdateProfileModal({
  closeModal,
}: UpdateProfileModalProps) {
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state) => state.user);
  let { profileId } = useParams();

  if (!profileId) {
    profileId = '';
  }

  const minAgeLimit = 10;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const updateUserSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name must contain at least 3 character')
      .min(3, 'First Name must contain at least 3 character'),
    lastName: Yup.string()
      .required('Last Name must contain at least 3 character')
      .min(3, 'Last Name must contain at least 3 character'),
    email: Yup.string()
      .email('Please Enter a valid Email')
      .required('Please Enter a valid Email'),
    dob: Yup.date()
      .required('Date of Birth is required')
      .max(
        new Date(
          new Date().setFullYear(new Date().getFullYear() - minAgeLimit)
        ),
        `You must be at least ${minAgeLimit} years old`
      )
      .typeError('Date of Birth must be a valid date'),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={closeModal}
        className="fixed top-0 left-0 w-full h-screen bg-black opacity-70 z-40"
      />
      <div className="relative bg-white rounded-md shadow-lg z-50 w-[90%] lg:w-2/5 md:w-2/4 max-h-[90vh] overflow-y-auto">
        <Formik
          initialValues={{
            firstName: user?.firstName as string,
            lastName: user?.lastName as string,
            dob: formatDate(user?.dob.toString() as string),
            email: user?.email as string,
          }}
          validationSchema={updateUserSchema}
          onSubmit={async (values) => {
            const data: User = {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              dob: new Date(values.dob),
            };
            const result = await dispatch(updateUser({ profileId, data }));
            if (updateUser.fulfilled.match(result)) {
              toast.success('Profile Updated Successfully!');
              closeModal();
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="px-8 py-12">
              <h1 className="text-3xl font-primary font-semibold text-center text-primary">
                PeoplePlanet
              </h1>
              <h2 className="font-secondary text-sm text-gray-500 text-center leading-none mt-2">
                Please enter information to update
              </h2>
              <div className="w-full grid grid-cols-2">
                <div className="mt-4 flex flex-col pe-4">
                  <label htmlFor="firstName" className="text-primary italic">
                    First Name
                  </label>
                  <Field
                    name="firstName"
                    id="firstName"
                    className="focus:outline-none py-2 ps-2 border-b-2 bg-purple-100 border-purple-600"
                  />
                  {errors.firstName && touched.firstName ? (
                    <div className="text-red-600 text-xs">
                      {errors.firstName}
                    </div>
                  ) : null}
                </div>
                <div className="mt-4 flex flex-col">
                  <label htmlFor="lastName" className="text-primary italic">
                    Last Name
                  </label>
                  <Field
                    name="lastName"
                    id="lastName"
                    className="focus:outline-none py-2 ps-2 border-b-2 bg-purple-100 border-purple-600"
                  />
                  {errors.lastName && touched.lastName ? (
                    <div className="text-red-600 text-xs">
                      {errors.lastName}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 flex flex-col">
                <label className="text-primary italic" htmlFor="dob">
                  Date of Birth
                </label>
                <Field
                  name="dob"
                  id="dob"
                  type="date"
                  className="focus:outline-none py-2 px-2 border-b-2 bg-purple-100 border-purple-600"
                />
                {errors.dob && touched.dob ? (
                  <div className="text-red-600 text-xs">{errors.dob}</div>
                ) : null}
              </div>

              <div className="mt-4 flex flex-col">
                <label className="text-primary italic" htmlFor="email">
                  Email
                </label>
                <Field
                  name="email"
                  id="email"
                  className="focus:outline-none py-2 ps-2 border-b-2 bg-purple-100 border-purple-600"
                />
                {errors.email && touched.email ? (
                  <div className="text-red-600 text-xs">{errors.email}</div>
                ) : null}
              </div>
              <div className="w-full flex flex-col justify-center items-center mt-8">
                <button
                  disabled={loading}
                  type="submit"
                  className="bg-primary w-full text-white px-8 py-2 rounded-md"
                >
                  {loading ? 'Please wait...' : 'Update Profile'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
