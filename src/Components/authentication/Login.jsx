import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

const Login = () => {
  const URL = "http://localhost:8000/login";
  const navigate = useNavigate();
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },  

    onSubmit: async (values) => {
      try {
        const response = await axios.post(URL, values);
        console.log(response.data);
        // Check the response from the server
        if (response.status === 200) {
          console.log("Login successful");
          navigate("/home");
        } else {
          console.error("Login failed:", response.data);
          // Handle login failure, show error to the user
        }
      } catch (error) {
        console.error("Login failed:", error);
        // Handle login failure, show error to the user
      }
    },
  });

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
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
              className="mt-1 p-2 flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
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
              className="mt-1 p-2 flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-blue-500 rounded-md"
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
