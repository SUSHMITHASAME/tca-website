// src/components/ProtectedAdminRoute.js

import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdminRoute = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Check if user is logged in AND is an admin
  const isAdmin = token && role === 'admin';

  // If they are an admin, show the page.
  // Otherwise, send them to the login page.
  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedAdminRoute;