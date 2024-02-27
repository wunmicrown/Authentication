import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "./constants/Api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tokenMatch, setTokenMatch] = useState(false);
  const [data, setData] = useState("");
  const token = localStorage.getItem('token');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(`${API_URL}/api/auth/verifyToken`, { token });
        if (response.status === 200 && response.data.token === token) {
          setLoading(false);
          setTokenMatch(true);
        } else {
          console.log("Token doesn't match or verification failed");
          setLoading(false);
          setTokenMatch(false);
          navigate('/login');
        }
      } catch (error) {
        console.log('Error verifying token:', error);
        setLoading(false);
        setTokenMatch(false);
        navigate('/login');
      }
    };

    verifyToken();

  }, [token, navigate]);

  // Render loading state
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // Redirect if token doesn't match or loading failed
  if (!tokenMatch) {
    navigate('/login');
    return null;
  }

  

  const changeFile = (e) => {
    let myImage = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(myImage);
    reader.onload = () => {
      setMyFile(reader.result);
    };
  };

  const uploadFile = () => {
    axios.post(URL, { myFile }).then((res) => {
      setData(res.data);
    });
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-4">Dashboard</h1>
      <div className="flex flex-col items-center justify-center h-screen">
        <input
          type="file"
          onChange={(e) => changeFile(e)}
          className="mb-4 w-32 focus:bg-slate-500 rounded outline-none"
        />
        <button
          className="bg-slate-500 p-2 rounded-lg text-white mb-4"
          onClick={uploadFile}
        >
          Upload File
        </button>
        {data && (
          <div className=" text-center">
            <img
              src={data.storedImage}
              className="w-52 h-52 rounded-full"
              alt=""
            />
            <h1 className=" mt-2">Profile Picture</h1>
          </div>

        )}
      </div>
    </>
  );
};

export default Dashboard;
