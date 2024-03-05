import {Route, Routes } from "react-router-dom";
import SignUp from "./Components/authentication/signupVerifyAndSignup/SignUp";
import Login from "./Components/authentication/Login";
import OTPVerification from "./Components/authentication/OTPVerification";
import PasswordReset from "./Components/authentication/PasswordReset";
import EmailReset from "./Components/authentication/EmailReset";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyEmail from "./Components/authentication/signupVerifyAndSignup/VerifyEmail";
import ChangePassword from "./Components/dashboard/changePassword";
import Dashboard from "./Components/dashboard/Dashboard";
import ChangeEmail from "./Components/dashboard/changeAndVerifyEmail/ChangeEmail";
import VerifyChangeEmail from "./Components/dashboard/changeAndVerifyEmail/VerifyChangeEmail";

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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/changePassword" element={<ChangePassword />} />
        <Route path="/dashboard/changeEmail" element={<ChangeEmail/>} />
        <Route path="/verifyChangeEmail" element={<VerifyChangeEmail/>} />

      </Routes>
    </>
  );
};

export default App;
