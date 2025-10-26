import { Navigate, Outlet } from 'react-router-dom';

const ProtectedUserRoute = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Check if user is logged in (has token) AND is a 'user'
  const isUser = token && role === 'user';

  // If they are a user, show the page (Outlet).
  // Otherwise, send them to the login page.
  return isUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedUserRoute;
