// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaUpload, FaList, FaEdit, FaTimes } from 'react-icons/fa';
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; // For navigation

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate(); 

    
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
      <aside
        className={`bg-gray-800 text-white fixed top-0 left-0 h-full z-20 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 w-64`}
      >
        {/* Close Button for Mobile */}
        <div className="flex justify-between items-center px-4 py-6 sm:hidden">
          <span className="text-2xl font-semibold">Car Management</span>
          <button onClick={toggleSidebar} className="text-white">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Sidebar Header for Larger Screens */}
        <div className="hidden sm:block px-4 py-6 text-2xl font-semibold text-center">
          Car Management
        </div>

        <nav className="mt-8">
          <ul>
            <li className="hover:bg-gray-700 p-4">
              <Link
                to="/"
                className="flex items-center"
                onClick={toggleSidebar}
              >
                <FaCar className="mr-3" /> Dashboard
              </Link>
            </li>
            <li className="hover:bg-gray-700 p-4">
              <Link
                to="/upload"
                className="flex items-center"
                onClick={toggleSidebar}
              >
                <FaUpload className="mr-3" /> Upload Car
              </Link>
            </li>
            <li className="hover:bg-gray-700 p-4">
              <Link
                to="/view"
                className="flex items-center"
                onClick={toggleSidebar}
              >
                <FaList className="mr-3" /> View Cars
              </Link>
            </li>
            <li className="hover:bg-gray-700 p-4">
              <Link
                to="/manage"
                className="flex items-center"
                onClick={toggleSidebar}
              >
                <FaEdit className="mr-3" /> Manage Cars
              </Link>
            </li>
            <li className="hover:bg-gray-700 p-4">
              <button onClick={handleLogout} className="flex items-center"><MdOutlineLogout className="mr-3" /> Logout</button>
            </li>
          </ul>
        </nav>
      </aside>
    );
};

export default Sidebar;