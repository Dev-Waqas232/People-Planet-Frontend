import { Field, Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../hooks';
import { resetPassword } from '../features/user/userActions';
import { toast } from 'react-toastify';
import { logout } from '../features/auth/authSlice';

export default function NewPassword() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { token } = useParams();

  const getPassword = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  return (
    <div className="pt-8">
      <Formik
        initialValues={{
          password: '',
        }}
        validationSchema={getPassword}
        onSubmit={async (values) => {
          const response = await dispatch(
            resetPassword({ password: values.password, token: token! })
          );
          if (resetPassword.fulfilled.match(response)) {
            toast.success('Password Updated Successfully');
            dispatch(logout());
            navigate('/auth/login');
          }
        }}
      >
        {({ errors, touched }) => (
          <Form
            className="mx-auto rounded-md shadow-lg bg-white px-8 py-12 xl:w-2/6
          lg:w-2/5 md:w-2/4 w-[90%] font-secondary"
          >
            <h1 className="text-3xl font-primary font-semibold text-center text-primary">
              PeoplePlanet
            </h1>
            <h2 className="font-secondary text-sm text-gray-500 text-center leading-none mt-2">
              Please enter your new password
            </h2>
            <div className="mt-8 flex flex-col">
              <label htmlFor="password" className="text-primary italic">
                Password
              </label>
              <Field
                name="password"
                id="password"
                className="focus:outline-none py-2 ps-2 border-b-2 bg-purple-100 border-purple-600"
              />
              {errors.password && touched.password ? (
                <div className="text-red-600 text-xs">{errors.password}</div>
              ) : null}
            </div>

            <div className="w-full flex flex-col justify-center items-center mt-8">
              <button
                disabled={loading}
                type="submit"
                className="bg-primary w-full text-white px-8 py-2 rounded-md"
              >
                {loading ? 'Please wait...' : 'Change Password'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
