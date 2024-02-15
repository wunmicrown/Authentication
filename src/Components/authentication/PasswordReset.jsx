import { Formik, Form, ErrorMessage } from "formik";
import { BsShieldLock } from "react-icons/bs";

const PasswordReset = () => {
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
    termsAccepted: false,
  };

  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-2xl font-bold mb-4 text-center">
          <BsShieldLock className="inline-block text-blue-500 text-4xl mr-2" />
          Change Password
        </div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  className="border rounded-md p-2 shadow-sm w-full"
                  placeholder="Enter new password"
                />
                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="border rounded-md p-2 shadow-sm w-full"
                  placeholder="Confirm new password"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <input type="checkbox" name="termsAccepted" className="mr-2" />
                <label htmlFor="termsAccepted" className="text-sm text-gray-700">I accept the Terms and Conditions</label>
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">
                Reset Password
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PasswordReset;
