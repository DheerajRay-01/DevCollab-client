import ProjectCard from "./elements/cards/ProjectCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axiosInstance from "../axios/axios.js";
import { setFeedData } from "../redux/feedSlice.js";
import { FaSpinner } from "react-icons/fa";
import { useEffect } from "react";

function Home() {

  const dispatch = useDispatch();

  const { feed, currentPage, limit ,searchTerm} = useSelector((state) => state.feed.feed);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");


  const getMoreFeed = async () => {
    setLoading(true);
    setError("")
    try {
      const feedResponse = await axiosInstance.get(
        `/post/get-all-post?p=${currentPage}&l=${limit}`
      );

      if (feedResponse.data.data.length < 1) {
        setHasMore(false);
      }

      dispatch(setFeedData(feedResponse.data.data));
    } catch (err) {
      console.error("Error fetching feed data:", err.message);
      setError(err.message)
    } finally {
      setLoading(false); // ✅ Ensures loading resets even if an error occurs
    }
  };


  return  (
    <div className="min-h-screen px-4 sm:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-10">
          {searchTerm ?`${searchTerm.toUpperCase()} Projects 🚀 (${feed.length}) ` : "Open Source Projects 🚀"}
        </h1>

        {/* Grid Layout for Project Cards */}
        {error && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mt-4">
    <strong>Error:</strong> {error}
  </div>
)}

{
  Array.isArray(feed) && feed.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {feed.map((user, index) => (
        <ProjectCard key={index} card={user} />
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center h-64">
      <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <span className="ml-4 text-lg font-medium text-gray-600">Loading feed...</span>
    </div>
  )
}


{feed.length >= 1 && <div className="flex justify-center mt-8">
  <button
    className={`flex items-center justify-center gap-3 bg-amber-500 text-white text-lg font-medium 
      px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out 
      hover:bg-amber-600 hover:shadow-xl hover:scale-105 
      active:scale-100 cursor-pointer 
      disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60`}
    disabled={!hasMore || loading}
    onClick={getMoreFeed}
  >
    {loading && <FaSpinner className="animate-spin text-white text-xl" />}
    {loading ? "Loading..." : hasMore ? "Load More" : "No More Posts"}
  </button>
</div>
}


  

      </div>
    </div>
  )
}

export default Home;
