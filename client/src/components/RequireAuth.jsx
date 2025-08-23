// src/components/RequireAuth.jsx
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("tca_admin_token");
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default RequireAuth;
