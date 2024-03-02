import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../constants/Api";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from 'react-icons/ai';


const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tokenMatch, setTokenMatch] = useState(false);
  const [data, setData] = useState(null); // State to store user data
  const URL = `${API_URL}/auth/uploadProfilePic`

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token')
        const { data: user } = await axios.get(`${API_URL}/v1/api/getUser`, {
          headers: {
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
  // const changeFile = (e) => {
  //   let myImage = e.target.files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(myImage);
  //   reader.onload = () => {
  //     setMyFile(reader.result);
  //   };
  // };

  // const uploadFile = () => {
  //   axios.post(URL, { myFile }).then((res) => {
  //     setData(res.data);
  //   });
  // };


  return (
    <>

      <div className="relative  bg-slate-500">

        <nav className="bg-[#1D2021] z-10 sticky top-0 w-full pt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-18">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex justify-center mb-10">
                  <img
                    className="h-8 w-8 bg-b mt-2"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-bold"
                  >
                    Welcome, {data.firstName}
                  </a>
                </div>

              </div>
              <div className="">
                <div className="ml-4 flex items-center md:ml-6">
                  <div className="ml-3 relative">
                    <div>
                      <button
                        className="max-w-xs bg-[#861C44] rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        id="user-menu"
                        aria-haspopup="true"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          // src={user.profilePicture} 
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>


        <div className="flex flex-col md:flex-row lg:mx-auto md:justify-center md:items-center md:space-x-4 bg-[#272A2B] p-4 min-h-screen">
          <div className="w-full md:w-1/2">
            <button
              className="max-w-xs bg-[#861C44] rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white cursor-pointer mx-auto"
              id="user-menu"
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="h-64 w-64 rounded-full"
                // src={user.profilePicture} 
                alt=""
              />
            </button>
            <div className="item-center flex-col flex justify-center text-gray-300 text-center mt-4">
              <h1 className="font-sans font-bold text-xl">{data.firstName} {data.lastName}</h1>
              <p>He/she</p>
              <p>{data.email}</p>
              <div className="flex justify-center mt-3">
                {/* Use the AiOutlineEdit icon */}
                <AiOutlineEdit size={24} color="blue" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full md:w-1/2 mt-4 md:mt-0">
            <input
              type="file"
              // onChange={(e) => changeFile(e)}
              className="mb-4 w-32 focus:bg-slate-500 rounded outline-none"
            />
            <button
              className="bg-slate-500 p-2 rounded-lg text-white mb-4"
            // onClick={uploadFile}
            >
              Upload File
            </button>
            <div className="mb-4">
              <p className="text-gray-300 font-bold">Bio</p>
              <input type="text" width={500} height={500} className="bg-white-100 w-96 h-40 text-red-100" />
            </div>
            <div>
              <button className="bg-green-700 text-gray-300 rounded border-none p-2 cursor-pointer">Save</button>
            </div>
          </div>
        </div>

        <footer className="bg-[#272A2B] flex-shrink-0 flex justify-center">
          <div className="flex">
            <img
              className="h-8 w-8 bg-b mt-2"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
            <p className="text-gray-300 ml-2 bg mt-2">© 2024 Authentication, Inc.</p>
          </div>
        </footer>
      </div>



      {/* <div className="flex flex-col items-center justify-center h-screen">
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
      </div> */}
    </>
  );
};

export default Dashboard;
