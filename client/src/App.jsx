import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import History from "./pages/History";
import Team from "./pages/Team";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard"; // Placeholder for now
import RequireAuth from "./components/RequireAuth";
function App() {
  return (
    <Router>
      <Routes>
        {/* Admin routes (don't show navbar here) */}
        <Route path="/team" element={<Team />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/history" element={<History/>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<RequireAuth>
          <AdminDashboard />
          </RequireAuth>
        }
     />

        {/* Public site routes (with navbar) */}
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
      </Routes>
    </Router>
  );
}

export default App;


