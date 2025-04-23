
import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import PlacesTable from "./pages/PlaceTable";
import SavedLocations from "./pages/Users";
import IbadanGallery from "./pages/IbadanGallery";
import LandingPage from "./pages/LandingPage";
import Sidebar from "./components/ui/SideBar";
import { getAuth, onAuthStateChanged } from "firebase/auth";


// Wrap your protected routes and pass down both user & setUser
const Layout = ({ user, setUser }) => {
  const navigate = useNavigate();

  // Guard: if not logged in, redirect to landing
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen">
      <Sidebar onNavigate={(page) => navigate(`/${page}`)} />
      <div className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard user={user} setUser={setUser} />}
          />
          <Route path="/places" element={<PlacesTable />} />
          <Route path="/users" element={<SavedLocations />} />
          <Route path="/gallery" element={<IbadanGallery />} />
          {/* Fallback inside auth: */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // This will fire on sign-in and sign-out
      setUser(firebaseUser); // firebaseUser is null when signed out
    });
    return unsubscribe;
  }, []);

  // While checking auth state, don't render routes yet
  if (user === undefined) {
    return <div className="flex h-screen items-center justify-center">Loading…</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Landing Page (Public) */}
        <Route
          path="/"
          element={
            !user ? (
              <LandingPage setUser={setUser} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* All other routes are protected */}
        <Route path="/*" element={<Layout user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
