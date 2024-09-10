import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../hooks';
import { requestResetPassword } from '../features/user/userActions';

export default function RequestResetPassword() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const getEmail = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Invalid Email'),
  });

  return (
    <div className="pt-8">
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={getEmail}
        onSubmit={async (values) => {
          const response = await dispatch(requestResetPassword(values.email));
          if (requestResetPassword.fulfilled.match(response)) {
            navigate('/reset-password', { state: values.email });
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
              Please enter your email to reset the password
            </h2>
            <div className="mt-8 flex flex-col">
              <label htmlFor="email" className="text-primary italic">
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
                {loading ? 'Please wait...' : 'Reset Password'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
