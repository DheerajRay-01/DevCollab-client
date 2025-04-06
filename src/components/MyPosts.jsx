import React, { useState } from "react";
import { useSelector } from "react-redux";
import MyPostCard from "./elements/cards/MyPostCard";
import { Trash2 } from "lucide-react";
import axiosInstance from "../axios/axios";
import { useDispatch } from "react-redux";
import { deleteAllUserPost } from "../redux/userSlice";
import { deleteUsersSelfFeedData } from "../redux/feedSlice";

function MyPosts() {
  const userId = useSelector(state => state?.user?.user?.user?.login)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch()
  const postInfo = useSelector((state) => state.user?.userPosts);

  if (!postInfo || postInfo.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh] text-center">
        <h2 className="text-2xl font-semibold text-gray-700">My Posts</h2>
        <p className="text-gray-500 text-lg mt-4">
          No posts found. Start creating something amazing!
        </p>
      </div>
    );
  }

  const handleAllDelete = async () => {
    try {
      await axiosInstance.delete("/post/delete-all");
      setIsModalOpen(false); // Close modal after deletion
      dispatch(deleteAllUserPost())
      dispatch(deleteUsersSelfFeedData(userId))
    } catch (error) {
      console.error("Error deleting posts:", error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 relative">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Posts</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <Trash2 className="w-5 h-5" />
          Delete All
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {postInfo.map((post) => (
          <div key={post._id} className="flex justify-center">
            <MyPostCard post={post} />
          </div>
        ))}
      </div>

      {/* Custom Confirmation Popup with Blur Background */}
      {isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md">
    <div className="bg-white p-6 rounded-xl shadow-lg text-center w-96">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
      <p className="text-gray-600">Are you sure you want to delete all your posts? This action cannot be undone.</p>
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          onClick={handleAllDelete}
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default MyPosts;
