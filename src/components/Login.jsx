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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
    <div className="bg-gray-800 bg-opacity-90 p-10 rounded-3xl shadow-2xl text-center w-full max-w-md backdrop-blur-md border border-gray-700">
      <h1 className="text-white text-4xl font-bold mb-4 tracking-wide">
        Welcome to <span className="text-blue-400">DevCollab</span>
      </h1>
      <p className="text-gray-300 mb-8 text-lg">
        Sign in with GitHub to continue
      </p>

      {/* GitHub Login Button */}
      <button
        className={`flex items-center justify-center gap-3 w-full py-3 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300
          ${isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"}
          text-white text-lg focus:outline-none focus:ring-4 focus:ring-blue-400`}
        onClick={handleLogin}
        aria-label="Login with GitHub"
        disabled={isLoading}
      >
        <FaGithub size={26} />
        {isLoading ? "Signing in..." : "Login with GitHub"}
      </button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative px-4 bg-gray-800 text-gray-400 text-sm uppercase">or</div>
      </div>

      {/* Continue as Guest Button */}
      <button
        className={`w-full py-3 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300
          ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"}
          text-white text-lg focus:outline-none focus:ring-4 focus:ring-gray-500`}
        onClick={handleGuestLogin}
        aria-label="Continue without Login"
        disabled={isLoading}
      >
        {isLoading ? "Redirecting..." : "Continue without Login"}
      </button>
    </div>
  </div>
  );
}

export default Login;
