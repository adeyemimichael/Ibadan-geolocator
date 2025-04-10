
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PlacesTable from './pages/PlaceTable';
import SavedLocations from './pages/Users';
function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Redirect to dashboard if logged in, else show login */}
        <Route path="/" element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
        <Route path="/places" element={<PlacesTable />} />
        <Route path ="/users" element ={<SavedLocations />} />
      </Routes>
    </Router>
  );
}

export default App;
