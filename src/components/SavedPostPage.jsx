import React, { useState, useEffect } from "react";
import SavedPostCard from "./elements/cards/SavedPostCard";
import { useSelector } from "react-redux";
import { FaBookmark } from "react-icons/fa";

const SavedPostPage = () => {
  const savedPosts = useSelector((state) => state.saved.saved);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (useful if fetching from API in real case)
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <div className="min-h-screen px-6 py-8">
      {/* ✅ Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">📌 Saved Posts</h1>
        <p className="text-gray-500 mt-2">Manage and revisit your saved repositories.</p>
      </div>

      {/* ✅ Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin text-4xl text-blue-600">
            <FaBookmark />
          </div>
        </div>
      ) : savedPosts.length > 0 ? (
        // <div className="grid grid-cols-1 sm:grid-cols-2  gap-5 place-items-center">
        <div className="flex flex-wrap gap-5 justify-center" >
          {savedPosts.map((post) => (
            <SavedPostCard key={post._id} card={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <FaBookmark className="text-gray-400 text-6xl mb-4" />
          <p className="text-gray-500 text-lg font-medium">No saved posts yet.</p>
        </div>
      )}
    </div>
  );
};

export default SavedPostPage;
