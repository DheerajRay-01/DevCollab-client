import React, { useState, useEffect } from "react";
import { FaSpinner, FaBookmark } from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import axiosInstance from "../../../axios/axios";
import { useDispatch } from "react-redux";
import { AddSavedData, deleteSavedData } from "../../../redux/savedSlice";

function SavePostBtn({ card, isInPreview }) {
  const [isSaved, setIsSaved] = useState(false);
  const [savedCnt, setSavedCnt] = useState(card.postSaved);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    let isMounted = true;
    const checkIsSave = async () => {
      try {
        setIsLoading(true);
        const isSavedRes = await axiosInstance.post("/post/is-saved", {
          post: card._id,
        });
        if (isMounted) {
          setIsSaved(isSavedRes.data.data.isSaved);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching saved status:", error);
      }
    };
    checkIsSave();

    return () => {
      isMounted = false;
    };
  }, [card._id]);

  const toggleSave = async (e) => {
    e.stopPropagation();
    try {
        setIsLoading(true)
      const savedChange = await axiosInstance.post("/post/save", {
        post: card._id,
        postName: card.repoName,
        name: card.name,
        login: card.login,
        avatar_url: card.avatar_url,
      });
      const newSaveData = savedChange.data.data.changeSaved
      
      const saveStatus = savedChange.data.data.savedStatus
      if(saveStatus){
            dispatch(AddSavedData(newSaveData))
      }else{
            dispatch(deleteSavedData(newSaveData._id))
      }
      
      const isNowSaved = savedChange.data.data.savedStatus;
      setSavedCnt((prev) => (isNowSaved ? prev + 1 : Math.max(0, prev - 1)));
      setIsSaved(isNowSaved);
      setIsLoading(false)
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return !isLoading ? (
    isInPreview ? (
      <button
        className="absolute top-4 left-4 cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition-all flex items-center gap-2"
        onClick={toggleSave}
      >
        <FaBookmark className={isSaved ? "text-blue-500" : "text-gray-400"} />
        {isSaved ? "Saved" : "Save"}
      </button>
    ) : (
      <div className="flex flex-col items-center">
        <button
          onClick={toggleSave}
          className="text-gray-600 hover:text-gray-900 transition cursor-pointer"
        >
          {isSaved ? (
            <BsBookmarkFill className="w-6 h-6 text-blue-500" />
          ) : (
            <BsBookmark className="w-6 h-6" />
          )}
        </button>
        <span className="text-gray-600 text-xs sm:text-sm mt-1 font-medium">
          {savedCnt}
        </span>
      </div>
    )
  ) : (
    <FaSpinner className="animate-spin" />
  );
}

export default SavePostBtn;
