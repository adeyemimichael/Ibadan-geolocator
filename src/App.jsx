import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from './components/routes/Login';
import Dashboard from './pages/Dashboard';
import PlacesTable from './pages/PlaceTable';
import SavedLocations from './pages/Users';
import Homepage from './components/routes/Home';
import React from "react";

import Sidebar from './components/SideBar';
import IbadanGallery from './pages/IbadanGallery';

const Layout = ({ user }) => {
  const navigate = useNavigate();

  // If the user is not logged in, redirect to Login
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
  const [user, setUser] = useState(null); // Track user authentication

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
        <Route path="/*" element={<Layout user={user} />} />
      </Routes>
    </Router>
  );
};

export default App;


// !user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />
// user ? <Dashboard user={user} /> : <Navigate to="/" />

