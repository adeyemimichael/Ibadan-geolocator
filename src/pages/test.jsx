import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Navbar from '../components/NavBar';
import { useNavigate } from "react-router-dom";
// Smooth Map Transition Hook
const SetMapView = ({ position, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, zoom, { animate: true, duration: 1.5 });
    }
  }, [position, zoom, map]);

  return null;
};

// Map Component
const MapComponent = ({ selectedPlace }) => {
  const [position, setPosition] = useState([7.3775, 3.9470]); // Default: Ibadan
  const [zoom, setZoom] = useState(13); // Default zoom level

  // Update user location (if enabled)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      (error) => console.error('Error getting location: ', error)
    );
  }, []);

  // Update map position based on the selected place
  useEffect(() => {
    if (selectedPlace) {
      setPosition(selectedPlace.position);
      setZoom(15); // Zoom in when a place is selected
    }
  }, [selectedPlace]);

  // Custom marker icon
  const customIcon = new L.Icon({
    iconUrl: "https://example.com/custom-marker-icon.png", // Your custom marker icon URL
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  
  return (
    <div className="map-container" style={{ height: '500px', width: '100%' }}>
      <MapContainer center={position} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <SetMapView position={position} zoom={zoom} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Marker for the selected place */}
        <Marker position={position} icon={customIcon}>
          <Popup>{selectedPlace ? selectedPlace.name : 'You are here 📍'}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

// Places Table Component with Search
const PlacesTable = ({ places, onSelectPlace }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="places-table" style={{ flex: 1, padding: '20px' }}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search places..."
        className="search-bar"
        style={{
          marginBottom: '15px',
          padding: '10px',
          width: '100%',
          borderRadius: '5px',
          border: '1px solid #ccc',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f8f8' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Picture</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Ticket Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlaces.map((place, index) => (
            <tr
              key={index}
              onClick={() => onSelectPlace(place)}
              style={{
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                <img src={place.image} alt={place.name} width="50" style={{ borderRadius: '5px' }} />
              </td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{place.name}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{place.ticketPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

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

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
  };
  const [user, setUser] = useState(null);
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
      navigate("/login"); // Redirect after sign out
    } catch (error) {
      console.error("Sign-out error:", error.message);
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', height: '100vh' }}>
      <Navbar  user={user}/>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Ibadan MetroHub Locator</h1>
      
      {/* Mobile-first, flexbox layout */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
        <div className="places-table-container" style={{ flex: 1, minHeight: '50vh' }}>
          <PlacesTable places={places} onSelectPlace={handlePlaceSelect} />
        </div>
        <div className="map-container" style={{ flex: 2, minHeight: '50vh' }}>
          <MapComponent selectedPlace={selectedPlace} />
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;



import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const IbadanGallery = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [errorImages, setErrorImages] = useState(null);
  const [errorVideos, setErrorVideos] = useState(null);

  // Fetching Images from Unsplash
  useEffect(() => {
    const fetchImages = async () => {
  const unsplashApiKey = import.meta.env.VITE_APP_UNSPLASH_API_KEY;
  if (!unsplashApiKey) {
    setErrorImages('Unsplash API Key is not set');
    setLoadingImages(false);
    return;
  }

  const queryParams = [
    
    'University of ibadan',
  
  ];

  const allImages = [];
  setLoadingImages(true);

  try {
    // Loop through each query term and fetch results
    for (let query of queryParams) {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashApiKey}&per_page=10`
      );
      const data = await response.json();

      if (response.ok) {
        allImages.push(...data.results);
      } else {
        throw new Error(`Error fetching images for query: ${query}`);
      }
    }

    // Update state with all fetched images
    setImages(allImages);
  } catch (error) {
    setErrorImages(error.message);
  } finally {
    setLoadingImages(false);
  }
};

fetchImages();


    // Refresh images every 30 seconds (30000 milliseconds)
    const intervalId = setInterval(() => {
      fetchImages();
    }, 30000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  // Fetching Videos from YouTube
  useEffect(() => {
    const fetchVideos = async () => {
      const youtubeApiKey = import.meta.env.VITE_APP_YOUTUBE_API_KEY;
      if (!youtubeApiKey) {
        setErrorVideos('YouTube API Key is not set');
        setLoadingVideos(false);
        return;
      }

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=Ibadan&key=${youtubeApiKey}`
        );
        const data = await response.json();
        if (response.ok) {
          setVideos(data.items);
        } else {
          throw new Error('Error fetching videos');
        }
      } catch (error) {
        setErrorVideos(error.message);
      } finally {
        setLoadingVideos(false);
      }
    };

    fetchVideos();

    // Refresh videos every 30 seconds (30000 milliseconds)
    const intervalId = setInterval(() => {
      fetchVideos();
    }, 30000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center rounded-lg p-6 dark:bg-slate-900">
      <h1 className="text-3xl text-white mb-4">Ibadan Fun and Relaxation Places</h1>
      
      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <h2 className="col-span-full text-2xl text-white mb-4">Images</h2>
        {loadingImages
          ? Array(6).fill(0).map((_, idx) => (
              <Skeleton key={idx} className="rounded-lg h-48" />
            ))
          : errorImages
          ? <p className="text-red-500">{errorImages}</p>
          : images.length > 0
          ? images.map((image) => (
              <div key={image.id} className="rounded-3xl bg-orange-400">
                <img
                  src={image.urls.small}
                  alt={image.alt_description}
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            ))
          : <p className="col-span-full text-white">No images found</p>}
      </div>

      {/* Video Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-8">
        <h2 className="col-span-full text-2xl text-white mb-4">Videos</h2>
        {loadingVideos
          ? Array(3).fill(0).map((_, idx) => (
              <Skeleton key={idx} className="rounded-lg h-48" />
            ))
          : errorVideos
          ? <p className="text-red-500">{errorVideos}</p>
          : videos.length > 0
          ? videos.map((video) => (
              <div key={video.id.videoId} className="rounded-3xl bg-orange-400">
                <iframe
                  width="100%"
                  height="240"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  title={video.snippet.title}
                  className="rounded-3xl"
                />
                <p className="text-white">{video.snippet.title}</p>
              </div>
            ))
          : <p className="col-span-full text-white">No videos found</p>}
      </div>
    </div>
  );
};

export default IbadanGallery;
