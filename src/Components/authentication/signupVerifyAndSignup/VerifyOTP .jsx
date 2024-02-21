import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            otp: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`${API_URL}/signupVerification`, values);
                if (response.status === 200) {
                    // OTP verified
                    navigate('/login');
                } else {
                    console.error('Verification failed:', response.data);
                }
            } catch (error) {
                console.error('Verification failed:', error.response?.data || 'Server error');
            }
        },
    });

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="w-full max-w-xs mx-auto">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="block text-center text-xl mb-6 text-blue-900 font-bold">Verify OTP</h2>
                        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                name="otp"
                                onChange={formik.handleChange}
                                value={formik.values.otp}
                                placeholder="Enter OTP"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline">
                                Verify
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
};

export default VerifyOTP;
