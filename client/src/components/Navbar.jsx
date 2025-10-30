import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/'); 
    setIsOpen(false); 
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-orange-300 via-orange-300 to-[#c8632d] shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        <div className="flex items-center space-x-3">
          <img
            src="/TCA.png" 
            alt="Logo"
            className="h-10 w-10"
          />
          <div>
            <h1 className="text-white text-xl sm:text-2xl font-bold">
              Telugu Cultural Association
            </h1>
            <p className="text-white text-sm">IIT Kharagpur</p>
          </div>
        </div>

        <div className="hidden md:flex space-x-6 text-white text-lg font-medium items-center">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/team" className="hover:text-gray-200">Team</Link>
          <Link to="/about" className="hover:text-gray-200">About</Link>
          <Link to="/events" className="hover:text-gray-200">Events</Link>
          <Link to="/history" className="hover:text-gray-200">History</Link>
          <Link to="/contact" className="hover:text-gray-200">Contact</Link>

          {token ? (
            <>
              {role === 'admin' && (
                <Link to="/admin-dashboard" className="hover:text-gray-200">
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="hover:text-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gradient-to-r from-orange-300 via-orange-300 to-[#c8632d] pb-4`}>
        <div className="flex flex-col items-center space-y-4 text-white text-lg font-medium">
          <Link to="/" className="hover:text-gray-200" onClick={closeMenu}>Home</Link>
          <Link to="/team" className="hover:text-gray-200" onClick={closeMenu}>Team</Link>
          <Link to="/about" className="hover:text-gray-200" onClick={closeMenu}>About</Link>
          <Link to="/events" className="hover:text-gray-200" onClick={closeMenu}>Events</Link>
          <Link to="/history" className="hover:text-gray-200" onClick={closeMenu}>History</Link>
          <Link to="/contact" className="hover:text-gray-200" onClick={closeMenu}>Contact</Link>

          {token ? (
            <>
              {role === 'admin' && (
                <Link to="/admin-dashboard" className="hover:text-gray-200" onClick={closeMenu}>
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="hover:text-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-gray-200" onClick={closeMenu}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
