import React from "react";
import { FaTools } from "react-icons/fa";
import { useNavigate } from "react-router";

function ExplorePost() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <FaTools className="text-6xl text-gray-500 mb-4 animate-pulse" />
      <h1 className="text-3xl font-bold text-gray-800">🚧 Under Development 🚧</h1>
      <p className="text-lg text-gray-600 mt-2">
        We're working on something amazing! Stay tuned for updates. 🚀
      </p>
      <button 
        className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all"
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
}

export default ExplorePost;
