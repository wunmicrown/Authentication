// import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./Components/authentication/Signin";
import Login from "./Components/authentication/Login";
import Dashboard from "./Components/Dashboard";
import OTPVerification from "./Components/authentication/OTPVerification";
import PasswordReset from "./Components/authentication/PasswordReset";
import EmailReset from "./Components/authentication/EmailReset";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  let token=localStorage.getItem("token")
  // State to track authentication status
  // const [authenticated, setAuthenticated] = useState(false);

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
        <Route path="/" element={<Signin />} />
        <Route path="/resetpassword" element={<PasswordReset />} />
        <Route path="/resetEmail" element={<EmailReset />} />
        <Route path="/OTP" element={<OTPVerification />} />
        {/* Routes accessible after authentication */}
        {/* {authenticated && (
          <> */}
            <Route path="/dashboard" element={token? <Dashboard />: <Navigate to ='/login'/>} />
          {/* </>
        )} */}

        {/* Redirect unauthorized users to sign-in page */}
        {/* {!authenticated && <Route path="*" element={<Navigate to="/login" />} />} */}
      </Routes>
    </>
  );
};

export default App;
