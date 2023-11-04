import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "redux/userSlice";

interface PublicRouteProps {
  children: React.ReactElement;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
}: PublicRouteProps) => {
  const loggedIn = useSelector(selectLoggedIn);

  if (loggedIn) {
    return <Navigate to="/quiz" replace />;
  }

  return children;
};
