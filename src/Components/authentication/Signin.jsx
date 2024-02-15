import { useFormik } from "formik";
import { validationSchema } from "../userSchema";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const Signin = () => {
  const URL = "http://localhost:8000/register";
  const navigate = useNavigate();
  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      axios.post(URL, values);
      navigate("/login");
    },
  });
  return (
    <>
      <div className="max-w-md mx-auto mt-20 p-6 bg-gray-100 rounded-md">
        <h2 className="text-center text-2xl mb-4 font-bold">Sign Up</h2>
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
                className="mt-1 p-2 flex-grow shadow-sm outline-none bg-white"
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
                className="mt-1 p-2 flex-grow shadow-sm outline-none bg-white"
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
                className="mt-1 p-2 flex-grow shadow-sm outline-none bg-white"
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
                className="mt-1 p-2 flex-grow shadow-sm outline-none bg-white  rounded-md"
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
    </>
  );
};

export default Signin;
