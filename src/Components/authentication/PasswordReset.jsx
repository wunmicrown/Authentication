import { BsShieldLock } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const email = params.get("email");
  const [message, setmessage] = useState("");
  const [mesotp, setmesOtp] = useState('')

  const [data, setdata] = useState({
    email: email,
    newPassword: '',
    confirmPassword: '',
    termsAccepted: false
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  }

  const handleSubmit = async () => {
    // console.log(data);
    if (data.confirmPassword === data.newPassword) {
      if (data.newPassword < 6) {
        setmessage('password must be at least 6 characters long');
      } else {
        setmessage('')
        if (data.termsAccepted === false) {
          setmessage('please accept terms and conditions');
        } else {
          setmessage('')
          try {
            await axios.post('http://localhost:8000/resetpassword', data)
              .then((res) => {
                // console.log(res);
                if (res.status ===200) {
                  setmesOtp(res.data)
                  toast.success(res.data)
                  navigate("/login")
                } else {
                  
                }
              }).catch((err) => {
                console.log(err);
              })
          } catch (error) {
            console.log(error);
          }
        }
      }
    } else {
      setmessage('password dit not macth');
    }

  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-2xl font-bold mb-4 text-center">
          <BsShieldLock className="inline-block text-blue-500 text-4xl mr-2" />
          Change Password
        </div>
          {message && <p className="text-red-500 text-center mb-4">{message}</p>}
        {/* <form onSubmit={handleSubmit}> */}
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            name="newPassword"
            onChange={handleChange}
            value={data.newPassword}
            className="border rounded-md p-2 shadow-sm w-full"
            placeholder="Enter new password"
          />
          {/* <span className="text-red-500">{errors.newPassword}</span> */}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={data.confirmPassword}
            className="border rounded-md p-2 shadow-sm w-full"
            placeholder="Confirm new password"
          />
          {/* <span className="text-red-500">{errors.confirmPassword}</span> */}
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            className="mr-2"
            onChange={handleChange}
            checked={data.termsAccepted}
          />
          <label htmlFor="termsAccepted" className="text-sm text-gray-700">I accept the Terms and Conditions</label>
        </div>
        <button onClick={handleSubmit} type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">
          Reset Password
        </button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default PasswordReset;
