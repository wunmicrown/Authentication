import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../constants/Api";

const ChangeEmail = () => {
  const URL = `${API_URL}/v1/api/verifyEmail`;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Send a POST request to the backend to change the email
      const response = await axios.post(URL, { email }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // Include the authentication token in the request headers
        }
      });
      console.log(response);
      // Display success message
      toast.success(response.data.message);
      // Redirect to the OTP page if needed
      if (response.data.status) {
        navigate(`/VerifyChangeEmail`);
      }
    } catch (error) {
      console.error("Error updating email:", error);
      // Display error message
      toast.error("Failed to update email. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Change Email Address</h1>
        <p className="mb-4">Enter your new email address below:</p>
        <div className="flex items-center border-b border-gray-300 mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="New Email Address"
            className="flex-1 mr-2 border-none focus:outline-none bg-slate-200 rounded-lg w-[444px] p-3"
          />
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Add"}
        </button>
      </div>
    </div>
  );
};

export default ChangeEmail;
