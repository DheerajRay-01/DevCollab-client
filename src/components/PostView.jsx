import React, { useEffect, useState } from "react";
import PostReviewCard from "./elements/PostReviewCard";
import { useParams } from "react-router";
import axiosInstance from "../axios/axios";
import { useSelector } from "react-redux";
import AdminAccessCard from "./elements/cards/AdminAccessCard";
import Comment from "./elements/comment/Comment.jsx";


function PostView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [isSaved, setIsSaved] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [PostDataResponse, isSavedRes] = await Promise.all([
          axiosInstance.get(`/post/id/${id}`, { signal }),
          axiosInstance.post("/post/is-saved", { post: id }),
        ]);

        setData(PostDataResponse.data.data);
        // console.log(PostDataResponse.data.data);
        
        setIsSaved(isSavedRes.data.data.isSaved);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching post:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [id]);

  const toggleSave = async () => {
    try {
      const savedChange = await axiosInstance.post("/post/save", {
        post: id,
      });
      console.log(savedChange);

      setIsSaved((pre) => !pre);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handlePostCardSubmitBtn = () => {
    if (data?.issues_url) {
      window.open(data.issues_url, "_blank");
    } else {
      console.error("Issue URL not available");
    }
  };
  // console.log(user);

  if (loading) {
    return (
      <p className="text-center text-lg text-gray-500 animate-pulse">
        Loading...
      </p>
    );
  }

  if (!loading && !data) {
    return <p className="text-center text-lg text-red-500">No post found</p>;
  }

  return (
    <>
      <PostReviewCard
        data={data}
        isSaved={isSaved}
        setIsSaved={toggleSave}
        handlePostCardSubmitBtn={handlePostCardSubmitBtn}
        creatingPost={false}
      />
    <Comment data={data}/>
    </>
  );
}

export default PostView;
