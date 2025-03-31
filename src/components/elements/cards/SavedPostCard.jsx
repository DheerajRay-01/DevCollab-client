import { BsBookmarkFill } from "react-icons/bs";
import { useState } from "react";
import axiosInstance from "../../../axios/axios";
import { useDispatch } from "react-redux";
import { deleteSavedData } from "../../../redux/savedSlice";
const SavedPostCard = ({ card}) => {
  const dispatch = useDispatch()
  // const [isUnSaving, setIsUnSaving] = useState(false);
  const [isLoading , setIsLoading] = useState(false)
// console.log(card);

  const handleUnsave = async (e) => {
    e.stopPropagation();
    // setIsUnSaving(true);
    setIsLoading(true)
    try {
      const unsave =await axiosInstance.post("/post/save", {
        post: card.post,
        postName: card.repoName,
        name: card.name,
        login: card.login,
        avatar_url: card.avatar_url,
      });

      dispatch(deleteSavedData(card._id))
      // onUnsave(card._id); // Remove from UI after unsaving
      // console.log(unsave.data);
      
    } catch (error) {
      console.error("Error unsaving post:", error);
    }
    // setIsUnSaving(false);
    setIsLoading(false)
  };

  return (
    <div
      className="w-full sm:w-[340px] bg-white shadow-md rounded-xl p-5 border border-gray-200 
                 hover:shadow-lg transition-all cursor-pointer flex flex-col gap-4"
    >
      {/* Profile & Unsave Button */}
      <div className="flex justify-between items-center">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <img
            src={card.avatar_url}
            alt={card.name}
            className="w-11 h-11 rounded-full border border-gray-300"
          />
          <div>
            <p className="text-gray-900 font-semibold text-sm sm:text-base">{card.name}</p>
            <p className="text-xs text-gray-500">@{card.login}</p>
            <p className="text-lg text-gray-700 font-bold">{card.postName}</p>
          </div>
        </div>

        {/* Unsave Button */}
        
        
        <button
          onClick={handleUnsave}
          className={`text-red-500 hover:text-red-600 transition ${
            isLoading && "opacity-50 cursor-not-allowed"
          }`}
          // disabled={isUnSaving}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <BsBookmarkFill className="w-5 h-5" />
          )}
        </button>
        {/* <SavedPostCard card={card}/> */}
      </div>

      {/* Repo Name */}
      <h2 className="text-sm font-semibold text-gray-900 truncate">{card.repoName}</h2>
    </div>
  );
};

export default SavedPostCard;
