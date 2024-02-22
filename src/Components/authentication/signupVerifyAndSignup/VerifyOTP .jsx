import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants/Api';

const VerifyOTP = ({ email }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendLoading, setResendLoading] = useState(false);
    const URL = `${API_URL}/signupVerify`;

    const formik = useFormik({
        initialValues: {
            otp: '',
            email: email
        },
        onSubmit: (values) => {
            setLoading(true);
            setError('');
            axios.post(URL, values)
                .then(response => {
                    console.log(response);
                    if (response.data.status == true) {
                        navigate('/login');
                    }else{
                        console.log("error ooo");
                    }
                })
                .catch(error => {
                    setError(error.response?.data?.message || 'Verification failed');
                })
                .finally(() => {
                    setLoading(false);
                });
        },
    });

    const handleResendOTP = () => {
        setResendLoading(true);
        axios.post(`${API_URL}/resendSignupOTP`, { email })
            .then(() => {
                alert('OTP has been resent successfully!');
            })
            .catch(() => {
                alert('Failed to resend OTP. Please try again later.');
            })
            .finally(() => {
                setResendLoading(false);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-xs">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="block text-center text-xl mb-6 text-blue-900 font-bold">Verify OTP</h2>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="otp"
                            onChange={formik.handleChange}
                            value={formik.values.otp}
                            placeholder="Enter OTP"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify'}
                        </button>
                        <button type="button" onClick={handleResendOTP} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" disabled={resendLoading}>
                            {resendLoading ? 'Resending...' : 'Resend OTP'}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;
