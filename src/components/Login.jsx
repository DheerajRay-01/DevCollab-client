import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router";

function Login() {
  const [isLoading, setIsLoading] = useState(false); // State to manage button disabling
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true); // Disable button
    try {
      const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
      // const redirectUri = encodeURIComponent("http://localhost:8001/auth/callback");
      const redirectUri = encodeURIComponent(import.meta.env.VITE_GITHUB_OAUTH_CALLBACK);

      if (!clientId) {
        throw new Error("GitHub Client ID is missing. Check your environment variables.");
      }

      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to initiate GitHub login. Please try again.");
      setIsLoading(false); // Re-enable button if login fails
    }
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center w-full max-w-md">
        <h1 className="text-white text-3xl font-semibold mb-6">Welcome to DevCollab</h1>
        <p className="text-gray-400 mb-6">Sign in with GitHub to continue</p>

        {/* GitHub Login Button */}
        <button
          className={`flex items-center justify-center gap-3 w-full ${
            isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"
          } transition duration-300 text-white font-semibold py-3 px-6 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500`}
          onClick={handleLogin}
          aria-label="Login with GitHub"
          disabled={isLoading}
        >
          <FaGithub size={24} />
          {isLoading ? "Signing in..." : "Login with GitHub"}
        </button>

        {/* Continue as Guest Button */}
        <button
          className={`mt-4 w-full ${
            isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-500"
          } transition duration-300 text-white font-semibold py-3 px-6 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500`}
          onClick={handleGuestLogin}
          aria-label="Continue as Guest"
          disabled={isLoading}
        >
          {isLoading ? "Redirecting..." : "Continue as Guest"}
        </button>
      </div>
    </div>
  );
}

export default Login;
