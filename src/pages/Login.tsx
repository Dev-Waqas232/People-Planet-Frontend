import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { loginUser } from '../features/auth/authActions';
import { useAppDispatch, useAppSelector } from '../hooks';
import { toast } from 'react-toastify';

export default function Login() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Invalid Email'),
    password: Yup.string().required('Invalid Password'),
  });

  return (
    <div className="pt-8">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          const credentials = {
            email: values.email,
            password: values.password,
          };
          const result = await dispatch(loginUser(credentials));
          if (loginUser.fulfilled.match(result)) {
            toast.success('Login Successfully');
            navigate('/');
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
              Welcome Back, please login to your accout to continue
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
                {loading ? 'Please wait...' : 'Login'}
              </button>
              <Link to="/auth/register" className="mt-4 text-sm">
                Don't have an account?{' '}
                <span className="text-primary underline">Register Now</span>{' '}
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
