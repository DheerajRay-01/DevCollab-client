import { FaCodeBranch, FaUsers, FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { SlOptionsVertical } from "react-icons/sl";
import AdminAccessCard from "./AdminAccessCard";
import { useState } from "react";

const MyPostCard = ({ post }) => {
  // const [openOption, setOpenOption ] = useState(false)
  const navigate = useNavigate()
  const { repoName, description, contributorCount, issuesCount, languages ,isPublic} = post;

  const handleCardClick = () => {
    console.log(post._id);
    navigate(`/my-post/${post.repoName}/${post._id}`)

  };

  return (
    <div
    onClick={handleCardClick}
    className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 
    hover:shadow-2xl transition-transform transform hover:-translate-y-1 
    cursor-pointer hover:bg-gray-50 active:scale-95 max-w-2xl w-full mx-auto relative"
  >
    {/* Public/Private Flag */}
    <div
      className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full 
      ${isPublic ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
    >
      {isPublic ? "Public" : "Private"}
    </div>
  
    {/* Repo Name */}
    <h2 className="text-xl font-semibold text-gray-900 truncate">{repoName}</h2>
  
    {/* Description */}
    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>
  
    {/* Repo Stats */}
    <div className="flex justify-between items-center mt-4">
      {/* Contributors */}
      <div className="flex items-center gap-2 text-gray-700">
        <FaUsers className="text-lg text-purple-500" />
        <span className="text-sm font-medium">{contributorCount} Contributors</span>
      </div>
  
      {/* Issues */}
      <div className="flex items-center gap-2 text-gray-700">
        <FaExclamationCircle className="text-lg text-red-500" />
        <span className="text-sm font-medium">{issuesCount} Issues</span>
      </div>
    </div>
  
    {/* Languages */}
    <div className="flex flex-wrap gap-2 mt-4">
      {Object.keys(languages).map((lang, index) => (
        <span
          key={index}
          className="bg-gray-300 text-gray-800 px-3 py-1 text-xs font-medium rounded-md"
        >
          {lang}
        </span>
      ))}
    </div>
  </div>
  
  );
};

export default MyPostCard;
