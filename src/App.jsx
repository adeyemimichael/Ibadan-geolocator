import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";

// Import your pages
import Dashboard from './pages/Dashboard';
import PlacesTable from './pages/PlaceTable';
import SavedLocations from './pages/Users';
import IbadanGallery from './pages/IbadanGallery';
import LandingPage from './pages/LandingPage'; // ✅ New Landing Page

// Import Sidebar and other components
import Sidebar from './components/ui/SideBar';

// Layout wraps all dashboard routes and requires authentication
const Layout = ({ user }) => {
  const navigate = useNavigate();

  // Redirect unauthenticated users
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex">
      <Sidebar onNavigate={(page) => navigate(`/${page}`)} />
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/places" element={<PlacesTable />} />
          <Route path="/users" element={<SavedLocations />} />
          <Route path="/gallery" element={<IbadanGallery />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null); // Auth state

  return (
    <Router>
      <Routes>
        {/* Landing Page (Public) */}
        <Route 
          path="/" 
          element={!user ? <LandingPage setUser={setUser} /> : <Navigate to="/dashboard" />} 
        />

        {/* Dashboard & Protected Routes */}
        <Route path="/*" element={<Layout user={user} />} />
      </Routes>
    </Router>
  );
};

export default App;