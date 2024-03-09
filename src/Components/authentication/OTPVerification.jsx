import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import OtpInput from 'react-otp-input';
import { toast } from "react-toastify";
import { API_URL } from "../constants/Api";

const OTPVerification = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const email = params.get("email");
  const URL = `${API_URL}/v1/auth/verifyOTP`;
  const urlReset = `${API_URL}/v1/auth/resendOTP`;
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
    <>
      <main className="bg-[#1D2021] h-screen">
      <div className="flex justify-center items-center  pt-48">
        <div className="bg-[#121212] p-8 rounded-lg shadow-md ">
          <h2 className="text-center text-2xl font-bold mb-4 text-blue-700">Email Verification</h2>
          <p className="text-center text-gray-400 mb-4">We have sent a code to your email.</p>
          <form className=" w-full justify-center">
            <div className="flex justify-center">
              <OtpInput
                value={otpCodes}
                onChange={(e) => setOtpCodes(e)}
                numInputs={6}
                containerStyle="px-2 sm:px-0 text-3xl"
                shouldAutoFocus={true}
                inputStyle={{
                  backgroundColor: "#D1D5DB",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  outline: "none",
                  borderRadius: "10px",
                  width: "6vw", 
                  height: "6vw", 
                  fontSize: "2rem", 
                  textAlign: "center",
                  "@screen sm": {
                    width: "20vw", 
                    height: "20vw",
                  }
                }}
                className="sm:w-!28 md:w-28 sm:h-28"
                renderSeparator={<span className="mx-2    sm:mx-3 bg-slate-50"></span>}
                renderInput={(props) => <input {...props} />}
              />



            </div>
            <button type="submit" onClick={handleSubmit} className="bg-blue-500 w-full text-white py-2 px-4 rounded-md mt-4">
              Verify Account
            </button>
          </form>
          <p className="text-center mt-2 cursor-pointer text-gray-400" onClick={handleResendOTP}>
            Don't receive code? <span className="underline text-blue-500">Resend OTP</span>
          </p>
        </div>
      </div>
      </main>
    </>



  );
};

export default OTPVerification;
