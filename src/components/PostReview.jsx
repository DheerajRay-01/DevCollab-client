import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCreatingPostData } from "../redux/createPostSlice";
import { Navigate, useNavigate } from "react-router";
import axiosInstance from "../axios/axios";
import PostReviewCard from "./elements/PostReviewCard";

function PostReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postData = useSelector((state) => state.createPost.postData);

  const [loading, setLoading] = useState(false);
  const [postDescription, setPostDescription] = useState(
    postData?.repoData?.description || ""
  );

  if (!postData || !postData.repoData) {
    return <Navigate to="/" />;
  }

  const data = {
    repoName: postData?.repoData?.repoName || "",
    url: postData?.repoData?.url || "#",
    login: postData?.repoData?.login || "",
    ownerProfile: postData?.repoData?.ownerProfile || "",
    forksCount: postData?.repoData?.forksCount || 0,
    starCount: postData?.repoData?.starCount || 0,
    contributorCount: postData?.repoData?.contributorCount || 0,
    issuesCount: postData?.repoData?.issuesCount || 0,
    description: postDescription || "No description available",
    license: postData?.repoData?.license || "No License",
    issues_url: postData?.repoData?.issues_url || "#",
    contributors_url: postData?.repoData?.contributors_url || "#",
    fork_url: postData?.repoData?.fork_url || "#",
    stars_url: postData?.repoData?.stars_url || "#",
    lastUpdate: postData?.repoData?.lastUpdate || "N/A",
    contributors: postData?.contributors || [],
    issues: postData?.issues || [],
    languages: postData?.languages || {},
  };

  const handlePostCardSubmitBtn = async () => {
    try {
      console.log("Post creation initiated...");
      setLoading(true);

      const response = await axiosInstance.post("/repo/uploading-post", data);

      if (!response?.data) {
        console.error("Unexpected response:", response);
        throw new Error("No response data received.");
      }

      console.log("response:", response.data);
      dispatch(clearCreatingPostData());
      navigate("/"); // Redirect after post creation
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostReviewCard
      data={data}
      handlePostCardSubmitBtn={handlePostCardSubmitBtn}
      setPostDescription={setPostDescription}
      loading={loading}
      creatingPost={true}
    />
  );
}

export default PostReview;
