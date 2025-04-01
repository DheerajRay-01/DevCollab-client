import React from "react";
import { useSelector } from "react-redux";
import MyPostCard from "./elements/cards/MyPostCard";

function MyPosts() {
  const postInfo = useSelector((state) => state.user?.userPosts);
  console.log(postInfo);
  

  if (postInfo.length === 0) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-gray-500 text-lg">No posts found. Start creating something amazing!</p>
      </div>
    );
  }

  return ( 
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {postInfo.map((post) => (
          <div key={post._id} className="flex justify-center">
            <MyPostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPosts;
