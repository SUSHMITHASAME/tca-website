import React from 'react';

// This is just a placeholder page for now.
// You can show a user's profile or other user-specific info here.

function UserDashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.replace('/login');
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>User Dashboard</h1>
      <p>Welcome to your dashboard.</p>
      <button 
        onClick={handleLogout} 
        style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
}

export default UserDashboard;