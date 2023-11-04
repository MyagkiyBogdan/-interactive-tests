import { Navigate } from "react-router-dom";

const RedirectToLogin: React.FC = () => {
  return <Navigate to="/login" />;
};

export default RedirectToLogin;
