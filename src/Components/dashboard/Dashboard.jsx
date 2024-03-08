import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../constants/Api";
import Profile from "./Profile";
import NavBar from "./nav/NavBar";
import Footer from "./foooter/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tokenMatch, setTokenMatch] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data: user } = await axios.get(`${API_URL}/v1/api/getUser`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        setLoading(false);
        setTokenMatch(true);
        setUser(user); // Initialize image source

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




  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!tokenMatch) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <NavBar user={user} />
      <div className="relative px-2 font-serif w-full  bg-[#272A2B] ">


        <section className="w-full pt-24 max-w-[1200px] mx-auto sm:flex sm:gap-10">

          {/* Profile Component */}
          <div className="w-full h-full-dvh-100px sm:max-w-sm ">
            <Profile user={user} setUser={setUser} />
          </div>

          <div className="w-full sm:px-6 lg:px-8 pt-10 mt-8 text-gray-300">
            <div className="flex flex-col gap-4">
              <strong className="text-blue-400">About:</strong>
              <p className="break-all font-bold">{user.about ?? ""}</p>
            </div>
            <hr className="mt-8 " />
            <div className="flex flex-col gap-4 mt-10">
              <strong className="text-blue-400">Bio:</strong>
              <p className="break-all font-bold">{user.bio ?? ""}</p>
            </div>
          </div>


        </section>
      </div>
      <Footer />

    </>
  );
};

export default Dashboard;
