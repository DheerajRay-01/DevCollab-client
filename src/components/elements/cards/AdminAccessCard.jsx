import React, { useCallback, useState } from "react";
import { Eye, EyeOff, BarChart, Trash2  } from "lucide-react";
import axiosInstance from "../../../axios/axios.js";
import { useNavigate } from "react-router";
import {useDispatch} from 'react-redux'
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { deleteFeedData } from "../../../redux/feedSlice.js";
import { changePostVisibility, deleteUserPost } from "../../../redux/userSlice.js";
import { deleteSavedData } from "../../../redux/savedSlice.js";

function AdminAccessCard({ post_id ,isPublic}) {
  // console.log(post_id);
  
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [showConfirm, setShowConfirm] = useState(false); // Show confirmation pop-up
  const [isVisible, setIsVisible] = useState(false);
  const [loadingVisibility , setLoadingVisibility] = useState(false)
  const [isPostPublic, setIsPostPublic] = useState(isPublic); // Show confirmation pop-up

  const updateVisibility = useCallback(async () => {
    setLoadingVisibility(true);
    try {
      const res = await axiosInstance.get(`/post/change-visibility/id/${post_id}`);
      console.log("Visibility updated:", res.data.data.isPublic);

      dispatch(deleteFeedData(post_id))
      dispatch(changePostVisibility(post_id))
      setIsPostPublic(res.data.data.isPublic);

    } catch (error) {
      console.error("Error toggling visibility:", error);
    } finally {
      setLoadingVisibility(false);
    }
  }, [post_id]);
  

  const onDelete = async () => {

    try {
      const response = await axiosInstance.delete(`/post/delete/id/${post_id}`);
      if (response.status === 200) {

        dispatch(deleteFeedData(post_id))
        dispatch(deleteUserPost(post_id))
        dispatch(deleteSavedData(post_id))
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const onViewAnalytics = () => {
    navigate(`/analytics/${post_id}`)
  };

  return (
    <div className="absolute top-2 right-2 sm:right-4 flex items-center gap-3 sm:gap-4 z-20 backdrop-blur-md p-3 bg-transparent "  >
      {/* Visibility Toggle */}
      <button
        onClick={()=>setIsVisible((prev) => !prev) }
        className="text-gray-600 hover:text-gray-900 transition-all duration-200 cursor-pointer"
        
      >
        {
       loadingVisibility ? (<CgSpinnerTwoAlt size={20} className="animate-spin text-gray-500" />) : (
        isPostPublic  ? (
          <Eye className="w-5 h-5 text-blue-500 hover:text-blue-700" />
        ) : (
          <EyeOff className="w-5 h-5 text-red-500 hover:text-red-700" />
        )
      )
        }
      </button>

      {/* View Analytics */}
      <button
        onClick={onViewAnalytics}
        className="text-green-600 hover:text-green-800 transition-all duration-200 cursor-pointer"
      >
        <BarChart className="w-5 h-5" />
      </button>

      {/* Delete Post */}
      <div className="relative">
        <button
          onClick={() => setShowConfirm(true)}
          className="text-red-600 hover:text-red-800 transition-all duration-200 cursor-pointer"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        {/* Confirmation Pop-up */}
        {showConfirm && (
          <div className="absolute right-0 top-10 mt-2 w-44 bg-white shadow-xl rounded-lg p-3 border border-gray-200 z-30 transition-opacity duration-300 animate-fade-in">
            <p className="text-sm text-gray-700 font-medium">Are you sure?</p>
            <div className="flex justify-between mt-3">
              <button
                onClick={onDelete}
                className="text-white cursor-pointer bg-red-600 hover:bg-red-700 px-3 py-1.5 text-xs rounded-lg shadow-sm transition-all duration-200"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="text-gray-700 cursor-pointer bg-gray-200 hover:bg-gray-300 px-3 py-1.5 text-xs rounded-lg shadow-sm transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {isVisible && (
          <div className="absolute right-0 top-10 mt-2 w-44 bg-white shadow-xl rounded-lg p-3 border border-gray-200 z-30 transition-opacity duration-300 animate-fade-in">
            <p className="text-sm text-gray-700 font-medium">Make is {isPostPublic ? "Private" : "Public"}</p>
            <div className="flex justify-between mt-3">
              <button
                onClick={updateVisibility}
                className="text-white cursor-pointer bg-red-600 hover:bg-red-700 px-3 py-1.5 text-xs rounded-lg shadow-sm transition-all duration-200"
              >
               {isPostPublic ? "Private" : "Public"}
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-700 cursor-pointer bg-gray-200 hover:bg-gray-300 px-3 py-1.5 text-xs rounded-lg shadow-sm transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAccessCard;
