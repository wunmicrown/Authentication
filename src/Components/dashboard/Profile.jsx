import React, { useRef, useState } from "react";
import { AiOutlineCamera, AiOutlineEdit } from 'react-icons/ai';
import { API_URL } from "../constants/Api";
import axios from "axios";

const Profile = ({user, setUser}) => {

  const [showAboutModal, setShowAboutModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); 
  const [aboutText, setAboutText] = useState('');
  const fileInputRef = useRef(null);  
  const aboutInputRef = useRef(null);
    
  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUser(prevData => ({
      ...prevData,
      oldProfilePic: prevData.profilePic, // not advi
      profilePic:  URL.createObjectURL(file)
    }));
  };

  const cancelUpload = ()=>{
    setSelectedFile(null)
    setUser(prevData => ({
      ...prevData,
      profilePic: prevData.oldProfilePic
    }));

  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const token = localStorage.getItem('token');
      const {data} = await axios.post(`${API_URL}/v1/auth/upload-dp`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setUser(prevData => ({
        ...prevData,
        oldProfilePic: user.profilePic,
        profilePic: data.user.profilePic
      }));

      toast.success('Profile picture updated successfully!');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      toast.error('Error uploading profile picture.');
    }
  };

  const handleSaveAbout = async () => {
    console.log('About text:', aboutText);
    setUser(prevState=>{
      return {
        ...prevState,
        about: aboutText,
      }
    })
    setShowAboutModal(false);
  };

    return(<>
        <div className="w-full flex pt-8 shadow-2xl h-full">
            <div className="flex flex-col mx-auto space-y-4">
                <div className="max-w-xs rounded-full flex flex-col items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  <div>
                    <div className="flex items-center justify-center h-52 w-52 rounded-full bg-[#a6355f]">
                      {user.profilePic?
                        <img
                          className="h-full w-full rounded-full "
                          src={user.profilePic}
                          alt="User"
                        />:
                        <span>No Image</span>
                      }
                    </div>
                    <div className="flex justify-center py-1">
                      {selectedFile?
                        <span>
                          <button onClick={cancelUpload}>
                            Cancle
                          </button>
                          <button className=" text-white " onClick={handleUpload}>
                            Save
                          </button>

                        </span>
                        :
                        <button className=" text-white " onClick={handleEditClick}>                            
                            <AiOutlineCamera size={30} />
                        </button>
                        }
                    </div>
                    <div className=" text-gray-300">
                      <h1 className="font-sans font-bold text-2xl">{user.firstName} {user.lastName}</h1>
                      <p className="text-center font-medium text-base text-[#9f9f98]">He/she</p>
                      <p className="font-sans font-bold text-md">{user.email}</p>
                      <div className="flex justify-center mt-3 font-sans font-bold text-sm">
                        <button
                          className="flex bg-[#4d4d7a] p-2 rounded-sm"
                          onClick={() => setShowAboutModal(true)}
                        >
                          About Yourself
                          <AiOutlineEdit size={24} color="white" />
                        </button>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleFileChange}
                      className="mb-4 w-32 focus:bg-slate-500 rounded outline-none"
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
              </div>

            </div>

             {/* About Yourself Modal */}
        {showAboutModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-[#cfcecc] opacity-40"></div>
            <div className="bg-white p-8 rounded-lg shadow-md z-10 w-3/4"> {/* Adjust width here */}
              <h2 className="text-lg font-semibold mb-4">About Yourself</h2>
              <textarea
                ref={aboutInputRef}
                className="w-full h-32 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 mb-4"
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                placeholder="Write something about yourself..."
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveAbout}
                  className="bg-[#4d4d7a] text-white px-4 py-2 rounded-md mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowAboutModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
    </>)
}

export default Profile