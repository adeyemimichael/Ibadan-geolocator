import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../ui/SideBar";

const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname.replace("/", "")); // Get current page

  const handleNavigate = (page) => {
    if (page === "logout") {
      // Handle logout logic here
      console.log("User logged out");
      navigate("/"); // Redirect to login or home page
    } else {
      navigate(`/${page}`);
      setActivePage(page);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar onNavigate={handleNavigate} activePage={activePage} />

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Outlet /> {/* Renders nested routes */}
      </div>
    </div>
  );
};

export default Homepage;
