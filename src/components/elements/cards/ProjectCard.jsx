import { FaGithub, FaCodeBranch } from "react-icons/fa";
import { GoIssueOpened } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs"; // Save icons
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../../../axios/axios.js";
import SavePostBtn from "../savePost/SavePostBtn.jsx";

const ProjectCard = ({ card }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/view/${card.repoName}/${card._id}`);
  };

  return (
    <div
      className="w-full bg-white shadow-lg rounded-xl overflow-hidden p-6 border border-gray-200 transition-transform transform hover:scale-[1.03] hover:shadow-xl flex flex-col h-full cursor-pointer"
      onClick={handleClick}
    >
      {/* Top Section: Owner & Save Button */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-4">
          <img
            src={card.avatar_url}
            alt={card.name}
            className="w-14 h-14 rounded-full border border-gray-300"
          />
          <div>
            <a
              href={card.ownerProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 font-semibold hover:underline"
              aria-label={`Visit ${card.name}'s GitHub profile`}
              onClick={(e) => e.stopPropagation()}
            >
              {card.name}
            </a>
            <p className="text-xs text-gray-500">@{card.login}</p>
          </div>
        </div>
        <SavePostBtn card={card} />
      </div>

      {/* Project Title */}
      <h2 className="text-lg font-bold text-gray-900 mb-2">{card.repoName}</h2>

      {/* Description */}
      <p className="text-gray-700 text-sm flex-grow">
        {card.description.length > 100
          ? `${card.description.substring(0, 100)}...`
          : card.description}
      </p>

      {/* Languages */}
      {card.languages && Object.keys(card.languages).length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {Object.keys(card.languages).map((lang, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 px-3 py-1 text-xs rounded-md"
            >
              {lang}
            </span>
          ))}
        </div>
      )}

      {/* GitHub Data */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-700">
        <p className="flex items-center gap-2">
          <GoIssueOpened className="text-red-500 w-4 h-4" />
          <span>Open Issues: {card.issuesCount ?? 0}</span>
        </p>
        <p className="flex items-center gap-2">
          <FiUsers className="text-green-500 w-4 h-4" />
          <span>Contributors: {card.contributorCount ?? 0}</span>
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        {/* GitHub Repo Button */}
        <a
          href={card.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-1/2 bg-gray-900 text-white px-5 py-3 rounded-lg text-sm hover:bg-gray-700 flex items-center gap-2 justify-center transition"
          aria-label={`View ${card.repoName} repository on GitHub`}
          onClick={(e) => e.stopPropagation()}
        >
          <FaGithub className="w-5 h-5 shrink-0" />
          <span>Repository</span>
        </a>

        {/* Apply to Contribute Button */}
        <a
          href={card.issues_url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-1/2 bg-blue-600 text-white px-5 py-3 rounded-lg text-sm hover:bg-blue-500 flex items-center gap-2 justify-center transition"
          aria-label={`View open issues for ${card.repoName}`}
          onClick={(e) => e.stopPropagation()}
        >
          <FaCodeBranch className="w-5 h-5 shrink-0" />
          <span>Contribute</span>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
