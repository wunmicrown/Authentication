import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import OtpInput from 'react-otp-input';
import { toast } from "react-toastify";
import { API_URL } from "../constants/Api";

const OTPVerification = () => {
  const [mesotp, setmesOtp] = useState('')
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const email = params.get("email");
  const URL = `${API_URL}/api/auth/verifyOTP`;
  const urlReset = `${API_URL}/api/auth/resendOTP`;
  const [otpCodes, setOtpCodes] = useState('');
  const data = {
    email: email,
    otpCodes: otpCodes,
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL, data);
      if (response.status === 200) {
        toast.success("OTP verified successfully");
        navigate(`/resetpassword?email=${email}`);
      } else if (response.status === 400) {
        toast.error("Invalid OTP. Please enter the correct code.");
      } else {
        // Handle other status codes if needed
        toast.error("An error occurred while verifying OTP. Please try again later.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred while verifying OTP. Please try again later.");
    }
  };
  
  

  const handleResendOTP = async () => {
    try {
      const response = await axios.post(urlReset, { email: email });
      console.log(response.data);
      toast.success("OTP resent successfully!");
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-center text-2xl font-bold mb-4">Email Verification</h2>
        <p className="text-center text-gray-600 mb-4">We have sent a code to your email.</p>
        <form>
          <div className="flex flex-row gap-2 justify-center"> {/* Adjust the gap and justify-center */}
            <OtpInput
              value={otpCodes}
              onChange={(e) => setOtpCodes(e)}
              numInputs={6}
              containerStyle="px-2 sm:px-0 text-3xl"
              shouldAutoFocus={true}
              inputStyle="bg-slate-50 shadow-md focus:outline-none rounded-xl w-12 h-12 sm:w-16 sm:h-16" // Adjust width and height
              renderSeparator={<span className="mx-2 w- sm:mx-3 bg-slate-50"></span>}
              renderInput={(props) => <input {...props} />}
            />

          </div>
          <button type="submit" onClick={handleSubmit} className="bg-blue-500 w-full text-white py-2 px-4 rounded-md mt-4">
            Verify Account
          </button>
        </form>
        <p className="text-center mt-2 cursor-pointer" onClick={handleResendOTP}>
          Don't receive code? <span className="underline text-blue-500">Resend OTP</span>
        </p>
      </div>
    </div>



  );
};

export default OTPVerification;
