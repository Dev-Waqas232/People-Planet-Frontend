import { Formik, Field, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../hooks';
import { registerUser } from '../features/auth/authActions';
import { toast } from 'react-toastify';

export default function Register() {
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const minAgeLimit = 10;

  const registerSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name must contain at least 3 character')
      .min(3, 'First Name must contain at least 3 character'),
    lastName: Yup.string()
      .required('Last Name must contain at least 3 character')
      .min(3, 'Last Name must contain at least 3 character'),
    email: Yup.string()
      .email('Please Enter a valid Email')
      .required('Please Enter a valid Email'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    c_password: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
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
    <div className="pt-8">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          dob: '',
          email: '',
          password: '',
          c_password: '',
        }}
        validationSchema={registerSchema}
        onSubmit={async (values) => {
          const result = await dispatch(
            registerUser({
              firstName: values.firstName,
              lastName: values.lastName,
              dob: new Date(values.dob),
              email: values.email,
              password: values.password,
            })
          );
          if (registerUser.fulfilled.match(result)) {
            toast.success('Account Created!');
            navigate('/auth/login');
          }
        }}
      >
        {({ errors, touched }) => (
          <Form
            className="mx-auto rounded-md shadow-lg bg-white px-8 py-12 
        lg:w-2/5 md:w-2/4 w-[90%] font-secondary"
          >
            <h1 className="text-3xl font-primary font-semibold text-center text-primary">
              PeoplePlanet
            </h1>
            <h2 className="font-secondary text-sm text-gray-500 text-center leading-none mt-2">
              Welcome to{' '}
              <span className="italic text-primary">PeoplePlanet</span>, please
              create an accout to continue
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
                  <div className="text-red-600 text-xs">{errors.firstName}</div>
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
                  <div className="text-red-600 text-xs">{errors.lastName}</div>
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
            <div className="w-full grid grid-cols-2">
              <div className="mt-4 flex flex-col pe-4">
                <label className="text-primary italic" htmlFor="password">
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
              <div className="mt-4 flex flex-col">
                <label className="text-primary italic" htmlFor="c_password">
                  Confirm Password
                </label>
                <Field
                  name="c_password"
                  id="c_password"
                  className="focus:outline-none py-2 ps-2 border-b-2 bg-purple-100 border-purple-600"
                />
                {errors.c_password && touched.c_password ? (
                  <div className="text-red-600 text-xs">
                    {errors.c_password}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center mt-8">
              <button
                disabled={loading}
                type="submit"
                className="bg-primary w-full text-white px-8 py-2 rounded-md"
              >
                {loading ? 'Please wait...' : 'Register'}
              </button>
              <Link to="/auth/login" className="mt-4 text-sm">
                Already have an account?{' '}
                <span className="text-primary underline">Login Now</span>{' '}
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
