import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios/axios';
import { Navigate, Outlet } from 'react-router';

function ProtectedRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const response = await axiosInstance.get('/user/get-user');
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setIsAuthenticated(false); 
      }
    };

    handleGetUser();
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
