import { useSelector } from "react-redux";
import { useParams } from "react-router";
import axiosInstance from "../../axios/axios";
import {useState,useEffect } from "react";

const Profile = () => {
  const userData = useSelector((state) => state.user.user?.user);
  const [user, setUser] = useState(null); 

  const { userId, mode } = useParams();
  // console.log(userId, mode);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axiosInstance.get(`/user/get-user-profile?userId=${userId}`);
        console.log(response.data);
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (mode === "user-profile") {
      getUserProfile();
    } else {
      setUser(userData);
    }
  }, [mode, userId, userData]); // Added userData as a dependency

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <p className="text-lg font-medium text-gray-700">Fetching...</p>
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  

  return (
    <div className="flex flex-col items-center px-6 py-12 space-y-8 text-gray-900">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        {user.avatar_url && (
          <img
            src={user.avatar_url}
            alt="Avatar"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-300 shadow-lg transition-transform hover:scale-105"
          />
        )}
        <h2 className="text-3xl font-bold tracking-wide">{user.name || user.login}</h2>
        <p className="text-gray-500 text-lg">@{user.login}</p>
        {user.bio && <p className="text-gray-700 max-w-xl leading-relaxed">
          {
            user.bio
          }
        </p>}
      </div>

      {/* Profile Links */}
      <div className="flex gap-6">
        {user.html_url && (
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline transition-colors hover:text-blue-800"
          >
            GitHub Profile
          </a>
        )}
        {user.twitter_username && (
          <a
            href={`https://twitter.com/${user.twitter_username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline transition-colors hover:text-blue-800"
          >
            Twitter
          </a>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-3xl text-center">
        {[
          { label: "Public Repos", value: user.public_repos },
          { label: "Followers", value: user.followers },
          { label: "Following", value: user.following },
          { label: "Contributions", value: user.total_contributions },
          { label: "Starred Repos", value: user.starred_repos },
          { label: "Posts Created", value: user.posts_created },
        ]
          .filter((stat) => stat.value !== undefined) // Ensure only valid stats are shown
          .map((stat, index) => (
            <div key={index} className="transition-transform hover:scale-105">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
      </div>

      {/* Top Languages */}
      {user.top_languages && user.top_languages.length > 0 && (
        <div className="text-center">
          <h3 className="text-xl font-semibold">Top Languages</h3>
          <div className="flex flex-wrap justify-center gap-3 mt-3">
            {user.top_languages.map((lang, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-gray-300"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
