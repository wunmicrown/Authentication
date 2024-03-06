import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { API_URL } from "../constants/Api";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiOutlineMail, AiOutlineSetting } from 'react-icons/ai';
import { BsShieldLock } from "react-icons/bs";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tokenMatch, setTokenMatch] = useState(false);
  const [data, setData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null); // State to hold image source
  const fileInputRef = useRef(null);

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
        setData(user);
        setImageSrc(user.profilePic); // Initialize image source

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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/v1/auth/upload-dp`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setData(prevData => ({
        ...prevData,
        profilePic: response.data.profilePicUrl
      }));
      setImageSrc(response.data.profilePicUrl);

      toast.success('Profile picture updated successfully!');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      toast.error('Error uploading profile picture.');
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!tokenMatch) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <div className="relative bg-[#383C3F] font-serif min-h-screen w-full ">
        <nav className="bg-[#1D2021] z-10 sticky top-0 w-full pt-4">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-18">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex justify-center mb-10 ">
                  <Link to={""}>
                    <img
                      className="h-8 w-8  mt-2"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                  </Link>
                  <Link
                    to="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-bold"
                  >
                    Welcome, {data.firstName}
                  </Link>
                </div>
              </div>
              <div className="flex items-center ">
                <div className="ml-4 flex items-center md:ml-6">
                  <div className="mr-2 relative">
                    <div>
                      <button
                        className="max-w-xs bg-[#861C44] rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        id="user-menu"
                        aria-haspopup="true"
                      >
                        <span className="sr-only">Open user menu</span>
                        <div>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={imageSrc}
                            alt=""
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className=" relative">
                    <div>
                      <button
                        className="max-w-xs  rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        id="settings-button"
                        aria-haspopup="true"
                        onClick={toggleDropdown}
                      >
                        <span className="sr-only">Open settings menu</span>
                        <AiOutlineSetting className="h-6 w-6 text-gray-300" />
                      </button>
                    </div>
                    <div className={`dropdown-content shadow-lg bg-[#2e2c2c] rounded-lg mt-2 py-2 w-32 absolute z-10 ${showDropdown ? '' : 'hidden'}`}>
                      <Link to={"/dashboard/changeEmail"} className=" px-4 py-2 flex text-[#b5bec3] hover:bg-[#474c53]"> <AiOutlineMail className="mt-1 mr-1" /> Emails</Link>
                      <Link to={"/dashboard/ChangePassword"} className="flex px-4 py-2 text-[#b5bec3] hover:bg-[#474c53]">
                        <BsShieldLock className="inline-block text-gray-300 text-4xl mr-2" />
                        Change password</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex flex-col md:flex-row lg:mx-auto md:justify-center md:items-center md:space-x-4 p-4 min-h-screen">
          <div className="w-full flex md:w-1/2 p-10 shadow-2xl">
            <div className="flex flex-col mx-auto space-y-4">
              <h3 className="text-gray-200 text-center">Profile picture</h3>
              <div className="max-w-xs rounded-full flex flex-col items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">Open user menu</span>
                <div>
                  <div>
                    <img
                      className="h-52 w-52 rounded-full bg-[#a6355f]"
                      src={imageSrc}
                      alt=""
                    />
                  </div>
                  <button className=" text-center  bg-[#4d4d7a] rounded-sm mb-8 ml-8 w-16 h-6 flex text-white " onClick={handleEditClick}>
                    <AiOutlineEdit className=" ml-2 mt-1 font-bold text-lg" /><span className=" font-semibold">Edit</span>
                  </button>
                  <div className=" text-gray-300">
                    <h1 className="font-sans font-bold text-2xl">{data.firstName} {data.lastName}</h1>
                    <p className="text-center font-medium text-base text-[#9f9f98]">He/she</p>
                    <p className="font-sans font-bold text-md">{data.email}</p>
                    <div className="flex justify-center mt-3 font-sans font-bold text-sm">
                      About Yourself
                      <AiOutlineEdit size={24} color="blue" />
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    className="mb-4 w-32 focus:bg-slate-500 rounded outline-none"
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
              {selectedFile && (
                <>
                  <p className="text-gray-300">Upload a photo...</p>
                  <div className="flex justify-center">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded mr-4"
                      onClick={handleUpload}
                    >
                      Upload
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => setSelectedFile(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>
          <div className="flex flex-col items-center justify-center w-full  md:w-1/2 mt-4 md:mt-0 shadow-xl p-5">
            <div className="mb-4 md">
              <p className="text-gray-300 font-bold mb-2">Bio</p>
              <input type="text" width={500} height={500} className="bg-[#626565] w-96 h-40 focus:outline-none rounded-lg text-white font-bold hover:border border-blue-400" />
            </div>
            <div className="ml-80">
              <button className="bg-green-700 text-gray-300 rounded border-none p-2 cursor-pointer">Save</button>
            </div>

          </div>
        </div>
        <footer className="bg-[#272A2B] flex-shrink-0 flex justify-center text-gray-300 py-2">
          <div className="flex items-center">
            <img
              className="h-8 w-8 bg-b"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
            <p className="ml-2">© 2024 Authentication, Inc.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Dashboard;
