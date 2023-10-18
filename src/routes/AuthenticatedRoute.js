import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoute = ({ children }) => {
  const userIsLoggedIn = !!localStorage.getItem("user");

  if (!userIsLoggedIn) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};

export default AuthenticatedRoute;
