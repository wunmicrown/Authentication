import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { API_URL } from "../../constants/Api";
import { validationSchema } from "../../validationSchema/signUpSchema";
import { toast } from "react-toastify";

const SignUp = () => {
  const URL = `${API_URL}/v1/auth/signup`;
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(URL, values);
      console.log(response);
      localStorage.setItem('userDetails', JSON.stringify(response.data.user));

      toast.success("User registered successfully. Verification OTP sent to email.");
      navigate("/signupVerification");
    } catch (error) {
      toast.error(`Sign up failed: ${error.response.data}`);
    }
  };

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-100 rounded-md">
      <h2 className="text-2xl mb-4 text-center font-bold text-blue-600">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex items-center border rounded-md px-3 py-2">
            <AiOutlineUser className="mr-2" />
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={values.firstName}
              placeholder="First Name"
              className="bg-white focus:border-blue-400 rounded-lg shadow-sm appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <span className="text-red-500">{errors.firstName}</span>
        </div>
        <div className="mb-4">
          <div className="flex items-center border rounded-md px-3 py-2">
            <AiOutlineUser className="mr-2" />
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={values.lastName}
              placeholder="Last Name"
              className="bg-white focus:border-blue-400 rounded-lg shadow-sm appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <span className="text-red-500">{errors.lastName}</span>
        </div>
        <div className="mb-4">
          <div className="flex items-center border rounded-md px-3 py-2">
            <AiOutlineMail className="mr-2" />
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={values.email}
              placeholder="Email Address"
              className="bg-white focus:border-blue-400 rounded-lg shadow-sm appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <span className="text-red-500">{errors.email}</span>
        </div>
        <div className="mb-4">
          <div className="flex items-center border rounded-md px-3 py-2">
            <AiOutlineLock className="mr-2" />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
              placeholder="Password"
              className="bg-white focus:border-blue-400 rounded-lg shadow-sm appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <span className="text-red-500">{errors.password}</span>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
        <div className="text-center mt-4">
          <p>Already have an account?</p>
          <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
