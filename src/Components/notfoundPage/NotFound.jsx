import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                <p className="text-lg text-gray-600 mb-8 font-semibold">Oops! The page you are looking for does not exist.</p>
                <Link to={"/"} className="text-blue-700 font-bold hover:underline">Go back to Home</Link>
            </div>
        </div>
        </>
    );
};

export default NotFound;
