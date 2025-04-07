import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaSignOutAlt } from "react-icons/fa";
import {useDispatch } from "react-redux";
import axiosInstance from "../axios/axios";
import { clearUser } from "../redux/userSlice";

function LogoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);

  // Handle Logout Function
  const handleLogout = async () => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);
  
    try {
      await axiosInstance.post("/user/logout");
      dispatch(clearUser())
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
      setLoading(false);
    }
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        navigate(-1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md sm:max-w-sm xs:max-w-xs text-center relative transition-transform transform scale-100">
        {/* Logout Icon */}
        <div className="flex items-center justify-center mb-4">
          <FaSignOutAlt size={50} className="text-red-500" />
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl font-semibold text-gray-800 sm:text-xl">
          Confirm Logout
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-xs">
          Are you sure you want to log out? You will need to log in again to access your account.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 hover:shadow-md transition duration-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            disabled={loading}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg flex justify-center items-center gap-2 transition duration-300 cursor-pointer ${
              loading
                ? "bg-red-300 text-gray-700 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600 hover:shadow-md"
            }`}
          >
            {loading ? "Logging out..." : <><FaSignOutAlt /> Logout</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
