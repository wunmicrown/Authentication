import {Route, Routes } from "react-router-dom";
import SignUp from "./Components/authentication/signupVerifyAndSignup/SignUp";
import Login from "./Components/authentication/Login";
import Dashboard from "./Components/pages/Dashboard";
import OTPVerification from "./Components/authentication/OTPVerification";
import PasswordReset from "./Components/authentication/PasswordReset";
import EmailReset from "./Components/authentication/EmailReset";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/pages/Navbar";
import VerifyEmail from "./Components/authentication/signupVerifyAndSignup/VerifyEmail";

const App = () => {


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/resetpassword" element={<PasswordReset />} />
        <Route path="/resetEmail" element={<EmailReset />} />
        <Route path="/OTP" element={<OTPVerification />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route element={<Navbar/>}/>
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </>
  );
};

export default App;
