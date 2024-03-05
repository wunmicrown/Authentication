import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../constants/Api";

const ChangePassword = () => {
  const URL = `${API_URL}/v1/auth/changePassword`;
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [data, setData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const { email } = JSON.parse(userData);
      setData(prevData => ({
        ...prevData,
        email: email
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.newPassword !== data.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    if (data.newPassword.length < 6) {
      setMessage('Password must be at least 6 characters long');
      return;
    }
    if (!data.termsAccepted) {
      setMessage('Please accept terms and conditions');
      return;
    }

    try {
      const res = await axios.post(URL, data);
      if (res.status === 200) {
        setMessage(res.data.message);
        toast.success(res.data.message);
        navigate("/login");
      } 
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex bg-[#272A2B]  justify-center items-center h-screen">
      <div className=" bg-[#121212] p-8 rounded-lg shadow-lg w-96">
        <div className="text-2xl font-bold mb-4 text-center text-blue-600">
          Change Password
        </div>
        {message && <p className="text-red-500 text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-300">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              onChange={handleChange}
              value={data.oldPassword}
              className="bg-white focus:border-blue-400 rounded-lg shadow-sm appearance-none border  w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter old password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">New Password</label>
            <input
              type="password"
              name="newPassword"
              onChange={handleChange}
              value={data.newPassword}
              className="bg-white focus:border-blue-400 rounded-lg shadow-sm appearance-none border  w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter new password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              value={data.confirmPassword}
              className="bg-white focus:border-blue-400 rounded-lg shadow-sm appearance-none border  w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm new password"
            />
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              name="termsAccepted"
              className="mr-2"
              onChange={handleChange}
              checked={data.termsAccepted}
            />
            <label htmlFor="termsAccepted" className="text-sm text-gray-300">I accept the Terms and Conditions</label>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
