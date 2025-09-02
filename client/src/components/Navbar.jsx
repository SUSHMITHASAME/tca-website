import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-orange-300 via-orange-300 to-[#c8632d] shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img
            src="/TCA.png" // Replace with your logo path
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

        {/* Menu Links */}
        <div className="hidden md:flex space-x-6 text-white text-2xl font-medium">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/team" className="hover:text-gray-200">Team</Link>
          <Link to="/about" className="hover:text-gray-200">About</Link>
          <Link to="/events" className="hover:text-gray-200">Events</Link>
          <Link to="/history" className="hover:text-gray-200">History</Link>
          <Link to="/contact" className="hover:text-gray-200">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
