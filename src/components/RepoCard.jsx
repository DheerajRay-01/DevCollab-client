import React, { useState } from "react";
import axiosInstance from "../axios/axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setCreatingPostData } from "../redux/createPostSlice";
import MiniRepoCard from "./elements/cards/MiniRepoCard";

const RepoCard = ({ repoData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

  // Ensure repoData is valid before proceeding
  if (!repoData) {
    return <p className="text-gray-500 text-center">No repository data available.</p>;
  }

  // Destructure required repository data with fallbacks
  const {
    name = "Unnamed Repository",
    description = "No description available",
    forks_count = 0,
    open_issues_count = 0,
    language
  } = repoData;


  const handleClick = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`/repo/create-post`, {
        params: { repo: name },
      });
    
      if (response?.data?.data?.repoData) {
        const postData = response.data.data.repoData;
        dispatch(setCreatingPostData(postData));
        navigate("/review-create-post");
      }
    } catch (error) {
      console.error("Error fetching repo data:", error);
      alert("⚠️ Failed to fetch repository data. Please try again!");
    } finally {
      setLoading(false);
    }
    
  };

  return loading ? (
    <div className="flex justify-center items-center py-4">
      <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <span className="ml-2 text-gray-700">Fetching Repo Data...</span>
    </div>
  ) : (
    <MiniRepoCard
      repo={{ name, forks_count, open_issues_count, description ,language}}
      handleClick={handleClick}
    />
  );
  
};

export default RepoCard;
