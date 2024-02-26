import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { API_URL } from "../../constants/Api";
import { validationSchema } from "../../validationSchema/signUpSchema";



const SignUp = () => {
  const URL = `${API_URL}/api/auth/signup`;
  const navigate = useNavigate();

  const onSubmit=  async(values) => {
    console.log("handleSubmit function called");
    try {
      const response = await axios.post(URL, values);
      console.log(response);
      if (response.status === 201) {
        navigate("/signupVerification");
      } else {
        console.error("Sign up failed:", response.data);
      }
      
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  }

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",  
      password: "",
    },
    signUpSchema:validationSchema,    
    onSubmit
  });

  

  return (
    <>
      <div className="max-w-md mx-auto mt-20 p-6 bg-gray-100 rounded-md">
        <h2 className="text-2xl mb-4 text-center font-bold text-blue-600">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex items-center border rounded-md px-3 py-2">
              <AiOutlineUser className="mr-2" />
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={values.firstName}
                placeholder="First Name"
                className="mt-1 p-2 flex-grow shadow-sm outline-none bg-white"
              />
            </div>
            <span className="text-red-500">{errors.firstName}</span>
          </div>
          <div className="mb-4">
            <div className="flex items-center border rounded-md px-3 py-2">
              <AiOutlineUser className="mr-2" />
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
                placeholder="Last Name"
                className="mt-1 p-2 flex-grow shadow-sm outline-none bg-white"
              />
            </div>
            <span className="text-red-500">{errors.lastName}</span>
          </div>
          <div className="mb-4">
            <div className="flex items-center border rounded-md px-3 py-2">
              <AiOutlineMail className="mr-2" />
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={values.email}
                placeholder="Email Address"
                className="mt-1 p-2 flex-grow shadow-sm outline-none bg-white"
              />
            </div>
            <span className="text-red-500">{errors.email}</span>
          </div>
          <div className="mb-4">
            <div className="flex items-center border rounded-md px-3 py-2">
              <AiOutlineLock className="mr-2" />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                placeholder="Password"
                className="mt-1 p-2 flex-grow shadow-sm outline-none bg-white  rounded-md"
              />
            </div>
            <span className="text-red-500">{errors.password}</span>
          </div>
          <button
          type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
          <div className="text-center mt-4">
            <p>Already have an account?</p>
            <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
          </div>
        </form>

      </div>
    </>
  );
};

export default SignUp;


// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
// import { useFormik } from 'formik';
// import { validationSchema } from '../../userSchema';

// const SignUp = () => {
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   // Formik hook to handle form values, validation, and submission
//   const formik = useFormik({
//     initialValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: ''
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       // Handle form submission here (e.g., send data to backend)
//       console.log('Form submitted with values:', values);
//       setIsSubmitted(true);
//     },
//   });

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-gray-100 rounded-md">
//       <h2 className="text-2xl mb-4 text-center font-bold text-blue-600">Sign Up</h2>
//       <form onSubmit={formik.handleSubmit}>
//         <div className="mb-4">
//           <div className="flex items-center border rounded-md px-3 py-2">
//             <AiOutlineUser className="mr-2" />
//             <input
//               type="text"
//               name="firstName"
//               onChange={formik.handleChange}
//               value={formik.values.firstName}
//               placeholder="First Name"
//               className="mt-1 p-2 flex-grow shadow-sm outline-none bg-white"
//             />
//           </div>
//           {formik.touched.firstName && formik.errors.firstName && (
//             <span className="text-red-500">{formik.errors.firstName}</span>
//           )}
//         </div>

//         <div className="mb-4">
//           <div className="flex items-center border rounded-md px-3 py-2">
//             <AiOutlineUser className="mr-2" />
//             <input
//               type="text"
//               name="lastName"
//               onChange={formik.handleChange}
//               value={formik.values.lastName}
//               placeholder="Last Name"
//               className="mt-1 p-2 flex-grow shadow-sm outline-none bg-white"
//             />
//           </div>
//           {formik.touched.lastName && formik.errors.lastName && (
//             <span className="text-red-500">{formik.errors.lastName}</span>
//           )}
//         </div>

//         <div className="mb-4">
//           <div className="flex items-center border rounded-md px-3 py-2">
//             <AiOutlineMail className="mr-2" />
//             <input
//               type="text"
//               name="email"
//               onChange={formik.handleChange}
//               value={formik.values.email}
//               placeholder="Email Address"
//               className="mt-1 p-2 flex-grow shadow-sm outline-none bg-white"
//             />
//           </div>
//           {formik.touched.email && formik.errors.email && (
//             <span className="text-red-500">{formik.errors.email}</span>
//           )}
//         </div>

//         <div className="mb-4">
//           <div className="flex items-center border rounded-md px-3 py-2">
//             <AiOutlineLock className="mr-2" />
//             <input
//               type="password"
//               name="password"
//               onChange={formik.handleChange}
//               value={formik.values.password}
//               placeholder="Password"
//               className="mt-1 p-2 flex-grow shadow-sm outline-none bg-white"
//             />
//           </div>
//           {formik.touched.password && formik.errors.password && (
//             <span className="text-red-500">{formik.errors.password}</span>
//           )}
//         </div>

//         {/* Add fields for newPassword and confirmPassword, and validation error handling */}
        
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//         >
//           {isSubmitted ? 'Signing Up...' : 'Sign Up'}
//         </button>
//         <div className="text-center mt-4">
//           <p>Already have an account?</p>
//           <Link to="/login" className="text-blue-500 hover:underline">
//             Login here
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignUp;



