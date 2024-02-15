import React,{useState} from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import OtpInput from 'react-otp-input';

const OTPVerification = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const email = params.get("email");
  const URL = "http://localhost:8000/verifyOTP";
  const urlReset = "http://localhost:8000/resendOTP";
  const [otpCodes, setOtpCodes] = useState('');
const data = {
  email: email,
  otpCodes: otpCodes,
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(otpCodes);
    axios.post(URL, data)
    .then((res)=>{
      // console.log(res);
      if (res.data.status) {
        console.log(res);
        navigate(`/resetpassword?email=${email}`)
      }
    }).catch((err)=>{
      console.log(err);
    })
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post(urlReset, { email: email });
      console.log(response.data);
      alert("OTP resent successfully!");
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-center text-2xl font-bold mb-4">Email Verification</h2>
        <p className="text-center text-gray-600 mb-4">We have sent a code to your email.</p>
        <form >
          <div className="flex flex-row gap-6">
          <OtpInput
                value={otpCodes}
                onChange={(e) => setOtpCodes(e)}
                numInputs={4}
                containerStyle="px-2 sm:px-0 text-[32px] "
                shouldAutoFocus={true}
                inputStyle="border border-[#00693D] focus:border-yellow-900 rounded sm:rounded-md min-w-[2rem] sm:min-w-[3.3rem] min-h-[2rem] sm:min-h-[3.3rem]"
                renderSeparator={<span className="mx-2 sm:mx-3"> </span>}
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
