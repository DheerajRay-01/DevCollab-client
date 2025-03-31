import React, { useRef, useState } from "react";
import axiosInstance from "../axios/axios.js";
import RepoCard from "./RepoCard.jsx";

function CreatePost() {
  const [repo, setRepo] = useState("");
  const [repoData, setRepoData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allRepo, SetAllRepo] = useState(null);
  const [isAllRepoOpen, setIsAllRepoOpen] = useState(false);
  const [isFetchingRepo , setIsFetchingRepo] = useState(false)
  const formRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!repo.trim()) {
      setError("Please enter a repository name");
      return;
    }

    setLoading(true);
    setError(null);
    setRepoData(null);

    try {
      const response = await axiosInstance.get(`/repo/get-data`, {
        params: { repo },
      });

      console.log(response.data.data.repo);
      setRepoData(response.data.data.repo);
    } catch (error) {
      setError("Repository not found or error fetching data");
      console.error("Error fetching repo data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAllRepo = async () => {
    if(isAllRepoOpen){
      setIsAllRepoOpen(false)
      return
    } 
    setIsFetchingRepo(true)
    try {
      const allRepo = await axiosInstance.get("/user/my-repo");
      console.log(allRepo.data);
      SetAllRepo(allRepo?.data.data);
    } catch (error) {
      console.error("Error fetching all repos:", error);  
    }finally{
      setIsFetchingRepo(false)
      setIsAllRepoOpen((pre)=>!pre)
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-lg rounded-lg border border-gray-200 bg-white transition-all w-full">
      {/* Heading */}
      <h3 className="text-2xl font-semibold text-gray-900 mb-5 text-center">
        Fetch GitHub Repository Data
      </h3>

      {/* Input & Button */}
      <form onSubmit={handleSubmit} ref={formRef} className="mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
        <input
  type="text"
  placeholder="Enter repository name..."
  value={repo}
  onChange={(e) => setRepo(e.target.value)}
  className="border p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 
             transition-all text-gray-800 placeholder-gray-500 text-lg font-medium"
/>

          <button
            type="submit"
            disabled={!repo.trim() || loading}
            className="bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 cursor-pointer
                 disabled:opacity-50 transition-all"
          >
            {loading ? "Fetching..." : "Get"}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm text-center">
          ⚠️ {error}
        </div>
      )}

      {/* Repo Data Card */}
      {loading ? (
        <div className="flex justify-center items-center mt-5">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <span className="ml-2 text-gray-700">Fetching data...</span>
        </div>
      ) : (
        repoData && (
          <div className="mt-5">
            <RepoCard repoData={repoData} />
          </div>
        )
      )}

      {/* Fetch All Repos Button */}
      <button
        className="bg-blue-500 cursor-pointer text-white px-5 py-3 rounded-md mt-5 w-full hover:bg-blue-600 transition-all"
        onClick={handleFetchAllRepo}
      >
        {isFetchingRepo ? "Fetching" : "See All Repositories"}
      </button>

      {/* Repositories List */}
      <div className="mt-4 max-h-80 overflow-y-auto border rounded-lg shadow-sm bg-gray-50 p-3">
       
        <ul className="divide-y divide-gray-300">
          {allRepo?.length > 0 && isAllRepoOpen ? (
            allRepo.map((repo) => (
              <li
              key={repo.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 cursor-pointer 
                         hover:bg-gray-200 rounded-md transition-all"
              onClick={() =>{
                setRepo(repo.name)
                formRef.current.requestSubmit()
              }}
              
            >
              <p className="font-medium text-gray-800">{repo.name}</p>
              <p className="text-gray-600 text-sm sm:text-right">Updated: {repo.updated_at}</p>
            </li>
            
            ))
          ) : (
            <li className="text-gray-500 text-center p-3">
              No repositories found
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default CreatePost;
