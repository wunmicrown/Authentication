import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./Components/authentication/Signin";
import Login from "./Components/authentication/Login";
import Home from "./Components/Home";
import OTPVerification from "./Components/authentication/OTPVerification";
import PasswordReset from "./Components/authentication/PasswordReset";
import EmailReset from "./Components/authentication/EmailReset";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  // State to track authentication status
  const [authenticated, setAuthenticated] = useState(false);

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
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path="/" element={<Signin setAuthenticated={setAuthenticated} />} />
        <Route path="/resetpassword" element={<PasswordReset />} />
        <Route path="/resetEmail" element={<EmailReset />} />
        <Route path="/OTP" element={<OTPVerification />} />
        {/* Routes accessible after authentication */}
        {authenticated && (
          <>
            <Route path="/home" element={<Home />} />
          </>
        )}

        {/* Redirect unauthorized users to sign-in page */}
        {!authenticated && <Route path="*" element={<Navigate to="/login" />} />}
      </Routes>
    </>
  );
};

export default App;
