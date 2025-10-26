import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // --- Modal and Form State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFeedbackId, setCurrentFeedbackId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // --- Handle Logout ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // --- Fetch all feedback ---
  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (!token) {
        setError('No token found, redirecting to login.');
        handleLogout();
        return;
      }
      try {
        // This line calls your backend.
        // It requires your server on port 5000 to be running.
        const res = await axios.get('http://localhost:5000/api/feedback', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbacks(res.data);
      } catch (err) {
        // This is the error you are seeing
        console.error('Error fetching feedback:', err);
        if (err.code === 'ERR_NETWORK') {
          setError('Network Error: Could not connect to server. Is it running?');
        } else if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setError('Unauthorized. Please log in again.');
          handleLogout();
        } else {
          setError('Failed to fetch feedback.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [token, navigate]);

  // --- Modal Controls ---
  const openCreateModal = () => {
    setIsEditing(false);
    setFormData({ name: '', email: '', message: '' });
    setCurrentFeedbackId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (fb) => {
    setIsEditing(true);
    setFormData({ name: fb.name, email: fb.email, message: fb.message });
    setCurrentFeedbackId(fb._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // --- Form Input Change ---
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Handle Create/Update Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required.');
      return;
    }
    setError('');

    try {
      if (isEditing) {
        // --- UPDATE (PUT) ---
        const res = await axios.put(
          `http://localhost:5000/api/feedback/${currentFeedbackId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFeedbacks(
          feedbacks.map((fb) =>
            fb._id === currentFeedbackId ? res.data.feedback : fb
          )
        );
      } else {
        // --- CREATE (POST) ---
        const res = await axios.post(
          'http://localhost:5000/api/feedback',
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFeedbacks([...feedbacks, res.data.feedback]);
      }
      closeModal();
    } catch (err) {
      console.error('Error saving feedback:', err);
      setError('Failed to save feedback. Please check console.');
    }
  };

  // --- Handle Delete Feedback ---
  const handleDelete = async (feedbackId) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${feedbackId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(feedbacks.filter((fb) => fb._id !== feedbackId));
    } catch (err) {
      console.error('Error deleting feedback:', err);
      setError('Failed to delete feedback.');
    }
  };

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">
              User Feedback
            </h2>
            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Create New
            </button>
          </div>

          {error && <p className="mb-4 text-red-500 text-center">{error}</p>}

          <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feedbacks.length > 0 ? (
                  feedbacks.map((fb) => (
                    <tr key={fb._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fb.name}</td>
                      <td className="px-6 py-4 whitespace-nowGrap text-sm text-gray-500">{fb.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-sm break-words">{fb.message}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                        <button
                          onClick={() => openEditModal(fb)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(fb._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      No feedback submitted yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* --- Create/Edit Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg">
            <h3 className="text-2xl font-semibold mb-4">
              {isEditing ? 'Edit Feedback' : 'Create Feedback'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isEditing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;