import { Route, Routes } from "react-router-dom";
import SignUp from "./Components/authentication/signupVerifyAndSignup/SignUp";
import Login from "./Components/authentication/Login";
import OTPVerification from "./Components/authentication/OTPVerification";
import PasswordReset from "./Components/authentication/PasswordReset";
import EmailReset from "./Components/authentication/EmailReset";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyEmail from "./Components/authentication/signupVerifyAndSignup/VerifyEmail";
import Dashboard from "./Components/dashboard/Dashboard";
import ChangeEmail from "./Components/dashboard/changeAndVerifyEmail/ChangeEmail";
import UploadFile from "./Components/dashboard/UploadFile";
import ChangePassword from "./Components/dashboard/ChangePassword";
import NotFound from "./Components/notfoundPage/NotFound";

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
        <Route path="/reset-email" element={<EmailReset />} />
        <Route path="/confirm-otp" element={<OTPVerification />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/Change-password" element={<ChangePassword />} />
        <Route path="/dashboard/change-email" element={<ChangeEmail />} />
        <Route path="" element={<UploadFile />} />

        {/* Catch-all route for Not Found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
