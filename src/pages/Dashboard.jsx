import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/ui/NavBar';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AddLocationModal from '../components/modal/PlacesModal';

const SetMapView = ({ position, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, zoom, { animate: true, duration: 1.5 });
    }
  }, [position, zoom, map]);

  return null;
};

const Dashboard = () => {
  const [places, setPlaces] = useState([
    {
      id: 1,
      name: 'Agodi Gardens',
      position: [7.3995, 3.9087],
      image: 'https://example.com/agodi.jpg',
      ticketFee: '₦1,000',
    },
    {
      id: 2,
      name: 'Ventura Mall',
      position: [7.4038, 3.9457],
      image: 'https://example.com/ventura.jpg',
      ticketFee: '₦500 - ₦5,000',
    },
    {
      id: 3,
      name: 'Cocoa House',
      position: [7.3776, 3.8964],
      image: 'https://example.com/cocoa.jpg',
      ticketFee: 'Free',
    },
  ]);

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [position, setPosition] = useState([7.3775, 3.9470]);
  const [zoom, setZoom] = useState(13);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return navigate("/");
      setUser({
        name: currentUser.displayName || "User",
        email: currentUser.email,
      });
    });
    return () => unsubscribe();
  }, [auth, navigate]);
 const handleSignOut = async () => {
     try {
       await signOut(auth);
       setUser(null);
       navigate("/");
     } catch (error) {
       console.error("Sign-out error:", error.message);
     }
   };

  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
    setPosition(place.position);
    setZoom(15);
  };

  const handleAddPlace = (newPlace) => {
    setPlaces((prev) => [...prev, { ...newPlace, id: Date.now() }]);
    setShowModal(false);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      (error) => console.error('Location error: ', error)
    );
  }, []);

  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 p-4 flex flex-col">
        <Navbar user={user} onSignOut={handleSignOut} />

        <div className="flex flex-col gap-6 mt-8">
          {/* Map Section */}
          <div className="w-full h-[500px]">
            <MapContainer center={position} zoom={zoom} style={{ height: '100%', width: '100%' }}>
              <SetMapView position={position} zoom={zoom} />
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {places.map((place) => (
                <Marker key={place.id} position={place.position} icon={customIcon}>
                  <Popup>{place.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Table Section */}
          <div className="w-full p-4 bg-white shadow-lg rounded-lg">
            

            <div className="flex flex-col md:flex-row items-center justify-between mb-4">
              <input
                type="text"
                placeholder="Search for fun places..."
                className="w-full md:w-1/2 p-2 border rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
              onClick={() => setShowModal(true)}
              className=" cursor-pointer mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              + Add New Place
            </button>
            </div>

            <table className="w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Image</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Ticket Fee</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlaces.map((place) => (
                  <tr key={place.id} className="hover:bg-gray-100">
                    <td className="border p-2">
                      <img src={place.image} alt={place.name} className="w-16 h-16 rounded" />
                    </td>
                    <td className="border p-2">{place.name}</td>
                    <td className="border p-2">{place.ticketFee}</td>
                    <td className="border p-2">
                      <button
                        className=" cursor-pointer px-4 py-1 bg-blue-600 text-white rounded"
                        onClick={() => handleSelectPlace(place)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {showModal && (
            <AddLocationModal
              onClose={() => setShowModal(false)}
              onSave={handleAddPlace}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
