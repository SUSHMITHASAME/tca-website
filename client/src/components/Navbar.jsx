import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  // --- Get auth state from localStorage ---
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  // --- Handle Logout ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/'); // Redirect to the homepage after logout
  };

  return (
    <nav className="bg-gradient-to-r from-orange-300 via-orange-300 to-[#c8632d] shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section (no change) */}
        <div className="flex items-center space-x-3">
          <img
            src="/TCA.png" 
            alt="Logo"
            className="h-10 w-10"
          />
          <div>
            <h1 className="text-white text-2xl font-bold">
              Telugu Cultural Association
            </h1>
            <p className="text-white text-sm">IIT Kharagpur</p>
          </div>
        </div>

        {/* --- Menu Links (with new auth logic) --- */}
        <div className="hidden md:flex space-x-6 text-white text-2xl font-medium">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/team" className="hover:text-gray-200">Team</Link>
          <Link to="/about" className="hover:text-gray-200">About</Link>
          <Link to="/events" className="hover:text-gray-200">Events</Link>
          <Link to="/history" className="hover:text-gray-200">History</Link>
          <Link to="/contact" className="hover:text-gray-200">Contact</Link>

          {/* === THIS IS THE NEW LOGIC === */}

          {token ? (
            // --- User is LOGGED IN ---
            <>
              {/* Only show "Admin" link if the role is 'admin' */}
              {role === 'admin' && (
                <Link to="/admin-dashboard" className="hover:text-gray-200">
                  Admin
                </Link>
              )}

              {/* Show "Logout" for ALL logged-in users */}
              <button
                onClick={handleLogout}
                className="hover:text-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            // --- User is LOGGED OUT ---
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
          )}

          {/* === END OF NEW LOGIC === */}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;