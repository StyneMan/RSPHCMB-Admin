import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import user from "../../data/redux/slice/user";
import Login from "../pages/login";

const useAuth = () => {
  const { userData } = useSelector((state) => state.user);
  return userData;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();

  // if (!userData) {
  //   return <Navigate to="/login" replace />;
  // }

  return isAuth !== null ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
