import React, { useState, useEffect, useRef } from "react";
import TextCard from "./cards/TextCard";
import ProgressBar from "./progressBar/ProgressBar";
import ImageCard from "./cards/ImageCard";
import { useSelector } from "react-redux";
import AdminAccessCard from "./cards/AdminAccessCard";
import {
  FaCodeBranch,
  FaStar,
  FaFolder,
  FaGithub,
  FaUser,
  FaBug,
  FaUsers,
  FaExternalLinkAlt,
  FaClock,
  FaBalanceScale,
  FaSpinner,
  FaBookmark,
  FaCalendarAlt,
} from "react-icons/fa";
import SavePostBtn from "./savePost/SavePostBtn";
import { useNavigate } from "react-router";

function PostReviewCard({
  data,
  handlePostCardSubmitBtn,
  setPostDescription,
  setPostTags,
  loading,
  creatingPost = true,
  ...props
}) {
  const { isSaved, setIsSaved } = props;
  const user = useSelector((state) => state.user.user?.user);
  const userLogin = user?.login ?? "";
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  useEffect(() => {
    if (creatingPost) {
      const length = textareaRef.current.value.length;
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(length, length);
    }
  }, []);

  const repoStats = [
    {
      text: `Forks: ${data.forksCount}`,
      url: data.fork_url,
      icon: FaCodeBranch,
      iconStyle: "text-green-500 text-2xl",
    },
    {
      text: `Stars: ${data.starCount}`,
      url: data.stars_url,
      icon: FaStar,
      iconStyle: "text-yellow-500 text-2xl",
    },
    {
      text: `Issues: ${data.issues.length}`,
      url: data.issues_url,
      icon: FaBug,
      iconStyle: "text-red-500 text-2xl",
    },
    {
      text: `Contributors: ${data.contributors.length}`,
      url: data.contributors_url,
      icon: FaUsers,
      iconStyle: "text-purple-500 text-2xl",
    },
  ];
  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-8 bg-white shadow-lg rounded-lg mt-6 relative pt-15">
      {!creatingPost && <SavePostBtn card={data} isInPreview="true" />}

      {data?.login === userLogin && !creatingPost ? (
        <AdminAccessCard post_id={data._id} isPublic={data.isPublic} />
      ) : null}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
        {creatingPost ? "🚀 Review Repository" : `${data.repoName}`}
      </h1>

      <div className="sections grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {/* Repository Info Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            📌 Repository Info
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 text-[15px]">
            {/* Left Section: Repo & Owner Info */}
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <FaFolder className="text-blue-600 text-lg" />
                <strong className="text-gray-900">Repo:</strong>
                <span
                  className="truncate max-w-[200px] sm:max-w-[300px] block overflow-hidden whitespace-nowrap text-ellipsis"
                  title={data.repoName} // Shows full text on hover
                >
                  {data.repoName || "Unknown"}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <FaUser className="text-green-600 text-lg" />
                <strong className="text-gray-900">Owner:</strong>
                <a
                  onClick={() =>
                    navigate(`/profile/user-profile/${data.login}`)
                  }
                  className="text-blue-600 cursor-pointer font-medium hover:underline"
                >
                  {data.login}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaGithub className="text-gray-900 text-lg" />
                <strong className="text-gray-900">GitHub:</strong>
                <a
                  href={data.ownerProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline"
                >
                  {data.login}
                </a>
              </p>
            </div>

            {/* Right Section: Additional Repo Details */}
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <FaBalanceScale className="text-yellow-600 text-lg" />
                <strong className="text-gray-900">License:</strong>{" "}
                {data.license || "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <FaClock className="text-red-500 text-lg" />
                <strong className="text-gray-900">Updated:</strong>{" "}
                {data.lastUpdate || "Unknown"}
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-600 text-lg" />
                <strong className="text-gray-900">Posted:</strong>
                {new Date(data.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Repo Stats Section */}
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            📊 Repo Stats
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-2">
            {repoStats.map((stat, index) => (
              <TextCard
                key={index}
                link={stat.url}
                text={stat.text}
                icon={stat.icon}
                iconStyle={stat.iconStyle}
              />
            ))}
          </div>
        </div>

        {/* Language Progress Bar */}
        {Object.keys(data.languages).length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex justify-center items-center">
            <ProgressBar props={data.languages} />
          </div>
        )}

        {/* Description Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            {creatingPost ? "📖Write Post Description" : "📖 Description"}
          </h2>
          <textarea
            ref={textareaRef}
            className="w-full min-h-[120px] p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition-all resize-none text-gray-800 placeholder-gray-400"
            onChange={
              !creatingPost
                ? undefined
                : (e) => setPostDescription(e.target.value)
            }
            value={data.description}
            // placeholder={creatingPost ? "Description not available" : "Write a brief description of the repository..."}
            disabled={!creatingPost}
          />
        </div>

        {/* Open Issues Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md min-h-[250px] max-h-[300px]">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🐞 Open Issues
          </h2>
          <ul className="divide-y divide-gray-200 max-h-56 overflow-y-auto">
            {data.issues.length > 0 ? (
              data.issues.map((issue, index) => (
                <li key={index} className="p-3 hover:bg-gray-100 rounded-md">
                  <a
                    href={issue.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline cursor-pointer"
                  >
                    {issue.title}
                  </a>
                </li>
              ))
            ) : (
              <p className="text-gray-600 text-center">No open issues found.</p>
            )}
            <li className="p-3 hover:bg-gray-100 rounded-md">
              <a
                href={data.issues_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline"
              >
                View on GitHub
              </a>
            </li>
          </ul>
        </div>

        {/* Contributors Section */}
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md min-h-[250px]">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
            👨‍💻 Top Contributors
          </h2>
          <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2 flex-nowrap w-full">
            {data.contributors.length > 0 ? (
              data.contributors
                .slice(0, 10)
                .map((contributor, index) => (
                  <ImageCard
                    key={index}
                    name={contributor.name || contributor.login}
                    imageUrl={contributor.avatar_url}
                    link={contributor.url}
                  />
                ))
            ) : (
              <p className="text-gray-600 text-center w-full">
                No contributors available.
              </p>
            )}
            <TextCard
              text="View All"
              icon={FaUsers}
              iconStyle="text-purple-500 text-2xl"
              link={data.contributors_url}
            />
          </div>
        </div>
         
  {/* Tags Section */}
        {data.tags && data.tags.trim().length > 0 && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md ">
            <h2 className="text-xl font-semibold text-gray-900 mb-4"> {creatingPost ? "🏷️ Add Relevant Tags" : "🏷️ Tags"}</h2>
            <div className="flex flex-wrap gap-3">
              {data.tags.split(/[ ,]+/).reverse().map((tag, index) => (
                <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md hover:bg-blue-600 transition-all">
                  {tag}
                </span>
              ))}
            </div>
            {creatingPost && (
              <input
                type="text"
                className="mt-4 w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add or edit tags"
                value={data.tags}
                onChange={(e) => setPostTags(e.target.value)}
                // disabled={!creatingPost}
              />
            )}
          </div>
        )}
         

      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 w-full">
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 shadow-md transition-all duration-300"
        >
          <FaExternalLinkAlt className="text-lg" /> View Repository
        </a>

        <button
          disabled={loading}
          onClick={handlePostCardSubmitBtn}
          className={`px-5 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 
        ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 cursor-pointer text-white"
        }`}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin text-xl" />{" "}
              {creatingPost ? "Posting..." : "Redirecting..."}
            </>
          ) : (
            <>
              {creatingPost ? (
                "✅ Confirm & Post"
              ) : (
                <>
                  <FaCodeBranch className="text-lg" />{" "}
                  <span className="font-medium">Contribute</span>
                </>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default PostReviewCard;
