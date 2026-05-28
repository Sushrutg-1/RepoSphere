import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useRoutes } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import Profile from "../components/user/Profile";
import AuthPage from "../components/auth/AuthPage";
import Navbar from "../components/navbar/Navbar";

const AppRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    if (userIdFromLocalStorage && !currentUser) {
      setCurrentUser(userIdFromLocalStorage);
    }

    if (
      !userIdFromLocalStorage &&
      !["/auth"].includes(window.location.pathname)
    ) {
      navigate("/auth");
    }
    if (currentUser && window.location.pathname === "/auth") {
      navigate("/");
    }
  }, [currentUser, setCurrentUser, navigate]);

  const element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/auth",
      element: <AuthPage />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return element;
};

export default AppRoutes;
