import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To show login errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Store token and role
      localStorage.setItem('token', res.data.accessToken);
      localStorage.setItem('role', res.data.role);

      // Redirect based on role
      if (res.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        // For regular users, just send them to the homepage
        navigate('/'); 
      }
    } catch (err) {
      console.log(err);
      setError('Failed to login. Please check your email and password.');
    }
  };

  return (
    // Full screen background matching your site's gradient
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-300 via-orange-300 to-[#c8632d] p-6">
      
      {/* Login Card */}
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl">
        
        {/* Header with Logo */}
        <div className="flex justify-center items-center mb-6 space-x-3">
          <img src="/TCA.png" alt="Logo" className="h-12 w-12" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              TCA Portal Login
            </h2>
            <p className="text-gray-500 text-sm">Welcome back</p>
          </div>
        </div>

        {/* Login Form */}
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
              placeholder="••••••••"
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
              Login
            </button>
          </div>
        </form>

        {/* Link to Register Page */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;