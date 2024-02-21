import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "./constants/Api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [tokenMatch, setTokenMatch] = useState(false)
  const URL = `${API_URL}/uploadFile`;
  const [myFile, setMyFile] = useState("");
  const [data, setData] = useState("");
  let token = localStorage.getItem('token')

  useEffect(() => {
    const verifyToken = () => {
      axios.post(`${API_URL}/verifyToken`, { token })
        .then((res) => {
          console.log(res);
          if (token === res.data.token) {
            setLoading(false)
            setTokenMatch(true)
          } else {
            console.log("Token doesn't match");
            setTokenMatch(false)
            setLoading(true)
            navigate('/login')
          }
        }).catch((err) => {
          console.log('Error verifying token', err);
          setTokenMatch(false);
          setTokenMatch(false)
        });

      }


      const timeout = setTimeout(() => {
        if (loading) {
          setLoading(false);
          clearTimeout(timeout);
        }
      }, 3000);



      const interval = setInterval(verifyToken, 2000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
    }



  }, [navigate, loading]);

  if (loading) {
    return <h1>Loading...</h1>
  }
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
