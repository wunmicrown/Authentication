import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { toast } from "react-toastify";
import { API_URL } from "../constants/Api";
import { loginSchema } from "../validationSchema/loginSchema";

const Login = () => {
  const URL = `${API_URL}/v1/auth/signin`;
  const navigate = useNavigate();

  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    loginSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(URL, values);

        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirect to dashboard if email is verified
        if (data.user?.emailVerified) {

          toast.success('Login successful');
          return navigate('/dashboard');

        }
        // Redirect to verify email page if email is not verified
        toast.warning('Please verify your email before accessing the dashboard');
        navigate('/verifyEmail');

      }
      catch (error) {
        toast.error(response.data.message);
        console.error('Login failed:', error);
        if (error.response && error.response.status === 404) {
          toast.error(error.response.message);
        } else {
          toast.error('Incorrect password or email');
        }
      }
    },

  });


  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl mb-4 text-center font-bold text-blue-600">Login</h2>
      <form onSubmit={loginFormik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="flex items-center border rounded-md px-3 py-2">
            <AiOutlineUser className="mr-2" />
            <input
              name="email"
              type="text"
              onChange={loginFormik.handleChange}
              value={loginFormik.values.email}
              autoComplete="username"
              className="mt-1 p-2 flex-grow shadow bg-white  focus:border-blue-500 rounded-lg"
              placeholder="Email Address"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="flex items-center border rounded-md px-3 py-2">
            <AiOutlineLock className="mr-2" />
            <input
              name="password"
              type="password"
              onChange={loginFormik.handleChange}
              value={loginFormik.values.password}
              className="mt-1 p-2 flex-grow shadow bg-white focus:border-blue-500 rounded-lg"
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 outline-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          Login
        </button>
        <div className="flex justify-between">
          <div>
            <input type="checkbox" className="mr-2" />
            <span>Remember me</span>
          </div>
          <Link to="/resetEmail" className="text-blue-600">Forgot password?</Link>
        </div>
        <div className="flex">
          <p>Don't have an account <span>
            <Link to='/' className=" text-blue-600">Register</Link></span></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
