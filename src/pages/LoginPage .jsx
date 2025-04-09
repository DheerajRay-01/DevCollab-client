import React from 'react'
import Login from '../components/Login.jsx'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router';

function LoginPage () {
const user = useSelector((state) => state.user?.user?.user);


if (user) return <Navigate to="/" replace />;
  
return (
  <div>
    <Login />
  </div>
);

}

export default LoginPage 