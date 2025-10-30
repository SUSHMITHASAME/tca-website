import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

// Add this line at the top of your component (outside the function)
const API_URL = import.meta.env.VITE_API_BASE_URL;

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (password.length < 6) {
    setError('Password must be at least 6 characters long.');
    return;
  }

  try {
    // *** THIS IS THE FIX ***
    // Replaced 'http://localhost:5000' with your dynamic variable
    await axios.post(`${API_URL}/api/auth/register`, {
      email,
      password,
    });

    // After successful registration, send them to the login page
    navigate('/login');
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data === 'Email is already in use') {
      // Use the specific error from your server (if you send one)
      setError('This email is already in use.');
    } else {
      setError('Failed to register. Please try again.');
    }
  }
};

  return (
    // Full screen background
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-300 via-orange-300 to-[#c8632d] p-6">
      
      {/* Register Card */}
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl">
        
        {/* Header with Logo */}
        <div className="flex justify-center items-center mb-6 space-x-3">
          <img src="/TCA.png" alt="Logo" className="h-12 w-12" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm">Join the TCA Portal</p>
          </div>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Input */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              Register
            </button>
          </div>
        </form>

        {/* Link to Login Page */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;