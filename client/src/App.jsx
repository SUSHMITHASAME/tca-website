import React from "react";
import { Routes, Route } from "react-router-dom";

// --- Your Existing Pages ---
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import History from "./pages/History";
import Team from "./pages/Team";
import Events from "./pages/Events";
import Contact from "./pages/Contact";

// --- Our New Auth Pages ---
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/Admindashboard'; // You will create this
import UserDashboard from './pages/UserDashboard';   // You will create this

// --- Our New Protected Route Components ---
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import ProtectedUserRoute from './components/ProtectedUserRoute'; // We will create this

function App() {
  return (
    <Routes>
      {/* --- This is your main website homepage with all sections --- */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <div className="pt-16 md:pt-20">
              <section id="home">
                <Home />
              </section>
              <section id="about">
                <About />
              </section>
              <section id="events">
                <Events />
              </section>
              <section id="history">
                <History />
              </section>
              <section id="team">
                <Team />
              </section>
              <section id="contact">
                <Contact />
              </section>
            </div>
          </>
        }
      />

      {/* --- Your existing standalone pages (keep them) --- */}
      <Route path="/team" element={<Team />} />
      <Route path="/events" element={<Events />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/history" element={<History />} />

      {/* --- NEW: Public Auth Routes --- */}
      {/* These pages will not show your main Navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* --- NEW: Admin-Only Protected Routes --- */}
      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* You can add more admin-only pages here later */}
        {/* e.g., <Route path="/admin/edit-event" element={<EditEventPage />} /> */}
      </Route>

      {/* --- NEW: User-Only Protected Routes --- */}
      <Route element={<ProtectedUserRoute />}>
        <Route path="/user-dashboard" element={<UserDashboard />} />
        {/* e.g., <Route path="/my-profile" element={<ProfilePage />} /> */}
      </Route>
      
    </Routes>
  );
}

export default App;
