import React, { useState, useRef, useEffect } from "react";
import { AiOutlineCamera, AiOutlineEdit } from 'react-icons/ai';
import { API_URL } from "../constants/Api";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = ({ user, setUser }) => {
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fieldToUpdate, setFieldToUpdate] = useState('');

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUser(prevData => ({
      ...prevData,
      oldProfilePic: prevData.profilePic,
      profilePic: URL.createObjectURL(file)
    }));
  };

  const cancelUpload = () => {
    setSelectedFile(null);
    setUser(prevData => ({
      ...prevData,
      profilePic: prevData.oldProfilePic
    }));
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
      const { data } = await axios.post(`${API_URL}/v1/auth/upload-dp`, formData, {
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

  const inputRef = useRef(null);


  const handleEditFieldClick = (field) => {
    setFieldToUpdate(field);
    setInputValue(user[field]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setInputValue('');
    console.log("Input value after setting to empty string:", inputValue);
  };

  const handleSave = async () => {
    try {
      if (!inputValue.trim()) {
        toast.error(`${fieldToUpdate} cannot be empty.`);
        return;
      }

      const token = localStorage.getItem('token');
      const updatedUser = { ...user, [fieldToUpdate]: inputValue };
      const { data } = await axios.post(`${API_URL}/v1/auth/updateUser`, updatedUser, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      setUser(data.updatedUser);
      toast.success(`Your ${fieldToUpdate} section has been updated successfully!`);
      handleCloseModal();
    } catch (error) {
      console.error(`Error updating ${fieldToUpdate}:`, error);
      toast.error(`Error updating ${fieldToUpdate}.`);
    }

  };

  // Reset inputValue whenever user changes
  useEffect(() => {
    setInputValue('');
  }, [user]);
  return (
    <>
      <div className="w-full flex pt-8 shadow-2xl h-full font-serif">
        <div className="flex flex-col mx-auto space-y-4">
          <div className="max-w-xs rounded-full flex flex-col items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">Open user menu</span>
            <div>
              <div className="flex items-center justify-center h-52 w-52 rounded-full bg-[#a6355f]">
                {user.profilePic ?
                  <img
                    className="h-full w-full rounded-full "
                    src={user.profilePic}
                    alt="User"
                  /> :
                  <span>No Image</span>
                }
              </div>
              <div className="flex justify-center py-1">
                {selectedFile ?
                  <span>
                    <button onClick={cancelUpload} className=" bg-red-600 text-white p-2 text-lg rounded">
                      Cancel...
                    </button>
                    <button className=" text-white bg-green-600 p-2 text-lg rounded" onClick={handleUpload}>
                      Save...
                    </button>
                  </span>
                  :
                  <button className=" text-white " onClick={handleEditClick}>
                    <AiOutlineCamera size={30} />
                  </button>
                }
              </div>
              <div className=" text-gray-300 mt-10">
                <h1 className="font-sans font-bold text-2xl">{user.firstName} {user.lastName}</h1>
                <p className="text-center font-medium text-base mt-4 text-[#9f9f98]">He/she</p>
                <p className="font-sans font-bold text-md mt-4">{user.email}</p>
                {/* Edit buttons for About and Bio */}
                <div className="flex justify-center mt-8 font-sans font-bold text-sm">
                  <button
                    className="flex bg-[#4d4d7a] p-2 rounded-sm mr-4"
                    onClick={() => handleEditFieldClick('about')}
                  >
                    About Yourself
                    <AiOutlineEdit size={24} color="white" />
                  </button>
                  <button
                    className="flex bg-[#4d4d7a] p-2 rounded-sm"
                    onClick={() => handleEditFieldClick('bio')}
                  >
                    Bio
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

      {/* Modal for About/Bio */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-[#323435] opacity-45"></div>
          <div className="bg-[#121212] p-8 rounded-lg shadow-md z-10 w-3/4">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">Update {fieldToUpdate}</h2>
            <textarea
              ref={inputRef}
              className="w-full h-32 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 mb-4 text-gray-200 text-lg font-semibold"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Write something about ${fieldToUpdate}...`}
            />
            <div className="flex justify-end">
              <button onClick={handleSave} className="bg-[#2e6a31] text-white px-4 py-2 rounded-md mr-2">
                Save
              </button>
              <button onClick={handleCloseModal} className="bg-red-600 px-4 py-2 rounded-md text-white">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Profile;
