import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "./constants/Api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate=useNavigate();
  const [loading, setLoading] = useState(true)
  const URL = `${API_URL}/uploadFile`;
  const [myFile, setMyFile] = useState("");
  const [data, setData] = useState("");
  

useEffect(() => {
  const verifyToken= ()=>{
    axios.post(`${API_URL}/verifyToken`,{token:localStorage.getItem('token')})
    .then((res)=>{
      console.log(res);
      if(res.data.token){
        setLoading(false)
      }else{
        navigate('/login')
      }
    })
  }
  verifyToken()

 
}, [navigate])

if(loading){
  return <h1>Loading...</h1>
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
