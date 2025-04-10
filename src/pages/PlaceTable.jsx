import React, { useState, useEffect } from 'react';
import { placesData } from '../data/placeData';  // Assuming placesData is already available
import PlacesModal from '../components/modal/PlacesModal';
import AlertModal from '../components/modal/AlertModal';

const PlacesTable = ({ onSelectPlace }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [localPlaces, setLocalPlaces] = useState(placesData);
  const [savedLocations, setSavedLocations] = useState([]);

  // Load saved locations from local storage on mount
  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem("savedLocations")) || [];
    setSavedLocations(storedLocations);
  }, []);

  // Save location to local storage
  const handleSaveLocation = (place) => {
    const updatedLocations = [...savedLocations, place];
    setSavedLocations(updatedLocations);
    localStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
    setIsAlertOpen(true);
  };

  const filteredPlaces = localPlaces.filter((place) =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPlace = (newPlace) => {
    setLocalPlaces([...localPlaces, newPlace]);
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-lg">
      <input
        type="text"
        placeholder="Search for fun places..."
        className="w-full p-2 border rounded mb-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Place
      </button>

      {/* Table for Viewing Places on Map */}
      <h2 className="text-xl font-semibold mb-2">Places to View on Map</h2>
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200">
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
              <td className="border p-2">{place.ticketFee || 'Free'}</td>
              <td className="border p-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  onClick={() => onSelectPlace(place)}
                >
                  View on Map
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Table for Saved Locations */}
      <h2 className="text-xl font-semibold mb-2">Saved Locations</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Ticket Fee</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {localPlaces.map((place) => (
            <tr key={place.id} className="border">
              <td className="p-2">{place.name}</td>
              <td className="p-2">{place.ticketFee || 'Free'}</td>
              <td className="p-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => handleSaveLocation(place)}
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && <PlacesModal onClose={() => setIsModalOpen(false)} onAddPlace={handleAddPlace} />}
      {isAlertOpen && <AlertModal message="Location saved successfully!" onClose={() => setIsAlertOpen(false)} />}
    </div>
  );
};

export default PlacesTable;
