import ProfilePage from "./pages/ProfilePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router";
import Layout from "./components/Layout.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import CreatePostPage from "./pages/CreatePostPage.jsx";
import SavedPage from "./pages/SavedPage.jsx";
import MyRepoPage from "./pages/MyRepoPage.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx"; 
import LoginPage from "./pages/LoginPage .jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import { useDispatch,useSelector } from "react-redux";
import { setUser, setUserPost } from "./redux/userSlice.js";
import { useEffect, useState } from "react";
import axiosInstance from "./axios/axios.js";
import PostReviewPage from "./pages/PostReviewPage.jsx";
import { setFeedData } from "./redux/feedSlice.js";
import PostViewPage from "./pages/PostViewPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import { setSavedData } from "./redux/savedSlice.js";
import LoadingPage from "./pages/LoadingPage.jsx";
import LoadingFailedPage from "./pages/LoadingFailedPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import { detectBrowser } from "./components/browser/checkBrowser.js";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage.jsx";

function App() {
  const dispatch = useDispatch();
  const {currentPage , limit} = useSelector((state)=> state.feed.feed)


 
  useEffect(() => {
    
  const fetchFeed = async () => {
      try {
        const feedResponse = await axiosInstance.get(`/post/get-all-post?p=${currentPage}&l=${limit}`);
        dispatch(setFeedData(feedResponse.data.data));
      } catch (err) {
        console.error("Error fetching feed data:", err.message);
        alert(err.message)
      }
    };
  
    const fetchUserData = async () => {
      try {
        const [userResponse, userPostsResponse,allSavedPost] = await Promise.all([
          axiosInstance.get("/user/get-user"),
          axiosInstance.get("/user/my-posts"),
          axiosInstance.get("/post/all-saved"),
        ]);
        
  
        dispatch(setUser({ user: userResponse.data.data.user }));
        dispatch(setUserPost(userPostsResponse.data.data));
        dispatch(setSavedData(allSavedPost.data.data));

      } catch (err) {
        console.error("User not logged in or error fetching user data:", err.message);
      }
    };
  
    fetchFeed(); 
    fetchUserData(); 
  }, []); 


  return  (
    <BrowserRouter>

      <Routes>
        {/* Layout Wrapper */}
        <Route path="/" element={<Layout />}>
        <Route index element={ <HomePage  />} /> 
        <Route path="explore" element={<ExplorePage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="create-post" element={<CreatePostPage />} />
            <Route path="saved" element={<SavedPage />} />
            <Route path="my-repos" element={<MyRepoPage />} />
            <Route path="profile/:mode/:userId" element={<ProfilePage />} />
            <Route path="logout" element={<LogoutPage/>} />
            <Route path="review-create-post" element={<PostReviewPage/>} />
            <Route path="/view/:post/:id" element={<PostViewPage/>} />
            <Route path="/my-post/:post/:id" element={<PostViewPage/>} />
            <Route path="/analytics/:id" element={<AnalyticsPage/>} />
            <Route path="/Contact" element={<ContactPage/>  } />
            <Route path="/Privacy-Policy" element={<PrivacyPolicyPage/>  } />
            <Route path="/Terms-Conditions" element={<TermsAndConditionsPage/>  } />
          </Route>
        </Route>

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/failed" element={<LoadingFailedPage/>} />
        <Route path="/landing" element={<LandingPage/>  } />


        {/* Catch-All Route for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )  
 
}

export default App;
