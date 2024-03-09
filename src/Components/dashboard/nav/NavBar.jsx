import React, { useState } from 'react'
import { Link } from "react-router-dom";
import {  AiOutlineMail, AiOutlineSetting } from 'react-icons/ai';
import { BsShieldLock } from "react-icons/bs";

const NavBar = ({user}) => {

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
      };
    return (<>
        <nav className="bg-[#1D2021] z-10 fixed top-0 w-full pt-4 h-[72px]">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="flex flex-shrink-0 justify-between items-center">
              <div className="flex items-center">
                <Link to={""} className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-bold">
                  <img className="h-6 w-6" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                  <span>Welcome, {user.firstName}</span>
                </Link>
              </div>
              <div className="flex items-center">
                <div className=" mr-6">
                  {user.profilePic ? 
                    <img className="h-12 w-12 rounded-full bg-[#a6355f]" src={user.profilePic} alt="User" />
                    :
                    <div  className="h-12 w-12 rounded-full bg-[#a6355f]" ></div>

                  }
                </div>
                <div className="ml-2 relative">
                  <button className="text-gray-300 hover:text-white flex mr-4" onClick={toggleDropdown}>
                    <AiOutlineSetting className="h-6 w-6 mr-4" /> Settings
                  </button>
                  {showDropdown && (
                    <div className="absolute z-10 right-0 mt-2 w-56 bg-gray-800 rounded-md shadow-lg">
                      <div className="py-1">
                        <Link to="/dashboard/change-email" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                          <AiOutlineMail className="inline-block mr-2" size={34} />Change Email
                        </Link>
                        <Link to="/dashboard/Change-password" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                          <BsShieldLock className="inline-block text-gray-300 text-4xl mr-2" />
                          Change password
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </nav>
  </>
  )
}

export default NavBar