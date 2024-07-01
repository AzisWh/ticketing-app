import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isAuth, redirectPath = "/login" }) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
