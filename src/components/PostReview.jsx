import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCreatingPostData } from "../redux/createPostSlice";
import { Navigate, useNavigate } from "react-router";
import axiosInstance from "../axios/axios";
import PostReviewCard from "./elements/PostReviewCard";
import { addUserPost } from "../redux/userSlice";
import { addFeedData } from "../redux/feedSlice";

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
      // console.log(response.data);
      if (!response?.data) {
        console.error("Unexpected response:", response);
        throw new Error("No response data received.");
      }
      
      console.log("response:", response.data);
     const newPost = {
      _id:response.data.data._id,
       repoName:response.data.data.repoName,
       description:response.data.data.description, 
       contributorCount:response.data.data.contributorCount, 
       issuesCount:response.data.data.issuesCount, 
       languages:response.data.data.languages, 
       isPublic:response.data.data.isPublic,
      }
 
      const  newFeed = {
        name: response.data.data.name ,
        login: response.data.data.login ,
        avatar_url: response.data.data.avatar_url ,
        ownerProfile: response.data.data.ownerProfile ,
        url: response.data.data.url ,
        issues_url: response.data.data.issues_url ,
        postSaved: response.data.data.postSaved,
      }

     console.log(newPost);
      dispatch(clearCreatingPostData());
      dispatch(addUserPost(newPost))
      dispatch(addFeedData({ ...newPost, ...newFeed }));

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
