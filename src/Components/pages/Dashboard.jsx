import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../constants/Api";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tokenMatch, setTokenMatch] = useState(false);
  const [data, setData] = useState(null); // State to store user data
  

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token')
        const {data:user} = await axios.get(`${API_URL}/v1/api/getUser`, {
          headers:{
            "Authorization": `Bearer ${token}`
          }
        });

        console.log(user);
          setLoading(false);
          setTokenMatch(true);
          setData(user)
        
      } catch (error) {
        console.log('Error verifying token:', error);
        console.log(error.response);
        setLoading(false);
        setTokenMatch(false);
        navigate('/login');
      }
    };

    verifyToken();

  }, [navigate]);

  // Render loading state
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // Redirect if token doesn't match or loading failed
  if (!tokenMatch) {
    navigate('/login');
    return null;
  }

  return (
    <>
    {/* <Navbar/> */}
      <h1 className="text-3xl font-bold text-center mt-4">Dashboard</h1>
      <div className="mt-4 bg-red-700">
        <h1 className="text-2xl font-bold">{data.firstName}</h1>
        <h1 className="text-2xl font-bold">{data.lastName}</h1>
        <p className="text-lg">{data.email}</p>
      </div>
    </>
  );
};

export default Dashboard;
