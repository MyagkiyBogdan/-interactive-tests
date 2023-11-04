import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "redux/userSlice";

interface PrivateRouteProps {
  children: React.ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
}: PrivateRouteProps) => {
  const loggedIn = useSelector(selectLoggedIn);

  if (!loggedIn) {
    return <Navigate to="/landing" replace />;
  }

  return children;
};
