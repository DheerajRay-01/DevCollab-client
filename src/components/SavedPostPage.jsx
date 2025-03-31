import React, { useState ,useEffect } from "react";
import SavedPostCard from "./elements/cards/SavedPostCard";
import { useSelector } from "react-redux";

const SavedPostPage = () => {
  
  
  const savedPosts = useSelector((state)=> state.saved.saved)
  console.log(savedPosts);

  // ✅ Example Saved Posts
 
  return (
    <div className="min-h-screen p-8 ">
      {savedPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {savedPosts.map((post) => (
            <SavedPostCard key={post._id} card={post} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-gray-500 text-lg font-medium">No saved posts yet.</p>
        </div>
      )}
    </div>
  );
};

export default SavedPostPage;
