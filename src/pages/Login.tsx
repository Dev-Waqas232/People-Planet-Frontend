import { Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

export default function Login() {
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
        onSubmit={(values) => console.log(values)}
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
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                id="email"
                className="focus:outline-none border-b-2"
              />
              {errors.email && touched.email ? (
                <div className="text-red-600 text-xs">{errors.email}</div>
              ) : null}
            </div>
            <div className="mt-8 flex flex-col">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                id="password"
                className="focus:outline-none border-b-2"
              />
              {errors.password && touched.password ? (
                <div className="text-red-600 text-xs">{errors.password}</div>
              ) : null}
            </div>
            <div className="w-full flex flex-col justify-center items-center mt-8">
              <button
                type="submit"
                className="bg-primary w-full text-white px-8 py-2 rounded-md"
              >
                Login
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
