import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/NavBar';

import MapComponent from '../components/MapComponent'; // Assuming you have this in a separate file
import PlacesTable from './PlaceTable'; // Import PlacesTable component

// Dashboard Component (Main Container)
const Dashboard = () => {
  const [places] = useState([
    {
      name: 'Agodi Gardens',
      position: [7.3995, 3.9087],
      image: 'https://example.com/agodi.jpg', // Replace with actual image
      ticketPrice: '₦1,000',
    },
    {
      name: 'Ventura Mall',
      position: [7.4038, 3.9457],
      image: 'https://example.com/ventura.jpg',
      ticketPrice: '₦500 - ₦5,000',
    },
    {
      name: 'Cocoa House',
      position: [7.3776, 3.8964],
      image: 'https://example.com/cocoa.jpg',
      ticketPrice: 'Free',
    },
  ]);

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('dashboard'); // To highlight active page in sidebar

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "User",
          email: currentUser.email,
        });
      } else {
        setUser(null);
        navigate("/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup
  }, [auth, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect after sign out
    } catch (error) {
      console.error("Sign-out error:", error.message);
    }
  };

  const handleNavigation = (page) => {
    if (page === 'logout') {
      handleSignOut();
    } else {
      setActivePage(page); // Set active page for sidebar highlighting
      navigate(`/${page}`); // Navigate to selected page
    }
  };


  // Function to handle when a place is selected
  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
    // You can also add other logic to handle the selected place, like displaying more info
    console.log('Selected place:', place);
  };
  return (
    <div className="flex h-screen w-full">
      {/* <Sidebar onNavigate={handleNavigation} activePage={activePage} /> */}
      <div className="flex-1 p-4 flex flex-col">
        <Navbar user={user} onSignOut={handleSignOut} />
     
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row gap-4 mt-8 ">
          <div className="flex-1">
            {/* Pass the places and the onSelectPlace handler to PlacesTable */}
            <PlacesTable 
            places={places} 
            onSelectPlace={handleSelectPlace} 
            showSavedLocations={false}
             page="dashboard" 
             />
          </div>
          <div className="flex-2">
            {/* Pass the selected place to MapComponent */}
            <MapComponent selectedPlace={selectedPlace} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
