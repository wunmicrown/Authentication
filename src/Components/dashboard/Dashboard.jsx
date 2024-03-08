import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";

import { API_URL } from "../constants/Api";
import Profile from "./Profile";
import NavBar from "./nav/NavBar";
import Footer from "./foooter/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // const [tokenMatch, setTokenMatch] = useState(fa/lse);
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
        // setTokenMatch(true);
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

  // if (!tokenMatch) {
  //   navigate('/login');
  //   return null;
  // }

  return (
    <>
        <NavBar user={user} />
        <div className="relative px-2 font-serif w-full">
          
          
          <section className="w-full pt-24 max-w-[1200px] mx-auto sm:flex sm:gap-10 ">

            {/* Profile Component */}
            <div className="w-full h-full-dvh-100px sm:max-w-sm">
              <Profile user={user} setUser={setUser} />
            </div>

            <div className="w-full sm:px-6 lg:px-8 pt-8">
                <div> <strong>About:</strong></div>
                <p>{user.about??""}</p>
                <div><strong>Bio:</strong></div>
                <p>{user.bio??""}</p>
            </div>

          </section>
        </div>
          <Footer/>

    </>
  );
};

export default Dashboard;
