import { Navigate, Route, Routes } from "react-router-dom"
import Signin from "./Components/authentication/Signin"
import Login from "./Components/authentication/Login"
import Home from "./Components/Home"
import OTPVerification from "./Components/authentication/OTPVerification"
import PasswordReset from "./Components/authentication/PasswordReset"
import EmailReset from "./Components/authentication/EmailReset"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
      {/* Same as */}

      {/* <Signin/> */}
      <Routes>
        <Route path="/login" element={< Login />} />
        <Route path="/" element={< Signin />} />
        {/* <Route path="/dashboard" element={<Navigate to='/'/>}/> */}
        {/* <Route path="/home" element={<Navigate to='/login'/>}/> */}
        <Route path="/home" element={< Home />} />
        <Route path="/OTP" element={< OTPVerification />} />
        <Route path="/resetpassword" element={< PasswordReset />} />
        <Route path="/resetEmail" element={< EmailReset />} />
      </Routes>
    </>
  )
}

export default App