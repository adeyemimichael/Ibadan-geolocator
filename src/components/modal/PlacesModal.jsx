import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AddLocationModal = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState(null);

  // Handle map click event
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setLocation({ lat, lng });
      },
    });

    return location ? (
      <Marker position={location}>
        <Popup>{`Lat: ${location.lat}, Lng: ${location.lng}`}</Popup>
      </Marker>
    ) : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!location) {
      alert('Please select a location on the map');
      return;
    }

    // Create a new place object with location coordinates
    const newPlace = {
      name,
      ticketPrice,
      image,
      position: [location.lat, location.lng], // Store lat/lng as an array
    };
  
    onSave(newPlace); // Send data to parent component
    onClose(); // Close modal

    // Clear form fields
    setName('');
    setTicketPrice('');
    setImage('');
    setLocation(null);
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Add a New Location</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Ticket Price:</label>
            <input
              type="text"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Image URL:</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="h-64 w-full mb-4">
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ width: '100%', height: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>
          </div>

          <div className="flex justify-end space-x-3">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLocationModal;
