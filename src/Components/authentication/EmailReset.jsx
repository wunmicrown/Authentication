// import { AiOutlineMail } from 'react-icons/ai';
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const EmailReset = () => {
  const [email, setemail] = useState('')
const navigate = useNavigate();
  const handleSubmit = async (e)  => {
   
    axios.post('http://localhost:8000/resetEmail', { email })
    .then((res)=>{
      // console.log(res);
      if (res.data.status) {
        console.log(res);
        // navigate('/otp', { state: email })
        navigate(`/otp?email=${email}`)
      }
    }).catch((err)=>{
      console.log(err);
    })

  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Find Your Account</h1>
        <p className="mb-4">Please enter your email address or mobile number to search for your account.</p>
        <div className="flex items-center border-b border-gray-300 mb-4">
          {/* <AiOutlineMail className="text-gray-500" /> */}
          <input
            type="text"
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email address or mobile number"
            className="flex-1 mr-2 border-none focus:outline-none bg-slate-200 rounded-lg w-[444px] p-3"
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handleSubmit}>Reset Email</button>
      </div>
    </div>
  );
};

export default EmailReset;
