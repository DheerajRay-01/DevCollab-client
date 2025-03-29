import React from "react";

const MiniRepoCard = ({ repo, handleClick }) => {
  return (
    <div className="flex justify-center p-2">
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 
                   p-5 transition-transform transform hover:scale-105 hover:shadow-lg 
                   cursor-pointer duration-300 ease-in-out"
        onClick={handleClick}
      >
        {/* Repository Name */}
        <h4 className="text-lg font-semibold text-gray-900 truncate mb-2">
          {repo.name}
        </h4>

        {/* Repository Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {repo.description || "No description available"}
        </p>

        {/* Repo Stats */}
        <div className="flex justify-between items-center text-gray-700 text-sm gap-2">
          <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs flex items-center gap-1">
            🍴 {repo.forks_count} Forks
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs flex items-center gap-1">
            🛠 {repo.open_issues_count} Issues
          </span>
        </div>

        {/* Language Badge */}
        <div className="mt-3">
          <span className="bg-blue-100 text-blue-600 px-3 py-1 text-xs rounded-lg font-medium">
            📝 {repo.language || "Unknown"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MiniRepoCard;
